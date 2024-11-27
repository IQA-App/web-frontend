import {FC} from 'react'
import { StyledDisplay } from '../EasterEgg/styles/StyledDisplay'

interface IDisplay {
  gameOver?: boolean | undefined
  text: string
}

const Display: FC<IDisplay> = ({gameOver, text}) => {
  return (
    <StyledDisplay gameOver={gameOver}>{text}</StyledDisplay>
  )
}

export default Display