import React, { useState } from 'react';
import "./Signup.css";
import 'bootstrap/dist/css/bootstrap.css';
import ApiService from '../../API/ApiService';

const OtpStep = ({ email, nextStep, prevStep }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']); // 6 boxes ke liye state
  const [error, setError] = useState('');

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setError('');

      // Move focus to next input
      if (value && index < 5) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  // Handle Paste Event
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim(); // Get pasted value
    if (/^\d{6}$/.test(pasteData)) { // Check if it is exactly 6 digits
      setOtp(pasteData.split("")); // Distribute each digit into the input boxes
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
  
    if (otpValue.length < 6) {
      setError('Please enter the complete 6-digit OTP.');
      return;
    }
  
    try {
      const data = { email: email, code: otpValue };
      nextStep();

      const response = await ApiService.VerifyCode(data);
      console.log("response", response.data.success);
  
      if (response.data.success === true) {
        nextStep();
      }
    } catch (error) {
      console.error("OTP verification error:", error);
  
      // API se error ka response properly handle karein
      if (error.response) {
        // Server ne response diya (4xx, 5xx)
        console.error("Error Response:", error.response.data);
        setError(error.response.data.message || "Invalid OTP. Please try again.");
      } else if (error.request) {
        // Request gaya, par response nahi aaya
        console.error("No response received:", error.request);
        setError("No response from server. Please try again.");
      } else {
        // Koi aur error hui hai
        console.error("Error:", error.message);
        setError("Something went wrong. Please try again.");
      }
    }
  };
  
  return (
    <div className="ss_log_mn_div">
      <div className="row">
        <div className="col-xl-4 col-lg-5 col-md-6">
          <div className="ss_sign_frm_div">
            <div className="ss_hed_logo_div">
              <a href="/" data-discover="true">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
                  <rect width="40" height="40" rx="8" fill="#1E3A8A"></rect>
                  <path d="M20 8L32 20L20 32L8 20L20 8Z" fill="#60A5FA" fillOpacity="0.8"></path>
                  <path d="M20 12L28 20L20 28L12 20L20 12Z" fill="#2563EB" fillOpacity="0.9"></path>
                  <circle cx="20" cy="20" r="4" fill="#FFFFFF"></circle>
                </svg>
                <span>MundiBusiness</span>
              </a>
            </div>
            <form onSubmit={handleSubmit}>
              <p>OTP has been sent to: {email}</p>
              <div className="ss_opt_input">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste} // Allow paste functionality
                    maxLength="1"
                    className="otp-box"
                  />
                ))}
              </div>
              {error && <p className="error-text">{error}</p>}
              <div>
                <button type="submit">Verify OTP</button>
                <button type="button" className="ss_back_btn" onClick={prevStep}>
                  Back
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right ml-2 h-4 w-4">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpStep;
