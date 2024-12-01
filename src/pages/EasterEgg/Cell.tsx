import {FC, memo} from 'react'
import { StyledCell } from './styles/StyledCell'
import { TETROMINOS } from './helpers/tetrominos'

interface ICell {
  type: string | number
}

const Cell: FC<ICell> = ({type}) => {
  return (
    <StyledCell type={type} color={TETROMINOS[type].color} />
  )
}

export default memo(Cell)