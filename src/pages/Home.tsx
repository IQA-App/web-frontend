import { FC } from 'react'
import img from '../assets/budget_icon.png' // Replace with a relevant budget icon

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
				<button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-500 transition mb-4">
					Get Started
				</button>
				<button className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-500 transition">
					Learn More
				</button>
			</div>
		</div>
	)
}
