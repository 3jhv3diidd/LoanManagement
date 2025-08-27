import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { Shield, Lock, Mail, User, Phone } from "lucide-react";
import { Link ,useNavigate} from "react-router-dom";
import logo from "@/assets/loan-logo.png";
import axios from 'axios';
import { useAuth } from "@/contexts/AuthContext";
import "./Register.css";


const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

const { login } = useAuth(); // Add this inside your component

const handleSubmit = async (e) => {
  e.preventDefault();

  const emailPattern = /^[^\s@]+@gmail\.com$/;
  const phonePattern = /^[6-9][0-9]{9}$/;
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}:;'<>.,?\-]).+$/;
  const namePattern = /^[A-Za-z\s]+$/;

  if (!namePattern.test(formData.username)) {
    alert("First name should contain only letters and spaces.");
    return;
  }

  if (!emailPattern.test(formData.email)) {
    alert("Enter a valid Gmail address.");
    return;
  }

  if (!phonePattern.test(formData.phone)) {
    alert("Enter a valid phone number starting with 6-9 and 10 digits long.");
    return;
  }

  if (!passwordPattern.test(formData.password)) {
    alert("Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character.");
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords don't match!");
    return;
  }

  try {
    const response = await axios.post("http://localhost:8080/api/auth/signup", {
      username: formData.username,
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    });

    if (response.status === 200) {
      const loginResult = await login(formData.email, formData.password);
      if (loginResult.success) {
        alert("Registration and login successful!");
        navigate('/');
      } else {
        alert("Registered, but login failed.");
      }
    }
  } catch (error) {
    console.error("Registration error:", error);
    alert(error.response?.data?.message || "Registration failed.");
  }
};



  return (
    <div className="register-root">
      <div className="register-card">
        <div className="register-header">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            {/* Logo and title can be added here if needed */}
          </div>
          <button className="kyc-button back-home" type="button" onClick={() => navigate("/")}>Back to Home</button>
          <div className="register-title">Create Account</div>
          <div className="register-description">Join us to start your loan journey</div>
        </div>
        <div style={{ padding: '1.5rem' }}>
          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <div className="input-wrapper">
                  {/* <User className="icon" /> */}
                  <input
                    id="firstName"
                    type="text"
                    placeholder="First name"
                    value={formData.username}
                    onChange={e => handleInputChange('username', e.target.value)}
                    required
                  />
                </div>
              </div>
              {/* <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <div className="input-wrapper">
                 
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={e => handleInputChange('lastName', e.target.value)}
                    required
                  />
                </div> 
              </div>*/}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                {/* <Mail className="icon" /> */}
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={e => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <div className="input-wrapper">
                {/* <Phone className="icon" /> */}
                <input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={e => handleInputChange('phone', e.target.value)}
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
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={e => handleInputChange('password', e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-wrapper">
                {/* <Lock className="icon" /> */}
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={e => handleInputChange('confirmPassword', e.target.value)}
                  required
                />
              </div>
            </div>
            <button type="submit" className="submit-btn">Create Account</button>
            <div className="login-link">
              Already have an account?{' '}
              <Link to="/login">Sign in here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;