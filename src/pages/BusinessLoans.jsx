import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, ArrowLeft, Calculator, CheckCircle, User, DollarSign, Calendar, FileText } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoanApplicationForm from "@/components/LoanApplicationForm";
import { useAuth } from "@/contexts/AuthContext";

const BusinessLoans = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showLoanForm, setShowLoanForm] = useState(false);
  const [formData, setFormData] = useState({
    loanAmount: "",
    businessType: "",
    loanTerm: "",
    businessAge: ""
  });
  const [calculationResult, setCalculationResult] = useState(null);

  const calculateLoan = () => {
    const principal = parseFloat(formData.loanAmount);
    const term = parseInt(formData.loanTerm);
    
    if (!principal || !term) return;
    
    const interestRate = 0.0449; // 4.49% APR
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/50 py-8">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <div className="flex items-center gap-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-banking-gradient rounded-full">
              <Building className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">Business Loans</h1>
              <p className="text-xl text-muted-foreground">Fuel your business growth</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Loan Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Loan Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground uppercase">CIBIL Score</h4>
                    <p className="text-lg font-bold text-primary">700+</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground uppercase">Business Age</h4>
                    <p className="text-lg font-bold text-primary">2+ years</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground uppercase">Annual Turnover</h4>
                    <p className="text-lg font-bold text-primary">₹10 Lakhs+</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground uppercase">Max Amount</h4>
                    <p className="text-lg font-bold text-primary">₹5 Crores</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    "Interest rates starting from 4.49% APR",
                    "Loan amount up to ₹5 Crores",
                    "Loan tenure up to 10 years",
                    "SBA loans available",
                    "Equipment financing options",
                    "Working capital loans",
                    "Quick approval process",
                    "Minimal documentation"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Business Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Manufacturing",
                    "Trading",
                    "Services",
                    "Retail",
                    "Restaurant",
                    "Healthcare",
                    "Technology",
                    "Agriculture"
                  ].map((type, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-sm">{type}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Required Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    "Business Registration Certificate",
                    "GST Registration",
                    "ITR for last 3 years",
                    "Bank Statements (12 months)",
                    "Balance Sheet & P&L",
                    "Identity & Address Proof",
                    "Business Plan (if required)"
                  ].map((doc, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-sm">{doc}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Loan Calculator */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Business Loan Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="loanAmount">Loan Amount (₹)</Label>
                  <Input
                    id="loanAmount"
                    type="number"
                    placeholder="Enter loan amount"
                    value={formData.loanAmount}
                    onChange={(e) => handleInputChange('loanAmount', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Business Type</Label>
                  <Select value={formData.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="trading">Trading</SelectItem>
                      <SelectItem value="services">Services</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="restaurant">Restaurant</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="agriculture">Agriculture</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Business Age</Label>
                  <Select value={formData.businessAge} onValueChange={(value) => handleInputChange('businessAge', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select business age" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2-5">2-5 years</SelectItem>
                      <SelectItem value="5-10">5-10 years</SelectItem>
                      <SelectItem value="10+">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Loan Term</Label>
                  <Select value={formData.loanTerm} onValueChange={(value) => handleInputChange('loanTerm', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select loan term" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 year</SelectItem>
                      <SelectItem value="2">2 years</SelectItem>
                      <SelectItem value="3">3 years</SelectItem>
                      <SelectItem value="5">5 years</SelectItem>
                      <SelectItem value="7">7 years</SelectItem>
                      <SelectItem value="10">10 years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={calculateLoan} className="w-full">
                  Calculate EMI
                </Button>

                {calculationResult && (
                  <div className="mt-6 p-4 bg-muted/50 rounded-lg space-y-3">
                    <h4 className="font-semibold">Calculation Results</h4>
                    <div className="grid grid-cols-1 gap-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Monthly EMI:</span>
                        <span className="font-bold text-primary">₹{calculationResult.monthlyPayment}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Amount:</span>
                        <span className="font-bold">₹{calculationResult.totalAmount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Interest:</span>
                        <span className="font-bold">₹{calculationResult.totalInterest}</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Apply Now</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Ready to grow your business? Start your loan application today.
                </p>
                <Button className="w-full bg-banking-gradient" onClick={handleStartApplication}>
                  Start Application
                </Button>
                {showLoanForm && (
                  <div className="mt-6">
                    <LoanApplicationForm
                      loanProductId={1453}
                      onSubmit={handleLoanApplicationSubmit}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessLoans;