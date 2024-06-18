const generateOTP = async () => {
  return new Promise((resolve, reject) => {
    try {
      const otp = Math.floor(100000 + Math.random() * 900000)
      resolve(otp)
    } catch (error) {
      reject(error)
    }
  })
}

export default generateOTP
