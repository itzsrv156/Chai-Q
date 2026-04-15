import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassContainer } from './ui/GlassContainer';

const generateSectors = () => {
  const sectors = [];
  for (let i = 0; i < 24; i++) {
    sectors.push({
      id: `SEC-${i + 1}`,
      occupancy: Math.floor(Math.random() * 100),
    });
  }
  return sectors;
};

export const LiveMap = () => {
  const [sectors, setSectors] = useState(generateSectors());
  const [showHeatmap, setShowHeatmap] = useState(false);

  useEffect(() => {
    // Pulse random updates every 2.5 seconds to simulate live data
    const interval = setInterval(() => {
      setSectors(generateSectors());
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="w-full h-full flex flex-col gap-6"
    >
      <div className="flex justify-between items-center z-20">
        <div>
          <h3 className="text-2xl font-bold text-white tracking-wide">Paddock Pulse Map</h3>
          <p className="text-sm text-gray-400">Live Grid Overview & Heatmap Overlays</p>
        </div>
        
        <button 
          onClick={() => setShowHeatmap(!showHeatmap)}
          className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
            showHeatmap 
              ? 'bg-[#c02c3a] text-white shadow-[0_0_15px_rgba(192,44,58,0.4)]' 
              : 'bg-white/10 text-gray-300 hover:bg-white/20'
          }`}
        >
          <div className={`w-2 h-2 rounded-full ${showHeatmap ? 'bg-white animate-pulse' : 'bg-transparent'}`}></div>
          {showHeatmap ? 'Heatmap Active' : 'Enable Heatmap'}
        </button>
      </div>

      <GlassContainer className="flex-1 w-full relative overflow-hidden flex items-center justify-center p-8 border border-white/5">
        
        {/* Heatmap Overlay */}
        <AnimatePresence>
          {showHeatmap && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 pointer-events-none mix-blend-screen z-10"
              style={{
                 background: `radial-gradient(circle at 30% 30%, rgba(192, 44, 58, 0.9) 0%, transparent 45%),
                              radial-gradient(circle at 70% 70%, rgba(192, 44, 58, 0.7) 0%, transparent 50%),
                              radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.6) 0%, transparent 60%)`
              }}
            />
          )}
        </AnimatePresence>
        
        {/* Grid Area Map */}
        <div className="relative z-20 w-full h-full max-h-[600px] grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 content-center">
          {sectors.map((sector) => {
            const isHigh = sector.occupancy > 80;
            const isMedium = sector.occupancy > 50 && sector.occupancy <= 80;
            const color = isHigh ? '#c02c3a' : isMedium ? '#d4af37' : '#2e3035';
            
            return (
              <motion.div
                key={sector.id}
                layoutId={`sector-${sector.id}`}
                whileHover={{ scale: 1.1, zIndex: 30 }}
                className="aspect-square relative rounded-xl overflow-hidden glass cursor-pointer border border-[#ffffff10]"
              >
                {/* Background pulse layer */}
                <motion.div 
                  className="absolute inset-0 -z-10 mix-blend-screen"
                  animate={{
                    opacity: [0.1, isHigh ? 0.6 : isMedium ? 0.3 : 0.1, 0.1],
                  }}
                  transition={{ 
                    duration: 2 + Math.random(), 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: Math.random() * 2
                  }}
                  style={{ backgroundColor: color }}
                />
                
                {/* Content */}
                <div className="w-full h-full flex flex-col items-center justify-center relative z-10">
                  <span className="text-white/90 font-bold text-sm md:text-md tracking-wider">{sector.id}</span>
                  <div className="mt-1 flex items-center gap-1">
                    <div className={`w-1.5 h-1.5 rounded-full`} style={{ backgroundColor: color }}></div>
                    <span className="text-xs text-gray-300 font-medium">{sector.occupancy}%</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </GlassContainer>
    </motion.div>
  );
};
