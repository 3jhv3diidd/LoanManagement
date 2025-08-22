import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Home, ArrowLeft, Calculator, CheckCircle, User, DollarSign, Calendar, Building } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoanApplicationForm from "@/components/LoanApplicationForm";
import { useAuth } from "@/contexts/AuthContext";

const HomeLoans = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    loanAmount: "",
    homeValue: "",
    loanTerm: "",
    downPayment: ""
  });
  const [calculationResult, setCalculationResult] = useState(null);
  const [showLoanForm, setShowLoanForm] = useState(false);
  const [customerId] = useState("CUS123456"); // Replace with actual customer id logic

  const calculateLoan = () => {
    const principal = parseFloat(formData.loanAmount);
    const homeValue = parseFloat(formData.homeValue);
    const term = parseInt(formData.loanTerm);
    const downPayment = parseFloat(formData.downPayment);
    
    if (!principal || !term || !homeValue) return;
    
    const interestRate = 0.0299; // 2.99% APR
    const monthlyRate = interestRate / 12;
    const numberOfPayments = term * 12;
    
    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const totalAmount = monthlyPayment * numberOfPayments;
    const totalInterest = totalAmount - principal;
    const loanToValue = (principal / homeValue) * 100;
    
    setCalculationResult({
      monthlyPayment: monthlyPayment.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      loanToValue: loanToValue.toFixed(1)
    });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setCalculationResult(null);
  };

  const handleLoanApplicationSubmit = (formData) => {
    // TODO: Integrate backend API call for loan application
    alert("Loan application submitted!\n" + JSON.stringify(formData, null, 2));
    setShowLoanForm(false);
  };

  const handleStartApplication = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      setShowLoanForm(true);
    }
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
              <Home className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">Home Loans</h1>
              <p className="text-xl text-muted-foreground">Make your dream home a reality</p>
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
                  <Building className="w-5 h-5" />
                  Loan Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground uppercase">CIBIL Score</h4>
                    <p className="text-lg font-bold text-primary">750+</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground uppercase">Age Range</h4>
                    <p className="text-lg font-bold text-primary">21-65 years</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground uppercase">Min Income</h4>
                    <p className="text-lg font-bold text-primary">₹25,000/month</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground uppercase">Max LTV</h4>
                    <p className="text-lg font-bold text-primary">90%</p>
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
                    "Interest rates starting from 2.99% APR",
                    "Loan amount up to ₹5 Crores",
                    "Loan tenure up to 30 years",
                    "No prepayment charges after 1 year",
                    "Quick approval in 48 hours",
                    "Doorstep documentation",
                    "Tax benefits under Section 80C & 24B"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
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
                  Home Loan Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="homeValue">Property Value (₹)</Label>
                  <Input
                    id="homeValue"
                    type="number"
                    placeholder="Enter property value"
                    value={formData.homeValue}
                    onChange={(e) => handleInputChange('homeValue', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="downPayment">Down Payment (₹)</Label>
                  <Input
                    id="downPayment"
                    type="number"
                    placeholder="Enter down payment"
                    value={formData.downPayment}
                    onChange={(e) => handleInputChange('downPayment', e.target.value)}
                  />
                </div>

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
                  <Label>Loan Term</Label>
                  <Select value={formData.loanTerm} onValueChange={(value) => handleInputChange('loanTerm', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select loan term" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 years</SelectItem>
                      <SelectItem value="10">10 years</SelectItem>
                      <SelectItem value="15">15 years</SelectItem>
                      <SelectItem value="20">20 years</SelectItem>
                      <SelectItem value="25">25 years</SelectItem>
                      <SelectItem value="30">30 years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={calculateLoan} className="w-full">
                  Calculate EMI
                </Button>

                {calculationResult && (
                  <div className="mt-6 p-4 bg-muted/50 rounded-lg space-y-3">
                    <h4 className="font-semibold">Calculation Results</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Monthly EMI:</span>
                        <p className="font-bold text-primary">₹{calculationResult.monthlyPayment}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Total Amount:</span>
                        <p className="font-bold">₹{calculationResult.totalAmount}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Total Interest:</span>
                        <p className="font-bold">₹{calculationResult.totalInterest}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Loan to Value:</span>
                        <p className="font-bold">{calculationResult.loanToValue}%</p>
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
                  Ready to get your home loan? Start your application process today.
                </p>
                <Button className="w-full bg-banking-gradient" onClick={handleStartApplication}>
                  Start Application
                </Button>
                {showLoanForm && (
                  <div className="mt-6">
                    <LoanApplicationForm
                      loanProductId="home"
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

export default HomeLoans;