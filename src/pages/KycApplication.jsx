import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './KycApplication.css';

const KycApplication = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    panNumber: '',
    aadharNumber: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
    documents: {
      panCard: null,
      aadharCard: null,
      addressProof: null
    }
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [name]: files[0]
      }
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.panNumber) newErrors.panNumber = 'PAN number is required';
    if (!formData.aadharNumber) newErrors.aadharNumber = 'Aadhar number is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.pinCode) newErrors.pinCode = 'PIN code is required';
    
    // Document validation
    if (!formData.documents.panCard) newErrors.panCard = 'PAN card copy is required';
    if (!formData.documents.aadharCard) newErrors.aadharCard = 'Aadhar card copy is required';
    if (!formData.documents.addressProof) newErrors.addressProof = 'Address proof is required';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      // Add your API call here to submit KYC details
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated API call
      navigate('/profile');
    } catch (error) {
      console.error('KYC submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="kyc-container">
      <h1 className="kyc-title">KYC Application</h1>
      <form className="kyc-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <h2>Personal Information</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="fullName">Full Name*</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={errors.fullName ? 'error' : ''}
              />
              {errors.fullName && <span className="error-message">{errors.fullName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth*</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className={errors.dateOfBirth ? 'error' : ''}
              />
              {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Identity Information</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="panNumber">PAN Number*</label>
              <input
                type="text"
                id="panNumber"
                name="panNumber"
                value={formData.panNumber}
                onChange={handleInputChange}
                className={errors.panNumber ? 'error' : ''}
              />
              {errors.panNumber && <span className="error-message">{errors.panNumber}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="aadharNumber">Aadhar Number*</label>
              <input
                type="text"
                id="aadharNumber"
                name="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleInputChange}
                className={errors.aadharNumber ? 'error' : ''}
              />
              {errors.aadharNumber && <span className="error-message">{errors.aadharNumber}</span>}
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Document Upload</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="panCard">PAN Card Copy*</label>
              <input
                type="file"
                id="panCard"
                name="panCard"
                onChange={handleFileChange}
                accept="image/*,.pdf"
                className={errors.panCard ? 'error' : ''}
              />
              {errors.panCard && <span className="error-message">{errors.panCard}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="aadharCard">Aadhar Card Copy*</label>
              <input
                type="file"
                id="aadharCard"
                name="aadharCard"
                onChange={handleFileChange}
                accept="image/*,.pdf"
                className={errors.aadharCard ? 'error' : ''}
              />
              {errors.aadharCard && <span className="error-message">{errors.aadharCard}</span>}
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            className="btn-secondary"
            onClick={() => navigate('/profile')}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit KYC'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default KycApplication;