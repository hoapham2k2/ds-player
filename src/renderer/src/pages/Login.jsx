import { useState, useEffect } from 'react';

export const LoginPage = () => {
    const [OTPCode, setOTPCode] = useState('');

    useEffect(() => {
        // Function to fetch OTP
        const fetchOTP = () => {
            window.api.getOTP().then((otp) => {
                console.log('OTP Code: ', otp);
                setOTPCode(otp);
            });
        };

        // Fetch OTP immediately on mount
        fetchOTP();

        // Set interval to fetch OTP every 30 seconds
        const interval = setInterval(fetchOTP, 30000);

        // Cleanup interval on unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h1>Login Page</h1>
            <h2>OTP Code: {OTPCode}</h2>
        </div>
    );
};

export default LoginPage;
