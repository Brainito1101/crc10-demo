import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import crcLogo from "@/assets/crc-anniversary-logo.png";

const navItems = [{
  label: "Timeline",
  href: "#timeline"
}, {
  label: "Impact",
  href: "#impact"
}, {
  label: "Resources",
  href: "#resources"
}, {
  label: "Contact",
  href: "#contact"
}];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return <>
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-md shadow-crc-sm py-3" : "bg-transparent py-5"}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center bg-white/95 rounded-lg px-3 py-1.5">
            <img src="https://assets.cdn.filesafe.space/dWngLoFGbdh0QqxXOj8c/media/69a1af2e753f152b32dd8a81.png" alt="CRC" className={`transition-all duration-300 ${isScrolled ? "h-10" : "h-12"}`} />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map(item => <a key={item.label} href={item.href} className={`text-sm font-medium transition-colors ${isScrolled ? "text-foreground hover:text-crc-blue" : "text-primary-foreground/90 hover:text-crc-gold"}`}>
              {item.label}
            </a>)}

            <Button className="bg-crc-gold hover:bg-crc-gold-dark text-crc-blue-dark font-semibold" asChild>
              <a href="#contact">Partner With Us</a>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
            {isMobileMenuOpen ? <X className={`w-6 h-6 ${isScrolled ? "text-foreground" : "text-primary-foreground"}`} /> : <Menu className={`w-6 h-6 ${isScrolled ? "text-foreground" : "text-primary-foreground"}`} />}
          </button>
        </div>
      </div>
    </header>

    {/* Mobile Menu */}
    <AnimatePresence>
      {isMobileMenuOpen && <motion.div initial={{
        opacity: 0,
        y: -20
      }} animate={{
        opacity: 1,
        y: 0
      }} exit={{
        opacity: 0,
        y: -20
      }} className="fixed inset-0 z-40 bg-crc-blue-dark md:hidden pt-20">
        <nav className="container mx-auto px-4 py-8 flex flex-col gap-6">
          {navItems.map(item => <a key={item.label} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-medium text-primary-foreground hover:text-crc-gold transition-colors">
            {item.label}
          </a>)}

          <Button className="bg-crc-gold hover:bg-crc-gold-dark text-crc-blue-dark font-semibold mt-4" asChild>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
              Partner With Us
            </a>
          </Button>
        </nav>
      </motion.div>}
    </AnimatePresence>
  </>;
};
export default Header;
