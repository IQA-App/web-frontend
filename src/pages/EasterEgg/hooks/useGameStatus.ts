import { useCallback, useEffect, useState } from "react"


export const useGameStatus = (rowsCleared: number) => {
  const [score, setScore] = useState<number>(0)
  const [rows, setRows] = useState<number>(0)
  const [level, setLevel] = useState<number>(0)

  const linePoints = [40, 100, 300, 1200]

  const calcScore = useCallback(() => {
    // we have score
    if (rowsCleared > 0) {
      // the orig score calced
      setScore(prev => prev + linePoints[rowsCleared - 1] * (level + 1))
      setRows(prev => prev + rowsCleared)
    }
  }, [level, linePoints, rowsCleared])

  useEffect(() => {
    calcScore();
  }, [calcScore, rowsCleared, score])

  return [score, setScore, rows, setRows, level, setLevel] as const
}