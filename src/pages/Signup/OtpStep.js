import React, { useState } from 'react';

const OtpStep = ({ email, nextStep, prevStep }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setError('');

      // Move focus to next input
      if (value && index < 3) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');

    if (otpValue.length < 4) {
      setError('Please enter the complete 4-digit OTP.');
      return;
    }

    // Proceed to next step
    nextStep();
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <p>OTP has been sent to: {email}</p>
        <div style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              maxLength="1"
              style={styles.input}
            />
          ))}
        </div>
        {error && <p style={styles.error}>{error}</p>}
        <div style={styles.buttonContainer}>
          <button type="button" onClick={prevStep} style={styles.button}>
            Back
          </button>
          <button type="submit" style={styles.button}>
            Verify OTP
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  },
  otpContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px 0',
  },
  input: {
    width: '2rem',
    height: '2rem',
    margin: '0 0.5rem',
    fontSize: '1.5rem',
    textAlign: 'center',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '200px',
  },
  button: {
    padding: '10px 20px',
    margin: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '10px',
  },
};

export default OtpStep;
