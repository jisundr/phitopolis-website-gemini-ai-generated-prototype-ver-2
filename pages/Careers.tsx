import React, { useState } from 'react';
import { JobPosition, CareerTab } from '../types';
import { MapPin, Clock, ArrowRight, Terminal, Cpu, Cloud, Database, GraduationCap, Coffee, Globe, Users, Code } from 'lucide-react';

const JOBS: JobPosition[] = [
  {
    id: '1',
    title: 'Senior Python Engineer',
    department: 'Backend Engineering',
    location: 'Taguig, PH (Hybrid)',
    type: 'Full-time',
    description: 'Build high-throughput data pipelines and distributed systems using Python and AWS. Experience with asyncio and pandas required.'
  },
  {
    id: '2',
    title: 'React Frontend Architect',
    department: 'Frontend Engineering',
    location: 'Taguig, PH (Hybrid)',
    type: 'Full-time',
    description: 'Lead the development of complex data visualization dashboards for trading systems. Deep knowledge of React rendering lifecycle and D3/Canvas is essential.'
  },
  {
    id: '3',
    title: 'Quantitative Developer',
    department: 'Research',
    location: 'Taguig, PH (On-site)',
    type: 'Full-time',
    description: 'Work alongside researchers to implement mathematical models into production code. Strong C++ or Python skills and a math background required.'
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    department: 'Infrastructure',
    location: 'Remote / Taguig',
    type: 'Full-time',
    description: 'Manage CI/CD pipelines, AWS infrastructure, and ensure 99.99% system availability using Terraform and Kubernetes.'
  }
];

