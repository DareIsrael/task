import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import "./Dashboard.css";
import backgroundImg from "../../assets/Earning.jpg";
import sidebarImg from "../../assets/Sidebar.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(""); 

 
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token"); 
        const response = await axios.get("http://localhost:5000/users/getUsers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data); 
        setLoading(false); 
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to fetch users. Please try again.");
        setLoading(false); 
        
      }
    };

    fetchUsers();
  }, []);

 
  const filteredUsers = users
    .filter((user) => {
      
      if (!user.name) return false;
      return user.name.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .map((user) => ({
     
      name: user.name || "N/A",
      company: user.company || "N/A",
      phone: user.phone || "N/A",
      email: user.email || "N/A",
      country: user.country || "N/A",
      status: user.status || "Inactive",
    }));

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    localStorage.removeItem("isLoggedIn"); 
    navigate("/login"); 
  };

  if (loading) {
    return <div className="dashboard-container">Loading...</div>;
  }

  if (error) {
    return <div className="dashboard-container">{error}</div>;
  }

  return (
    <div className="dashboard">
      <img src={sidebarImg} alt="Sidebar" className="sidebar-img" />
      
      <div className="dashboard-container">
       <div className="dash_profile">
        <h1>Hello Evano</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>

      
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        </div>
        <img src={backgroundImg} alt="Background" className="background-img" />
       
        <div className="table-container">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>User Name</th>
                <th>Company</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Country</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.company}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>{user.country}</td>
                  <td>
                    <span className={`status ${user.status.toLowerCase()}`}>
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;