import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";
import { useAuth } from '../contexts/AuthContext'
import axios from "axios";
const UserPro = () => {
  const navigate = useNavigate();1
  const { user, isAuthenticated } = useAuth();

  const [userData, setUserData] = useState(null);
  const [loanHistory, setLoanHistory] = useState([]);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    address: "",
    kycStatus: "pending",
    panNumber: "",
    aadharNumber: "",
  });
  const [activeLoans, setActiveLoans] = useState([]);

  // Get basic info from localStorage
  const localUser = {
    username: localStorage.getItem('username') || '',
    phone: localStorage.getItem('phone') || '',
    email: localStorage.getItem('email') || '',
  };

  // Automatically call find when page loads
  React.useEffect(() => {
    find();
    checkLoan();
  }, []);

  const find = async () => {
    try {
      const response = await axios.put("http://localhost:8080/api/customers/find", {
        email: user.email,
      });
      const customer = response.data;
      // alert(customer.email);
      if (customer && customer.email) {
        setUserData(customer); // User found, show only KYC update section
        setShowProfileForm(false);
        // Store customer data in localStorage
        localStorage.setItem('customer', JSON.stringify(customer));
      } else {
        setUserData(null); // User not found, show personal info section
        setShowProfileForm(false);
      }
    } catch (error) {
      setUserData(null); // On error, show personal info section
      setShowProfileForm(false);
      if (error.response && error.response.data && error.response.data.message) {
        // alert("Error: " + error.response.data.message);
      } else {
        alert("An unexpected error occurred.");
      }
      console.error("Error fetching customer:", error);
    }
  };



  const checkLoan = async () => {
    try {
      const storedCustomer = JSON.parse(localStorage.getItem('customer'));
      if(storedCustomer){
        const response = await axios.get(`http://localhost:8080/api/loan-applications/checkloans?customer_id=${storedCustomer.customerId}`);
        setActiveLoans(response.data || []);
      }
    }catch(error){
      setActiveLoans([]);
      console.error("Error fetching loans:", error);
    }
  }

  const handleKycRedirect = () => {
    navigate('/kyc-application');
  };

  const handleProfileFormShow = () => {
    // Always try to prefill formData from localStorage customer if available
    let customer = null;
    const storedCustomer = localStorage.getItem('customer');
    if (storedCustomer) {
      try {
        customer = JSON.parse(storedCustomer);
      } catch (e) {
        customer = null;
      }
    }
    // If no customer in localStorage, fallback to userData
    if (!customer && userData) {
      customer = userData;
    }
    // If we have customer data, prefill formData
    if (customer) {
      setFormData({
        name: customer.name || '',
        email: customer.email || '',
        phone: customer.phone || '',
        username: customer.username || '',
        address: customer.address || '',
        kycStatus: customer.kycStatus ? customer.kycStatus.toLowerCase() : 'pending',
        panNumber: customer.panNumber || '',
        aadharNumber: customer.aadharNumber || '',
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        username: '',
        address: 'pending',
        panNumber: '',
        aadharNumber: '',
      });
    }
    setShowProfileForm(true);
  };

  const handleProfileInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitted email:', formData.email); // Ensure email is printed
      const response = await axios.post("http://localhost:8080/api/customers/register", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        username: formData.username,
        address: formData.address,
        pan_number: formData.panNumber,
        adhar_number: formData.aadharNumber,
        kycStatus: "PENDING" // Use uppercase to match Enum
      });
      if (response.status === 200 || response.status === 201) {
        setUserData({ ...formData, kycStatus: "pending" });
        setShowProfileForm(false);
      }
    } catch (error) {
      alert("Failed to save profile. Please try again.");
    }
  };

  return (
    <div className="user-dashboard">
      {/* Basic Info from localStorage - always show */}
      <section className="dashboard-section">
        <button className="kyc-button back-home" type="button" onClick={() => navigate("/")}>Back to Home</button>
        <h2 className="section-title">Basic Information</h2>
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar-wrapper">
              <div className="profile-avatar">
                {localUser.username?.charAt(0) || 'U'}
                  {/* Show red dot only if KYC is pending and userData exists */}
                {((userData && userData.kycStatus?.toLowerCase() === 'pending') || (!userData && !showProfileForm)) && (
                  <span className="avatar-red-dot" title="KYC Pending"></span>
                )}
              </div>
            </div>
            <div className="profile-name">{user.username}</div>
          </div>
          <div className="profile-details">
            <div className="info-row">
              <span className="info-label">Email:</span>
              <span className="info-value">{user.email}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Phone:</span>
              <span className="info-value">{user.phone}</span>
            </div>
          </div>
        </div>
      </section>

      {userData && !showProfileForm ? (
        userData.kycStatus?.toLowerCase() === 'pending' ? (
          <section className="dashboard-section">
            <h2 className="section-title">KYC Verification Status</h2>
            <div className={`kyc-card pending`}>
              <div className="kyc-status">
                <span className="status-icon">!</span>
                <h3>KYC Pending</h3>
                <p>Your KYC is pending. Please update your information if needed.</p>
                <button className="kyc-button" onClick={handleProfileFormShow}>
                  Update Information
                </button>
              </div>
            </div>
          </section>
        ) : userData.kycStatus?.toLowerCase() === 'rejected' ? (
          <section className="dashboard-section">
            <h2 className="section-title">KYC Verification Status</h2>
            <div className={`kyc-card rejected`}>
              <div className="kyc-status">
                <span className="status-icon" style={{color: 'red'}}>✖</span>
                <h3>KYC Rejected</h3>
                <p>Your KYC is rejected. Please update your information and resubmit for verification.</p>
                <button className="kyc-button" onClick={handleProfileFormShow}>
                  Update Information
                </button>
              </div>
            </div>
          </section>
        ) : (
          <section className="dashboard-section">
            <h2 className="section-title">KYC Verification Status</h2>
            <div className={`kyc-card verified`}>
              <div className="kyc-status">
                <span className="status-icon" style={{color: 'green'}}>✔</span>
                <h3>KYC Verified</h3>
                <p>Your KYC is verified. Thank you for completing your profile!</p>
              </div>
            </div>
          </section>
        )
      ) : null}

      {!userData && !showProfileForm && (
        <section className="dashboard-section">
          <button className="kyc-button" onClick={handleProfileFormShow}>
            Complete Information
          </button>
        </section>
      )}

      {showProfileForm && (
        <section className="dashboard-section">
          <h2 className="section-title">Personal Information</h2>
          <form className="profile-card" onSubmit={handleProfileSubmit}>
            <div className="profile-header">
              <div className="profile-avatar-wrapper" style={{ position: 'relative' }}>
                <div className="profile-avatar">
                  {formData.name?.charAt(0) || "U"}
                  {/* Show red dot only if formData.kycStatus is pending */}
                  {formData.kycStatus?.toLowerCase() === 'pending' && (
                    <span
                      className="avatar-red-dot"
                      title="KYC Pending"
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '12px',
                        height: '12px',
                        background: 'red',
                        borderRadius: '50%',
                        border: '2px solid white',
                        boxShadow: '0 0 2px #900',
                        zIndex: 2,
                        display: 'inline-block',
                      }}
                    ></span>
                  )}
                </div>
              </div>
              <div className="profile-name">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleProfileInputChange}
                  required
                />
              </div>
            </div>
            <div className="profile-details">
              <div className="info-row">
                <span className="info-label">Email:</span>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleProfileInputChange}
                  required
                />
              </div>
              <div className="info-row">
                <span className="info-label">Phone:</span>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleProfileInputChange}
                  required
                />
              </div>
              <div className="info-row">
                <span className="info-label">Username:</span>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleProfileInputChange}
                  required
                />
              </div>
              <div className="info-row">
                <span className="info-label">Address:</span>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleProfileInputChange}
                  required
                />
              </div>
              <div className="info-row">
                <span className="info-label">PAN Number:</span>
                <input
                  type="text"
                  name="panNumber"
                  placeholder="PAN Number"
                  value={formData.panNumber}
                  onChange={handleProfileInputChange}
                  required
                />
              </div>
              <div className="info-row">
                <span className="info-label">Aadhar Number:</span>
                <input
                  type="text"
                  name="aadharNumber"
                  placeholder="Aadhar Number"
                  value={formData.aadharNumber}
                  onChange={handleProfileInputChange}
                  required
                />
              </div>
              <div className="info-row">
                <span className="info-label">KYC Status:</span>
                <input
                  type="text"
                  name="kycStatus"
                  value="Not Completed"
                  readOnly
                  className="info-value"
                />
              </div>
            </div>
            <button className="kyc-button" type="submit">
              Save Profile
            </button>
            <button className="kyc-button cancel" type="button" onClick={() => setShowProfileForm(false)}>
              Cancel
            </button>
          </form>
        </section>
      )}

      {/* Active Loans Section */}
      <section className="dashboard-section">
        <h2 className="section-title">Active Loans</h2>
        <div className="active-loans-card">
          {activeLoans && activeLoans.length > 0 ? (
            <ul className="active-loans-list">
              {activeLoans.map((loan, idx) => (
                <li key={idx} className="active-loan-item styled-loan-item">
                  <div className="loan-header">
                    <span className="loan-type">{loan.loanType || loan.loan_product_id}</span>
                    <span className={`loan-status ${loan.status || loan.approval_Status}`}>{loan.status || loan.approval_Status}</span>
                  </div>
                  <div className="loan-details">
                    <div><strong>Amount:</strong> <span className="loan-amount">₹{loan.loan_amount}</span></div>
                    <div><strong>Start Date:</strong> <span className="loan-date">{loan.startDate || loan.application_date}</span></div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="no-active-loans">No active loans</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default UserPro;