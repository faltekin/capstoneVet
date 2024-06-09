
import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

function Landing() {
  return (
    <div className="landing-container">
      
      <h2 className="landing-text">Vet Management System</h2>
      <Link to="/customer" className="login-button">Welcome</Link>
    </div>
  );
}

export default Landing;


