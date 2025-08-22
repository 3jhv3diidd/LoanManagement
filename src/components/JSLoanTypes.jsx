import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Car, CreditCard, Building, Percent, Clock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const JSLoanTypes = () => {
  const navigate = useNavigate();
  
  // Pure JavaScript data structure
  const loanTypesData = [
    {
      icon: Home,
      title: "Home Loans",
      description: "Competitive rates for your dream home",
      rate: "7.99%",
      features: ["No down payment options", "First-time buyer programs", "Refinancing available"],
      buttonText: "Apply for Home Loan",
      id: "home",
      route: "/home-loans"
    },
    {
      icon: Car,
      title: "Vehicle Loans", 
      description: "Finance your next vehicle with ease",
      rate: "8.70%",
      features: ["New & used cars", "Quick approval", "Flexible terms"],
      buttonText: "Get Vehicle Loan",
      id: "vehicle",
      route: "/vehicle-loans"
    },
    {
      icon: CreditCard,
      title: "Personal Loans",
      description: "Unsecured loans loans for any purpose", 
      rate: "9.95%",
      features: ["No collateral required", "Same-day funding", "Fixed monthly payments"],
      buttonText: "Apply Personal Loan",
      id: "personal",
      route: "/personal-loans"
    },
    {
      icon: Building,
      title: "Business Loans",
      description: "Grow your business with our capital",
      rate: "10.50%", 
      features: ["SBA loans available", "Equipment financing", "Working capital"],
      buttonText: "Get Business Loan",
      id: "business",
      route: "/business-loans"
    }
  ];

  // Navigation handler for loan pages
  const handleApplyLoan = function(loan) {
    navigate(loan.route);
  };

  return (
    <section className="py-20 bg-muted/50" id="loans">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Loan Solutions for Every Need
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose from our comprehensive range of loan products designed to fit your financial goals
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {loanTypesData.map(function(loan, index) {
            return (
              <Card 
                key={index} 
                className="group hover:shadow-banking transition-shadow duration-300 border-0 shadow-card cursor-pointer"
              >
                <CardHeader className="text-center pb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-banking-gradient rounded-full mb-4 mx-auto group-hover:scale-110 transition-transform">
                    <loan.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl text-foreground">{loan.title}</CardTitle>
                  <p className="text-muted-foreground">{loan.description}</p>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Percent className="w-5 h-5 text-accent" />
                      <span className="text-3xl font-bold text-primary">{loan.rate}</span>
                      <span className="text-muted-foreground">APR*</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>Starting rate</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {loan.features.map(function(feature, featureIndex) {
                      return (
                        <div key={featureIndex} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                          <span className="text-sm text-foreground">{feature}</span>
                        </div>
                      );
                    })}
                  </div>
                  
                  <Button 
                    onClick={() => handleApplyLoan(loan)}
                    className="w-full bg-banking-gradient hover:opacity-90 shadow-banking"
                    onMouseDown={function(e) {
                      e.currentTarget.style.transform = "scale(0.98)";
                    }}
                    onMouseUp={function(e) {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    {loan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            *Annual Percentage Rate (APR). Rates shown are starting rates and may vary based on creditworthiness, 
            loan amount, and other factors. All loans subject to credit approval.
          </p>
        </div>
      </div>
    </section>
  );
};

export default JSLoanTypes;