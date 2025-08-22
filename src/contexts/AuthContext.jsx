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

  // Restore session from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  

const login = async (username, password) => {
  try {
    console.log(username, password);

    // First attempt: regular user login
    const response = await axios.post("http://localhost:8080/api/auth/signin", {
      email: username,
      password: password,
    });

    if (response.data && response.data.user) {
      const userData = response.data.user;
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
      console.log(adminResponse.data.admin);
      if (adminResponse.data && adminResponse.data.admin) {
        const adminData = adminResponse.data.admin;
        setUser(adminData);
        setIsAuthenticated(true);
        alert("Admin");
        localStorage.setItem("admin", JSON.stringify(adminData));
        return { success: true, isAdmin: true };
      } else {
        return { success: false, message: "Invalid credentials admi" };
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


//   const login = async (username, password) => {
//   try {
//     console.log(username,password);
//     const response = await axios.post("http://localhost:8080/api/auth/signin", {
//       "email":username,
//       "password":password,
//     });
    
//     // Check if login was successful
//     if (response.data && response.data.user) {
//       const userData = response.data.user;
//       setUser(userData);
//       setIsAuthenticated(true);
//       localStorage.setItem("user", JSON.stringify(userData));
//       return { success: true };
//     } else {
//       return { success: false, message: "Invalid credentials" };
//     }
//     } catch (error) {
//     console.error("Login error:", error);
//     return {
//       success: false,
//       message: error.response?.data?.message || "Login failed",
//     };
//   }
// };


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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
