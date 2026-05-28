import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="relative z-20 px-6 py-6 w-full"
    >
      <div className="liquid-glass rounded-full px-6 py-3 flex items-center justify-between max-w-5xl mx-auto">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-white" />
            <span className="text-white font-semibold text-lg">Asme</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-white/80 text-sm font-medium">
            <a href="#features" className="hover:text-white transition-colors duration-300">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors duration-300">Pricing</a>
            <a href="#about" className="hover:text-white transition-colors duration-300">About</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/signup" className="text-white hover:text-white/80 transition-colors text-sm font-medium cursor-pointer">
            Sign Up
          </Link>
          <Link to="/login" className="liquid-glass rounded-full px-6 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity cursor-pointer">
            Login
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
