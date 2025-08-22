import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Car, ArrowLeft, Calculator, CheckCircle, User, DollarSign, Calendar, FileText } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoanApplicationForm from "@/components/LoanApplicationForm";
import { useAuth } from "@/contexts/AuthContext";

const VehicleLoans = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showLoanForm, setShowLoanForm] = useState(false);
  const [formData, setFormData] = useState({
    loanAmount: "",
    vehicleType: "",
    loanTerm: "",
    downPayment: ""
  });
  const [calculationResult, setCalculationResult] = useState(null);

  const calculateLoan = () => {
    const principal = parseFloat(formData.loanAmount);
    const term = parseInt(formData.loanTerm);
    
    if (!principal || !term) return;
    
    const interestRate = 0.0349; // 3.49% APR
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
              <Car className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">Vehicle Loans</h1>
              <p className="text-xl text-muted-foreground">Drive your dream car today</p>
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
                    <h4 className="font-semibold text-sm text-muted-foreground uppercase">Age Range</h4>
                    <p className="text-lg font-bold text-primary">21-60 years</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground uppercase">Min Income</h4>
                    <p className="text-lg font-bold text-primary">₹20,000/month</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground uppercase">Max Funding</h4>
                    <p className="text-lg font-bold text-primary">95%</p>
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
                    "Interest rates starting from 3.49% APR",
                    "Loan amount up to ₹1 Crore",
                    "Loan tenure up to 7 years",
                    "Up to 95% vehicle funding",
                    "Quick approval in 24 hours",
                    "No hidden charges",
                    "Flexible repayment options",
                    "Insurance and extended warranty available"
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
                <CardTitle>Vehicle Types Covered</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "New Cars",
                    "Used Cars",
                    "Two Wheelers",
                    "Commercial Vehicles",
                    "Luxury Cars",
                    "Electric Vehicles"
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
                    "Identity Proof (Aadhar/PAN/Passport)",
                    "Address Proof (Utility Bills)",
                    "Income Proof (Salary Slips/ITR)",
                    "Bank Statements (3 months)",
                    "Vehicle Quotation/Invoice",
                    "Passport Size Photographs"
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
                  Vehicle Loan Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Vehicle Type</Label>
                  <Select value={formData.vehicleType} onValueChange={(value) => handleInputChange('vehicleType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vehicle type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new-car">New Car</SelectItem>
                      <SelectItem value="used-car">Used Car</SelectItem>
                      <SelectItem value="two-wheeler">Two Wheeler</SelectItem>
                      <SelectItem value="commercial">Commercial Vehicle</SelectItem>
                    </SelectContent>
                  </Select>
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
                      <SelectItem value="6">6 years</SelectItem>
                      <SelectItem value="7">7 years</SelectItem>
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
                  Ready to finance your vehicle? Start your application process today.
                </p>
                <Button className="w-full bg-banking-gradient" onClick={handleStartApplication}>
                  Start Application
                </Button>
                {showLoanForm && (
                  <div className="mt-6">
                    <LoanApplicationForm
                      loanProductId={1454}
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

export default VehicleLoans;