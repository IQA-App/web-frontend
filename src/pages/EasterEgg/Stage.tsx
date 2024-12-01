import {FC} from 'react'
import Cell from './Cell'
import { StyledStage } from './styles/StyledStage'

interface IStage {
  stage: (number | string)[][][]
}

const Stage: FC<IStage> = ({stage}) => {
  return (
    <StyledStage width={stage[0].length} height={stage.length}>
      {stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]}/>))}
    </StyledStage>
  )
}

export default Stage