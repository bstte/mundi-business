import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import 'bootstrap/dist/css/bootstrap.css';
import { useSelector } from "react-redux";


const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user); // Redux se user ko access karein


  return (
    <header className="ss_header">
      <div class="container">
        <div class="row">
          <div class="col-lg-3">
            {/* logo div */}
            <div className="ss_hed_logo_div">
              <Link to="/"><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-10 h-10"><rect width="40" height="40" rx="8" fill="#1E3A8A"></rect><path d="M20 8L32 20L20 32L8 20L20 8Z" fill="#60A5FA" fill-opacity="0.8"></path><path d="M20 12L28 20L20 28L12 20L20 12Z" fill="#2563EB" fill-opacity="0.9"></path><circle cx="20" cy="20" r="4" fill="#FFFFFF"></circle></svg>
                <span>MundiBusiness</span>
              </Link>
            </div>
          </div>
          {
            !user && (
              <div class="col-lg-5">
                <nav className="ss_hed_nav_sec">
                  <ul>
                    <li className="ss_hed_menu_1st">
                      <Link to="/"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bar-chart2 w-4 h-4"><line x1="18" x2="18" y1="20" y2="10"></line><line x1="12" x2="12" y1="20" y2="4"></line><line x1="6" x2="6" y1="20" y2="14"></line></svg> <span>Platform</span> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg></Link>
                      {/* Droup down menu */}
                      <ul className="ss_hed_droup_menu">
                        <li>
                          <a href="#analytics">
                            <div>Analytics</div>
                            <p>Track your business metrics in real-time</p>
                          </a>
                        </li>
                        <li>
                          <a href="#reporting">
                            <div>Reporting</div>
                            <p>Generate comprehensive business reports</p>
                          </a>
                        </li>
                        <li>
                          <a href="#integrations">
                            <div>Integrations</div>
                            <p>Connect with your favorite tools</p>
                          </a>
                        </li>
                      </ul>

                    </li>
                    <li className="ss_hed_menu_1st">
                      {/* <Link to="/dashboard">Dashboard</Link> */}
                      <Link to="/dashboard"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users w-4 h-4"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> <span>Solution</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg></Link>
                      {/* Droup down menu */}

                      <ul className="ss_hed_droup_menu">
                        <li>
                          <a href="#startups">
                            <div>For Startups</div>
                            <p>Perfect for growing businesses</p>
                          </a>
                        </li>
                        <li>
                          <a href="#enterprise">
                            <div>For Enterprise</div>
                            <p>Scale with confidence</p>
                          </a>
                        </li>
                        <li>
                          <a href="#agencies">
                            <div>For Agencies</div>
                            <p>Manage multiple clients effortlessly</p>
                          </a>
                        </li>
                      </ul>


                    </li>
                    <li className="ss_hed_menu_1st">
                      <Link to="/dashboard"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-help w-4 h-4"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg><span>Resources</span> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg></Link>

                      {/* Droup down menu */}

                      <ul className="ss_hed_droup_menu">
                        <li>
                          <a href="#help">
                            <div>Help Center</div>
                            <p>Get answers to common questions</p>
                          </a>
                        </li>
                        <li>
                          <a href="#api">
                            <div>API Documentation</div>
                            <p>Technical guides and references</p>
                          </a>
                        </li>
                        <li>
                          <a href="#community">
                            <div>Community</div>
                            <p>Connect with other users</p>
                          </a>
                        </li>
                      </ul>

                    </li>
                  </ul>
                </nav>
              </div>
            )
          }


          <div class="col-lg-4">
            <div className="ss_hed_right_div">
              <ul>
                {
                  !user && (
                    <>
                      <li >
                        <Link to="/"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search h-4 w-4"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg></Link>
                      </li>
                      <li className="ss_hed_rit_free">
                        <button>Free Trial</button>
                      </li>
                      <li>
                      <button onClick={() => navigate('/signup')}>Get Demo</button>
                      </li>

                      <li>
                        <button onClick={() => navigate('/login')}><span>Sign in</span></button>
                      </li>
                    </>
                  )
                }
                {user && (
                   <li>
                   <span style={{ color: "#000" }}>Welcome  : {user && user.firstName.toUpperCase()} {user && user.lastName.toUpperCase()}
                   </span>
                 </li>
                )}
               
              </ul>
            </div>
          </div>

        </div>


      </div>

    </header>
  );
};

export default Header;



