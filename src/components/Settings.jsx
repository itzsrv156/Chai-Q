import React from 'react';
import { motion } from 'framer-motion';
import { GlassContainer } from './ui/GlassContainer';
import { Settings as SettingsIcon, Sliders, Activity } from 'lucide-react';

export const Settings = ({ settings, setSettings }) => {
  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSlider = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: Number(value) }));
  };

  return (
    <motion.div 
      key="settings-view"
      initial={{ opacity: 0, scale: 0.98, filter: 'blur(5px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 1.02, filter: 'blur(5px)' }}
      transition={{ duration: 0.4 }}
      className="w-full h-full flex flex-col items-center justify-start pt-4 pb-16 overflow-y-auto"
    >
      <div className="w-full max-w-4xl">
        <div className="mb-8 pl-1">
          <h2 className="text-3xl font-bold mb-2 tracking-tight flex items-center gap-3">
            <SettingsIcon size={28} className="text-[#c02c3a]" />
            System Control Panel
          </h2>
          <p className="text-gray-400 text-sm">Modify global dashboard logic, telemetry pipelines, and visual optics.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Telemetry settings */}
          <GlassContainer className="p-6 flex flex-col gap-6">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <Activity size={20} className="text-[#d4af37]" />
              <h3 className="text-lg font-semibold text-white">Telemetry Engine</h3>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <div className="flex flex-col">
                <span className="font-medium text-gray-200">Live Data Jitter</span>
                <span className="text-gray-500 text-xs mt-1">Simulate high-frequency physical anomalies</span>
              </div>
              
              <button 
                onClick={() => handleToggle('liveDataJitter')}
                className={`w-12 h-6 rounded-full relative transition-colors border border-white/10 ${settings.liveDataJitter ? 'bg-[#c02c3a]' : 'bg-[#050505]'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-[3px] transition-all ${settings.liveDataJitter ? 'left-[26px]' : 'left-1'}`} />
              </button>
            </div>
            
            <div className="flex flex-col mt-2 gap-3 text-sm">
              <div className="flex justify-between items-end">
                 <div className="flex flex-col">
                   <span className="font-medium text-gray-200">Pulse Alert Threshold</span>
                   <span className="text-gray-500 text-xs mt-1">Capacity % triggering critical red map pulse</span>
                 </div>
                 <span className="font-bold text-[#c02c3a]">{settings.alertThreshold}%</span>
              </div>
              <input 
                type="range" 
                min="50" max="99" 
                value={settings.alertThreshold}
                onChange={(e) => handleSlider('alertThreshold', e.target.value)}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#c02c3a]"
              />
            </div>
          </GlassContainer>

          {/* Core Optics */}
          <GlassContainer className="p-6 flex flex-col gap-6">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <Sliders size={20} className="text-[#4ade80]" />
              <h3 className="text-lg font-semibold text-white">Visual Optics</h3>
            </div>
            
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between items-end">
                 <div className="flex flex-col">
                   <span className="font-medium text-gray-200">Glass UI Opacity</span>
                   <span className="text-gray-500 text-xs mt-1">Background tint opacity for panels</span>
                 </div>
                 <span className="font-bold text-gray-300">{Math.round(settings.glassOpacity * 100)}%</span>
              </div>
              <input 
                type="range" 
                min="0" max="15" 
                value={Math.round(settings.glassOpacity * 100)}
                onChange={(e) => handleSlider('glassOpacity', e.target.value / 100)}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
              />
            </div>

            <div className="flex flex-col gap-3 text-sm mt-4">
              <div className="flex justify-between items-end">
                 <div className="flex flex-col">
                   <span className="font-medium text-gray-200">Refraction Blur</span>
                   <span className="text-gray-500 text-xs mt-1">Backdrop filter intensity (px)</span>
                 </div>
                 <span className="font-bold text-gray-300">{settings.blurIntensity}px</span>
              </div>
              <input 
                type="range" 
                min="0" max="40" 
                value={settings.blurIntensity}
                onChange={(e) => handleSlider('blurIntensity', e.target.value)}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
              />
            </div>
          </GlassContainer>
        </div>
      </div>
    </motion.div>
  );
};
