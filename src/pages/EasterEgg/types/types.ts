export interface ITetromino {
	[key: number | string]: ITetrominoProps
}

export interface ITetrominoProps {
	shape: (number | string)[][]
	color: string
}

export interface IPos {
	x: number
	y: number
}

export interface IPlayer {
	pos: IPos
	tetromino: (number | string)[][]
	collided: boolean
}

export interface IPosPlayerUpdate {
	x: number
	y: number
	collided?: boolean | undefined
}
