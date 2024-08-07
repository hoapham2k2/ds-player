import { useState, useEffect } from 'react'
import { SlScreenDesktop } from 'react-icons/sl'
export const LoginPage = () => {
  const [OTPCode, setOTPCode] = useState('')
  const [MACAddress, setMACAddress] = useState('')
  const [IP, setIP] = useState('')

  useEffect(() => {
    const fetchOTP = async () => {
      await window.api.getOTP().then((otp) => {
        console.log('OTP Code: ', otp)
        setOTPCode(otp)
      })
    }
    fetchOTP()
    const interval = setInterval(fetchOTP, 30000)

    const fetchMACAddress = () => {
      window.api.getMACAddress().then((mac) => {
        console.log('MAC Address: ', mac)
        setMACAddress(mac)
      })
    }
    fetchMACAddress()

    const fetchIP = async () => {
      await window.api.getIP().then((ip) => {
        console.log('IP Address: ', ip)
        setIP(ip)
      })
    }
    fetchIP()

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="w-full h-full flex flex-row items-center justify-center bg-gray-100 ">
      <div className="w-2/5 h-full flex flex-row items-center justify-center">
        <SlScreenDesktop className="w-1/2 h-auto " />
      </div>
      <div className="flex-1  h-5/6 flex flex-col items-center justify-evenly gap-3">
        <h1 className="text-3xl font-bold ">New screen Paring </h1>
        <div className="flex flex-col  items-center  justify-evenly w-4/6 h-3/5 py-10">
          <div
            className="w-full py-10 border border-solid
          border-gray-400 rounded-lg flex items-center justify-center text-8xl  ellipsis font-bold "
          >
            {OTPCode}
          </div>
          <div className="w-4/6 flex flex-row items-center justify-between">
            <div className="flex flex-row gap-1 items-center">
              <p className=" text-gray-500">MAC:</p>
              <p className="font-semibold">{MACAddress}</p>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <p className="text-sm text-gray-500">IP:</p>
              <p className="font-semibold ">{IP}</p>
            </div>
          </div>
        </div>
        <footer>
    
          <p className="text-sm text-gray-500">To pair a new screen, please follow theses steps:</p>
          <ol className="list-decimal list-inside text-left text-sm text-gray-500">
            <li>Connect the screen to a power source and turn it on.</li>
            <li>Connect the screen to the internet using an Ethernet cable or Wi-Fi.</li>
            <li>Enter the OTP code displayed on the screen in the input field below.</li>
          </ol>
        </footer>
      </div>
    </div>
  )
}

export default LoginPage
