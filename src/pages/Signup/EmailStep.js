import React from "react";

const EmailStep = ({ email, setEmail, nextStep }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // यहां ओटीपी भेजने की लॉजिक जोड़ें
    nextStep();
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Get OTP</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5', // हल्का ग्रे बैकग्राउंड
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff', // सफेद बैकग्राउंड
  },
  label: {
    marginBottom: '0.5rem',
    fontSize: '1rem',
    color: '#333333',
  },
  input: {
    padding: '0.5rem',
    marginBottom: '1rem',
    border: '1px solid #cccccc',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  button: {
    padding: '0.75rem',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff', // नीला बटन
    color: '#ffffff',
    fontSize: '1rem',
    cursor: 'pointer',
  },
};

export default EmailStep;
