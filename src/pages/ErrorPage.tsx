import { FC } from 'react'
import { Link } from 'react-router-dom'
import img from '../assets/page-not-found.png'

export const ErrorPage: FC = () => {
	return (
		<div className="min-h-screen bg-slate-900 font-roboto text-white flex justify-center items-center flex-col gap-10">
			<img src={img} className="w-[30%]" alt="Page Not Found" />
			<Link
				to={'/'}
				className="rounded-md bg-sky-500 px-6 py-2 hover:bg-sky-600"
			>
				Back
			</Link>
		</div>
	)
}
