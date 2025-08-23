import JSHeader from "@/components/JSHeader";
import JSHeroSection from "@/components/JSHeroSection";
import JSLoanTypes from "@/components/JSLoanTypes";
import Footer from "@/components/Footer";
import "../index.css";

const Index = () => {
  // Pure JavaScript page initialization
  console.log("PureLoan Bank homepage loaded at:", new Date().toLocaleString());
  
  // Pure JavaScript scroll event handler
  const handleScroll = function() {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 100) {
      document.body.classList.add('scrolled');
    } else {
      document.body.classList.remove('scrolled');
    }
  };

  // Add scroll listener using pure JavaScript
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll);
  }

    return (
      <div className="index-root">
        <JSHeader />
        <JSHeroSection />
        <JSLoanTypes />
        <Footer />
      </div>
    );
};

export default Index;