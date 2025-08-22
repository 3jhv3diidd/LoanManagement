import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Lock, Mail, User, Phone } from "lucide-react";
import { Link ,useNavigate} from "react-router-dom";
import logo from "@/assets/loan-logo.png";
import axios from 'axios';
import { useAuth } from "@/contexts/AuthContext";


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

  

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (formData.password !== formData.confirmPassword) {
//     alert("Passwords don't match!");
//     return;
//   }

//   try {
//     console.log(formData.username)
//     const response = await axios.post("http://localhost:8080/api/auth/signup", {
//       username: formData.username,
//       email: formData.email,
//       phone: formData.phone,
//       password: formData.password
//     });

//     if (response.status === 200) {
//       alert("Registration successful!");
//       navigate('/');
//       console.log("Registered:", response.data);
//       // Optionally redirect to login
//     }
//   } catch (error) {
//     console.error("Registration error:", error);
//     alert(error.response?.data?.message || "Registration failed.");
//   }
// };
const { login } = useAuth(); // Add this inside your component

const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords don't match!");
    return;
  }

  try {
    const response = await axios.post("http://localhost:8080/api/auth/signup",{
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      password: formData.password
    } );

    if (response.status === 200) {
      // Automatically log in the user
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
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-banking">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {/* <Link to="/" className="flex items-center space-x-3">
              <img src={logo} alt="LoanManage logo" className="h-12 w-12 rounded-sm shadow-banking" />
              <span className="text-2xl font-bold bg-banking-gradient bg-clip-text text-transparent">LoanManage</span>
            </Link> */}
          </div>
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription>Join us to start your loan journey</CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="First name"
                    className="pl-10"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Last name"
                    className="pl-10"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  className="pl-10"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  className="pl-10"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  className="pl-10"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  required
                />
              </div>
            </div>
            
            <Button type="submit" className="w-full bg-banking-gradient hover:opacity-90 shadow-banking">
              Create Account
            </Button>
            
            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Sign in here
              </Link>
            </div>
            
            {/* <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground mt-6">
              <Shield className="w-4 h-4" />
              <span>FDIC Insured • Equal Housing Lender</span>
            </div> */}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;