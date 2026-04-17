import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Users, Clock, Flame, Menu, Bell, Search, MapPin, ChevronRight, Settings, BarChart2, Terminal, ChevronDown, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { LiveMap } from './components/LiveMap';
import { useStadiumData, SECTORS } from './hooks/useStadiumData';
import { GlassContainer } from './components/ui/GlassContainer';
import { Settings as SettingsView } from './components/Settings';

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
      className="w-64 h-screen glass shrink-0 z-50 flex-col items-center py-8 gap-8 hidden md:flex rounded-none border-l-0 border-t-0 border-b-0 border-r border-white/5"
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
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 relative w-full text-left ${
                isActive ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.03)]'
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

const Header = ({ optimizationScore, onOptimize, isScanning, searchQuery, setSearchQuery, logs }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [searchFocused, setSearchFocused] = useState(false);
  
  // Basic session counter
  useEffect(() => {
    const interval = setInterval(() => setSessionSeconds(prev => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatSessionTime = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    if (val === '/optimize') {
      setSearchQuery('');
      setSearchFocused(false);
      onOptimize();
      return;
    }
    setSearchQuery(val);
  };

  const searchHits = SECTORS.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
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
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
            placeholder="Search /optimize, Gate 4, North..." 
            className="glass pl-10 pr-4 py-2 rounded-full text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#c02c3a] transition-all w-[300px]"
          />
          {/* Predictive Search Tooltip */}
          <AnimatePresence>
            {searchFocused && searchQuery.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-12 left-0 w-full glass rounded-xl p-2 flex flex-col gap-1 z-50 shadow-2xl"
              >
                <div className="px-2 text-[10px] uppercase text-gray-500 font-bold mb-1 tracking-wider">Quick Actions</div>
                {'/optimize'.includes(searchQuery.toLowerCase()) && (
                  <div className="px-3 py-2 text-xs hover:bg-[#c02c3a]/20 text-[#c02c3a] font-medium rounded-lg cursor-pointer transition-colors" onClick={onOptimize}>
                     <kbd className="bg-white/10 px-1 py-0.5 rounded text-[10px] mr-2">↵</kbd>
                     Trigger /optimize
                  </div>
                )}
                {searchHits.length > 0 && (
                  <>
                    <div className="px-2 text-[10px] uppercase text-gray-500 font-bold mb-1 mt-2 tracking-wider">Stands found</div>
                    {searchHits.map(hit => (
                      <div key={hit} className="px-3 py-2 text-xs hover:bg-white/10 text-white rounded-lg cursor-pointer transition-colors" onClick={() => setSearchQuery(hit)}>
                         Isolate {hit} Stand
                      </div>
                    ))}
                  </>
                )}
                {searchHits.length === 0 && !'/optimize'.includes(searchQuery.toLowerCase()) && (
                  <div className="px-3 py-2 text-xs text-gray-500">No strict matches found.</div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex items-center gap-6 relative">
        <div className="flex items-center gap-3 hidden lg:flex">
          <div className="flex items-center gap-2 glass px-4 py-1.5 rounded-full border border-white/5">
            <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Global Sync</span>
            <span className="text-[#d4af37] font-bold text-sm">{optimizationScore}%</span>
          </div>
          <button 
            onClick={onOptimize} 
            disabled={isScanning || optimizationScore === 99}
            className={`glass px-5 py-1.5 rounded-full font-bold tracking-widest transition-all uppercase text-[10px] flex items-center gap-2 ${
              optimizationScore >= 99 
                ? 'bg-[rgba(212,175,55,0.2)] text-[#d4af37] pointer-events-none border-[#d4af37]/30' 
                : 'bg-[rgba(192,44,58,0.2)] hover:bg-[rgba(192,44,58,0.4)] text-[#c02c3a] border-[#c02c3a]/50 shadow-[0_0_15px_rgba(192,44,58,0.3)]'
            } ${isScanning ? 'animate-pulse' : ''}`}
          >
            {optimizationScore >= 99 ? 'Synchronized' : isScanning ? 'Syncing...' : 'AI Sync Optimization'}
          </button>
        </div>

        <div className="h-6 w-px bg-white/10 hidden lg:block"></div>

        <div className="relative">
          <button 
             onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
             className="glass p-2 rounded-full relative group hover:bg-[#ffffff10] transition-colors"
          >
            <Bell size={20} className="text-gray-300 group-hover:text-white transition-colors" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#c02c3a] animate-pulse rounded-full border border-[#050505]"></span>
          </button>
          
          <AnimatePresence>
            {showNotifications && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 top-12 w-80 glass rounded-2xl p-4 shadow-2xl flex flex-col gap-3 z-50 origin-top-right border border-white/10"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-sm font-semibold">AI System Logs</span>
                  <span className="text-[10px] bg-[#c02c3a]/20 text-[#c02c3a] px-2 py-0.5 rounded-full">{logs.length} Total</span>
                </div>
                <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-1">
                  {logs.slice(0, 4).map(log => (
                    <div key={log.id} className="flex gap-3 items-start p-2 rounded-lg hover:bg-white/5 transition-colors">
                      <div className="mt-1 w-2 h-2 rounded-full bg-[#d4af37] shrink-0" />
                      <div className="flex flex-col gap-1 min-w-0">
                        <span className="text-xs text-gray-200 font-medium leading-tight">{log.text}</span>
                        <span className="text-[10px] text-gray-500 font-mono">{log.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative">
          <div 
             onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
             className="flex items-center gap-3 glass py-1.5 px-1.5 pr-4 rounded-full cursor-pointer hover:bg-[rgba(255,255,255,0.05)] transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#8f1a26] to-[#d4af37] p-[2px]">
              <div className="w-full h-full bg-[#050505] rounded-full overflow-hidden border border-transparent">
                 <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>
            <span className="text-sm font-medium text-gray-200">Admin</span>
          </div>

          <AnimatePresence>
            {showProfile && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 top-14 w-64 glass rounded-2xl p-5 shadow-2xl flex flex-col gap-4 z-50 origin-top-right border border-white/10"
              >
                 <div className="flex flex-col items-center gap-3 border-b border-white/10 pb-4">
                    <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" className="w-16 h-16 rounded-full border-2 border-[#d4af37]" />
                    <div className="text-center">
                      <h4 className="text-sm font-bold text-white">Sarvesh</h4>
                      <p className="text-xs text-[#c02c3a] font-medium">System Operator</p>
                    </div>
                 </div>
                 <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400">Session Duration</span>
                    <span className="text-white font-mono bg-white/10 px-2 py-1 rounded">{formatSessionTime(sessionSeconds)}</span>
                 </div>
                 <button className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-semibold text-gray-300 transition-colors">
                   Sign Out
                 </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
};

const StatCard = ({ title, value, unit, icon: Icon, color, delay }) => (
  <motion.div 
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5, delay }}
    className="glass rounded-2xl p-6 flex flex-col relative overflow-hidden group cursor-pointer border border-[#ffffff10]"
  >
    <div className="flex justify-between items-start mb-4">
      <p className="text-gray-400 font-medium text-sm lg:text-xs xl:text-sm">{title}</p>
      <div className="glass p-2 rounded-lg bg-[rgba(255,255,255,0.02)] border-white/5" style={{ color }}>
        <Icon size={18} />
      </div>
    </div>
    
    <div className="flex items-end gap-1 text-white relative z-10 min-w-0">
      <h3 className="text-3xl xl:text-4xl font-bold tracking-tight truncate">{value}</h3>
      <span className="text-gray-400 text-xs xl:text-sm mb-1">{unit}</span>
    </div>
  </motion.div>
);

const CustomAreaTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass p-3 rounded-lg border border-white/10 shadow-xl bg-[#050505]/80 !backdrop-blur-md">
        <p className="text-gray-400 text-xs mb-2 border-b border-white/5 pb-1">{label}</p>
        <div className="flex flex-col gap-1.5">
          <p className="text-sm font-semibold flex items-center gap-2">
             <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#c02c3a' }} />
             <span className="text-[#c02c3a]">Actual:</span>
             <span className="text-white">{payload[0].value} p/hr</span>
          </p>
          <p className="text-sm font-semibold flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-transparent border border-white/50" />
             <span className="text-gray-300">Predicted:</span>
             <span className="text-white">{payload[1].value} p/hr</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const DashboardContent = ({ data, selectedSector, setSelectedSector, settings }) => {
  const { logs, flowTrajectoryData, getStatsFor } = data;
  const logsEndRef = useRef(null);

  const activeStats = getStatsFor(selectedSector);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <motion.div 
      key="dashboard"
      initial={{ opacity: 0, scale: 0.98, filter: 'blur(5px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 1.02, filter: 'blur(5px)' }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="w-full h-full flex flex-col lg:flex-row gap-6 max-h-full"
    >
      <div className="flex-1 flex flex-col min-w-0 h-full">
        <div className="mb-6 pl-1 shrink-0 flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold mb-1 tracking-tight">Facility Overview</h2>
            <p className="text-gray-400 text-sm">
              Live telemetry for <span className="text-white font-medium">{selectedSector === 'All' ? 'Global Operations' : selectedSector + ' Stand'}</span>.
            </p>
          </div>
          
          <div className="relative">
             <select 
               value={selectedSector}
               onChange={(e) => setSelectedSector(e.target.value)}
               className="glass appearance-none pl-4 pr-10 py-2 rounded-full text-sm font-medium focus:outline-none cursor-pointer bg-transparent border-white/10 hover:border-white/20 transition-colors"
             >
               <option value="All" className="bg-[#050505]">All Sectors</option>
               {SECTORS.map(s => <option key={s} value={s} className="bg-[#050505]">{s} Stand</option>)}
             </select>
             <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6 shrink-0">
          <StatCard title="Wait Time" value={activeStats.waitTime.toFixed(2)} unit="min" icon={Clock} color="#c02c3a" delay={0.1} />
          <StatCard title="Density" value={activeStats.density.toFixed(1)} unit="%" icon={Users} color="#d4af37" delay={0.2} />
          <StatCard title="Throughput" value={activeStats.throughput.toFixed(0)} unit="p/hr" icon={Activity} color="#f0df99" delay={0.3} />
          <StatCard title="Activity" value={activeStats.activity} unit="" icon={Flame} color={activeStats.density >= settings.alertThreshold ? "#ff4d4d" : "#4ade80"} delay={0.4} />
        </div>

        <GlassContainer className="flex-1 flex flex-col p-6 min-h-0 border border-white/5">
          <div className="flex justify-between items-center mb-6 shrink-0">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse"></span>
              Flow Trajectory AI Analysis
            </h3>
            <div className="flex items-center gap-4 text-xs font-medium border border-white/5 bg-white/5 rounded-full px-3 py-1">
               <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-[2px] bg-[#c02c3a]" /> Actual Flow</div>
               <div className="flex items-center gap-1.5"><span className="w-2 h-0.5 border-b border-dashed border-white" /> AI Forecast</div>
            </div>
          </div>
          
          <div className="flex-1 w-full relative min-h-[200px]">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={flowTrajectoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                 <defs>
                   <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#c02c3a" stopOpacity={0.6}/>
                     <stop offset="95%" stopColor="#c02c3a" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                 <XAxis dataKey="time" stroke="rgba(255,255,255,0.3)" fontSize={11} tickMargin={10} axisLine={false} tickLine={false} />
                 <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} axisLine={false} tickLine={false} />
                 <RechartsTooltip content={<CustomAreaTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                 {/* Multi-Series Line rendering */}
                 <Area type="monotone" dataKey="actual" stroke="#c02c3a" strokeWidth={3} fillOpacity={1} fill="url(#colorActual)" animationDuration={1000} />
                 <Area type="monotone" dataKey="predicted" stroke="rgba(255,255,255,0.6)" strokeWidth={2} strokeDasharray="5 5" fill="none" dot={false} animationDuration={1000} />
               </AreaChart>
             </ResponsiveContainer>
          </div>
        </GlassContainer>
      </div>

      <GlassContainer className="w-full lg:w-80 xl:w-96 shrink-0 flex flex-col p-6 h-full border border-white/5">
        <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4 shrink-0">
          <div className="p-2 rounded border border-white/10 bg-white/5 text-[#d4af37]">
            <Terminal size={16} />
          </div>
          <h3 className="font-semibold text-white tracking-wide">System Intelligence</h3>
        </div>
        
        <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-4 font-mono text-xs z-10">
          <AnimatePresence initial={false}>
            {logs.map((log) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: 'auto' }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-1 border-l-2 border-[#c02c3a] pl-3 py-1 relative"
              >
                <div className="absolute -left-[18px] top-1.5 w-2 h-2 rounded-full bg-[#c02c3a]"></div>
                <div className="text-[10px] text-gray-500 font-medium">
                  {log.time}
                </div>
                <div className="text-gray-300 leading-relaxed font-medium">
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

// ... AnalyticsTab and PlaceholderContent remain essentially the same, 
// ensuring data flow keeps them working correctly.

const AnalyticsTab = ({ data }) => {
  const { historicalData } = data;
  const [timeWindow, setTimeWindow] = useState(240); // Max 240 mins ago
  
  const handleSlider = (e) => {
    setTimeWindow(parseInt(e.target.value, 10));
  };
  
  const chartData = historicalData.slice(historicalData.length - timeWindow);

  return (
    <motion.div 
      key="analytics"
      initial={{ opacity: 0, scale: 0.98, filter: 'blur(5px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 1.02, filter: 'blur(5px)' }}
      transition={{ duration: 0.4 }}
      className="w-full h-full flex flex-col"
    >
      <div className="mb-6 pl-1 shrink-0">
        <h2 className="text-3xl font-bold mb-1 tracking-tight">Crowd Analytics Deep-Dive</h2>
        <p className="text-gray-400 text-sm">Historical Density Trends (Last 4 Hours)</p>
      </div>

      <GlassContainer className="flex-1 w-full p-8 flex flex-col relative min-h-0 border-white/5">
         <div className="flex-1 w-full relative">
           <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="time" stroke="rgba(255,255,255,0.4)" fontSize={12} tickMargin={10} axisLine={false} tickLine={false} />
                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} unit="%" domain={[0, 100]} axisLine={false} tickLine={false} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'rgba(5,5,5,0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ fontSize: '13px', fontWeight: '500' }}
                />
                <Line type="monotone" dataKey="North" stroke="#c02c3a" strokeWidth={2} dot={false} isAnimationActive={false} />
                <Line type="monotone" dataKey="East" stroke="#d4af37" strokeWidth={2} dot={false} isAnimationActive={false} />
                <Line type="monotone" dataKey="South" stroke="#4ade80" strokeWidth={2} dot={false} isAnimationActive={false} />
                <Line type="monotone" dataKey="West" stroke="#60a5fa" strokeWidth={2} dot={false} isAnimationActive={false} />
              </LineChart>
           </ResponsiveContainer>
         </div>
         
         <div className="mt-8 shrink-0 flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs text-gray-400 font-medium tracking-wider uppercase">
              <span>T-240m</span>
              <span>Time-Travel Scope: Last {timeWindow} minutes</span>
              <span className="text-[#d4af37]">LIVE</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="240" 
              value={timeWindow} 
              onChange={handleSlider}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#c02c3a]"
            />
         </div>
      </GlassContainer>
    </motion.div>
  );
};

const PlaceholderContent = ({ title }) => (
  <motion.div
    key={title}
    initial={{ opacity: 0, scale: 0.98, filter: 'blur(5px)' }}
    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
    exit={{ opacity: 0, scale: 1.02, filter: 'blur(5px)' }}
    transition={{ duration: 0.4, ease: "easeInOut" }}
    className="w-full h-full flex flex-col items-center justify-center p-8"
  >
    <GlassContainer className="px-12 py-16 flex flex-col items-center text-center w-full max-w-lg border-white/5">
      <Activity size={48} className="text-[#333] mb-4" />
      <h2 className="text-2xl font-bold text-gray-300 mb-2">{title}</h2>
      <p className="text-gray-500 text-sm">Module is currently offline or undergoing maintenance.</p>
    </GlassContainer>
  </motion.div>
);

export default function App() {
  const [mounted, setMounted] = useState(false);
  const [currentView, setCurrentView] = useState('Dashboard');
  
  const [optimizationScore, setOptimizationScore] = useState(74);
  const [isScanning, setIsScanning] = useState(false);

  const [selectedSector, setSelectedSector] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // GLOBAL SETTINGS STATE
  const [settings, setSettings] = useState({
    liveDataJitter: true,
    glassOpacity: 0.02,
    blurIntensity: 10,
    alertThreshold: 80
  });

  const stadiumData = useStadiumData(settings.liveDataJitter);

  // Auto-filtering selected sector directly from search logic when exact matches exist
  useEffect(() => {
    if (searchQuery) {
       const exact = SECTORS.find(s => s.toLowerCase() === searchQuery.toLowerCase());
       if (exact) setSelectedSector(exact);
    }
  }, [searchQuery]);

  // Inject CSS Custom Properties for live Glass UI update
  useEffect(() => {
    document.documentElement.style.setProperty('--glass-bg-opacity', settings.glassOpacity);
    document.documentElement.style.setProperty('--glass-blur', `${settings.blurIntensity}px`);
  }, [settings.glassOpacity, settings.blurIntensity]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOptimize = () => {
    if (isScanning || optimizationScore >= 99) return;
    setIsScanning(true);
    let score = optimizationScore;
    const target = 99;
    const intervalTime = 50;
    const steps = 2000 / intervalTime;
    const increment = (target - score) / steps;
    
    stadiumData.addLog("Initiating Global Stadium Flow Synchronization...");

    const interval = setInterval(() => {
      score += increment;
      if (score >= target) {
        setOptimizationScore(99);
        setIsScanning(false);
        clearInterval(interval);
        
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#c02c3a', '#d4af37', '#ffffff'],
          disableForReducedMotion: true,
          zIndex: 9999
        });
        
        stadiumData.addLog("Stadium Flow Synchronized. Average wait time reduced by 22%.");
      } else {
        setOptimizationScore(Math.floor(score));
      }
    }, intervalTime);
  };

  if (!mounted) return null;

  return (
    <div className="flex h-screen bg-[#050505] text-white font-sans overflow-hidden selection:bg-[#c02c3a]/30 relative">
      <AnimatePresence>
        {isScanning && (
          <motion.div 
            initial={{ top: '-20%' }}
            animate={{ top: '120%' }}
            exit={{ top: '120%', opacity: 0 }}
            transition={{ duration: 2, ease: "linear" }}
            className="fixed left-0 w-full h-[15vh] bg-gradient-to-b from-transparent via-[#c02c3a]/30 to-[#c02c3a]/60 border-b-2 border-[#c02c3a] z-[100] pointer-events-none shadow-[0_0_50px_rgba(192,44,58,0.8)] mix-blend-screen"
          />
        )}
      </AnimatePresence>

      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      
      <main className="flex-1 flex flex-col relative z-0 min-w-0">
        <Header 
          optimizationScore={optimizationScore} 
          onOptimize={handleOptimize} 
          isScanning={isScanning} 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          logs={stadiumData.logs}
        />
        
        <div className="p-4 md:p-8 w-full z-10 flex-1 flex flex-col relative overflow-hidden">
          <AnimatePresence mode="wait">
            {currentView === 'Dashboard' && (
              <DashboardContent 
                key="dashboard" 
                data={stadiumData} 
                selectedSector={selectedSector}
                setSelectedSector={setSelectedSector}
                settings={settings}
              />
            )}
            {currentView === 'Live Map' && (
              <LiveMap 
                key="live-map" 
                data={stadiumData}
                selectedSector={selectedSector}
                setSelectedSector={setSelectedSector}
                searchQuery={searchQuery}
                alertThreshold={settings.alertThreshold}
              />
            )}
            {currentView === 'Analytics' && <AnalyticsTab key="analytics" data={stadiumData} />}
            {currentView === 'Settings' && <SettingsView key="settings" settings={settings} setSettings={setSettings} />}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
