import React, { useEffect } from "react";
import "./Signup.css";
import 'bootstrap/dist/css/bootstrap.css';
import ApiService from "../../API/ApiService";
import { useNavigate } from "react-router-dom";

const DetailsStep = ({ userDetails, setUserDetails, email }) => {

  useEffect(() => {
    if (email) {
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        email: email,  
      }));
    }
  }, [email,setUserDetails]); 


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  console.log(userDetails)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await ApiService.signup(userDetails);
      console.log("Response:", response);

      if (response.data.success === true) {
        navigate('/login', { replace: true });
      }
    } catch (error) {
      console.error("Email verify error", error);
      alert("Something went wrong. Please try again.");
    }

    console.log("User Details:", userDetails);
  };

  return (
    <div className="ss_log_mn_div ss_signup_page">
      <div className="row">
        <div className="col-xl-6 col-lg-6 col-md-6">
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
              <h2>Create a New Account</h2>
              <p className="ss_signin_para">Already have an account? <button>Sign in</button></p>

              <div className="ss_signup_frmgrp_div">
                <ul>
                  <li>
                    <label>First Name:</label>
                    <input
                      type="text"
                      name="firstName"
                      value={userDetails.firstName}
                      onChange={handleChange}
                      required
                    />
                  </li>
                  <li>
                    <label>Last Name:</label>
                    <input
                      type="text"
                      name="lastName"
                      value={userDetails.lastName}
                      onChange={handleChange}
                      required
                    />
                  </li>
                </ul>
              </div>

              <div className="ss_signup_frmgrp_div">
                <ul>
                  <li>
                    <label>Phone Number:</label>
                    <input
                      type="text"
                      name="phone"
                      value={userDetails.phone}
                      onChange={handleChange}
                      required
                    />
                  </li>
                  <li>
                    <label>Email Address:</label>
                    <input
                      type="email"
                      name="email"
                      value={userDetails.email}
                      onChange={handleChange}
                      readOnly
                    />
                  </li>
                </ul>
              </div>

              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={userDetails.password}
                onChange={handleChange}
                required
              />

              <div>
                <button type="submit">Sign Up</button>
                {/* <button className="ss_back_btn" type="button" onClick={prevStep}>Back</button> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsStep;
