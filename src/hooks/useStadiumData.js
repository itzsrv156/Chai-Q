import { useState, useEffect } from 'react';

const AI_THOUGHTS = [
  "Detecting bottleneck at North Stand...",
  "Recalculating FanFlow trajectory...",
  "East Stand density exceeds 85%. Redirecting crowd...",
  "Analyzing queue lengths at F&B stations...",
  "Throughput optimal at South Stand. Distributing load...",
  "Anomaly detected: sudden surge from West Gate.",
  "Adjusting dynamic signage to reroute foot traffic...",
  "Predicting +15% density influx in the next 10 minutes."
];

export const SECTORS = ['North', 'East', 'South', 'West'];

const generateHistoricalData = () => {
  const data = [];
  let dN = 40, dE = 50, dS = 30, dW = 45;
  for (let i = -240; i <= 0; i++) {
    dN = Math.max(0, Math.min(100, dN + (Math.random() * 4 - 2)));
    dE = Math.max(0, Math.min(100, dE + (Math.random() * 4 - 2)));
    dS = Math.max(0, Math.min(100, dS + (Math.random() * 4 - 2)));
    dW = Math.max(0, Math.min(100, dW + (Math.random() * 4 - 2)));
    data.push({
      minute: i,
      time: i === 0 ? 'Now' : `T${i}m`,
      North: Number(dN.toFixed(1)),
      East: Number(dE.toFixed(1)),
      South: Number(dS.toFixed(1)),
      West: Number(dW.toFixed(1)),
    });
  }
  return data;
};

// Generates the AreaChart data for Flow Trajectory
const generateFlowTrajectory = () => {
  return [
    { time: '17:00', actual: 120, predicted: 110 },
    { time: '17:15', actual: 210, predicted: 230 },
    { time: '17:30', actual: 350, predicted: 340 },
    { time: '17:45', actual: 520, predicted: 490 },
    { time: '18:00', actual: 480, predicted: 510 },
    { time: '18:15', actual: 590, predicted: 620 },
    { time: '18:30', actual: 780, predicted: 840 },
  ];
};

export const useStadiumData = (liveDataJitter = true) => {
  const [sectorStats, setSectorStats] = useState({
    North: { waitTime: 12.4, density: 84.2, throughput: 340, activity: "High" },
    East:  { waitTime: 8.2,  density: 61.5, throughput: 280, activity: "Moderate" },
    South: { waitTime: 4.1,  density: 35.0, throughput: 150, activity: "Low" },
    West:  { waitTime: 15.6, density: 92.1, throughput: 410, activity: "Critical" },
  });

  const [historicalData] = useState(generateHistoricalData());
  const [flowTrajectoryData, setFlowTrajectoryData] = useState(generateFlowTrajectory());

  const [logs, setLogs] = useState([
    { 
      id: Date.now(), 
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }), 
      text: "[AI]: System initialized. Monitoring active." 
    }
  ]);

  const addLog = (text) => {
    setLogs(prev => {
      const nextLogs = [{
        id: Date.now(),
        time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        text: `[AI]: ${text}`
      }, ...prev];
      return nextLogs.slice(0, 15);
    });
  };

  useEffect(() => {
    if (!liveDataJitter) return;

    const interval = setInterval(() => {
      setSectorStats(prev => {
        const next = { ...prev };
        SECTORS.forEach(s => {
          const old = prev[s];
          const newDensity = Math.max(0, Math.min(100, old.density + (Math.random() * 1.5 - 0.75)));
          let activity = "Moderate";
          if (newDensity > 80) activity = "High";
          if (newDensity > 90) activity = "Critical";
          if (newDensity < 40) activity = "Low";

          next[s] = {
            ...old,
            waitTime: Math.max(0, old.waitTime + (Math.random() * 0.4 - 0.2)),
            density: newDensity,
            throughput: Math.max(0, old.throughput + Math.floor((Math.random() * 6 - 3))),
            activity
          };
        });
        return next;
      });

      // Shift the latest flow trajectory slightly for live effect
      setFlowTrajectoryData(prev => {
         const next = [...prev];
         const last = next[next.length - 1];
         next[next.length - 1] = {
            ...last,
            actual: Math.max(0, last.actual + Math.floor(Math.random() * 10 - 5))
         };
         return next;
      });
      
    }, 1500); 
    return () => clearInterval(interval);
  }, [liveDataJitter]);

  useEffect(() => {
    if (!liveDataJitter) return;

    const logInterval = setInterval(() => {
      const newThought = AI_THOUGHTS[Math.floor(Math.random() * AI_THOUGHTS.length)];
      addLog(newThought);
    }, 5000 + Math.random() * 4000); 
    return () => clearInterval(logInterval);
  }, [liveDataJitter]);

  const globalStats = {
    waitTime: SECTORS.reduce((acc, s) => acc + sectorStats[s].waitTime, 0) / 4,
    density: SECTORS.reduce((acc, s) => acc + sectorStats[s].density, 0) / 4,
    throughput: SECTORS.reduce((acc, s) => acc + sectorStats[s].throughput, 0),
    activity: SECTORS.some(s => sectorStats[s].density > 85) ? "High" : "Moderate"
  };

  const getStatsFor = (sector) => {
    if (!sector || sector === 'All') return globalStats;
    if (sector.toLowerCase().includes('gate 4')) return sectorStats.North;
    
    let match = 'All';
    SECTORS.forEach(s => {
      if (sector.toLowerCase().includes(s.toLowerCase())) match = s;
    });
    return match === 'All' ? globalStats : sectorStats[match];
  };

  return { getStatsFor, sectorStats, historicalData, flowTrajectoryData, logs, addLog };
};
