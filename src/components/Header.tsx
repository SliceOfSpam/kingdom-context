import React from 'react';
import { ViewState } from '../types';
import { Scale, Scroll, MessageCircle, Home } from 'lucide-react';

interface HeaderProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: ViewState.HOME, label: 'Overview', icon: Home },
    { id: ViewState.TIMELINE, label: 'Timeline', icon: Scroll },
    { id: ViewState.ANALYSIS, label: 'Legal Analysis', icon: Scale },
    { id: ViewState.CHAT, label: "'Ya But' Chat", icon: MessageCircle },a
  ];

  return (
    <header className="bg-deep-blue text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setView(ViewState.HOME)}>
            {/* Using stable placeholder for logo to ensure visibility */}
            <img 
              src="https://picsum.photos/seed/hawaii_coat_arms/200/200" 
              alt="Kingdom Coat of Arms" 
              className="h-10 w-10 rounded-full border border-royal-gold/50"
            />
            <div>
              <h1 className="text-xl font-serif font-bold text-royal-gold tracking-wide">Kingdom Context</h1>
              <p className="text-xs text-gray-300 uppercase tracking-wider">Historical Legal Inquiry</p>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setView(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors duration-200 ${
                    isActive 
                      ? 'bg-royal-gold/20 text-royal-gold' 
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Icon Placeholder - keeping simple for this scope */}
          <div className="md:hidden text-royal-gold">
            <Scale size={24} />
          </div>
        </div>
      </div>
      {/* Mobile Nav (Simple implementation) */}
      <div className="md:hidden flex justify-around bg-deep-blue/95 border-t border-white/10 py-2">
        {navItems.map((item) => (
             <button
             key={item.id}
             onClick={() => setView(item.id)}
             className={`p-2 ${currentView === item.id ? 'text-royal-gold' : 'text-gray-400'}`}
           >
             <item.icon size={24} />
           </button>
        ))}
      </div>
    </header>
  );
};
