import { FormEvent, useState } from 'react'
import Modal from 'react-modal'

import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'

import { Container, TransactionTypeContainer, RadioBox } from './styles'
import { useTransactions } from '../../hooks/useTransactions'

// Definição dos tipos de dados da propriedades do Modal
interface NewTransactionModalProps {
	isOpen: boolean
	onRequestClose: () => void
}

// funcção principal do Componente
export function NewTransactionModal({
	isOpen,
	onRequestClose
}: NewTransactionModalProps) {
	const { createTransaction } = useTransactions()
	// inicialização dos estados para cada um elemento armazenado pelo formulário
	// Os valores de estado do componentes precisam corresponder ao tipo de dado da informação que será armazena através do formulário
	const [title, setTitle] = useState('')
	const [amount, setAmount] = useState(0)
	const [category, setCategory] = useState('')

	// definição do estado dos botões RadioBox (entrada e saída)
	const [type, setType] = useState('')

	// f: coletar dados do formulários e transferi-los para tabela
	// o FormEvent é uma interface localizada no pacote 'react'
	async function handleCreateNewTrasaction(event: FormEvent) {
		event.preventDefault()

		await createTransaction({
			title,
			amount,
			category,
			type
		})

		// Reset dos dados da 'Nova Transação'
		setTitle('')
		setAmount(0)
		setCategory('')
		setType('')

		// Fechar o modal ao cadastrar um trasação
		onRequestClose()
	}

	return (
		// Estilização, propriedades e parâmetros do Modal
		<Modal
			isOpen={isOpen} // boollean
			onRequestClose={onRequestClose} // void
			overlayClassName="react-modal-overlay" // classe externa do styled-componentes
			className="react-modal-content" // classe referente ao conteúdo do modal
		>
			<button // btn close modal
				type="button"
				onClick={onRequestClose}
				className="react-modal-close"
			>
				<img src={closeImg} alt="Fechar modal" />
			</button>

			{/* toda vez que o form for submetido, irá executar a função (onSubmit) */}
			<Container onSubmit={handleCreateNewTrasaction}>
				<h2>Cadastrar Transação</h2>

				<input
					placeholder="Título"
					value={title}
					onChange={event => setTitle(event.target.value)} // coleta o valor digitado no input. Toda vez o valor do input muda, é salva dentro do setTitle
				/>
				<input
					type="number"
					placeholder="Valor"
					value={amount}
					onChange={event => setAmount(Number(event.target.value))} // dados number
				/>

				{/* botões de entrada e saída estilizados conforme seleção */}
				<TransactionTypeContainer>
					{/* marcação do rbox de 'Entrada' */}
					<RadioBox
						type="button"
						onClick={() => setType('deposit')}
						isActive={type === 'deposit'}
						activeColor="green"
					>
						<img src={incomeImg} alt="Entraga" />
						<span>Entrada</span>
					</RadioBox>

					{/* marcação do rbox de 'saída' */}
					<RadioBox
						type="button"
						onClick={() => setType('withdraw')}
						isActive={type === 'withdraw'}
						activeColor="red"
					>
						<img src={outcomeImg} alt="Saída" />
						<span>Saída</span>
					</RadioBox>
				</TransactionTypeContainer>

				<input
					placeholder="Categoria"
					value={category}
					onChange={event => setCategory(event.target.value)}
				/>
				<button type="submit">Cadastrar</button>
			</Container>
		</Modal>
	)
}
