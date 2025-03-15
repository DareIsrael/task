import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import "./Login.css";
import backgroundImg from "../../assets/Background.png";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const url = process.env.REACT_APP_BACKEND_BASEURL;

  const handleLogin = async (e) => {
    e.preventDefault();

 
    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    try {
     
      const response = await axios.post(url+"/users/login", {
        email,
        password,
      });

      if (response.status === 200) {
       
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isLoggedIn", "true");
        navigate("/dashboard"); 
      }
    } catch (err) {
    
      if (err.response) {
       
        setError(err.response.data.message || "Login failed. Please try again.");
      } else {
        
        setError("An error occurred. Please try again.");
      }
      console.error("Login error:", err);
    }
  };

  return (
    <div className="login">
      <img src={backgroundImg} alt="Background" />
      <div className="login-container">
        <h2>Login into your account</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label>Email id:</label>
            <input
              type="email"
              placeholder="info@provkitachnologios.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login now
          </button>
        </form>
        <p>
          Forgot Password? <a href="/"></a>
        </p>
        <Link to="/signup" className="signup-link">
        <button>Signup now</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;