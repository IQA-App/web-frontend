import { useEffect, useState } from 'react'
import { createStage } from '../helpers/gameHelpers'
import { IPlayer } from '../types/types'

export const useStage = (player: IPlayer, resetPlayer: () => void) => {
	const [stage, setStage] = useState(createStage())
	const [rowsCleared, setRowsCleared] = useState<number>(0)

	useEffect(() => {
		setRowsCleared(0)

		const sweepRows = (newStage: (number | string)[][][]) =>
			newStage.reduce<(number | string)[][][]>((acc, row) => {
				if (row.findIndex((cell) => cell[0] === 0) === -1) {
					setRowsCleared((prev) => prev + 1)
					acc.unshift(new Array(newStage[0].length).fill([0, 'clear']))
					return acc
				}
				acc.push(row)
				return acc
			}, [])

		const updateStage = (prevStage: (number | string)[][][]) => {
			// Flush the stage
			const newStage: (number | string)[][][] = prevStage.map((row) =>
				row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)),
			)

			// draw a new stage
			player.tetromino.forEach((row, y) => {
				row.forEach((value, x) => {
					if (value !== 0) {
						newStage[y + player.pos.y][x + player.pos.x] = [
							value,
							`${player.collided ? 'merged' : 'clear'}`,
						]
					}
				})
			})

			// check if collided
			if (player.collided) {
				resetPlayer()
				return sweepRows(newStage)
			}
			return newStage
		}

		setStage((prev) => updateStage(prev))
	}, [player])

	return [stage, setStage, rowsCleared] as const
}
