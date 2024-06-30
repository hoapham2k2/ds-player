import { api } from '../configs/axiosConfig'

export const useGetTestData = async () => {
  const { data } = await api.get('https://jsonplaceholder.typicode.com/todos')
  return data
}



export const useGetMediaFolder = async () => {
  const data = await window.api.getMediaFolder()
  console.log(JSON.parse(data))
  return JSON.parse(data)
}

export const useGetContentItems = async () => {
  const data = await window.api.getContentItems()
  console.log(JSON.parse(data))
  return JSON.parse(data)
}