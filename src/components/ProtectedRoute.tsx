import { FC } from 'react'
import { useAuth } from '../hooks/useAuth'
import img from '../assets/cat.jpg'

interface Props {
	children: JSX.Element
}

export const ProtectedRoute: FC<Props> = ({ children }) => {
	const isAuth = useAuth()
	return (
		<>
			{isAuth ? (
				children
			) : (
				<div className="mt-20 flex flex-col items-center justify-center gap-8">
					<h1 className="text-2xl">To view this page you must be logged in.</h1>
					<img className="w-1/2 mt-8" src={img} alt="img cat" />
				</div>
			)}
		</>
	)
}
