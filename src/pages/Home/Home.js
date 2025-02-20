import React from "react";
import "./Home.css"; 
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";


const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header />

    <section className="ss_banner_mn_sec">
      <div className="ss_bannerimg">
      <img src="../../../img/banner-image.webp" alt=""/>
      </div>

    <div className="ss_banner_text_box">
    <h1>Unlock Powerful 
      Business Insights with 
      <span>Advanced Analytics</span></h1>
    <p>Transform your business data into actionable insights. Make informed decisions with our comprehensive analytics platform.</p>
    <ul>
      <li>
        <Link ro="/">Start Free Trial</Link>
      </li>
      <li>
     
      <button onClick={() => navigate('/signup')}>Get Demo</button>
      </li>
    </ul>
    </div>

    </section>



      <section className="ss_empower_sec">
        <div class="container">
        <div class="row">
        <div class="col-lg-12">
        <div className="ss_banner_btm_text_bx">
          <h2>Empower Your Business with Actionable Insights</h2>
          <p>Our platform transforms raw data into meaningful insights, helping you make smarter decisions and drive growth.</p>
          <button>Explore All Features <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right ml-2 h-4 w-4"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg></button>
        </div>
        </div>
        </div>

      <div class="row">
      <div class="col-lg-6">

      <div className="ss_hm_2col_div">
        <div className="ss_2col_img_div">
          <img src="../../../img/dashboard-img-1.webp" alt="" />
          <div className="ss_home_2col_text_bx1">
          <h3>Revenue Overview</h3>
          <p>Total Revenue: $1,234,567</p>
          </div>
        </div>
        
        <div className="ss_home_2col_text_bx2">
          <ul>
            <li><p><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-dollar-sign text-green-500"><line x1="12" x2="12" y1="2" y2="22"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg> ↑ 12.5% from last month</p></li>
          <li><Link to="/">View Details   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right ml-2 h-4 w-4"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg></Link></li>
          </ul>
        </div>

      </div>


      </div>

      <div class="col-lg-6">
      <div className="ss_hm_2col_div">
        <div className="ss_2col_img_div">
          <img src="../../../img/dashboard-img-2.webp"  alt=""/>
          <div className="ss_home_2col_text_bx1">
          <h3>Expense Analysis </h3>
          <p>Total Expenses: $876,543</p>
          </div>
        </div>
        
        <div className="ss_home_2col_text_bx2">
          <ul>
            <li><p><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-dollar-sign text-green-500"><line x1="12" x2="12" y1="2" y2="22"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>↓ 5.2% from last month</p></li>
          <li><Link to="/">View Details   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right ml-2 h-4 w-4"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg></Link></li>
          </ul>
        </div>

      </div>
      </div>
      </div>

        </div>
      </section>

      <section className="ss_ready_mn_sec">
        <div class="container">
          <div class="row">
          <div class="col-lg-12">
          <h2>Ready to unlock your business potential?</h2>
          <p>Join thousands of businesses already using MundiBusiness to drive growth and success.</p>
          <ul>
            <li><button>Start Free Trial</button></li>
            <li><button>Start Free Trial</button></li>
          </ul>
          </div>
          </div>
        </div>
      </section>




      <Footer />
    </div>
  );
};

export default Home;
