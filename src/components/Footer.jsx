import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="contact" className="footer new-footer">
      <div className="footer-main new-footer-main">
        <div className="footer-brand">
          <img src="/user_logo.svg" alt="PureLoan Logo" className="footer-logo" />
          <div className="brand-title">PureLoan</div>
          <p className="brand-desc">Fast, secure, and flexible loans for every need. Trusted by thousands. Your financial partner for life.</p>
        </div>
        <div className="footer-columns">
          <div className="footer-column">
            <h4 className="footer-heading">Loans</h4>
            <ul>
              <li><a href="/home-loans">Home Loans</a></li>
              <li><a href="/vehicle-loans">Vehicle Loans</a></li>
              <li><a href="/personal-loans">Personal Loans</a></li>
              <li><a href="/business-loans">Business Loans</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4 className="footer-heading">Customer</h4>
            <ul>
              <li><a href="/register">Apply Now</a></li>
              <li><a href="/login">Login</a></li>
              <li><a href="">My Applications</a></li>
              <li><a href="">KYC Verification</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4 className="footer-heading">Support</h4>
            <ul>
              <li><a href="">FAQ</a></li>
              <li><a href="">Contact Us</a></li>
              <li><a href="">Email Support</a></li>
              <li><a href="">Call: +91 98765 43210</a></li>
            </ul>
          </div>
          
        </div>
      </div>
     
    </footer>
  );
};

export default Footer;