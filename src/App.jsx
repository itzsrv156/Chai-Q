import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Users, Clock, Flame, Menu, Bell, Search, MapPin, ChevronRight, Settings, BarChart2, Terminal } from 'lucide-react';
import { LiveMap } from './components/LiveMap';
import { useStadiumData } from './hooks/useStadiumData';
import { GlassContainer } from './components/ui/GlassContainer';

const Sidebar = ({ currentView, setCurrentView }) => {
  const navItems = [
    { name: 'Dashboard', icon: Activity },
    { name: 'Live Map', icon: MapPin },
    { name: 'Analytics', icon: BarChart2 },
    { name: 'Settings', icon: Settings }
  ];

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-64 h-screen glass shrink-0 z-50 flex-col items-center py-8 gap-8 hidden md:flex rounded-none border-l-0 border-t-0 border-b-0 border-r border-[#ffffff10]"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c02c3a] to-[#8f1a26] flex items-center justify-center shadow-[0_0_15px_rgba(192,44,58,0.5)]">
          <Flame size={24} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
          CHAI<span className="text-[#c02c3a]">-Q</span>
        </h1>
      </div>

      <nav className="w-full px-4 flex flex-col gap-2 mt-8">
        {navItems.map((item) => {
          const isActive = currentView === item.name;
          const Icon = item.icon;
          return (
            <button
              key={item.name}
              onClick={() => setCurrentView(item.name)}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 relative w-full text-left ${isActive ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.03)]'
                }`}
            >
              {isActive && (
                <motion.div
                  layoutId="active-nav-bg"
                  className="absolute inset-0 bg-gradient-to-r from-[rgba(192,44,58,0.2)] to-transparent border-l-2 border-[#c02c3a] rounded-xl z-0"
                />
              )}
              <Icon size={20} className={`relative z-10 ${isActive ? 'text-[#c02c3a]' : ''}`} />
              <span className="font-medium relative z-10">{item.name}</span>
            </button>
          )
        })}
      </nav>

      <div className="mt-auto px-6 w-full">
        <div className="glass rounded-xl p-4 flex flex-col gap-3 relative overflow-hidden text-left">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#d4af37] to-[#c02c3a]"></div>
          <h4 className="text-sm font-semibold text-white">System Twin</h4>
          <p className="text-xs text-gray-400">M. Chinnaswamy Status: Optimal</p>
        </div>
      </div>
    </motion.aside>
  )
};

const Header = () => (
  <motion.header
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.1 }}
    className="h-20 w-full flex items-center justify-between px-8 z-40 shrink-0"
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
          className="glass pl-10 pr-4 py-2 rounded-full text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#c02c3a] transition-all w-64"
        />
      </div>
    </div>

    <div className="flex items-center gap-4">
      <button className="glass p-2 rounded-full relative group hover:bg-[#ffffff10] transition-colors">
        <Bell size={20} className="text-gray-300 group-hover:text-white transition-colors" />
        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#c02c3a] animate-pulse rounded-full border border-[#050505]"></span>
      </button>
      <div className="flex items-center gap-3 glass py-1.5 px-1.5 pr-4 rounded-full cursor-pointer hover:bg-[rgba(255,255,255,0.05)] transition-colors">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#8f1a26] to-[#d4af37] p-[2px]">
          <div className="w-full h-full bg-[#050505] rounded-full overflow-hidden border border-transparent">
            <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
        <span className="text-sm font-medium text-gray-200">Admin</span>
      </div>
    </div>
  </motion.header>
);

const StatCard = ({ title, value, unit, icon: Icon, color, delay }) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5, delay }}
    className="glass rounded-2xl p-6 flex flex-col relative overflow-hidden group cursor-pointer border border-[#ffffff10]"
  >
    <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 blur-2xl transition-all group-hover:opacity-20" style={{ background: color }}></div>

    <div className="flex justify-between items-start mb-4">
      <p className="text-gray-400 font-medium text-sm lg:text-xs xl:text-sm">{title}</p>
      <div className="glass p-2 rounded-lg bg-[rgba(255,255,255,0.02)]" style={{ color }}>
        <Icon size={18} />
      </div>
    </div>

    <div className="flex items-end gap-1 text-white relative z-10 min-w-0">
      <h3 className="text-3xl xl:text-4xl font-bold tracking-tight truncate">{value}</h3>
      <span className="text-gray-400 text-xs xl:text-sm mb-1">{unit}</span>
    </div>
  </motion.div>
);

const DashboardContent = ({ data }) => {
  const { stats, logs } = data;
  const logsEndRef = useRef(null);

  // Auto-scroll intel logs
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <motion.div
      key="dashboard"
      initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="w-full h-full flex flex-col lg:flex-row gap-6 max-h-full"
    >
      {/* Left Column (Main Analytics) */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        <div className="mb-6 pl-1 shrink-0">
          <h2 className="text-3xl font-bold mb-1 tracking-tight">Facility Overview</h2>
          <p className="text-gray-400 text-sm">Live telemetry for Gate 4 Fan Zone.</p>
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6 shrink-0">
          <StatCard title="Wait Time" value={stats.waitTime.toFixed(2)} unit="min" icon={Clock} color="#c02c3a" delay={0.1} />
          <StatCard title="Density" value={stats.density.toFixed(1)} unit="%" icon={Users} color="#d4af37" delay={0.2} />
          <StatCard title="Throughput" value={stats.throughput} unit="p/hr" icon={Activity} color="#f0df99" delay={0.3} />
          <StatCard title="Activity" value={stats.gateActivity} unit="" icon={Flame} color="#ff4d4d" delay={0.4} />
        </div>

        {/* Live Camera Trajectory */}
        <GlassContainer className="flex-1 flex flex-col p-6 min-h-0 border border-[#ffffff10]">
          <div className="flex justify-between items-center mb-4 shrink-0">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#c02c3a] animate-pulse"></span>
              Live Camera Feed: Gate 4
            </h3>
            <button className="text-xs text-[#c02c3a] hover:text-white transition-colors flex items-center gap-1">
              Expand Feed <ChevronRight size={14} />
            </button>
          </div>

          <div className="flex-1 w-full rounded-xl border border-[#ffffff10] bg-[#050505] flex items-center justify-center relative overflow-hidden group min-h-[200px]">

            {/* CCTV Noise Simulation using SVG filter & CSS Jitter */}
            <div className="absolute inset-0 mix-blend-overlay opacity-30 pointer-events-none noise-overlay" style={{ animation: 'noise-jitter 0.2s infinite linear' }}>
              <svg width="100%" height="100%">
                <filter id="noise">
                  <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noise)" />
              </svg>
            </div>

            {/* Abstract Trajectory Path rendering over CCTV */}
            <svg className="absolute inset-0 w-full h-full opacity-60 z-10" preserveAspectRatio="none" viewBox="0 0 1000 200">
              <path d="M0,150 Q200,180 350,100 T700,120 T1000,50" fill="none" stroke="url(#grad1)" strokeWidth="3" />
              <path d="M0,180 Q250,160 400,140 T800,90 T1000,80" fill="none" stroke="red" strokeWidth="1" strokeDasharray="5,5" opacity="0.4" />
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#c02c3a" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#d4af37" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#c02c3a" stopOpacity="0.1" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute top-4 right-4 bg-black/60 px-3 py-1 rounded text-[10px] font-mono text-white/70 border border-white/5 flex gap-3">
              <span>REC</span><span>1080P</span><span>29.97 FPS</span>
            </div>
          </div>
        </GlassContainer>
      </div>

      {/* Right Column (Agentic Intelligence Log) */}
      <GlassContainer className="w-full lg:w-80 xl:w-96 shrink-0 flex flex-col p-6 h-full border border-[#ffffff10]">
        <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4 shrink-0">
          <div className="p-2 rounded bg-white/5 text-[#d4af37]">
            <Terminal size={18} />
          </div>
          <h3 className="font-semibold text-white tracking-wide">System Intelligence</h3>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-4 font-mono text-xs">
          <AnimatePresence initial={false}>
            {logs.map((log) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: 'auto' }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-1 border-l-2 border-[#c02c3a] pl-3 py-1"
              >
                <div className="text-[10px] text-gray-500">
                  {log.time}
                </div>
                <div className="text-gray-300 leading-relaxed font-medium">
                  {/* highlight "[AI]:" */}
                  <span className="text-[#c02c3a]">{log.text.substring(0, 5)}</span>
                  {log.text.substring(5)}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={logsEndRef} />
        </div>
      </GlassContainer>
    </motion.div>
  );
};

const PlaceholderContent = ({ title }) => (
  <motion.div
    key={title}
    initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
    exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
    className="w-full h-full flex flex-col items-center justify-center p-8"
  >
    <GlassContainer className="px-12 py-16 flex flex-col items-center border border-white/10 w-full max-w-lg">
      <Activity size={48} className="text-[#333] mb-4" />
      <h2 className="text-2xl font-bold text-gray-300 mb-2">{title}</h2>
      <p className="text-gray-500 text-center">Module is currently offline or undergoing maintenance.</p>
    </GlassContainer>
  </motion.div>
);

export default function App() {
  const [mounted, setMounted] = useState(false);
  const [currentView, setCurrentView] = useState('Dashboard');

  // Custom hook fetching mock live data and agentic logs
  const stadiumData = useStadiumData();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex h-screen bg-transparent text-white font-sans overflow-hidden selection:bg-[#c02c3a]/30">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />

      <main className="flex-1 flex flex-col relative z-0 min-w-0">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#c02c3a] rounded-full mix-blend-screen filter blur-[120px] opacity-[0.10] pointer-events-none z-0"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#d4af37] rounded-full mix-blend-screen filter blur-[120px] opacity-[0.10] pointer-events-none z-0"></div>

        <Header />

        <div className="p-4 md:p-8 w-full z-10 flex-1 flex flex-col relative overflow-hidden">
          <AnimatePresence mode="wait">
            {currentView === 'Dashboard' && <DashboardContent key="dashboard" data={stadiumData} />}
            {currentView === 'Live Map' && <LiveMap key="live-map" />}
            {(currentView === 'Analytics' || currentView === 'Settings') && <PlaceholderContent key={currentView} title={currentView} />}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
