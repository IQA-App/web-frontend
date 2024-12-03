import { FC } from 'react'
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts'

const COLORS = ['#FF7388', '#00C49F']

interface IChart {
	totalIncome: number
	totalExpense: number
}

interface IData {
	value: number
	name: string
}

export const Chart: FC<IChart> = ({ totalIncome, totalExpense }) => {
	const data = new Array<IData>(
		{
			value: +totalExpense,
			name: 'Expense',
		},
		{
			value: +totalIncome,
			name: 'Income',
		},
	)

	return (isNaN(Number(totalIncome)) || isNaN(Number(totalExpense))) ? (
    <div className='text-red-500 text-lg text-center font-bold'>Uh-oh! Chart data is unavailable</div>
  ) : (
		<PieChart width={240} height={240}>
      <Pie
        data={data}
        cx={'50%'}
        cy={'50%'}
        innerRadius={60}
        outerRadius={80}
        fill="#8884D8"
        paddingAngle={2}
        dataKey="value"
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend />
      <Tooltip />
    </PieChart>
	)
}
