import { useCallback, useState } from 'react'
import { TETROMINOS, randomTetromino } from '../helpers/tetrominos'
import { checkCollision, STAGE_WIDTH } from '../helpers/gameHelpers'
import { IPlayer, IPosPlayerUpdate } from '../types/types'

export const usePlayer = () => {
	const [player, setPlayer] = useState<IPlayer>({
		pos: { x: 0, y: 0 },
		tetromino: TETROMINOS[0].shape,
		collided: false,
	})

	const rotate = (matrix: (number | string)[][], dir: number) => {
		// transpose
		const rotatedTetro = matrix.map((_, index) =>
			matrix.map((col) => col[index]),
		)
		// reverse each row to get a rotated matrix
		if (dir > 0) return rotatedTetro.map((row) => row.reverse())
		return rotatedTetro.reverse()
	}

	const playerRotate = (stage: (number | string)[][][], dir: number) => {
		const clonedPlayer = JSON.parse(JSON.stringify(player))
		clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir)

		const pos = clonedPlayer.pos.x
		let offset = 1
		while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
			clonedPlayer.pos.x += offset
			offset = -(offset + (offset > 0 ? 1 : -1))
			if (offset > clonedPlayer.tetromino[0].length) {
				rotate(clonedPlayer.tetromino, -dir)
				clonedPlayer.pos.x = pos
				return
			}
		}

		setPlayer(clonedPlayer)
	}

	const updatePlayerPos = ({ x, y, collided }: IPosPlayerUpdate) => {
		setPlayer((prev) => ({
			...prev,
			pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
			collided,
		}))
	}

	const resetPlayer = useCallback(() => {
		setPlayer({
			pos: { x: STAGE_WIDTH / 2 - 1, y: 0 },
			tetromino: randomTetromino().shape,
			collided: false,
		})
	}, [])

	return [player, updatePlayerPos, resetPlayer, playerRotate] as const
}
