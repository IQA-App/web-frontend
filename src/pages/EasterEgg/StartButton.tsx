import {FC} from 'react'
import { StyledStartButton } from '../EasterEgg/styles/StyledStartButton'

const StartButton: FC<{callback: void}> = ({callback}) => {
  return (
    <StyledStartButton onClick={callback}>Start Game</StyledStartButton>
  )
}

export default StartButton