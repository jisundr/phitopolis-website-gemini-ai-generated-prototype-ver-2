import React, { useEffect, useState } from 'react';
import { ArrowRight, Code2, TrendingUp, ShieldCheck, Activity, Zap } from 'lucide-react';
import { PageState } from '../types';
import NetworkBackground from '../components/NetworkBackground';

interface HomeProps {
  setPage: (page: PageState) => void;
}

// --- Component: Simulated Market Data Ticker ---
const FinancialTicker = () => {
  const tickerItems = [
    "BTC/USD +1.2%", "ETH/USD +0.8%", "VIX -4.2", "LATENCY: 4ms", 
    "EXEC_RATE: 99.9%", "GOOGL +23.4", "AWS_SPOT: OPTIMAL", 
    "HKG_MKR: OPEN", "SPX 4520.5", "NSDQ 14300.2", "YIELD 4.1%",
    "ALPHA_SIG_9: DETECTED", "MEM_POOL: CLEAR", "REPLICA_LAG: 0ms"
  ];

  return (
    <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 -z-10 overflow-hidden opacity-[0.08] pointer-events-none select-none">
      <div className="flex whitespace-nowrap gap-12 animate-[scroll_30s_linear_infinite]">
        {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
          <span key={`r1-${i}`} className="text-6xl md:text-8xl font-sans font-bold text-white tracking-tighter">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

// --- Component: Trading Signal Widget ---
const TradingSignalWidget = () => {
  const [latency, setLatency] = useState(12);
  const [alpha, setAlpha] = useState(0.85);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(prev => Math.max(8, Math.min(25, prev + (Math.random() - 0.5) * 5)));
      setAlpha(prev => Math.max(0.1, Math.min(0.99, prev + (Math.random() - 0.5) * 0.05)));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative z-10 p-8 bg-phito-blue/90 border border-white/10 backdrop-blur-md rounded-phito shadow-2xl max-w-md w-full animate-in slide-in-from-right-10 duration-1000">
      <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-phito-yellow animate-pulse" />
          <span className="font-mono text-xs text-phito-yellow tracking-widest uppercase">System Optimal</span>
        </div>
        <span className="font-mono text-xs text-gray-400">HKG-LND-NYC</span>
      </div>

      <div className="space-y-8">
        {/* Metric 1: Latency */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-gray-300">
              <Zap className="w-4 h-4 text-phito-yellow" />
              <span className="text-sm font-bold uppercase tracking-wide">Execution Latency</span>
            </div>
            <div className="font-mono text-white text-lg">
              {latency.toFixed(2)}<span className="text-phito-yellow text-xs ml-1">μs</span>
            </div>
          </div>
          <div className="h-1 w-full bg-blue-900 rounded-full overflow-hidden">
            <div 
              className="h-full bg-phito-yellow transition-all duration-300 ease-out" 
              style={{ width: `${(latency / 30) * 100}%` }} 
            />
          </div>
        </div>

        {/* Metric 2: Alpha Signal */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-gray-300">
              <Activity className="w-4 h-4 text-phito-yellow" />
              <span className="text-sm font-bold uppercase tracking-wide">Alpha Correlation</span>
            </div>
            <div className="font-mono text-white text-lg">
              {alpha.toFixed(4)}
            </div>
          </div>
          <div className="flex gap-1 h-8 items-end">
            {[40, 60, 30, 80, 50, 90, 70, 40, 60].map((h, i) => (
                <div key={i} className="flex-1 bg-blue-800 hover:bg-phito-yellow transition-colors duration-300 rounded-t-[1px]" style={{ height: `${h}%`}}></div>
            ))}
          </div>
        </div>
        
        {/* Code Snippet */}
        <div className="bg-black/30 rounded-phito p-4 font-mono text-xs space-y-2 border border-white/5 text-gray-400">
          <div className="flex justify-between">
            <span className="text-phito-yellow">signals</span>
            <span className="text-white">= <span className="text-blue-300">Model</span>.predict(ticks)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-phito-yellow">orders</span>
            <span className="text-white">= <span className="text-blue-300">Optimizer</span>.route(signals)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Home: React.FC<HomeProps> = ({ setPage }) => {
  return (
    <div className="w-full">
      
      {/* Hero Section - STRICT BRAND BLUE */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-phito-blue overflow-hidden">
        
        {/* Network Background constrained to Hero */}
        <div className="absolute inset-0 z-0 opacity-40">
            <NetworkBackground />
        </div>
        
        <FinancialTicker />

        <div className="max-w-grid mx-auto w-full px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          
          {/* Text Content */}
          <div className="space-y-10 animate-in slide-in-from-left-10 duration-700 fade-in order-2 lg:order-1">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-900/50 border border-phito-yellow/20 rounded-phito backdrop-blur-sm">
              <div className="w-2 h-2 bg-phito-yellow rounded-full animate-pulse"></div>
              <span className="text-phito-yellow text-xs font-bold tracking-widest uppercase">Recruiting Elite Talent</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-sans font-bold tracking-tight text-white leading-none">
              Defining<br/>
              The <span className="text-phito-yellow">Edge</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-lg leading-relaxed font-light font-sans">
              We architect the distributed systems and high-frequency infrastructure that the world's most sophisticated hedge funds rely on.
            </p>
            
            {/* CTA Buttons: Swiss Style, Boxy */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => setPage(PageState.CAREERS)}
                className="px-8 py-5 bg-phito-yellow text-phito-blue font-bold tracking-wide rounded-phito hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2 shadow-lg uppercase"
              >
                JOIN US 
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setPage(PageState.EXPERTISE)}
                className="px-8 py-5 border-2 border-white text-white font-bold tracking-wide rounded-phito hover:bg-white hover:text-phito-blue transition-all flex items-center justify-center uppercase"
              >
                OUR SERVICES
              </button>
            </div>
          </div>
          
          {/* Interactive Visualization (Graphic Right) */}
          <div className="flex justify-end items-center h-[500px] md:h-[600px] w-full order-1 lg:order-2">
             <TradingSignalWidget />
          </div>
        </div>
      </section>

      {/* About Section: Clean, Swiss, White Background */}
      <section className="py-20 bg-phito-white border-b border-gray-200">
        <div className="max-w-grid mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4">
                <h2 className="text-4xl font-sans font-bold text-phito-blue mb-6 leading-tight">
                    The Phitopolis Standard.
                </h2>
                <div className="h-2 w-24 bg-phito-yellow rounded-full" />
            </div>
            
            <div className="md:col-span-8 space-y-8 text-lg text-phito-dark leading-relaxed font-sans">
              <p className="font-medium text-xl">
                At Phitopolis, we operate at the intersection of advanced mathematics and elite software engineering. We aren't just an outsourcing arm; we are the R&D engine for global financial giants.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 pt-8">
                <div>
                   <h3 className="font-bold text-phito-blue mb-3 text-lg">Silicon Valley Culture</h3>
                   <p className="text-gray-600">
                    We’ve stripped away the bureaucracy to focus on what matters: code, architecture, and innovation. Our culture is built on intellectual curiosity.
                   </p>
                </div>
                <div>
                   <h3 className="font-bold text-phito-blue mb-3 text-lg">Wall Street Precision</h3>
                   <p className="text-gray-600">
                    Our systems handle billions of dollars in transactions with microsecond latency, demanding a level of precision found only in the highest echelons of finance.
                   </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* "Why Phitopolis" Feature Section - 3 Column, Strict 64px Padding */}
      <section className="py-16 bg-phito-light">
        <div className="max-w-grid mx-auto px-6">
          <div className="mb-12 text-center">
             <h2 className="text-3xl font-sans font-bold text-phito-blue">Why Phitopolis?</h2>
             <div className="h-1 w-16 bg-phito-yellow mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
             {/* Card 1 */}
             <div className="bg-white p-8 rounded-phito border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-6">
                    <Code2 className="w-10 h-10 text-phito-blue" />
                </div>
                <h3 className="text-xl font-bold text-phito-blue mb-3">Elite Engineering</h3>
                <p className="text-gray-600 leading-relaxed font-sans">
                   Architecting solutions with Python, React, and AWS for massive scale. We don't just write code; we build engines.
                </p>
             </div>

             {/* Card 2 */}
             <div className="bg-white p-8 rounded-phito border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-6">
                    <TrendingUp className="w-10 h-10 text-phito-blue" />
                </div>
                <h3 className="text-xl font-bold text-phito-blue mb-3">Quantitative Research</h3>
                <p className="text-gray-600 leading-relaxed font-sans">
                   Turning theoretical mathematical models into production-grade systems. Where data science meets high-frequency execution.
                </p>
             </div>

             {/* Card 3 */}
             <div className="bg-white p-8 rounded-phito border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-6">
                    <ShieldCheck className="w-10 h-10 text-phito-blue" />
                </div>
                <h3 className="text-xl font-bold text-phito-blue mb-3">Reliability & Security</h3>
                <p className="text-gray-600 leading-relaxed font-sans">
                   High-availability infrastructure with zero-tolerance for failure. Our systems are designed to never sleep.
                </p>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;