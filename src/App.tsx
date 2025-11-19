import React, { useState } from 'react';
import { ViewState } from './types';
import { Header } from './components/Header';
import { Timeline } from './components/Timeline';
import { Analysis } from './components/Analysis';
import { ChatInterface } from './components/ChatInterface';
import { ScrollText } from 'lucide-react';

const Home: React.FC<{ setView: (v: ViewState) => void }> = ({ setView }) => (
  <div className="min-h-[calc(100vh-4rem)] flex flex-col">
    {/* Hero Section */}
    <section className="relative h-[60vh] flex items-center justify-center bg-deep-blue overflow-hidden">
      {/* Hero Image: Placeholder for stability */}
      <img 
        src="https://picsum.photos/seed/hawaii_kingdom_flag/1920/1080"
        alt="Flag of the Hawaiian Kingdom"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-deep-blue/90 via-deep-blue/60 to-paper"></div>
      
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="mb-4 inline-block px-3 py-1 border border-royal-gold text-royal-gold text-xs tracking-[0.2em] uppercase animate-in fade-in slide-in-from-bottom-4 duration-700">Historical Truth Project</div>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 tracking-wide drop-shadow-lg animate-in fade-in slide-in-from-bottom-6 duration-1000">
          Hawaii is <span className="text-royal-gold">Not</span> a State
        </h1>
        <p className="text-xl md:text-2xl text-gray-100 font-light mb-10 leading-relaxed max-w-3xl mx-auto drop-shadow-md animate-in fade-in slide-in-from-bottom-8 duration-1000">
          Systematic critical thinking and historical proofs debunking the myth of annexation. Understanding why the Hawaiian Kingdom remains a sovereign nation under prolonged occupation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <button 
            onClick={() => setView(ViewState.TIMELINE)}
            className="px-8 py-3 bg-royal-gold hover:bg-yellow-600 text-deep-blue font-bold rounded-md transition-colors duration-300 shadow-lg"
          >
            View the Evidence
          </button>
          <button 
            onClick={() => setView(ViewState.ANALYSIS)}
            className="px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-deep-blue font-bold rounded-md transition-colors duration-300 shadow-lg"
          >
            Legal Proofs
          </button>
        </div>
      </div>
    </section>

    {/* Introduction Content */}
    <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl font-serif font-bold text-deep-blue mb-8">
            Debunking the Annexation Myth
          </h2>
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed font-light">
            <p>
              The perception that Hawaii is the 50th State of the Union is based on a century of historical revisionism. When subjected to rigorous legal scrutiny, the claim of US sovereignty falls apart.
            </p>
            <p>
              <strong className="text-kingdom-red font-serif text-xl block mb-2">Key Critical Arguments:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>No Treaty Exists:</strong> A sovereign state can only be acquired by another via treaty. The 1897 Treaty of Annexation failed.
              </li>
              <li>
                <strong>Domestic Law Limitations:</strong> The "Newlands Resolution" was a domestic US law. It is legally impossible for US domestic law to acquire foreign territory.
              </li>
              <li>
                <strong>Admitted Illegality:</strong> In <span className="text-kingdom-red font-medium">Public Law 103-150</span> (1993), the US admitted the overthrow was illegal.
              </li>
            </ul>
            <p className="pt-4">
              This platform is dedicated to the "Occupied State" theory: that the Hawaiian Kingdom's sovereignty remains intact under international law.
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 bg-royal-gold/20 rounded-lg transform rotate-2"></div>
          <div className="relative aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden shadow-2xl -rotate-1 border-8 border-white">
            {/* Intro Image: Placeholder for stability */}
            <img 
              src="https://picsum.photos/seed/queen_liliuokalani_archive/800/1000" 
              alt="Queen Liliʻuokalani" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 pt-20 text-white text-center">
              <p className="font-serif italic text-xl mb-2">"I could not turn back the time for the political change, but there is still time to save our heritage."</p>
              <p className="text-royal-gold text-sm uppercase tracking-widest">— Queen Liliʻuokalani</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    {/* Quote Section */}
    <section className="bg-deep-blue py-20 text-white text-center px-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-royal-gold/20 rounded-tl-3xl m-8"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-royal-gold/20 rounded-br-3xl m-8"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <ScrollText className="mx-auto mb-8 text-royal-gold" size={56} />
        <blockquote className="text-3xl md:text-4xl font-serif italic mb-8 leading-tight">
          "The joint resolution is the nullity of nullities."
        </blockquote>
        <div className="w-24 h-1 bg-royal-gold mx-auto mb-8"></div>
        <cite className="text-white font-bold not-italic text-lg tracking-wider block mb-2">
          SENATOR WILLIAM ALLEN
        </cite>
        <p className="text-gray-400 uppercase text-xs tracking-[0.2em]">US Senate Debate, 1898</p>
      </div>
    </section>
  </div>
);

export default function App() {
  const [currentView, setView] = useState<ViewState>(ViewState.HOME);

  const renderContent = () => {
    switch (currentView) {
      case ViewState.HOME:
        return <Home setView={setView} />;
      case ViewState.TIMELINE:
        return <Timeline />;
      case ViewState.ANALYSIS:
        return <Analysis />;
      case ViewState.CHAT:
        return <ChatInterface />;
      default:
        return <Home setView={setView} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <Header currentView={currentView} setView={setView} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <footer className="bg-deep-blue text-gray-400 py-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h4 className="font-serif text-2xl text-royal-gold mb-4">Kingdom Context</h4>
          <p className="text-sm max-w-2xl mx-auto mb-8 text-gray-500">
            Dedicated to correcting historical inaccuracies regarding the legal status of the Hawaiian Islands through strict application of international law and historical record.
          </p>
          <div className="flex justify-center gap-8 text-xs uppercase tracking-widest text-gray-600">
            <span>Truth</span>
            <span>Justice</span>
            <span>Sovereignty</span>
          </div>
          <p className="text-[10px] mt-12 text-gray-700">
            Images: Wikimedia Commons (Public Domain). Historical analysis generated via Gemini AI.
          </p>
        </div>
      </footer>
    </div>
  );
}
