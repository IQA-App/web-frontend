import { IPlayer, IPos } from '../types/types'

export const STAGE_WIDTH: number = 12
export const STAGE_HEIGHT: number = 20

export const createStage: () => (string | number)[][][] = () =>
	Array.from(Array(STAGE_HEIGHT), (): (number | string)[][] =>
		new Array(STAGE_WIDTH).fill([0, 'clear']),
	)

export const checkCollision = (
	player: IPlayer,
	stage: (number | string)[][][],
	{ x: moveX, y: moveY }: IPos,
) => {
	for (let y = 0; y < player.tetromino.length; y++) {
		for (let x = 0; x < player.tetromino[y].length; x++) {
			if (player.tetromino[y][x] !== 0) {
				if (
					!stage[y + player.pos.y + moveY] ||
					!stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
					stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !==
						'clear'
				) {
					return true
				}
			}
		}
	}
}
