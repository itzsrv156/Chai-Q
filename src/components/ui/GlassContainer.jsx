import React from 'react';
import { motion } from 'framer-motion';

export const GlassContainer = ({ children, className = '', ...props }) => {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-3xl ${className}`}
      style={{
        background: 'rgba(255, 255, 255, var(--glass-bg-opacity, 0.02))',
        backdropFilter: 'blur(var(--glass-blur, 10px))',
        WebkitBackdropFilter: 'blur(var(--glass-blur, 10px))',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}
      {...props}
    >
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
};
