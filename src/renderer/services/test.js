import { api } from '../configs/axiosConfig'

export const useGetTestData = async () => {
  const { data } = await api.get('https://jsonplaceholder.typicode.com/todos')
  return data
}

export const useGetMediaFolder = async () => {
  await window.api.getMediaFolder().then((data) => {
    return data
  })
}

export const useGetContentItems = async () => {
  await window.api.getContentItems().then((data) => {
    return data
  })
}
