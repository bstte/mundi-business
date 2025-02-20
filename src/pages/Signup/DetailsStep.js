// DetailsStep.jsx
import React from "react";

const DetailsStep = ({ userDetails, setUserDetails, prevStep }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add signup submission logic here
    console.log("User Details:", userDetails);
  };

  return (
    <div > 
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.heading}>Sign Up</h2>
      <label style={styles.label}>First Name:</label>
      <input
        type="text"
        name="firstName"
        value={userDetails.firstName}
        onChange={handleChange}
        required
        style={styles.input}
      />
      <label style={styles.label}>Last Name:</label>
      <input
        type="text"
        name="lastName"
        value={userDetails.lastName}
        onChange={handleChange}
        required
        style={styles.input}
      />
      <label style={styles.label}>Phone Number:</label>
      <input
        type="text"
        name="phoneNumber"
        value={userDetails.phoneNumber}
        onChange={handleChange}
        required
        style={styles.input}
      />
      <label style={styles.label}>Password:</label>
      <input
        type="password"
        name="password"
        value={userDetails.password}
        onChange={handleChange}
        required
        style={styles.input}
      />
      <div style={styles.buttonContainer}>
        <button type="button" onClick={prevStep} style={styles.button}>
          Back
        </button>
        <button type="submit" style={styles.button}>
          Sign Up
        </button>
      </div>
    </form>
    </div>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  heading: {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: '5px',
    fontSize: '14px',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default DetailsStep;
