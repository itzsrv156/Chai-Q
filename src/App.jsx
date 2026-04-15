import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Users, Clock, Flame, Menu, Bell, Search, MapPin, ChevronRight } from 'lucide-react';

const Sidebar = () => (
  <motion.aside 
    initial={{ x: -100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="w-64 h-screen glass border-r border-[rgba(255,255,255,0.05)] flex flex-col items-center py-8 gap-8 hidden md:flex"
  >
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rcb-red to-rcb-darkRed flex items-center justify-center shadow-[0_0_15px_rgba(192,44,58,0.5)]">
        <Flame size={24} className="text-white" />
      </div>
      <h1 className="text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
        CHAI<span className="text-rcb-red">-Q</span>
      </h1>
    </div>

    <nav className="w-full px-4 flex flex-col gap-2 mt-8">
      {['Dashboard', 'Live Map', 'Analytics', 'Settings'].map((item, i) => (
        <a 
          key={item} 
          href="#" 
          className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
            i === 0 
              ? 'bg-gradient-to-r from-[rgba(192,44,58,0.2)] to-transparent border-l-2 border-rcb-red text-white' 
              : 'text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.03)]'
          }`}
        >
          {i === 0 ? <Activity size={20} className="text-rcb-red" /> : null}
          {i === 1 ? <MapPin size={20} /> : null}
          {i === 2 ? <Users size={20} /> : null}
          {i === 3 ? <Menu size={20} /> : null}
          <span className="font-medium">{item}</span>
        </a>
      ))}
    </nav>

    <div className="mt-auto px-6 w-full">
      <div className="glass rounded-xl p-4 flex flex-col gap-3 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rcb-gold to-rcb-red"></div>
        <h4 className="text-sm font-semibold text-white">Match Day Live</h4>
        <p className="text-xs text-gray-400">RCB vs CSK - M. Chinnaswamy Stadium</p>
      </div>
    </div>
  </motion.aside>
);

const Header = () => (
  <motion.header 
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.1 }}
    className="h-20 w-full flex items-center justify-between px-8 z-10"
  >
    <div className="flex items-center gap-4">
      <button className="md:hidden glass p-2 rounded-lg">
        <Menu size={20} className="text-white" />
      </button>
      <div className="relative hidden md:block">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input 
          type="text" 
          placeholder="Search zones..." 
          className="glass pl-10 pr-4 py-2 rounded-full text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-rcb-red transition-all w-64"
        />
      </div>
    </div>

    <div className="flex items-center gap-4">
      <button className="glass p-2 rounded-full relative group">
        <Bell size={20} className="text-gray-300 group-hover:text-white transition-colors" />
        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-rcb-gold rounded-full border border-[#050505]"></span>
      </button>
      <div className="flex items-center gap-3 glass py-1.5 px-1.5 pr-4 rounded-full cursor-pointer hover:bg-[rgba(255,255,255,0.05)] transition-colors">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rcb-darkRed to-rcb-gold p-[2px]">
          <div className="w-full h-full bg-[#050505] rounded-full overflow-hidden border border-transparent">
             <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
        <span className="text-sm font-medium text-gray-200">Admin</span>
      </div>
    </div>
  </motion.header>
);

const StatCard = ({ title, value, unit, icon: Icon, trend, color, delay }) => (
  <motion.div 
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5, delay }}
    className="glass rounded-2xl p-6 flex flex-col relative overflow-hidden group cursor-pointer hover:bg-[rgba(255,255,255,0.05)] transition-all"
  >
    <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 blur-2xl transition-all group-hover:opacity-20`} style={{ background: color }}></div>
    
    <div className="flex justify-between items-start mb-4">
      <p className="text-gray-400 font-medium text-sm">{title}</p>
      <div className="glass p-2 rounded-lg" style={{ color }}>
        <Icon size={20} />
      </div>
    </div>
    
    <div className="flex items-end gap-2 text-white">
      <h3 className="text-4xl font-bold tracking-tight">{value}</h3>
      <span className="text-gray-400 text-sm mb-1">{unit}</span>
    </div>
    
    <div className="mt-4 flex items-center gap-2">
      <span className={`text-xs font-semibold px-2 py-1 rounded w-fit ${trend.startsWith('+') ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'}`}>
        {trend}
      </span>
      <span className="text-xs text-gray-500">vs last hour</span>
    </div>
  </motion.div>
);

export default function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex h-screen bg-[#050505] text-white font-sans overflow-hidden selection:bg-rcb-red/30">
      <Sidebar />
      
      <main className="flex-1 flex flex-col relative z-0 overflow-y-auto overflow-x-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-rcb-red rounded-full mix-blend-screen filter blur-[120px] opacity-10 pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rcb-gold rounded-full mix-blend-screen filter blur-[120px] opacity-10 pointer-events-none"></div>
        
        <Header />
        
        <div className="p-8 max-w-7xl mx-auto w-full z-10 flex-1 flex flex-col">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold mb-2">Facility Overview</h2>
            <p className="text-gray-400">Live analytics for Gate 4 Fan Zone.</p>
          </motion.div>

          {/* KPI Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard 
              title="Est. Wait Time" 
              value="12" 
              unit="min" 
              icon={Clock} 
              trend="+2m" 
              color="#c02c3a" 
              delay={0.3} 
            />
            <StatCard 
              title="Crowd Density" 
              value="84" 
              unit="%" 
              icon={Users} 
              trend="+5%" 
              color="#d4af37" 
              delay={0.4} 
            />
            <StatCard 
              title="Throughput" 
              value="340" 
              unit="p/hr" 
              icon={Activity} 
              trend="-12 p/hr" 
              color="#f0df99" 
              delay={0.5} 
            />
            <StatCard 
              title="Gate Activity" 
              value="High" 
              unit="" 
              icon={Flame} 
              trend="+15%" 
              color="#ff4d4d" 
              delay={0.6} 
            />
          </div>

          {/* Main Content Area / Chart Placeholder */}
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="glass rounded-3xl flex-1 flex flex-col p-6 relative overflow-hidden"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Flow Trajectory</h3>
              <button className="text-sm text-rcb-red hover:text-white transition-colors flex items-center gap-1">
                View Full Report <ChevronRight size={16} />
              </button>
            </div>
            
            <div className="flex-1 rounded-xl border border-[rgba(255,255,255,0.05)] bg-[rgba(0,0,0,0.2)] flex items-center justify-center relative overflow-hidden group">
               {/* Abstract decorative graph lines */}
               <svg className="absolute inset-0 w-full h-full opacity-30 group-hover:opacity-50 transition-opacity" preserveAspectRatio="none">
                  <path d="M0,100 Q150,200 300,50 T600,100 T1200,80" fill="none" stroke="url(#grad1)" strokeWidth="4" />
                  <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#c02c3a" stopOpacity="0.2" />
                      <stop offset="50%" stopColor="#d4af37" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#c02c3a" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
               </svg>
               <div className="text-center z-10 glass px-6 py-4 rounded-xl">
                  <p className="text-gray-300 font-medium tracking-widest text-sm uppercase mb-2">Live AI Projection</p>
                  <p className="text-xs text-gray-500">Awaiting datastream from camera feeds...</p>
               </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
