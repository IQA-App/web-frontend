import { FC, useEffect, useMemo, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { Form, useLoaderData } from 'react-router-dom'
import { IResponseTransactionLoader, ISortConfig, ISortDirection, ITransaction } from '../types/types'
import { formatDate } from '../helpers/date.helper'
import { formatToUSD } from '../helpers/currency.helper'
import ReactPaginate from 'react-paginate'
import SortIcon from './SortIcon'
import { instance } from '../api/axios.api'

interface ITransactionTable {
	limit: number
}

const TransactionTable: FC<ITransactionTable> = ({ limit = 3 }) => {
	const { transactions } = useLoaderData() as IResponseTransactionLoader
	const [data, setData] = useState<ITransaction[]>([])
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [totalPages, setTotalPages] = useState<number>(0)

  // this is a temporary crutch until 'findAll' is modified on the backend
  const [tempData, setTempData] = useState<ITransaction[]>([])
  const fetchTransactions = async () => {
    const response = await instance.get<ITransaction[]>(`transactions/pagination?page=&limit=${1000}`)
    setTempData(response.data)
	}
  useEffect(() => {
    fetchTransactions()
  }, [transactions])

  const paginateTransactions = async (transactionList: ITransaction[]) => {
		const displayedArray = transactionList.slice(
			(currentPage - 1) * limit,
			currentPage === totalPages ? transactionList.length : currentPage * limit,
		)
		setData(displayedArray)
		setTotalPages(Math.ceil(transactionList.length / limit))
	}

	const handlePageChange = (selectedItem: { selected: number }) => {
		setCurrentPage(selectedItem.selected + 1)
	}

	const useSortableData = (items: ITransaction[]) => {
		const [sortConfig, setSortConfig] = useState<ISortConfig>({
			key: 'createdAt',
			direction: 'UNSORTED',
		})
		const sortedList = useMemo(() => {
			const sortedList = [...items]
			sortedList.sort((a, b) => {
				if (a[sortConfig.key] && b[sortConfig.key] && sortConfig.direction !== 'UNSORTED') {
					const re = /^(?=.)(([0-9]*)(\.([0-9]+))?)$/
					let c = a[sortConfig.key]
					let d = b[sortConfig.key]
					if (sortConfig.key === 'category') {
						c = a[sortConfig.key]['title']
						d = b[sortConfig.key]['title']
					}
					if (re.test(c.toString()) && re.test(d.toString())) {
						c = Number(c)
						d = Number(d)
					}
					if (c < d) {
						return sortConfig.direction === 'ASC' ? -1 : 1
					}
					if (c > d) {
						return sortConfig.direction === 'ASC' ? 1 : -1
					}
				}
				return 0
			})
			return sortedList
		}, [sortConfig, items])

		const requestSort = (key: keyof ITransaction) => {
			let direction: ISortDirection = 'ASC'
			if (
				sortConfig.direction === 'ASC'
			) {
				direction = 'DESC'
			}
			if (
				sortConfig.direction === 'DESC'
			) {
				direction = 'UNSORTED'
			}
			setSortConfig({ key, direction })
		}
		return { requestSort, sortedList, sortConfig }
	}

	const { sortedList, requestSort, sortConfig } = useSortableData(tempData)

	useEffect(() => {
		paginateTransactions(sortedList)
	}, [currentPage, transactions, sortedList])

	const getDirectionFor = (name: string) => {
		return sortConfig.key === name ? sortConfig.direction : 'UNSORTED'
	}

  return (
		<>
			<ReactPaginate
				className="flex gap-3 justify-end mt-4 items-center"
				activeClassName="bg-blue-600 rounded-sm"
				pageLinkClassName="text-white text-xs py-1 px-2 rounded-sm"
				previousClassName="text-white py-1 px-2 bg-slate-800 rounded-sm text-xs"
				nextClassName="text-white py-1 px-2 bg-slate-800 rounded-sm text-xs"
				disabledClassName="text-white/50 cursor-not-allowed"
				disabledLinkClassName="text-slate-600 cursor-not-allowed"
				pageCount={totalPages}
				pageRangeDisplayed={1}
				marginPagesDisplayed={2}
				onPageChange={handlePageChange}
			/>
			<div className="bg-slate-800 px-4 py-3 mt-4 rounded-md">
				<table className="w-full">
					<thead>
						<tr>
							<td className="font-bold" width={'5%'}>#</td>
              <td className="font-bold" width={'25%'}>
									<div className="flex items-center">
										<span onClick={() => requestSort('title')}>
											<SortIcon direction={getDirectionFor('title')} />
										</span>
										Title
									</div>
								</td>
							<td className="font-bold" width={'15%'}>Amount</td>
              <td className="font-bold" width={'20%'}>
									<div className="flex items-center">
										<span onClick={() => requestSort('category')}>
											<SortIcon direction={getDirectionFor('category')} />
										</span>
										Category
									</div>
								</td>
								<td className="font-bold" width={'20%'}>
									<div className="flex items-center">
										<span onClick={() => requestSort('createdAt')}>
											<SortIcon direction={getDirectionFor('createdAt')} />
										</span>
										Date
									</div>
								</td>
							<td className="text-right" width={'5%'}>Action</td>
						</tr>
					</thead>
					<tbody>
          {data.length ? (
							data.map((transaction, idx) => (
								<tr key={idx}>
									<td>{idx + 1}</td>
									<td>{transaction.title}</td>
									<td
										className={
											transaction.type === 'income'
												? 'text-green-500'
												: 'text-red-500'
										}
									>
										{transaction.type === 'income' ? '+ ' : '- '}
										{formatToUSD.format(transaction.amount)}
									</td>
									<td>{transaction.category?.title || (<span className='italic normal-case text-red-300'>No category assigned</span>)}</td>
									<td>{formatDate(transaction.createdAt)}</td>
									<td className="">
										<Form
											className="flex"
											method="delete"
											action="/transactions"
										>
											<input type="hidden" name="id" value={transaction.id} />
											<button className="btn hover:btn-red ml-auto">
												<FaTrash />
											</button>
										</Form>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={6}>
									<h6 className="mt-4 text-lg normal-case text-red-300 text-center">
										No transactions here yet
									</h6>
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</>
	)
}

export default TransactionTable
