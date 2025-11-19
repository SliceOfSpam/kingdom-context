import React, { useState } from 'react';
import { generateHistoricalAnalysis, generateCitations } from '../services/geminiService';
import { Loader2, BookOpen, Scale, FileText, Library, Quote, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const TOPICS = [
  {
    id: 'treaty-vs-resolution',
    title: 'Joint Resolution vs. Treaty',
    prompt: 'Explain the legal difference between a Treaty of Annexation and a Joint Resolution. Why do constitutional scholars argue the Newlands Resolution of 1898 was insufficient to acquire the Hawaiian Islands under American and International law?',
    icon: Scale
  },
  {
    id: 'occupation-theory',
    title: 'The Occupation Theory',
    prompt: 'Explain the "Belligerent Occupation" theory regarding Hawaii. If the annexation was void, does the Hawaiian Kingdom still exist as a sovereign state under international law, merely under prolonged occupation? Cite the Lance Larsen v. Hawaiian Kingdom arbitration.',
    icon: BookOpen
  },
  {
    id: 'kue-petitions',
    title: 'The Kūʻē Petitions',
    prompt: 'Analyze the significance of the 1897 Kūʻē Petitions. How does this document debunk the argument that Hawaiians willingly accepted American rule?',
    icon: FileText
  }
];

export const Analysis: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [citations, setCitations] = useState<string>("");
  const [loadingCitations, setLoadingCitations] = useState<boolean>(false);

  // Calculate source count based on markdown list items (starting with - or number.)
  const sourceCount = citations 
    ? citations.split('\n').filter(line => /^\s*([-*]|\d+\.)/.test(line)).length 
    : 0;

  const handleTopicClick = async (topicId: string, prompt: string) => {
    if (loading) return;
    setSelectedTopic(topicId);
    setLoading(true);
    setContent(""); // Clear previous
    setCitations(""); // Clear previous citations

    const result = await generateHistoricalAnalysis(prompt);
    setContent(result);
    setLoading(false);
  };

  const handleGetCitations = async () => {
    if (!selectedTopic || !content) return;
    setLoadingCitations(true);
    
    // Find title for context
    const topicTitle = TOPICS.find(t => t.id === selectedTopic)?.title || "Historical Inquiry";
    
    const result = await generateCitations(topicTitle, content);
    setCitations(result);
    setLoadingCitations(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-serif font-bold text-deep-blue mb-4">Critical Legal Analysis</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Select a core legal argument below to generate a comprehensive analysis using historical records and international law principles.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {TOPICS.map((topic) => (
          <button
            key={topic.id}
            onClick={() => handleTopicClick(topic.id, topic.prompt)}
            className={`p-6 rounded-xl text-left transition-all duration-300 border-2 ${
              selectedTopic === topic.id
                ? 'border-royal-gold bg-white shadow-xl transform -translate-y-1'
                : 'border-gray-200 bg-white hover:border-royal-gold/50 hover:shadow-md'
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-deep-blue/10 flex items-center justify-center mb-4 text-deep-blue">
              <topic.icon size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{topic.title}</h3>
            <p className="text-sm text-gray-500">Click to analyze this legal argument.</p>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-xl min-h-[400px] p-8 md:p-12 border border-gray-100 relative overflow-hidden">
        {!selectedTopic && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 bg-gray-50/50">
            <Scale size={64} className="mb-4 opacity-20" />
            <p>Select a topic above to begin analysis</p>
          </div>
        )}

        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 z-10">
            <Loader2 size={48} className="text-royal-gold animate-spin mb-4" />
            <p className="text-deep-blue font-medium animate-pulse">Consulting archives and legal frameworks...</p>
          </div>
        )}

        {content && (
          <div className="animate-in fade-in duration-500">
            <article className="prose prose-lg prose-stone max-w-none mb-8">
               <div className="prose-headings:font-serif prose-headings:text-deep-blue prose-a:text-royal-gold">
                  <ReactMarkdown>{content}</ReactMarkdown>
               </div>
            </article>

            <div className="border-t border-gray-200 pt-6 mt-8">
              {!citations && !loadingCitations && (
                <button
                  onClick={handleGetCitations}
                  className="flex items-center gap-2 px-6 py-3 bg-royal-gold/10 text-royal-gold hover:bg-royal-gold hover:text-white rounded-lg transition-all duration-300 font-serif font-bold group"
                >
                  <Library size={20} className="group-hover:scale-110 transition-transform" />
                  Request Historical Sources & Citations
                </button>
              )}

              {loadingCitations && (
                <div className="flex items-center gap-3 text-gray-500 bg-gray-50 p-4 rounded-lg inline-block">
                  <Loader2 size={20} className="animate-spin text-royal-gold" />
                  <span className="font-serif italic">Consulting bibliography and archives...</span>
                </div>
              )}

              {citations && (
                <div className="bg-paper/50 p-6 md:p-8 rounded-xl border border-royal-gold/20 animate-in slide-in-from-bottom-4 duration-500">
                   <div className="flex flex-wrap justify-between items-center border-b border-gray-200 pb-4 mb-6 gap-4">
                      <h4 className="flex items-center gap-3 font-serif font-bold text-deep-blue text-xl">
                          <Quote size={24} className="text-royal-gold" />
                          Verified Sources
                      </h4>
                      <span className="bg-deep-blue/10 text-deep-blue text-xs font-bold px-3 py-1 rounded-full border border-deep-blue/20">
                        {sourceCount} References Found
                      </span>
                   </div>
                   <div className="prose prose-sm prose-stone max-w-none">
                      <ReactMarkdown 
                        components={{
                          a: ({node, ...props}) => (
                            <a 
                              {...props} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-royal-gold font-semibold hover:text-deep-blue transition-colors inline-flex items-center gap-1"
                            >
                              {props.children}
                              <ExternalLink size={12} className="inline" />
                            </a>
                          )
                        }}
                      >
                        {citations}
                      </ReactMarkdown>
                   </div>
                </div>
              )}
            </div>

             <div className="mt-8 pt-4 text-sm text-gray-400 italic">
               Generated by AI Historian based on provided prompts regarding Hawaiian Sovereignty legal theories.
             </div>
          </div>
        )}
      </div>
    </div>
  );
};
