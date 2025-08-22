import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email');
    console.log('Newsletter signup:', email);
    alert('Thank you for subscribing to our newsletter!');
  };

  const handleSocialClick = (platform: string) => {
    console.log(`${platform} social link clicked`);
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="text-2xl font-bold bg-gold-gradient bg-clip-text text-transparent">
              PureLoan Bank
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              Your trusted partner in achieving financial goals. We provide competitive loan solutions 
              with exceptional customer service.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-accent" />
                <span>1-800-LOANS-24</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-accent" />
                <span>support@pureloan.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-accent" />
                <span>123 Financial District, Banking Plaza</span>
              </div>
            </div>
          </div>
          
          {/* Loan Products */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Loan Products</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Home Loans</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Auto Loans</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Personal Loans</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Business Loans</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Refinancing</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Student Loans</a></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Loan Calculator</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Rate Information</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Financial Planning</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Credit Education</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">FAQ</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Contact Support</a></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Stay Updated</h3>
            <p className="text-primary-foreground/80">
              Subscribe to get the latest rates and financial tips
            </p>
            
            <form onSubmit={handleNewsletterSignup} className="space-y-4">
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
              />
              <Button 
                type="submit" 
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Subscribe
              </Button>
            </form>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleSocialClick('Facebook')}
                className="text-primary-foreground/80 hover:text-accent hover:bg-primary-foreground/10"
              >
                <Facebook className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleSocialClick('Twitter')}
                className="text-primary-foreground/80 hover:text-accent hover:bg-primary-foreground/10"
              >
                <Twitter className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleSocialClick('LinkedIn')}
                className="text-primary-foreground/80 hover:text-accent hover:bg-primary-foreground/10"
              >
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleSocialClick('Instagram')}
                className="text-primary-foreground/80 hover:text-accent hover:bg-primary-foreground/10"
              >
                <Instagram className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-primary-foreground/80">
              © 2024 PureLoan Bank. All rights reserved. NMLS ID: 123456
            </div>
            
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                Equal Housing Lender
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;