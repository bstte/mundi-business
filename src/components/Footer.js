import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="ss_footer">
      <section>
        <div class="container">
          <div class="row">
          <div class="col-lg-3">
          <div className="ss_foot_box_div">
          <h4>Quick Links
          </h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/">Features</Link></li>
            <li><Link to="/">Pricing</Link></li>
            <li><Link to="/">About Us</Link></li>
          </ul>
          </div>
          </div>

          <div class="col-lg-3">
          <div className="ss_foot_box_div">
          <h4>Resources </h4>
          <ul>
            <li><Link to="/">Blog</Link></li>
            <li><Link to="/">Documentation</Link></li>
            <li><Link to="/">API</Link></li>
            
          </ul>
          </div>
          </div>



          <div class="col-lg-3">
          <div className="ss_foot_box_div">
          <h4>Company  </h4>
          <ul>
            <li><Link to="/">Careers</Link></li>
            <li><Link to="/">Privacy Policy</Link></li>
            <li><Link to="/">Terms of Service</Link></li>
            
          </ul>
          </div>
          </div>


          <div class="col-lg-3">
          <div className="ss_foot_news_box_div">
          <h4>Stay Connected  </h4>
          <form>
          <input type="email" placeholder="Enter your email" />
          <button>Start Now <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send ml-2 h-5 w-5"><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></svg></button>
          </form>
          </div>
          </div>

          </div>
        </div>
      </section>
      <section className="ss_foot_btm_sec">
        <div class="container">
          <div class="row">
            <div class="col-lg-6">
            <p>&copy; {new Date().getFullYear()} Mundi Business. All Rights Reserved.</p>
            </div>
    <div class="col-lg-6">
    <ul>
      <li>
      <select name="cars" id="cars"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe mr-2 h-4 w-4"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg> 
  <option value="volvo">Volvo</option>
  <option value="saab">Saab</option>
  <option value="mercedes">Mercedes</option>
  <option value="audi">Audi</option>
</select>
      </li>
      <li>
        <button> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-headphones mr-2 h-5 w-5"><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"></path></svg> Contact Support</button>
      </li>
    </ul>
    </div>

          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
