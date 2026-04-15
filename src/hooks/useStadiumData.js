import { useState, useEffect } from 'react';

const AI_THOUGHTS = [
  "Detecting bottleneck at Gate 4...",
  "Recalculating FanFlow trajectory...",
  "Sector 3 density exceeds 85%. Redirecting crowd...",
  "Analyzing queue lengths at F&B stations...",
  "Throughput optimal at Gate 2. Distributing load...",
  "Anomaly detected: sudden surge from Metro station.",
  "Adjusting dynamic signage to reroute foot traffic...",
  "Predicting +15% density influx in the next 10 minutes."
];

export const useStadiumData = () => {
  const [stats, setStats] = useState({
    waitTime: 12.04,
    density: 84.2,
    throughput: 340,
    gateActivity: "High"
  });
  
  const [logs, setLogs] = useState([
    { 
      id: Date.now(), 
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }), 
      text: "[AI]: System initialized. Monitoring active." 
    }
  ]);

  useEffect(() => {
    // Jitter stats to simulate a hyper-realistic data stream
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        waitTime: Math.max(0, prev.waitTime + (Math.random() * 0.4 - 0.2)),
        density: Math.max(0, Math.min(100, prev.density + (Math.random() * 1.5 - 0.75))),
        throughput: Math.max(0, prev.throughput + Math.floor((Math.random() * 6 - 3)))
      }));
    }, 1500); // Pulse every 1.5s
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Generate AI intelligence logs randomly
    const logInterval = setInterval(() => {
      const newThought = AI_THOUGHTS[Math.floor(Math.random() * AI_THOUGHTS.length)];
      setLogs(prev => {
        const nextLogs = [{
          id: Date.now(),
          time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          text: `[AI]: ${newThought}`
        }, ...prev];
        return nextLogs.slice(0, 15); // Keep the latest 15 logs
      });
    }, 5000 + Math.random() * 4000); // Randomly every 5 to 9 seconds
    
    return () => clearInterval(logInterval);
  }, []);

  return { stats, logs };
};
