import { FC } from 'react'
import img from '../assets/budget_icon.png' // Replace with a relevant budget icon
import { Link } from 'react-router-dom'

export const Home: FC = () => {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
			<h1 className="text-4xl font-extrabold text-white mb-4">
				Budget Tracker
			</h1>
			<p className="text-lg text-white text-center max-w-lg mb-8">
				Keep track of your spending, manage your budget, and achieve your
				financial goals with ease.
			</p>
			<img
				className="w-1/3 md:w-1/4 rounded-full shadow-md mb-8"
				src={img}
				alt="Budget Icon"
			/>

			<div className="flex flex-col items-center">
				<Link
					to={'/transactions'}
					className="mt-2 rounded-md bg-sky-500 px-6 py-2 hover:bg-sky-600"
				>
					Get Started
				</Link>
				<Link
					to={'/get-started'}
					className="mt-2 rounded-md bg-gray-500 px-6 py-2 hover:bg-gray-600"
				>
					Learn More
				</Link>
			</div>
		</div>
	)
}
