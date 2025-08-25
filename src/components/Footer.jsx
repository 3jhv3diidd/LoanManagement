// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";
import "./Footer.css";

const Footer = () => {
  const handleNewsletterSignup = function(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    console.log('Newsletter signup:', email);
    alert('Thank you for subscribing to our newsletter!');
  };

  const handleSocialClick = function(platform) {
    console.log(`${platform} social link clicked`);
  };

  return (
    <footer id="contact" className="footer">
      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="company-info">
          <div className="company-title">PureLoan Bank</div>
          <p className="company-desc">
            Your trusted partner in achieving financial goals. We provide competitive loan solutions 
            with exceptional customer service.
          </p>
          <div className="contact-info">
            <div className="contact-row">
              <Phone className="contact-icon" />
              <span>1-800-LOANS-24</span>
            </div>
            <div className="contact-row">
              <Mail className="contact-icon" />
              <span>support@pureloan.com</span>
            </div>
            <div className="contact-row">
              <MapPin className="contact-icon" />
              <span>123 Financial District, Banking Plaza</span>
            </div>
          </div>
        </div>
        <div className="loan-products">
          <h3 className="footer-title">Loan Products</h3>
          <ul className="footer-list">
            <li><a href="#" className="footer-link">Home Loans</a></li>
            <li><a href="#" className="footer-link">Auto Loans</a></li>
            <li><a href="#" className="footer-link">Personal Loans</a></li>
            <li><a href="#" className="footer-link">Business Loans</a></li>
            <li><a href="#" className="footer-link">Refinancing</a></li>
            <li><a href="#" className="footer-link">Student Loans</a></li>
          </ul>
        </div>
        <div className="resources">
          <h3 className="footer-title">Resources</h3>
          <ul className="footer-list">
            <li><a href="#" className="footer-link">Loan Calculator</a></li>
            <li><a href="#" className="footer-link">Rate Information</a></li>
            <li><a href="#" className="footer-link">Financial Planning</a></li>
            <li><a href="#" className="footer-link">Credit Education</a></li>
            <li><a href="#" className="footer-link">FAQ</a></li>
            <li><a href="#" className="footer-link">Contact Support</a></li>
          </ul>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <div className="copyright">
            © 2024 PureLoan Bank. All rights reserved. NMLS ID: 123456
          </div>
          <div className="legal-links">
            <a href="#" className="legal-link">Privacy Policy</a>
            <a href="#" className="legal-link">Terms of Service</a>
            <a href="#" className="legal-link">Equal Housing Lender</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;