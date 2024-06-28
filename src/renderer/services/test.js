import { api } from '../configs/axiosConfig'

export const useGetTestData = async () => {
  const { data } = await api.get('https://jsonplaceholder.typicode.com/todos')
  return data
}
