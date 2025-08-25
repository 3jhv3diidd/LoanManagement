import { createContext, useContext, useState, useEffect } from 'react';
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedAdmin = localStorage.getItem('admin');
    if (savedAdmin) {
      const adminData = JSON.parse(savedAdmin);
      setUser(adminData);
      setIsAuthenticated(true);
    } else if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      console.log(username, password);

      // First attempt: regular user login
      console.log(username,password);
      const response = await axios.post("http://localhost:8080/api/auth/signin", {
        email: username,
        password: password,
      });

      if (response.data && response.data.user) {
        const userData = { ...response.data.user };
        delete userData.password;
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(userData));
        return { success: true };
      } else {
        // Fallback attempt: admin login
        const adminResponse = await axios.post("http://localhost:8080/api/auth/admin/adminsignin", {
          email: username,
          password: password,
        });
        let adminData = adminResponse.data.admin;
        if (adminResponse.data && adminData) {
          adminData = { ...adminData };
          delete adminData.password;
          setUser(adminData);
          setIsAuthenticated(true);
          alert("Admin");
          localStorage.setItem("admin", JSON.stringify(adminData));
          return { success: true, isAdmin: true };
        } else {
          return { success: false, message: "Invalid credentials" };
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.clear(); // Remove all localStorage data on logout
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    loading,
  };

  if (loading) return null; // Prevent rendering until user is restored

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
