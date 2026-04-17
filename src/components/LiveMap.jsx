import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassContainer } from './ui/GlassContainer';
import { SECTORS } from '../hooks/useStadiumData';

const STAND_PATHS = {
  North: "M 200 80 Q 400 -20 600 80 L 530 160 Q 400 80 270 160 Z",
  South: "M 200 520 Q 400 620 600 520 L 530 440 Q 400 520 270 440 Z",
  West: "M 130 140 Q 30 300 130 460 L 210 400 Q 130 300 210 200 Z",
  East: "M 670 140 Q 770 300 670 460 L 590 400 Q 670 300 590 200 Z"
};

const STAND_LABELS = {
  North: { x: 400, y: 70 },
  South: { x: 400, y: 560 },
  West: { x: 90, y: 300 },
  East: { x: 710, y: 300 }
};

export const LiveMap = ({ data, selectedSector, setSelectedSector, searchQuery, alertThreshold = 80 }) => {
  const { sectorStats } = data;
  const [hoveredSector, setHoveredSector] = useState(null);

  const checkHighlight = (sector) => {
    if (!searchQuery) return false;
    const q = searchQuery.toLowerCase();
    if (q === '') return false;
    if (sector.toLowerCase().includes(q)) return true;
    if (sector === 'North' && q.includes('gate 4')) return true; // Gate 4 maps to North
    return false;
  };

  return (
    <motion.div 
      key="livemap"
      initial={{ opacity: 0, scale: 0.98, filter: 'blur(5px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 1.02, filter: 'blur(5px)' }}
      transition={{ duration: 0.4 }}
      className="w-full h-full flex flex-col items-center justify-center pt-4"
    >
      <div className="w-full flex justify-between items-end mb-6 z-20">
        <div>
          <h3 className="text-3xl font-bold text-white tracking-tight">Interactive Stadium Twin</h3>
          <p className="text-sm text-gray-400 mt-1">Select a stand to isolate telemetry data.</p>
        </div>
        {selectedSector !== 'All' && (
          <button 
            onClick={() => setSelectedSector('All')}
            className="text-xs text-[#c02c3a] border border-[#c02c3a]/30 px-4 py-1.5 rounded-full hover:bg-[#c02c3a]/10 transition-colors"
          >
            Clear Selection
          </button>
        )}
      </div>

      <GlassContainer className="flex-1 w-full relative overflow-hidden flex items-center justify-center p-8">
        
        {/* Dynamic Glowing Aura for Search Hint */}
        <AnimatePresence>
          {searchQuery && SECTORS.some(s => checkHighlight(s)) && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none mix-blend-screen z-0"
              style={{
                 background: `radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.4) 0%, transparent 60%)`
              }}
            />
          )}
        </AnimatePresence>

        <svg 
          viewBox="0 0 800 600" 
          className="w-full h-full max-h-[70vh] z-10 drop-shadow-2xl overflow-visible"
        >
          {/* PITCH */}
          <ellipse cx="400" cy="300" rx="120" ry="180" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
          <circle cx="400" cy="300" r="40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          <line x1="280" y1="300" x2="520" y2="300" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          <text x="400" y="305" textAnchor="middle" fill="rgba(255,255,255,0.1)" fontSize="14" fontWeight="bold" letterSpacing="4" pointerEvents="none">
            PITCH
          </text>

          {/* STANDS */}
          {SECTORS.map((sector) => {
            const density = sectorStats[sector].density;
            const isHigh = density >= alertThreshold;
            const isSelected = selectedSector === sector;
            const isHovered = hoveredSector === sector;
            const isHighlighted = checkHighlight(sector);

            // Determine Styles
            let fillOpts = isSelected ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.02)";
            let strokeOpts = isSelected ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.1)";

            if (isHigh) {
              fillOpts = isSelected ? "rgba(192, 44, 58, 0.6)" : "rgba(192, 44, 58, 0.3)";
              strokeOpts = isSelected ? "#ffffff" : "rgba(192, 44, 58, 0.8)";
            }

            if (isHighlighted) {
              fillOpts = "rgba(212, 175, 55, 0.5)";
              strokeOpts = "rgba(212, 175, 55, 1)";
            }

            if (isHovered && !isSelected) {
              fillOpts = isHigh ? "rgba(192, 44, 58, 0.5)" : "rgba(255,255,255,0.08)";
            }

            return (
              <g 
                key={sector} 
                onClick={() => setSelectedSector(isSelected ? 'All' : sector)}
                onMouseEnter={() => setHoveredSector(sector)}
                onMouseLeave={() => setHoveredSector(null)}
                className="cursor-pointer transition-all outline-none"
              >
                <motion.path 
                  d={STAND_PATHS[sector]}
                  fill={fillOpts}
                  stroke={strokeOpts}
                  strokeWidth={isSelected ? 2 : 1}
                  animate={isHigh && !isSelected && !isHighlighted ? {
                    opacity: [0.6, 1, 0.6],
                  } : { opacity: 1 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.02 }}
                  style={{ transformOrigin: "center" }}
                />
                
                {/* Labels and Occupancy Tags */}
                <text 
                  x={STAND_LABELS[sector].x} 
                  y={STAND_LABELS[sector].y}
                  textAnchor="middle" 
                  fill={isSelected ? "#fff" : "rgba(255,255,255,0.6)"} 
                  fontSize="14" 
                  fontWeight="600"
                  pointerEvents="none"
                  className="transition-colors drop-shadow-md"
                >
                  {sector}
                </text>
                <text 
                  x={STAND_LABELS[sector].x} 
                  y={STAND_LABELS[sector].y + 18}
                  textAnchor="middle" 
                  fill={isHigh ? "#ff8a8a" : "rgba(255,255,255,0.4)"} 
                  fontSize="12" 
                  fontWeight="bold"
                  pointerEvents="none"
                  className="transition-colors"
                >
                  {density.toFixed(1)}%
                </text>
              </g>
            );
          })}
        </svg>
      </GlassContainer>
    </motion.div>
  );
};
