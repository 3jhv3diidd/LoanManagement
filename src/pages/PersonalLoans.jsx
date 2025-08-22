import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, ArrowLeft, Calculator, CheckCircle, User, DollarSign, Calendar, FileText } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoanApplicationForm from "@/components/LoanApplicationForm";
import { useAuth } from "@/contexts/AuthContext";
import "./PersonalLoans.css";

const PersonalLoans = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showLoanForm, setShowLoanForm] = useState(false);
  const [formData, setFormData] = useState({
    loanAmount: "",
    purpose: "",
    loanTerm: "",
    monthlyIncome: ""
  });
  const [calculationResult, setCalculationResult] = useState(null);

  const calculateLoan = () => {
    const principal = parseFloat(formData.loanAmount);
    const term = parseInt(formData.loanTerm);
    
    if (!principal || !term) return;
    
    const interestRate = 0.0599; // 5.99% APR
    const monthlyRate = interestRate / 12;
    const numberOfPayments = term * 12;
    
    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const totalAmount = monthlyPayment * numberOfPayments;
    const totalInterest = totalAmount - principal;
    
    setCalculationResult({
      monthlyPayment: monthlyPayment.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
      totalInterest: totalInterest.toFixed(2)
    });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setCalculationResult(null);
  };

  const handleStartApplication = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      setShowLoanForm(true);
    }
  };

  const handleLoanApplicationSubmit = (formData) => {
    alert("Loan application submitted!\n" + JSON.stringify(formData, null, 2));
    setShowLoanForm(false);
  };

  return (
    <div className="personal-loans-bg">
      {/* Header */}
      <div className="personal-loans-header">
        <div className="personal-loans-container">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')} 
            className="mb-4"
          >
            <ArrowLeft className="icon-arrow" />
            Back to Home
          </Button>
          <div className="header-flex">
            <div className="header-logo">
              <CreditCard className="icon-creditcard" />
            </div>
            <div>
              <h1 className="header-title">Personal Loans</h1>
              <p className="header-subtitle">Fulfill your personal aspirations</p>
            </div>
          </div>
        </div>
      </div>

      <div className="personal-loans-container">
        <div className="personal-loans-section">
          {/* Loan Information */}
          <div className="info-section">
            <div className="card">
              <div className="card-header">
                <div className="card-title">
                  <FileText className="icon-filetext" />
                  Loan Requirements
                </div>
              </div>
              <div className="card-content">
                <div className="info-grid">
                  <div>
                    <h4 className="info-label">CIBIL Score</h4>
                    <p className="info-value">650+</p>
                  </div>
                  <div>
                    <h4 className="info-label">Age Range</h4>
                    <p className="info-value">21-58 years</p>
                  </div>
                  <div>
                    <h4 className="info-label">Min Income</h4>
                    <p className="info-value">₹15,000/month</p>
                  </div>
                  <div>
                    <h4 className="info-label">Max Amount</h4>
                    <p className="info-value">₹50 Lakhs</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <div className="card-title">Key Features</div>
              </div>
              <div className="card-content">
                <div className="features-list">
                  {["Interest rates starting from 5.99% APR","Loan amount up to ₹50 Lakhs","Loan tenure up to 5 years","No collateral required","Same-day approval","Instant disbursal","Flexible repayment options","No prepayment charges"].map((feature, index) => (
                    <div key={index} className="feature-row">
                      <CheckCircle className="icon-check" />
                      <span className="feature-text">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <div className="card-title">Loan Purposes</div>
              </div>
              <div className="card-content">
                <div className="purposes-grid">
                  {["Wedding Expenses","Medical Emergency","Home Renovation","Education","Travel & Vacation","Debt Consolidation","Business Setup","Festival Expenses"].map((purpose, index) => (
                    <div key={index} className="purpose-row">
                      <div className="purpose-dot" />
                      <span className="purpose-text">{purpose}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Loan Calculator */}
          <div className="calculator-section">
            <div className="card">
              <div className="card-header">
                <div className="card-title">
                  <Calculator className="icon-calculator" />
                  Personal Loan Calculator
                </div>
              </div>
              <div className="card-content">
                <div className="input-group">
                  <Label htmlFor="loanAmount">Loan Amount (₹)</Label>
                  <Input
                    id="loanAmount"
                    type="number"
                    placeholder="Enter loan amount"
                    value={formData.loanAmount}
                    onChange={(e) => handleInputChange('loanAmount', e.target.value)}
                  />
                </div>

                <div className="input-group">
                  <Label>Loan Purpose</Label>
                  <Select value={formData.purpose} onValueChange={(value) => handleInputChange('purpose', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select loan purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wedding">Wedding Expenses</SelectItem>
                      <SelectItem value="medical">Medical Emergency</SelectItem>
                      <SelectItem value="renovation">Home Renovation</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="travel">Travel & Vacation</SelectItem>
                      <SelectItem value="debt">Debt Consolidation</SelectItem>
                      <SelectItem value="business">Business Setup</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="input-group">
                  <Label htmlFor="monthlyIncome">Monthly Income (₹)</Label>
                  <Input
                    id="monthlyIncome"
                    type="number"
                    placeholder="Enter monthly income"
                    value={formData.monthlyIncome}
                    onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
                  />
                </div>

                <div className="input-group">
                  <Label>Loan Term</Label>
                  <Select value={formData.loanTerm} onValueChange={(value) => handleInputChange('loanTerm', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select loan term" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 year</SelectItem>
                      <SelectItem value="2">2 years</SelectItem>
                      <SelectItem value="3">3 years</SelectItem>
                      <SelectItem value="4">4 years</SelectItem>
                      <SelectItem value="5">5 years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={calculateLoan} className="btn-full">
                  Calculate EMI
                </Button>

                {calculationResult && (
                  <div className="calculation-results">
                    <h4 className="results-title">Calculation Results</h4>
                    <div className="results-grid">
                      <div className="results-row">
                        <span className="results-label">Monthly EMI:</span>
                        <span className="results-value">₹{calculationResult.monthlyPayment}</span>
                      </div>
                      <div className="results-row">
                        <span className="results-label">Total Amount:</span>
                        <span className="results-value">₹{calculationResult.totalAmount}</span>
                      </div>
                      <div className="results-row">
                        <span className="results-label">Total Interest:</span>
                        <span className="results-value">₹{calculationResult.totalInterest}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <div className="card-title">Apply Now</div>
              </div>
              <div className="card-content">
                <p className="apply-description">
                  Ready to get your personal loan? Complete your application in minutes.
                </p>
                <Button className="btn-full" onClick={handleStartApplication}>
                  Start Application
                </Button>
                {showLoanForm && (
                  <div className="application-form">
                    <LoanApplicationForm
                      loanProductId={1452}
                      onSubmit={handleLoanApplicationSubmit}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalLoans;