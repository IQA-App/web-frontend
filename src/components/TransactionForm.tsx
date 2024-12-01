import { ChangeEvent, FC, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Form, useLoaderData, useSubmit } from 'react-router-dom'
import {
	IResponseTransactionLoader,
	ITransactionPageData,
} from '../types/types'
import CategoryModal from './CategoryModal'
import { FieldValues, useForm } from 'react-hook-form'



const TransactionForm: FC = () => {
	const { categories } = useLoaderData() as IResponseTransactionLoader
	const [visibleModal, setVisibleModal] = useState<boolean>(false)

	const [formData, setFormData] = useState<ITransactionPageData>({
		title: '',
		amount: '',
		category: categories[0].id,
		type: 'income',
	})

	const {
		register,
		handleSubmit,
		clearErrors,
		formState: { errors },
	} = useForm({
		defaultValues: {
			title: '',
			amount: '',
			category: formData.category || +categories[0].id,
			type: formData.type || 'income',
		},
		mode: 'onSubmit',
		reValidateMode: 'onSubmit',
	})

	const submit = useSubmit()
	const onFormSubmit = (formData: ITransactionPageData) => {
    console.log(formData)
		submit(formData, { method: 'POST' })
		setFormData({
			title: '',
			amount: '',
			category: formData.category || +categories[0].id,
			type: formData.type || 'income',
		})
	}

	const handleInputChange = (e: ChangeEvent<FieldValues>) => {
		const { name, value } = e.target
		clearErrors(name)
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	return (
		<div className="rounded-md bg-slate-800 p-4">
			<span className='text-lg'>Enter your transaction:</span>
			<Form
				className="grid gap-2"
				method="post"
				action="/transactions"
				onSubmit={handleSubmit(onFormSubmit)}
			>
				<label className="grid" htmlFor="title">
					<span className='mt-3'>Title <span className='text-red-500'>{errors.title?.message && errors.title.message}</span></span>
					<input
						type="text"
						className="input border-slate-700"
						placeholder="Title..."
						name="title"
						value={formData.title}
						autoFocus
						{...register('title', {
							required: 'The title is required',
							validate: {
								minLength: (value) =>
									value.length >= 5 || 'The title is too short',
								maxLength: (value) =>
									value.length <= 20 || 'The title is too long',
							},
						})}
            onChange={handleInputChange}
					/>
				</label>
				<label className="grid" htmlFor="amount">
					<span className='mt-3'>Amount <span className='text-red-500'>{errors.amount?.message && errors.amount.message}</span></span>
					<input
						type="text"
						className="input border-slate-700"
						placeholder="Amount..."
						name="amount"
						value={formData.amount}
						{...register('amount', {
							required: 'The amount is required',
							pattern: {
								value: /^(?=.)([+-]?([0-9]*)(\.([0-9]+))?)$/,
								message: 'Wrong number format',
							},
							validate: {
								positive: (value) =>
									+value > 0 || 'The amount cannot be negative or zero',
							},
						})}
						onChange={handleInputChange}
					/>
				</label>
				{/* Select */}
				{categories.length ? (
					<label htmlFor="category" className="grid">
						<span className='mt-3'>Category</span>
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
							{...register('type', {
								required: 'The type is required',
							})}
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
							{...register('type', {
								required: 'The type is required',
							})}
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
