import React, { useState } from 'react';
import './AdminLogin.css';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../../redux/userSlice';
import ApiService from '../../API/ApiService';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setError('');

    try {
      const response = await ApiService.AdminApiService.adminlogin({ email, password });
      console.log("testing")
      console.log("token",response.data)
      if (response.data.success) {
        const token = response.data.token;

        // ✅ Redux me token save karein
        dispatch(setToken(token));

        // ✅ LocalStorage me token store karein
        // ✅ User Profile API ko call karein
        // const profileResponse = await ApiService.getUserProfile(token);
        // console.log("profile", profileResponse)
        if (response.data.user) {
          dispatch(setUser(response.data.user));

          setTimeout(() => {
            navigate('/admin/dashboard', { replace: true });
        }, 500); 

        }
      } else {
        setError('Invalid email or password.');
      }
    } catch (error) {
      console.error("Login error", error);
      setError('Something went wrong. Please try again.');
    }
  };



  return (
    <div className="ss_log_mn_div ss_login_page">
      <div class="row">
        <div class="col-xl-4 col-lg-5 col-md-4">
          <div class="ss_sign_frm_div">
            <div class="ss_hed_logo_div"><a href="/" data-discover="true"><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-10 h-10"><rect width="40" height="40" rx="8" fill="#1E3A8A"></rect><path d="M20 8L32 20L20 32L8 20L20 8Z" fill="#60A5FA" fill-opacity="0.8"></path><path d="M20 12L28 20L20 28L12 20L20 12Z" fill="#2563EB" fill-opacity="0.9"></path><circle cx="20" cy="20" r="4" fill="#FFFFFF"></circle></svg><span>MundiBusiness</span></a></div>
            <h2>Login to your account      </h2>
            <p>Enter your email address and password to access admin panel.</p>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="error">{error}</p>}
              <button type="submit">Login</button>
            </form>
          </div>

        </div>
      </div>

    </div>


  );
}

export default AdminLogin;
