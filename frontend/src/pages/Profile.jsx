import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Profile = () => {
  const { user, updateProfile } = useContext(AuthContext);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password && password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);

    try {
      await updateProfile({ name, email, password });
      setMessage('Profile updated successfully');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-5xl"
    >
      <div className="liquid-glass rounded-3xl p-8 md:p-12 shadow-2xl">
        <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-10 bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Manage Profile
        </h2>

        {error && <div className="bg-red-500/10 border-l-4 border-red-500 text-red-400 p-4 mb-8 rounded-xl">{error}</div>}
        {message && <div className="bg-emerald-500/10 border-l-4 border-emerald-500 text-emerald-400 p-4 mb-8 rounded-xl">{message}</div>}

        <div className="flex flex-col md:flex-row gap-12">
          <div className="flex-1 space-y-6">
            <h3 className="text-xl text-white/90 font-medium mb-4">Account Details</h3>
            
            <div className="pb-6 border-b border-white/10">
              <div className="text-sm text-white/50 mb-1">Current Name</div>
              <div className="text-lg text-white font-medium">{user?.name}</div>
            </div>
            
            <div className="pb-6 border-b border-white/10">
              <div className="text-sm text-white/50 mb-1">Email Address</div>
              <div className="text-lg text-white font-medium">{user?.email}</div>
            </div>
            
            <div>
              <div className="text-sm text-white/50 mb-1">User ID</div>
              <div className="text-sm font-mono text-white/60 bg-white/5 p-3 rounded-xl border border-white/10 mt-2">{user?._id}</div>
            </div>
          </div>

          <div className="flex-1">
             <h3 className="text-xl text-white/90 font-medium mb-6">Update Information</h3>
             <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-2 font-medium">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-white/40 focus:bg-white/10 transition-all"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-2 font-medium">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-white/40 focus:bg-white/10 transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="pt-4">
                <label className="block text-sm text-white/60 mb-2 font-medium">New Password <span className="text-white/30 text-xs ml-1">(leave blank to keep current)</span></label>
                <input
                  type="password"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-white/40 focus:bg-white/10 transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength="6"
                />
              </div>
              
              {password && (
                  <div>
                    <label className="block text-sm text-white/60 mb-2 font-medium">Confirm New Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-white/40 focus:bg-white/10 transition-all"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      minLength="6"
                    />
                  </div>
              )}

              <button 
                type="submit" 
                className="w-full md:w-auto mt-6 py-3 px-8 bg-white text-black font-semibold rounded-xl hover:bg-white/90 transition-colors disabled:opacity-50 cursor-pointer flex justify-center" 
                disabled={loading}
              >
                {loading ? <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" /> : 'Update Profile'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
