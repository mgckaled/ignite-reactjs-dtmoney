import React from 'react'
import ReactDOM from 'react-dom/client'
import { createServer, Model } from 'miragejs'
import { App } from './App'

createServer({
	// banco de dados interno do Miragejs
	models: {
		transaction: Model
	},

	seeds(server) {
		server.db.loadData({
			transactions: [
				{
					id: 1,
					title: 'Freelance de Website',
					type: 'deposit',
					category: 'Dev',
					amount: 6000,
					creatAt: new Date('2022-02-06 09:00')
				},
				{
					id: 2,
					title: 'Aluguel',
					type: 'withdraw',
					category: 'Casa',
					amount: 1100,
					creatAt: new Date('2022-02-10 09:00')
				}
			]
		})
	},

	routes() {
		this.namespace = 'api'

		// quando houver requisição do tipo get (busca / listagem)
		this.get('/transactions', () => {
			// retorna todas as transações dentro do banco de dados
			return this.schema.all('transaction')
		})

		this.post('/transactions', (schema, request) => {
			const data = JSON.parse(request.requestBody)

			// retorna um banco de dados (simulado pelo MirageJS)
			// o 1º param é o modelo de banco de dados MirageJS
			// 2º param: quais são os dados que serão passados para dentro do Model
			return schema.create('transaction', data)
		})
	}
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)
