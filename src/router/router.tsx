import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '../pages/Layout'
import { ErrorPage } from '../pages/ErrorPage'
import { Home } from '../pages/Home'
import {
	transactionAction,
	transactionLoader,
	Transactions,
} from '../pages/Transactions'
import {
	Categories,
	categoriesAction,
	categoryLoader,
} from '../pages/Categories'
import { Auth } from '../pages/Auth'
import { ProtectedRoute } from '../components/ProtectedRoute'
import Tetris from '../pages/EasterEgg/Tetris'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: 'transactions',
				loader: transactionLoader,
				action: transactionAction,
				element: (
					<ProtectedRoute>
						<Transactions />
					</ProtectedRoute>
				),
			},
			{
				path: 'categories',
				action: categoriesAction,
				loader: categoryLoader,
				element: (
					<ProtectedRoute>
						<Categories />
					</ProtectedRoute>
				),
			},
			{
				path: 'auth',
				element: <Auth />,
			},
		],
	},
	{
		path: 'get-started',
		element: <Tetris />,
	},
])
