import { FC, useState } from 'react'
// components
import Stage from './Stage'
import Display from './Display'
import StartButton from './StartButton'
import { StyledTetris, StyledTetrisWrapper } from './styles/StyledTetris'
// hooks
import { useStage } from './hooks/useStage'
import { usePlayer } from './hooks/usePlayer'
import { checkCollision, createStage } from './helpers/gameHelpers'
import { useInterval } from './hooks/useInterval'
import { useGameStatus } from './hooks/useGameStatus'
import { Link } from 'react-router-dom'

const Tetris: FC = () => {
	const [dropTime, setDropTime] = useState<number | null>(null)
	const [gameOver, setGameOver] = useState(false)

	const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer()
	const [stage, setStage, rowsCleared] = useStage(player, resetPlayer)
	const [score, setScore, rows, setRows, level, setLevel] =
		useGameStatus(rowsCleared)

	console.log(`19aaa rerender`)

	const movePlayer = (dir: number) => {
		console.log(`29aaa`, player, dir)
		if (!checkCollision(player, stage, { x: dir, y: 0 })) {
			updatePlayerPos({ x: dir, y: 0 })
		}
	}

	const startGame = () => {
		console.log('test')
		setStage(createStage())
		setDropTime(1000)
		// setDropTime(null)
		resetPlayer()
		setScore(0)
		setLevel(0)
		setRows(0)
		setGameOver(false)
	}

	const drop = () => {
		// increase level after 10 rows
		if (rows > (level + 1) * 10) {
			setLevel((prev) => prev + 1)
			//   // increase speed
			// setDropTime(1000 / (level + 1) + 200)
		}
		if (!checkCollision(player, stage, { x: 0, y: 1 })) {
			updatePlayerPos({ x: 0, y: 1, collided: false })
		} else {
			if (player.pos.y < 1) {
				console.log('Game Over!')
				setGameOver(true)
				setDropTime(null)
			}
			updatePlayerPos({ x: 0, y: 0, collided: true })
		}
	}

	const keyUp = ({ keyCode }: { keyCode: number }) => {
		if (!gameOver) {
			if (keyCode === 40) {
				// setDropTime(null)
				setDropTime(1000 / (level + 1) + 200)
			}
		}
	}

	const dropPlayer = () => {
		console.log('interval off')
		setDropTime(null)
		drop()
	}

	const move = ({ keyCode }: { keyCode: number }) => {
		if (!gameOver) {
			switch (keyCode) {
				case 37:
					console.log(`81aaa`, keyCode)
					movePlayer(-1)
					break
				case 39:
					movePlayer(1)
					break
				case 40:
					dropPlayer()
					break
				case 38:
					playerRotate(stage, 1)
			}
		}
	}

	useInterval(() => {
		drop()
	}, dropTime)

	return (
		<StyledTetrisWrapper
			role="button"
			tabIndex="0"
			onKeyDown={(e) => move(e)}
			onKeyUp={keyUp}
		>
			<StyledTetris>
				<Stage stage={stage} />
				<aside>
					{gameOver ? (
						<Display gameOver={gameOver} text="Game Over" />
					) : (
						<div>
							<Display text={`Score: ${score}`} />
							<Display text={`Rows: ${rows}`} />
							<Display text={`Level: ${level}`} />
						</div>
					)}
					<StartButton callback={startGame} />
					<Link to={'/'} className="box-border p-4  rounded-3xl mb-5 ml-5 text-white bg-neutral-800 block border-none text-xl text-center">
						Back
					</Link>
				</aside>
			</StyledTetris>
		</StyledTetrisWrapper>
	)
}

export default Tetris