const Careers: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CareerTab>(CareerTab.OPEN_ROLES);

  const TabButton = ({ tab, label, icon: Icon }: { tab: CareerTab, label: string, icon: any }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center gap-2 px-8 py-4 rounded-phito font-bold text-sm tracking-wide transition-all border-2 ${
        activeTab === tab 
          ? 'bg-phito-blue text-white border-phito-blue shadow-lg' 
          : 'bg-white text-gray-500 border-gray-200 hover:border-phito-blue hover:text-phito-blue'
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );

  return (
    <div className="bg-phito-light min-h-screen pb-20">
      
      {/* Header - Blue Band */}
      <div className="bg-phito-blue py-20 px-6">
          <div className="max-w-grid mx-auto text-center space-y-6">
            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
              Join the <span className="text-phito-yellow">Elite.</span>
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto font-light">
              We are looking for problem solvers, math enthusiasts, and engineering perfectionists to build the future of financial technology.
            </p>
          </div>
      </div>

      {/* Navigation Tabs - Floating overlap */}
      <div className="max-w-grid mx-auto px-6 -mt-8 mb-16 relative z-10">
        <div className="flex flex-wrap justify-center gap-4 bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-white/20 shadow-sm inline-flex">
            <TabButton tab={CareerTab.OPEN_ROLES} label="Open Roles" icon={Terminal} />
            <TabButton tab={CareerTab.TECH_STACK} label="Tech Stack" icon={Cpu} />
            <TabButton tab={CareerTab.LIFE} label="Life at Phitopolis" icon={Coffee} />
            <TabButton tab={CareerTab.GRADUATE} label="Graduate Program" icon={GraduationCap} />
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-grid mx-auto px-6 min-h-[500px]">
        
        {/* TAB: OPEN ROLES */}
        {activeTab === CareerTab.OPEN_ROLES && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-2xl font-bold text-phito-blue mb-8 border-l-4 border-phito-yellow pl-4">Current Opportunities</h3>
            <div className="grid gap-6">
              {JOBS.map((job) => (
                <div 
                  key={job.id}
                  className="group bg-white border border-gray-200 hover:border-phito-blue p-8 rounded-phito transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm hover:shadow-xl"
                >
                  <div className="space-y-3">
                    <h4 className="text-2xl font-bold text-phito-blue group-hover:text-phito-blue/80">{job.title}</h4>
                    <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-500">
                      <span className="flex items-center gap-2"><Terminal className="w-4 h-4 text-phito-yellow" /> {job.department}</span>
                      <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-phito-yellow" /> {job.location}</span>
                      <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-phito-yellow" /> {job.type}</span>
                    </div>
                    <p className="text-gray-600 max-w-2xl pt-2 leading-relaxed">{job.description}</p>
                  </div>
                  <button className="whitespace-nowrap px-8 py-4 bg-phito-blue text-white rounded-phito font-bold hover:bg-blue-900 transition-all flex items-center gap-2 shadow-lg">
                    APPLY NOW <ArrowRight size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: TECH STACK */}
        {activeTab === CareerTab.TECH_STACK && (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-2xl font-bold text-phito-blue mb-8 border-l-4 border-phito-yellow pl-4">Our Engineering DNA</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: 'Python', icon: Terminal, desc: 'The backbone of our data analysis and backend services. We use Pandas, NumPy, and FastAPI.' },
                { name: 'React & TS', icon: Globe, desc: 'Building complex, low-latency financial dashboards with real-time WebSocket data feeds.' },
                { name: 'AWS Cloud', icon: Cloud, desc: 'Cloud-native architecture utilizing Lambda, ECS, S3, and Redshift for massive scalability.' },
                { name: 'C++', icon: Code, desc: 'For high-frequency trading components where microsecond latency matters most.' },
                { name: 'PostgreSQL', icon: Database, desc: 'Robust data persistence and complex querying for our research datasets.' },
                { name: 'Docker & K8s', icon: ServerIcon, desc: 'Containerized deployments ensuring consistency from development to production.' },
              ].map((tech, i) => (
                <div key={i} className="p-8 bg-white border border-gray-200 rounded-phito hover:border-phito-blue transition-all group shadow-sm hover:shadow-lg">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-blue-50 text-phito-blue rounded-lg group-hover:bg-phito-blue group-hover:text-phito-yellow transition-colors">
                      <tech.icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-phito-blue text-lg">{tech.name}</h4>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{tech.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: LIFE */}
        {activeTab === CareerTab.LIFE && (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
             <div className="bg-white rounded-phito border border-gray-200 overflow-hidden shadow-sm">
                <div className="grid md:grid-cols-2">
                    <div className="p-12 space-y-8 flex flex-col justify-center">
                        <h3 className="text-3xl font-bold text-phito-blue">Work Hard, <span className="text-phito-yellow">Innovate Harder</span></h3>
                        <p className="text-gray-600 text-lg leading-relaxed">
                        Located in the heart of BGC, Taguig, our office is designed for collaboration. We believe in a flat hierarchy where the best ideas win, regardless of your title.
                        </p>
                        <ul className="space-y-4">
                        {[
                            "Weekly 'Tech Talks' and knowledge sharing",
                            "Fully stocked pantry and barista-grade coffee",
                            "Annual team retreats to world-class destinations",
                            "Sponsorship for conferences and continued learning"
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-phito-dark font-medium">
                            <div className="w-2 h-2 rounded-full bg-phito-yellow" />
                            {item}
                            </li>
                        ))}
                        </ul>
                    </div>
                    <div className="bg-gray-100 p-12 grid grid-cols-2 gap-4">
                         <div className="bg-white p-6 rounded-phito shadow-sm text-center flex flex-col items-center justify-center gap-3">
                             <Users className="w-8 h-8 text-phito-blue" />
                             <span className="font-bold text-phito-blue">Collaborative</span>
                         </div>
                         <div className="bg-white p-6 rounded-phito shadow-sm text-center flex flex-col items-center justify-center gap-3">
                             <Coffee className="w-8 h-8 text-phito-yellow" />
                             <span className="font-bold text-phito-blue">Perks</span>
                         </div>
                         <div className="bg-white p-6 rounded-phito shadow-sm text-center flex flex-col items-center justify-center gap-3">
                             <Globe className="w-8 h-8 text-phito-blue" />
                             <span className="font-bold text-phito-blue">Global</span>
                         </div>
                         <div className="bg-white p-6 rounded-phito shadow-sm text-center flex flex-col items-center justify-center gap-3">
                             <Cpu className="w-8 h-8 text-phito-yellow" />
                             <span className="font-bold text-phito-blue">Tech</span>
                         </div>
                    </div>
                </div>
             </div>
          </div>
        )}

        {/* TAB: GRADUATE */}
        {activeTab === CareerTab.GRADUATE && (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
             <div className="bg-phito-blue rounded-phito p-10 md:p-16 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative z-10 max-w-4xl">
                  <div className="inline-block px-4 py-1 rounded-full bg-phito-yellow/20 border border-phito-yellow/50 text-phito-yellow text-sm font-bold mb-8 uppercase tracking-wider">
                    Phitopolis Academy
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">Launch Your Career at <br/>Light Speed.</h3>
                  <p className="text-xl text-blue-100 mb-10 leading-relaxed max-w-2xl">
                    Our Graduate Analyst Program is designed for top-tier mathematics, computer science, and engineering graduates. 
                    You won't fetch coffee; you'll deploy code to production in your first month.
                  </p>
                  
                  <button className="px-10 py-5 bg-phito-yellow text-phito-blue font-bold rounded-phito hover:bg-white hover:text-phito-blue transition-all shadow-lg text-lg">
                    APPLY FOR 2025 COHORT
                  </button>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper icon
const ServerIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className}
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
    <line x1="6" y1="6" x2="6.01" y2="6"></line>
    <line x1="6" y1="18" x2="6.01" y2="18"></line>
  </svg>
);

export default Careers;