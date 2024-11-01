type DateFormatOptions = {
	year?: 'numeric' | '2-digit'
	month?: 'long'
	day?: 'numeric'
}

export const formatDate = (dateString: string): string => {
	const date: Date = new Date(dateString)
	const options: DateFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}
	return date.toLocaleDateString('en-US', options)
}
