import {
	createContext,
	useEffect,
	useState,
	ReactNode,
	useContext
} from 'react'

import { api } from '../services/api'

interface Transaction {
	id: number
	title: string
	amount: number
	type: string
	category: string
	creatAt: string
}

type TransactionInput = Omit<Transaction, 'id' | 'creatAt'>

interface TransactionProviderProps {
	children: ReactNode
}

interface TransactionsContextData {
	transactions: Transaction[]
	createTransaction: (transaction: TransactionInput) => Promise<void>
}

const TransactionsContext = createContext<TransactionsContextData>(
	{} as TransactionsContextData
)

export function TransactionsProvider({ children }: TransactionProviderProps) {
	// criar um estado de transações para exibir os dados salvos
	// O estado irá um array de Transaction
	const [transactions, setTransactions] = useState<Transaction[]>([])

	// Busca as transações digitadas para salvá-las dentro da aplicaçõo
	useEffect(() => {
		api
			.get('transactions')
			.then(response => setTransactions(response.data.transactions))
	}, [])

	async function createTransaction(transactionInput: TransactionInput) {
		const response = await api.post('/transactions', {
			...transactionInput,
			creatAt: new Date()
		})
		const { transaction } = response.data

		setTransactions([...transactions, transaction])
	}

	return (
		<TransactionsContext.Provider value={{ transactions, createTransaction }}>
			{children}
		</TransactionsContext.Provider>
	)
}

export function useTransactions() {
	const context = useContext(TransactionsContext)

	return context
}
