import {FC} from 'react'
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa'

interface ISortIcon {
	direction: string
}

const SortIcon: FC<ISortIcon> = ({direction}) => {
  switch (direction) {
    case 'ASC':
      return <FaSortUp />
    case 'DESC': 
      return <FaSortDown />
    default:
      return <FaSort />
  }
}

export default SortIcon