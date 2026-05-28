import { useContext, useState, useEffect, useMemo } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Clock, User, Mail, Shield, ArrowRight,
  Fingerprint, Settings, Bell, Calendar,
  CheckCircle2, TrendingUp, Sparkles, Star,
  Eye, EyeOff, Copy, Check, ChevronRight
} from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
};

const getFormattedDate = () => {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showId, setShowId] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const memberSince = useMemo(() => {
    if (!user?.createdAt) return null;
    return new Date(user.createdAt).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  }, [user]);

  const handleCopyId = () => {
    navigator.clipboard.writeText(user?._id || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const quickActions = [
    {
      icon: User,
      title: 'Edit Profile',
      desc: 'Update your name, email, or password',
      link: '/profile',
      gradient: 'from-violet-500/20 to-fuchsia-500/10'
    },
    {
      icon: Settings,
      title: 'Account Settings',
      desc: 'Manage preferences and security',
      link: '/profile',
      gradient: 'from-blue-500/20 to-cyan-500/10'
    },
    {
      icon: Bell,
      title: 'Notifications',
      desc: 'Stay updated with alerts',
      link: null,
      gradient: 'from-amber-500/20 to-orange-500/10',
      soon: true
    },
  ];

  const stats = [
    { label: 'Account Status', value: 'Active', icon: CheckCircle2, color: 'text-emerald-400' },
    { label: 'Security Level', value: 'Strong', icon: Shield, color: 'text-blue-400' },
    { label: 'Member Since', value: memberSince || 'Today', icon: Calendar, color: 'text-violet-400' },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full max-w-6xl space-y-8"
    >
      {/* ───── Hero / Greeting ───── */}
      <motion.div variants={item} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <p className="text-sm text-white/30 mb-3">{getFormattedDate()}</p>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-[-0.02em] bg-gradient-to-br from-white via-white/90 to-white/50 bg-clip-text text-transparent leading-[1.1]"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            {getGreeting()}, {user?.name?.split(' ')[0] || 'User'}
          </h1>
          <p className="text-base text-white/40 mt-3 max-w-lg">
            Welcome to your personal dashboard. Manage your account and stay on top of everything.
          </p>
        </div>

        {/* Live clock */}
        <div className="glass-pill border border-white/10 px-5 py-2.5 flex items-center gap-3 shrink-0">
          <Clock className="w-4 h-4 text-white/40" />
          <span className="text-sm text-white/60 font-mono tabular-nums">
            {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
        </div>
      </motion.div>

      {/* ───── Stats Row ───── */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="liquid-glass rounded-2xl p-6 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-xs text-white/35 uppercase tracking-wider font-medium">{stat.label}</p>
              <p className="text-lg text-white font-medium mt-0.5">{stat.value}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* ───── Main Content: Profile Card + Activity ───── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Profile Overview */}
        <motion.div variants={item} className="lg:col-span-2 liquid-glass rounded-3xl p-8 flex flex-col">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-white/10 to-white/[0.03] border border-white/10 flex items-center justify-center text-3xl font-medium text-white mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <h3 className="text-xl text-white font-medium">{user?.name || 'User'}</h3>
            <p className="text-sm text-white/40 mt-1">Personal Account</p>
          </div>

          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <Mail className="w-4 h-4 text-white/30 shrink-0" />
              <span className="text-sm text-white/60 truncate">{user?.email}</span>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <Fingerprint className="w-4 h-4 text-white/30 shrink-0" />
              <span className="text-sm text-white/40 font-mono truncate flex-1">
                {showId ? user?._id : '••••••••••••••••••••••••'}
              </span>
              <button onClick={() => setShowId(!showId)} className="text-white/25 hover:text-white/50 transition-colors cursor-pointer">
                {showId ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
              <button onClick={handleCopyId} className="text-white/25 hover:text-white/50 transition-colors cursor-pointer">
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {memberSince && (
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <Calendar className="w-4 h-4 text-white/30 shrink-0" />
                <span className="text-sm text-white/40">Joined {memberSince}</span>
              </div>
            )}
          </div>

          <Link
            to="/profile"
            className="mt-6 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors"
          >
            <Settings className="w-4 h-4" /> Manage Account
          </Link>
        </motion.div>

        {/* Recent Activity + Tips */}
        <motion.div variants={item} className="lg:col-span-3 space-y-6">
          {/* Welcome Card */}
          <div className="liquid-glass rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-violet-500/8 to-transparent rounded-bl-full pointer-events-none" />
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/10 border border-white/[0.08] flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-violet-300" />
              </div>
              <div>
                <h3 className="text-lg text-white font-medium mb-1">Welcome to AuthSys</h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  Your account is set up and ready to go. You can manage your profile, update your credentials, and customize your settings from this dashboard.
                </p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="liquid-glass rounded-3xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg text-white font-medium">Recent Activity</h3>
              <span className="text-xs text-white/25">Last 7 days</span>
            </div>

            <div className="space-y-1">
              {[
                { action: 'Account created successfully', time: memberSince || 'Just now', icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                { action: 'Profile information saved', time: memberSince || 'Just now', icon: User, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                { action: 'Logged into dashboard', time: 'Just now', icon: TrendingUp, color: 'text-violet-400', bg: 'bg-violet-500/10' },
              ].map((activity, i) => (
                <div key={i} className="flex items-center gap-4 p-3.5 rounded-xl hover:bg-white/[0.02] transition-colors">
                  <div className={`w-9 h-9 rounded-lg ${activity.bg} flex items-center justify-center shrink-0`}>
                    <activity.icon className={`w-4 h-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white/70">{activity.action}</p>
                    <p className="text-xs text-white/25 mt-0.5">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ───── Quick Actions ───── */}
      <motion.div variants={item}>
        <h3 className="text-lg text-white font-medium mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quickActions.map((action) => {
            const Wrapper = action.link && !action.soon ? Link : 'div';
            const wrapperProps = action.link && !action.soon ? { to: action.link } : {};

            return (
              <Wrapper
                key={action.title}
                {...wrapperProps}
                className="group liquid-glass rounded-2xl p-6 hover:bg-white/[0.03] transition-all duration-500 cursor-pointer flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.gradient} border border-white/[0.06] flex items-center justify-center`}>
                    <action.icon className="w-5 h-5 text-white/70" />
                  </div>
                  {action.soon ? (
                    <span className="text-[10px] uppercase tracking-wider text-white/30 font-medium bg-white/5 px-2.5 py-1 rounded-full">Soon</span>
                  ) : (
                    <ChevronRight className="w-4 h-4 text-white/15 group-hover:text-white/40 group-hover:translate-x-0.5 transition-all" />
                  )}
                </div>
                <h4 className="text-white font-medium mb-1">{action.title}</h4>
                <p className="text-sm text-white/35 leading-relaxed">{action.desc}</p>
              </Wrapper>
            );
          })}
        </div>
      </motion.div>

      {/* ───── Subtle Footer ───── */}
      <motion.div variants={item} className="text-center pb-4">
        <p className="text-xs text-white/15">
          AuthSys · Your account is secured and protected
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
