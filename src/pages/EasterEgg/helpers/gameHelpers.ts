import { IPlayer, IPos } from "../types/types"

export const STAGE_WIDTH = 12
export const STAGE_HEIGHT = 20

export const createStage = (): (number | string)[][] => Array.from(Array(STAGE_HEIGHT), () => new Array(STAGE_WIDTH).fill([0, 'clear']))
//   {
//   const r =  Array.from(Array(STAGE_HEIGHT), () => new Array(STAGE_WIDTH).fill([0, 'clear']));
//   console.log(`6aaa`, r)
//   return r;
// }

export const checkCollision = (player: IPlayer, stage: (number | string )[][], {x: moveX, y: moveY}: IPos) => {
  for (let y = 0; y < player.tetromino.length; y++) {
    for (let x = 0; x < player.tetromino[y].length; x++) {
      // check we are actual T cell
      if (player.tetromino[y][x] !== 0) {
        if (// check if moving inside the stage y
        !stage[y + player.pos.y + moveY] || 
        // check if moving inside the stage x
        ! stage[y + player.pos.y + moveY][x + player.pos.x + moveX ] ||
        // check if the next cell is not set to 'clear'
        stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear') {
          return true
        }
 
      }
    }
  }
}
