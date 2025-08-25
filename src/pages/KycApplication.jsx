import React, { useEffect, useState } from "react";
import "./KycApplication.css";
import axios from "axios";

const KycApplication = () => {
  const [kycApplications, setKycApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all customers from backend
    axios.get("http://localhost:8080/api/customers/pending-kyc")
      .then(res => {
        setKycApplications(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to fetch customers");
        setLoading(false);
      });
  }, []);

  return (
    <div className="kyc-app-page">
      <h2 className="kyc-app-title">Customer List</h2>
      <div className="kyc-app-list">
        {loading ? (
          <div className="kyc-app-loading">Loading...</div>
        ) : error ? (
          <div className="kyc-app-error">{error}</div>
        ) : (
          kycApplications.length === 0 ? (
            <div className="kyc-app-empty">No customers found.</div>
          ) : (
            kycApplications.map(app => (
              <section key={app.customerId || app.id} className="kyc-app-section">
                <div className="kyc-app-section-header">
                  <span className="kyc-app-section-title">Customer #{app.customerId || app.id}</span>
                  <span className={`status-badge status-${app.status?.toLowerCase()}`}>{app.status || 'ACTIVE'}</span>
                </div>
                <div className="kyc-app-section-details impressive-details">
                  {Object.entries(app).map(([key, value]) => (
                    <div key={key} className="kyc-app-detail-row">
                      <span className="kyc-app-detail-key">{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:</span>
                      <span className="kyc-app-detail-value">{String(value)}</span>
                    </div>
                  ))}
                </div>
                <div className="kyc-app-actions">
                  <button className="kyc-app-btn approve"
                    onClick={async () => {
                      try {
                        await axios.post(`http://localhost:8080/api/customers/${app.customerId || app.id}/kyc-status`, { status: 'VERIFIED' });
                        setKycApplications(apps => apps.filter(a => a.customerId !== app.customerId));
                      } catch (err) {
                        alert('Failed to approve customer KYC');
                      }
                    }}
                  >Approve</button>
                  <button className="kyc-app-btn reject"
                    onClick={async () => {
                      try {
                        await axios.post(`http://localhost:8080/api/customers/${app.customerId || app.id}/kyc-status`, { status: 'REJECTED' });
                        setKycApplications(apps => apps.filter(a => a.customerId !== app.customerId));
                      } catch (err) {
                        alert('Failed to reject customer KYC');
                      }
                    }}
                  >Reject</button>
                </div>
              </section>
            ))
          )
        )}
      </div>
    </div>
  );
};

export default KycApplication;