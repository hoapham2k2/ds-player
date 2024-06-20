import GetApplicationPath from './getApplicationPath'

export const InitialApplicationFileAsync = async () => {
  try {
    // Add your code here

    const applicatonPath = GetApplicationPath()
  } catch (error) {
    console.error('Error in InitialApplicationFileAsync: ', error)
  }
}

export default InitialApplicationFileAsync
