import React, { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import "./Dashboard.css";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Corporate");

  return (
    <div className="ss_dashboard_mn_sec">
      <Header />

      <div className="ss_dash_main_sec">
        <div className="ss_dash_side_bar">
          <Sidebar />
        </div>

        <div className="ss_content">
          <section className="ss_dash_hed">
            <div className="container">
              <div className="row">
                <div className="col-lg-9">
                  <h2>Dashboard</h2>
                </div>

                <div className="col-lg-3">
                  <div className="header-search">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search w-4 h-4 mr-2"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
                    <input type="search" className="form-control" placeholder="What are you looking for?" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="ss_dash_graph_sec">
            <div className="container">
              <div className="row animate__fadeInLeft">
                <div className="col-lg-12">
                  <div className="ss_dash_tab_sec">
                    <ul>
                      <li><button className={activeTab === "Corporate" ? "active" : ""} onClick={() => setActiveTab("Corporate")}>Corporate & Minimalist</button></li>
                      <li><button className={activeTab === "Vibrant" ? "active" : ""} onClick={() => setActiveTab("Vibrant")}>Vibrant & Dynamic</button></li>
                      <li><button className={activeTab === "Casual" ? "active" : ""} onClick={() => setActiveTab("Casual")}>Casual & User-Friendly</button></li>
                    </ul>
                  </div>
                </div>
              </div>

              {activeTab === "Corporate" && (
                <div className="row ss_Corporate">
                  <div className="col-lg-6">
                    <div className="ss_dash_graph_div">
                      <h3>Sales Trends</h3>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bar-chart2 w-24 h-24 text-blue-500 mx-auto mb-4"><line x1="18" x2="18" y1="20" y2="10"></line><line x1="12" x2="12" y1="20" y2="4"></line><line x1="6" x2="6" y1="20" y2="14"></line></svg>
                      <p className="text-gray-500 text-center">Last 30 Days</p>
                      <div className="ss_dash_graph_div_last"><span>$24,500</span><span>+15%</span></div>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="ss_dash_graph_div ss_dash_graph_div2">
                      <h3 className="animate__fadeInLeft">Customer Growth</h3>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-line-chart w-24 h-24 text-green-500 mx-auto mb-4"><path d="M3 3v18h18"></path><path d="m19 9-5 5-4-4-3 3"></path></svg>
                      <p className="text-gray-500 text-center">Last 30 Days</p>
                      <div className="ss_dash_graph_div_last"><span>1,234</span><span>+22%</span></div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "Vibrant" && (
                <div className="row ss_Vibrant">
                  <div className="col-lg-12">
                    <h1>Vibrant</h1>
                  </div>
                </div>
              )}

              {activeTab === "Casual" && (
                <div className="row ss_Casual">
                  <div className="col-lg-12">
                    <h1>Casual</h1>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
