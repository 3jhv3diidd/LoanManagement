import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import logo from "@/assets/loan-logo.png";
import "./Login.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData.username, formData.password);

    if (result.success) {
      toast.success("Login successful! Welcome back.");
      window.location.href = '/'; // Force full page reload
    } else {
      toast.error(result.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="login-root">
      <div className="login-card">
        <div className="login-header">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            {/* Logo and title can be added here if needed */}
          </div>
          <button className="kyc-button back-home" type="button" onClick={() => navigate("/")}>Back to Home</button>
          <div className="login-title">Welcome Back</div>
          <div className="login-description">Sign in to your account to continue</div>
        </div>
        <div style={{ padding: '1.5rem' }}>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Email</label>
              <div className="input-wrapper">
                {/* <User className="icon" /> */}
                <input
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  value={formData.username}
                  onChange={e => handleInputChange('username', e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                {/* <Lock className="icon" /> */}
                <input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={e => handleInputChange('password', e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="forgot-link">
              <Link to="/forgot-password" state={{ email: formData.username }}>Forgot password?</Link>
            </div>
            <button type="submit" className="submit-btn">Sign In</button>
            <div className="register-link">
              Don't have an account?{' '}
              <Link to="/register">Create one here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
