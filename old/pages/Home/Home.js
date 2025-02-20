import React from "react";
import "./Home.css"; 
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";


const Home = () => {
  return (
    <div>
      <Header />
      <div className="home-container">
        <h1>Welcome to Mundi Business</h1>
        <p>Your business dashboard solution</p>
        <Link to="/dashboard">Go to Dashboard</Link>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
