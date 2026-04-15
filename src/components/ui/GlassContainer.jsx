import React from 'react';
import { motion } from 'framer-motion';

export const GlassContainer = ({ children, className = '', ...props }) => {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl ${className}`}
      {...props}
    >
      {/* 
        The actual blur layer: 25px blur
        We use an absolute backdrop layer because doing it directly on the wrapper can clip weirdly on some browsers
      */}
      <div 
        className="absolute inset-0 -z-10 pointer-events-none" 
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(25px)',
          WebkitBackdropFilter: 'blur(25px)',
        }}
      />
      
      {/* simulated glass thickness border gradient */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none rounded-2xl border-[1.5px] border-transparent"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%) border-box',
          WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      {/* Content wrapper */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
};
