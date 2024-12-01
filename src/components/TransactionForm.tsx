import { FC, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Form, useLoaderData } from 'react-router-dom'
import { IResponseTransactionLoader, ITransactionPageData } from '../types/types'
import CategoryModal from './CategoryModal'

const TransactionForm: FC = () => {
	const { categories } = useLoaderData() as IResponseTransactionLoader
	const [visibleModal, setVisibleModal] = useState<boolean>(false)

  const [formData, setFormData] = useState<ITransactionPageData>({ // check if needed
    title: '',
    amount: '',
    category: categories[0].id,
    type: 'income',
});    

const handleInputChange = (e) => {
  const { name, value } = e.target; 
  setFormData(prev => ({
      ...prev,
      [name]: value,
  }));
};

const onFormSubmit = () => {
  setFormData({
    title: '',
    amount: '',
    category: formData.category || +categories[0].id,
    type: formData.type || 'income',
  })
}

	return (
		<div className="rounded-md bg-slate-800 p-4">
			Enter your transaction:
			<Form className="grid gap-2" method="post" action="/transactions" onSubmit={onFormSubmit}>
				<label className="grid" htmlFor="title">
					<span>Title</span>
					<input
						type="text"
						className="input border-slate-700"
						placeholder="Title..."
						name="title"
            value={formData.title}
            autoFocus
						required
            onChange={handleInputChange}
					/>
				</label>
				<label className="grid" htmlFor="amount">
					<span>Amount</span>
					<input
						type="text"
						className="input border-slate-700"
						placeholder="Amount..."
						name="amount"
            value={formData.amount}
						required
            onChange={handleInputChange}
					/>
				</label>
				{/* Select */}
				{categories.length ? (
					<label htmlFor="category" className="grid">
						<span>Category</span>
						<select className="input border-slate-700" name="category" required>
							{categories.map((category, idx) => (
								<option key={idx} value={category.id}>
									{category.title}
								</option>
							))}
						</select>
					</label>
				) : (
					<h1 className="mt-1 text-red-300">Create a new category</h1>
				)}

				<button
					type="button"
					onClick={() => setVisibleModal(true)}
					className="max-w-fit flex items-center gap-2 text-white/50 hover:text-white"
				>
					<FaPlus />
					<span>Manage categories:</span>
				</button>
				{/* radio buttons */}
				<div className="flex gap-4 items-center">
					<label className="flex cursor-pointer items-center gap-2">
						<input
							type="radio"
							name="type"
							value={'income'}
              checked={'income' === formData.type}
							className="form-radio text-blue-600"
              onChange={handleInputChange}
              />
						<span>Income</span>
					</label>
					<label className="flex cursor-pointer items-center gap-2">
						<input
							type="radio"
							name="type"
							value={'expense'}
              checked={'expense' === formData.type}
							className="form-radio text-blue-600"
              onChange={handleInputChange}
              />
						<span>Expense</span>
					</label>
				</div>
				{/* Submit button */}
				<button className="btn btn-green max-w-fit mt-2" type="submit">
					Submit
				</button>
			</Form>
			{/* Add transaction modal*/}
			{visibleModal && (
				<CategoryModal type="post" setVisibleModal={setVisibleModal} />
			)}
		</div>
	)
}

export default TransactionForm
