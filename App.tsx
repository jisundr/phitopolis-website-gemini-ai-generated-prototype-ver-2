import React, { useState } from 'react';
import { HashRouter } from 'react-router-dom';
import Home from './pages/Home';
import Careers from './pages/Careers';
import { PageState } from './types';
import { Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageState>(PageState.HOME);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case PageState.HOME:
        return <Home setPage={setCurrentPage} />;
      case PageState.CAREERS:
        return <Careers />;
      case PageState.EXPERTISE:
        return <Home setPage={setCurrentPage} />;
      default:
        return <Home setPage={setCurrentPage} />;
    }
  };

  const NavLink = ({ page, label }: { page: PageState; label: string }) => (
    <button
      onClick={() => {
        setCurrentPage(page);
        setMobileMenuOpen(false);
      }}
      className={`text-sm font-semibold tracking-wide transition-colors uppercase ${
        currentPage === page ? 'text-phito-yellow' : 'text-gray-300 hover:text-white'
      }`}
    >
      {label}
    </button>
  );

  return (
    <HashRouter>
      <div className="min-h-screen bg-phito-light font-sans flex flex-col">
        
        {/* Navbar - Fixed, Full Width Blue Background, Centered Grid Content */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-phito-blue text-white shadow-md">
          <div className="max-w-grid mx-auto px-6 h-20 flex items-center justify-between">
            {/* Logo */}
            <div 
              className="flex items-center gap-3 cursor-pointer group" 
              onClick={() => setCurrentPage(PageState.HOME)}
            >
              <div className="w-10 h-10 bg-phito-yellow text-phito-blue rounded-phito flex items-center justify-center font-bold text-xl shadow-sm">
                P
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-none tracking-tight font-sans">PHITOPOLIS</span>
                <span className="text-[10px] uppercase tracking-widest text-phito-yellow opacity-0 group-hover:opacity-100 transition-opacity">Systems</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <NavLink page={PageState.HOME} label="Home" />
              <NavLink page={PageState.EXPERTISE} label="Expertise" />
              <NavLink page={PageState.CAREERS} label="Careers" />
              <button className="px-6 py-2 bg-transparent border-2 border-phito-yellow text-phito-yellow hover:bg-phito-yellow hover:text-phito-blue font-bold rounded-phito text-sm transition-all uppercase tracking-wide">
                Client Login
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white hover:text-phito-yellow transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Nav */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-phito-blue border-t border-blue-900 p-6 flex flex-col gap-6 animate-in slide-in-from-top-5 shadow-xl">
              <NavLink page={PageState.HOME} label="Home" />
              <NavLink page={PageState.EXPERTISE} label="Expertise" />
              <NavLink page={PageState.CAREERS} label="Careers" />
            </div>
          )}
        </nav>

        {/* Main Content */}
        <main className="flex-grow pt-20">
          {renderPage()}
        </main>

        {/* Footer */}
        <footer className="bg-phito-blue text-white py-20 border-t border-blue-900">
          <div className="max-w-grid mx-auto px-6 grid md:grid-cols-4 gap-12 text-sm">
            <div className="space-y-6">
              <h5 className="font-bold text-xl text-white font-sans">PHITOPOLIS</h5>
              <p className="text-gray-300 leading-relaxed max-w-xs">
                Making tomorrow's technology available today. We build the infrastructure that powers global finance.
              </p>
            </div>
            <div>
              <h5 className="text-phito-yellow font-bold mb-6 uppercase tracking-wider">Location</h5>
              <p className="text-gray-300">Bonifacio Global City</p>
              <p className="text-gray-300">Taguig, Metro Manila</p>
              <p className="text-gray-300">Philippines</p>
            </div>
            <div>
              <h5 className="text-phito-yellow font-bold mb-6 uppercase tracking-wider">Connect</h5>
              <div className="space-y-3">
                <p className="text-gray-300 hover:text-phito-yellow cursor-pointer transition-colors">LinkedIn</p>
                <p className="text-gray-300 hover:text-phito-yellow cursor-pointer transition-colors">Twitter</p>
                <p className="text-gray-300 hover:text-phito-yellow cursor-pointer transition-colors">GitHub</p>
              </div>
            </div>
            <div>
              <h5 className="text-phito-yellow font-bold mb-6 uppercase tracking-wider">Legal</h5>
              <div className="space-y-3">
                <p className="text-gray-300 hover:text-phito-yellow cursor-pointer transition-colors">Privacy Policy</p>
                <p className="text-gray-300 hover:text-phito-yellow cursor-pointer transition-colors">Terms of Service</p>
                <p className="text-gray-300 hover:text-phito-yellow cursor-pointer transition-colors">Security</p>
              </div>
            </div>
          </div>
          <div className="max-w-grid mx-auto px-6 mt-16 pt-8 border-t border-blue-900/50 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
            <span>© {new Date().getFullYear()} Phitopolis. All rights reserved.</span>
            <span className="font-mono mt-2 md:mt-0">EST. 2010</span>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;