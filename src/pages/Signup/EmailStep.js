import React, { useState } from "react";
import "./Signup.css";
import 'bootstrap/dist/css/bootstrap.css';
import ApiService from "../../API/ApiService";

const EmailStep = ({ email, setEmail, nextStep }) => {
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before request
  
    try {
      const data = { email: email };
      nextStep();

      const response = await ApiService.SendVerificationCode(data);
      console.log("response", response.data);
  
      if (response.data.success === true) {
        nextStep();
      }
    } catch (error) {
      console.error("Email verify error", error);
  
      // Check if error response exists and has a message
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message); // Set error message from API response
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };
  

  return (
    <div className="ss_log_mn_div">
      <div class="row">
      <div class="col-xl-4 col-lg-5 col-md-6">
        <div class="ss_sign_frm_div">
        <div class="ss_hed_logo_div"><a href="/" data-discover="true"><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-10 h-10"><rect width="40" height="40" rx="8" fill="#1E3A8A"></rect><path d="M20 8L32 20L20 32L8 20L20 8Z" fill="#60A5FA" fill-opacity="0.8"></path><path d="M20 12L28 20L20 28L12 20L20 12Z" fill="#2563EB" fill-opacity="0.9"></path><circle cx="20" cy="20" r="4" fill="#FFFFFF"></circle></svg><span>MundiBusiness</span></a></div>
        <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <div><input
          type="email" placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          
        /></div>
                      {error && <p style={{ color: "red" }}>{error}</p>} {/* Show error if exists */}

        <button type="submit">Get OTP</button>
      </form>
        </div>
     
      </div>
      </div>
      
    </div>
  );
};



export default EmailStep;
