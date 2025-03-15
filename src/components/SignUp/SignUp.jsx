import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import backgroundImg from "../../assets/Background.png";
import "./SignUp.css";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const url = process.env.REACT_APP_BACKEND_BASEURL;

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!name || !phone || !email || !password || !company || !country) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      // Make API call to register endpoint using Axios
      const response = await axios.post(url+"/users/register", {
        name,
        phone,
        email,
        password,
        country,
        company
      });

      if (response.status === 201) {
        alert("Signup successful! Please login.");
        navigate("/login"); // Redirect to login page
      }
    } catch (err) {
      // Handle errors
      if (err.response) {
        // Server responded with an error (e.g., 400, 500)
        setError(err.response.data.message || "Signup failed. Please try again.");
      } else {
        // Network or other errors
        setError("An error occurred. Please try again.");
      }
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="signup">
      <img src={backgroundImg} alt="Background" />
      <div className="signup-container">
        <h2>Signup</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSignup} className="signup-form">
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Israel Dare"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Phone</label>
            <input
              type="number"
              placeholder="080, 070, 091"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Country</label>
            <input
              type="text"
              placeholder="Nigeria"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Company</label>
            <input
              type="text"
              placeholder="Microsoft"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>
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
          <button type="submit" className="signup-button">
            Signup now
          </button>
        </form>
           <p>
            Already have an account? <Link to="/login">Login now</Link>
          </p>
      </div>
    </div>
  );
};

export default SignUp;