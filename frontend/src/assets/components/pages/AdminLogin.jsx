import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/AdminLogin.css";

const AdminLogin = () => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "100px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2 style={{ textAlign: "center", color: "white" }}>
        {isRegisterMode ? "Admin Registration" : "Admin Login"}
      </h2>
      
      <form 
        method="POST" 
        action={isRegisterMode ? "/api/authP/register" : "/api/authP/login"}
      >
        {isRegisterMode && (
          <div style={{ marginBottom: "15px" }}>
            <label
              style={{ display: "block", marginBottom: "5px", color: "white" }}
            >
              Name:
            </label>
            <input
              type="text"
              name="name"
              required
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
          </div>
        )}
        
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{ display: "block", marginBottom: "5px", color: "white" }}
          >
            Email:
          </label>
          <input
            type="email"
            name="email"
            required
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>
        
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{ display: "block", marginBottom: "5px", color: "white" }}
          >
            Password:
          </label>
          <input
            type="password"
            name="password"
            required
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>
        
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#C8102E",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginBottom: "10px"
          }}
        >
          {isRegisterMode ? "Register" : "Login"}
        </button>
      </form>
      
      <button
        type="button"
        onClick={() => setIsRegisterMode(!isRegisterMode)}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "transparent",
          color: "#C8102E",
          border: "2px solid #C8102E",
          borderRadius: "4px",
          cursor: "pointer",
          marginBottom: "10px"
        }}
      >
        {isRegisterMode ? "Already have an account? Login" : "Need an account? Register"}
      </button>
      
      <Link to="/">
        <button
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#C8102E",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Go to home
        </button>
      </Link>
    </div>
  );
};

export default AdminLogin;