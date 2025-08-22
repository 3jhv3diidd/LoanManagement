import { Button } from "@/components/ui/button";
import { Shield, Phone, Mail, Search } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, Settings, CreditCard, FileText, DollarSign, BarChart3, Activity, ClipboardList } from "lucide-react";
import logo from "@/assets/loanmanage-logo.png";

const JSHeader = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedLoanType, setSelectedLoanType] = useState("");

  const loanTypes = [
    {
      title: "Home Loans",
      description: "Competitive rates for your dream home",
      route: "/home-loans",
      keywords: ["home", "house", "mortgage", "property", "real estate"]
    },
    {
      title: "Vehicle Loans",
      description: "Auto loans for cars, trucks, and motorcycles",
      route: "/vehicle-loans",
      keywords: ["vehicle", "car", "auto", "truck", "motorcycle", "bike"]
    },
    {
      title: "Personal Loans",
      description: "Flexible personal loans for any need",
      route: "/personal-loans",
      keywords: ["personal", "individual", "emergency", "debt consolidation"]
    },
    {
      title: "Business Loans",
      description: "Fund your business growth and expansion",
      route: "/business-loans",
      keywords: ["business", "commercial", "startup", "entrepreneur", "company"]
    }
  ];

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Pure JavaScript navigation handler
  const handleNavClick = function(event, section) {
    event.preventDefault();
    console.log(`Navigating to: ${section}`);
    
    // Smooth scroll to section
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start' 
      });
    }
  };

  return (
    <header className="bg-background border-b border-border">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                
              </div>
              <div className="flex items-center space-x-2">
                
              </div>
            </div>
            <div className="flex items-center space-x-2">
              
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <a href="/" className="flex items-center space-x-3">
              <img src={logo} alt="LoanManage logo - loan management" className="h-10 w-10 rounded-sm shadow-banking" loading="lazy" />
              <span className="text-2xl font-bold bg-banking-gradient bg-clip-text text-transparent">LoanManage</span>
            </a>
            <nav className="hidden md:flex items-center gap-6">
              <a 
                href="#loans" 
                className="text-foreground hover:text-primary transition-colors"
                onClick={(e) => handleNavClick(e, 'loans')}
              >
                Loans
              </a>
              <a 
                href="#about" 
                className="text-foreground hover:text-primary transition-colors"
                onClick={(e) => handleNavClick(e, 'about')}
              >
                About
              </a>
              <a 
                href="#contact" 
                className="text-foreground hover:text-primary transition-colors"
                onClick={(e) => handleNavClick(e, 'contact')}
              >
                Contact
              </a>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <Popover open={searchOpen} onOpenChange={setSearchOpen}>
              <PopoverTrigger asChild>
                <div className="relative cursor-pointer" onClick={() => setSearchOpen(true)}>
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search for loan types..."
                    className="w-64 h-9 pl-10 pr-4 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    readOnly
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0 bg-white border shadow-lg" align="end">
                <Command>
                  <CommandInput placeholder="Search for loan types..." />
                  <CommandList>
                    <CommandEmpty>No loan types found.</CommandEmpty>
                    <CommandGroup heading="Available Loan Types">
                      {loanTypes.map((loan) => (
                        <CommandItem
                          key={loan.route}
                          onSelect={() => {
                            navigate(loan.route);
                            setSearchOpen(false);
                          }}
                          className="cursor-pointer"
                        >
                          <div className="flex flex-col">
                            <span className="font-medium">{loan.title}</span>
                            <span className="text-sm text-muted-foreground">{loan.description}</span>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white border shadow-lg" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer py-2" onClick={() => navigate('/profile')}>
                    <User className="mr-3 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer py-2" >
                    <CreditCard className="mr-3 h-4 w-4" />
                    <span>Loan Repayment</span>
                  </DropdownMenuItem>
                  
                  
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer py-2">
                    <LogOut className="mr-3 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  onClick={handleLoginClick}
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Login
                </Button>
                <Button 
                  onClick={handleRegisterClick}
                  className="bg-banking-gradient hover:opacity-90 shadow-banking"
                >
                  Register
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default JSHeader;