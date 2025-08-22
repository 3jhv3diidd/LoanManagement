
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Lock, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import logo from "@/assets/loan-logo.png";

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
      // console.log(user.username);
      toast.success("Login successful! Welcome back.");
      navigate('/');
    } else {
      toast.error(result.message || "Login failed. Please try again.");
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
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Email</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  className="pl-10"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
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
                  placeholder="Enter password"
                  className="pl-10"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <Link to="/forgot-password" className="text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full bg-banking-gradient hover:opacity-90 shadow-banking">
              Sign In
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary hover:underline font-medium">
                Create one here
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

export default Login;
