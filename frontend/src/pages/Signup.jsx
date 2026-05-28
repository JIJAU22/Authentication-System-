import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    
    setLoading(true);
    
    try {
      await signup(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create an account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md"
    >
      <div className="liquid-glass rounded-3xl p-8 shadow-2xl">
        <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-8 text-center bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Create Account
        </h2>
        
        {error && (
          <div className="bg-red-500/10 border-l-4 border-red-500 text-red-400 p-4 mb-6 rounded-r">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-white/60 mb-1.5 font-medium">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-white/40 transition-all"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="John Doe"
            />
          </div>
          
          <div>
            <label className="block text-sm text-white/60 mb-1.5 font-medium">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-white/40 transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="john@example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm text-white/60 mb-1.5 font-medium">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-white/40 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Create a password"
              minLength="6"
            />
          </div>
          
          <div>
            <label className="block text-sm text-white/60 mb-1.5 font-medium">Confirm Password</label>
            <input
              type="password"
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-white/40 transition-all"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm your password"
              minLength="6"
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-white text-black font-semibold rounded-xl hover:bg-white/90 transition-colors disabled:opacity-50 mt-4 cursor-pointer" 
            disabled={loading}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
            ) : (
              <>
                <UserPlus size={18} /> Sign Up
              </>
            )}
          </button>
        </form>
        
        <p className="text-center mt-6 text-sm text-white/60">
          Already have an account? <Link to="/login" className="text-white hover:underline transition-all">Sign in here</Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Signup;
