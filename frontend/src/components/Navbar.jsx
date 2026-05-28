import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, User as UserIcon, Home, LogIn, UserPlus, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="relative z-20 px-6 py-6 w-full shrink-0"
    >
      <div className="liquid-glass rounded-full px-6 py-3 flex items-center justify-between max-w-5xl mx-auto">
        <Link to="/" className="flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-white" />
          <span className="text-white font-semibold text-lg tracking-[-0.01em]">AuthSys</span>
        </Link>
        
        <div className="flex items-center gap-4 md:gap-8">
          {user ? (
            <>
              <div className="hidden md:flex items-center gap-6 text-white/80 text-sm font-medium">
                <Link to="/dashboard" className="flex items-center gap-2 hover:text-white transition-colors duration-300">
                  <Home size={16} /> Dashboard
                </Link>
                <Link to="/profile" className="flex items-center gap-2 hover:text-white transition-colors duration-300">
                  <UserIcon size={16} /> Profile
                </Link>
              </div>
              <button 
                onClick={handleLogout} 
                className="liquid-glass rounded-full px-6 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity cursor-pointer flex items-center gap-2"
              >
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium cursor-pointer">
                <LogIn size={16} /> Login
              </Link>
              <Link to="/signup" className="glass-pill px-6 py-2 border border-white/10 hover:bg-white/10 text-sm font-medium text-white transition-all duration-300 cursor-pointer flex items-center gap-2">
                <UserPlus size={16} /> Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
