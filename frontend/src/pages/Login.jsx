import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogIn } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md"
    >
      <div className="liquid-glass rounded-3xl p-8 shadow-2xl">
        <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-8 text-center bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Welcome Back
        </h2>
        
        {error && (
          <div className="bg-red-500/10 border-l-4 border-red-500 text-red-400 p-4 mb-6 rounded-r">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-white/60 mb-2 font-medium">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-white/40 focus:bg-white/10 transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label className="block text-sm text-white/60 mb-2 font-medium">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-white/40 focus:bg-white/10 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-white text-black font-semibold rounded-xl hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2 cursor-pointer" 
            disabled={loading}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
            ) : (
              <>
                <LogIn size={18} /> Sign In
              </>
            )}
          </button>
        </form>
        
        <p className="text-center mt-6 text-sm text-white/60">
          Don't have an account? <Link to="/signup" className="text-white hover:underline transition-all">Sign up here</Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;
