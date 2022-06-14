import axios from 'axios'

export const api = axios.create({
  // endereço que será usado em todas as autenticações
	baseURL: 'http://localhost:3000/api',

})