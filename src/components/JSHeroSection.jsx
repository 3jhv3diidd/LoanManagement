import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import bankHero from "@/assets/bank-hero.jpg";

const JSHeroSection = () => {
  // Pure JavaScript state management
  const [formData, setFormData] = useState({
    loanAmount: "",
    loanType: "",
    creditScore: "",
    annualIncome: ""
  });

  // Pure JavaScript calculator logic
  const calculateMonthlyPayment = function(amount, type) {
    if (!amount || !type) return "---";
    
    const principal = parseFloat(amount);
    const rates = {
      "home": 0.0299,
      "auto": 0.0349,
      "personal": 0.0599,
      "business": 0.0449
    };
    
    const rate = rates[type] || 0.05;
    const years = type === "home" ? 30 : type === "auto" ? 5 : 3;
    const months = years * 12;
    
    const monthlyRate = rate / 12;
    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                          (Math.pow(1 + monthlyRate, months) - 1);
    
    return Math.round(monthlyPayment).toLocaleString();
  };

  // Pure JavaScript form handlers
  const handleInputChange = function(field, value) {
    console.log(`Field ${field} changed to: ${value}`);
    setFormData(function(prev) {
      return {
        ...prev,
        [field]: value
      };
    });
  };

  const handleQuickQuote = function() {
    console.log("Quick quote calculation:", formData);
    
    if (!formData.loanAmount || !formData.loanType) {
      alert("Please fill in loan amount and type to get a quote.");
      return;
    }
    
    // Simulate API call with setTimeout
    const loadingMessage = "Calculating your personalized quote...";
    console.log(loadingMessage);
    
    setTimeout(function() {
      const payment = calculateMonthlyPayment(formData.loanAmount, formData.loanType);
      const rate = formData.loanType === "home" ? "2.99%" : 
                   formData.loanType === "auto" ? "3.49%" : 
                   formData.loanType === "personal" ? "5.99%" : "4.49%";
      
      alert(`Your estimated monthly payment: $${payment}\nInterest rate: ${rate} APR\n\nWould you like to proceed with a full application?`);
    }, 1500);
  };

  const handleApplyNow = function() {
    console.log("Apply now clicked with data:", formData);
    
    // Pure JavaScript form validation
    const requiredFields = ["loanAmount", "loanType"];
    const missingFields = requiredFields.filter(function(field) {
      return !formData[field];
    });
    
    if (missingFields.length > 0) {
      alert(`Please complete the following fields: ${missingFields.join(", ")}`);
      return;
    }
    
    // Simulate application process
    const steps = [
      "Validating information...",
      "Checking credit...", 
      "Processing application...",
      "Application submitted successfully!"
    ];
    
    let currentStep = 0;
    const interval = setInterval(function() {
      console.log(steps[currentStep]);
      if (currentStep === steps.length - 1) {
        clearInterval(interval);
        alert("Application submitted! You'll receive a response within 24 hours.");
      }
      currentStep++;
    }, 1000);
  };

  return (
    <section id="about" className="relative min-h-screen bg-hero-gradient overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${bankHero})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
      
      {/* Content */}
      <div className="relative container mx-auto px-4 py-20">
        <div className="flex justify-center">
          {/* Main Hero Content */}
          <div className="text-primary-foreground space-y-6 animate-fade-in text-center max-w-4xl">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              Professional Banking Solutions
              <span className="block bg-gold-gradient bg-clip-text text-transparent text-3xl lg:text-4xl mt-2">
                Your Trusted Financial Partner
              </span>
            </h1>
            
            <p className="text-lg text-primary-foreground/90 leading-relaxed max-w-3xl">
              Choose our advanced loan banking system for unmatched financial solutions. With over 25 years of excellence, 
              we offer the lowest interest rates in the market, instant digital approvals in under 60 seconds, and 
              flexible repayment options tailored to your lifestyle. Our AI-powered credit assessment ensures fair 
              evaluation, while our 24/7 customer support guarantees you're never alone in your financial journey.
            </p>
            
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-6 max-w-3xl">
              <h3 className="text-xl font-semibold mb-4">Why Choose Our Loan Banking System?</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>Lowest market rates starting from 2.99% APR</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>Instant approval with minimal documentation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>No hidden fees or prepayment penalties</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>Flexible tenure options up to 30 years</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>Digital-first process with doorstep service</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>FDIC insured with 99.9% uptime guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JSHeroSection;