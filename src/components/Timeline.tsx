import React, { useState } from 'react';
import { HistoricalEvent } from '../types';
import { ScrollText, Gavel, Crown, AlertTriangle, BookOpen, ArrowLeft, Sparkles, Loader2, FileText, Library, ExternalLink, Link as LinkIcon, Search } from 'lucide-react';
import { generateCitations } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

const events: HistoricalEvent[] = [
  {
    year: '1843',
    title: 'Anglo-Franco Proclamation',
    description: 'On November 28, 1843, the United Kingdom and France entered into a formal treaty agreement known as the Anglo-Franco Proclamation. Signed in London by Lord Aberdeen and the French Ambassador, Count Saint-Aulaire, the two Great Powers reciprocally engaged "to consider the Sandwich [Hawaiian] Islands as an Independent State" and explicitly pledged "never to take possession, neither directly or under the title of Protectorate, or under any other form, of any part of the territory of which they are composed."',
    criticalAnalysis: 'This event is legally monumental as it marks the formal entry of the Hawaiian Kingdom into the "Family of Nations"—the first non-European state to achieve this status. Under 19th-century International Law, this recognition established Hawaii as a co-equal sovereign alongside powers like the United States and Great Britain. Once recognized, a state\'s sovereignty is absolute and cannot be legally diminished by another state\'s domestic legislation (like a Joint Resolution). This treaty creates the legal presumption of continuity that persists to this day.',
    curatedEvidence: `### Primary Source: Anglo-Franco Proclamation (1843)
**Date:** November 28, 1843  
**Location:** London  
**Signatories:** Earl of Aberdeen (UK), Count Saint-Aulaire (France)

This declaration formally recognized the Hawaiian Kingdom as a sovereign state under international law, equal to the Great Powers of Europe.

#### Key Treaty Text
> "Her Majesty the Queen of the United Kingdom of Great Britain and Ireland, and His Majesty the King of the French, taking into consideration the existence in the Sandwich Islands of a Government capable of providing for the regularity of its relations with foreign nations, have thought it right to engage, reciprocally, to consider the Sandwich Islands as an Independent State, and never to take possession, neither directly or under the title of Protectorate, or under any other form, of any part of the territory of which they are composed."

#### Digitized Official Records
*   [**View Original Treaty Text** (Hawaiian Kingdom Archives)](https://www.hawaiiankingdom.org/treaty_1843.shtml)
*   [British and Foreign State Papers, Vol. 32, p. 255 (Internet Archive)](https://archive.org/details/britishforeignst32grea/page/255/mode/2up)
*   [British and Foreign State Papers, Vol. 32, p. 255 (HathiTrust Digital Library)](https://babel.hathitrust.org/cgi/pt?id=hvd.32044092653365&seq=277)
*   [Find Digitized Copy](https://www.loc.gov/search/?q=Anglo-Franco+Proclamation+1843)`,
    icon: 'crown'
  },
  {
    year: '1849',
    title: 'US-Hawaii Treaty',
    description: 'The United States and the Hawaiian Kingdom ratified the Treaty of Friendship, Commerce, and Navigation. Signed in Washington D.C., this comprehensive treaty formally recognized Hawaii\'s independence and established strict protocols for trade and diplomatic relations on equal national footing.',
    criticalAnalysis: 'This treaty acts as the "smoking gun" of US recognition in international law. By ratifying this document, the United States affirmed the Hawaiian Kingdom as a distinct, sovereign state.\n\n**Article I** states: *"There shall be perpetual peace and amity between the United States and the King of the Hawaiian Islands, his heirs and his successors, and between the citizens of the two countries."*\n\nThis article created a binding international obligation. The 1893 intervention and 1898 annexation resolution violated this "perpetual peace." Under the doctrine of *pacta sunt servanda* ("agreements must be kept"), treaties remain in force until mutually terminated. No such termination occurred prior to the US occupation.',
    curatedEvidence: `### Primary Source: Treaty of Friendship, Commerce, and Navigation (1849)

**Ratified:** August 24, 1850  
**Signatories:** John M. Clayton (USA), James Jackson Jarves (Hawaii)

This treaty is the standing international agreement between the two nations. It has never been legally terminated.

#### Key Articles of Sovereignty

*   **Article I - Perpetual Peace:**  
    *"There shall be perpetual peace and amity between the United States and the King of the Hawaiian Islands..."*  
    **Implication:** This prohibits acts of war or annexation without mutual consent. The 1893 US military intervention was a direct breach of this article.

*   **Article II - Most Favored Nation:**  
    Establishes that Hawaiian subjects and US citizens enjoy reciprocal rights of trade and access. It confirms Hawaii's status as a trading partner equal to Britain or France.

#### Digitized Official Records
*   [Full Text: United States Statutes at Large, Vol. 9, p. 977 (Library of Congress)](https://memory.loc.gov/cgi-bin/ampage?collId=llsl&fileName=009/llsl009.db&recNum=998)
*   [Treaty of 1849 - Hawaiian Kingdom Archives](https://hawaiiankingdom.org/treaty_1849.shtml)
*   [Avalon Project: Treaty with Hawaii 1849 (Yale Law School)](https://avalon.law.yale.edu/19th_century/haw01.asp)`,
    icon: 'scroll'
  },
  {
    year: '1887',
    title: 'The Bayonet Constitution',
    description: 'On July 6, 1887, the "Hawaiian League," a distinct political group of foreign businessmen armed with rifles, forced King Kalākaua to sign a new constitution under threat of assassination. This document stripped the King of his executive power and disenfranchised the majority of Native Hawaiians and Asian subjects.',
    criticalAnalysis: 'The 1887 Constitution (often referred to as the "Bayonet Constitution") was never legally ratified by the Legislature or a vote of the people. It was signed under duress (threat of death), which nullifies contracts and treaties in international law. It transferred sovereign power from the Monarch to the Cabinet—composed of the very conspirators who would later orchestrate the 1893 overthrow. This act fundamentally undermined the Kingdom\'s sovereignty by allowing foreign nationals to vote while excluding poor Native Hawaiians. It set the legal stage for the 1893 coup.',
    curatedEvidence: `### Primary Source: Constitution of 1887 (Bayonet Constitution)
**Date:** July 6, 1887
**Circumstance:** Signed under Duress (Threat of Assassination)

The "Bayonet Constitution" was forced upon King Kalākaua by the Hawaiian League. It was never ratified by the Legislative Assembly.

#### Key Legal Violations
*   **Duress:** Signed at gunpoint, rendering it void *ab initio* under contract and international law.
*   **Disenfranchisement:** Imposed high property and income requirements for voting, effectively barring most Native Hawaiians and Asian laborers.
*   **Foreign Voting:** Extended voting rights to foreign residents (Americans/Europeans) without requiring them to renounce their foreign citizenship.

#### Digitized Official Records
*   [**Text of the 1887 Constitution** (Hawaiian Kingdom Archives)](https://hawaiiankingdom.org/constitution_1887.shtml)
*   [Reciprocity Treaty Renewal (1887) granting Pearl Harbor (Library of Congress)](https://www.loc.gov/law/help/statutes-at-large/49th-congress/session-2/c49s2ch27.pdf)
*   [Historical Context: The Bayonet Constitution (Ho'okuleana)](https://totakeresponsibility.blogspot.com/2013/07/the-bayonet-constitution.html)`,
    icon: 'alert'
  },
  {
    year: '1893',
    title: 'Illegal Overthrow',
    description: 'US Minister John L. Stevens lands US Marines to support insurgents. Queen Liliʻuokalani yields authority to the US government (not the insurgents) under protest to avoid bloodshed.',
    criticalAnalysis: 'Under International Law (as defined by Black\'s Law Dictionary and Vattel regarding Sovereignty), the unauthorized landing of US troops constituted an "Act of War" against a friendly nation. The US Minister utilized the military not to protect American lives, but to intimidate the lawful government. By landing troops without the consent of the Sovereign, the US violated the fundamental right of a nation to Independence. Therefore, the so-called "Provisional Government" was established solely through the illegal intervention of a foreign military, rendering its authority void ab initio (from the beginning).',
    curatedEvidence: `### Primary Source: President Cleveland's Message to Congress
**Date:** December 18, 1893

President Grover Cleveland's official message to Congress after reviewing the Blount Report, detailing the illegality of the overthrow.

#### Key Excerpts
> "By an act of war, committed with the participation of a diplomatic representative of the United States and without authority of Congress, the Government of a feeble but friendly and confiding people has been overthrown."

> "Substantial wrong has thus been done which a due regard for our national character as well as the rights of the injured people requires we should endeavor to repair."

#### Digitized Official Records
*   [President Cleveland's Message (Full Text - University of Hawaii)](https://libweb.hawaii.edu/digicoll/annexation/cleveland.html)
*   [The Blount Report (House Executive Document 47, 53rd Congress) - Full Text](https://libweb.hawaii.edu/digicoll/annexation/blount.html)`,
    icon: 'alert'
  },
  {
    year: '1897',
    title: 'The Kūʻē Petitions',
    description: 'Delegates of the Hui Aloha ʻĀina (Hawaiian Patriotic League) travel to Washington D.C. to present petitions signed by over 21,000 Hawaiian subjects—95% of the native adult population—protesting annexation. This massive display of civic opposition successfully convinced the U.S. Senate to kill the Treaty of Annexation.',
    criticalAnalysis: 'The Kūʻē Petitions are the physical evidence of non-consent. In international law, cession of territory requires the consent of the populace. The four delegates of Hui Aloha ʻĀina (James Kaulia, David Kalauokalani, John Richardson, and William Auld) traveled to Washington to prove that the "Republic of Hawaii" oligarchs did not represent the people. By formally presenting signatures from over 95% of the adult Native Hawaiian population to the US Senate Foreign Relations Committee, they destroyed the narrative that Hawaiians welcomed annexation. This direct action successfully convinced key Senators, including Senator George Hoar, to withdraw support. The consequent failure of the treaty in the Senate confirms that the US government knew it was acquiring territory against the explicitly documented will of the people, rendering the subsequent "Joint Resolution" a deliberate violation of self-determination and international law.',
    curatedEvidence: `### Primary Source: The Kūʻē Petitions (1897)
**Official Title:** Petition Against Annexation
**Signatures:** 21,269 (Men's and Women's petitions combined)

This massive mobilization of the Hawaiian citizenry successfully convinced the U.S. Senate to reject the Treaty of Annexation. It serves as physical proof that the Hawaiian people did not consent to American rule.

#### Historical Context
Senator George Hoar led the opposition in the Senate. Upon receiving the petitions, he stated that he could not support a treaty that was so clearly opposed by the people it affected. The treaty count failed.

#### Digitized Official Records
*   [View Original Petitions (National Archives Catalog)](https://catalog.archives.gov/id/595390)
*   [Analysis of Signatures (Ka Huli Ao Center for Excellence in Native Hawaiian Law)](http://blog.hawaii.edu/kuepetitions/)
*   [Hui Aloha ʻĀina (Loyal Subjects) Context](https://imagesofoldhawaii.com/hui-aloha-aina/)`,
    icon: 'scroll'
  },
  {
    year: '1898',
    title: 'Newlands Resolution',
    description: 'Unable to pass a treaty, the US Congress passes a "Joint Resolution" (domestic law) to "annex" Hawaii.',
    criticalAnalysis: 'This is the crux of the "Nullity" argument. A Joint Resolution is a municipal (domestic) law of the United States. Constitutional Law dictates that US laws are limited to US territory. Congress overstepped its boundaries by attempting to use a domestic law to acquire a foreign country—a legal impossibility. It is comparable to the US Congress passing a law today to annex Japan; the law would have no binding force on Japan. Without a Treaty (the only international instrument for cession), the "annexation" was a fiction used to justify a military occupation.',
    curatedEvidence: `### Primary Source: Joint Resolution to Provide for Annexing the Hawaiian Islands (Newlands Resolution)
**Citation:** 30 Stat. 750
**Date:** July 7, 1898

A Joint Resolution of Congress is a domestic law. It has no extraterritorial force to acquire a foreign country.

#### Senate Debate Admissions
During the debate, proponents admitted the legal deficiency but argued for "military necessity" due to the Spanish-American War.

> "The joint resolution is the nullity of nullities."  
> — **Senator William Allen** (during Senate debate)

> "To acquire territory by a joint resolution of Congress is... a violation of the Constitution of the United States."  
> — **Senator Augustus Bacon**

#### Digitized Official Records
*   [**View Full Text: Joint Resolution (Annex 21) - Hawaiian Kingdom Repository (PDF)**](https://www.hawaiiankingdom.org/pdf/Annex%2021.pdf)
*   [Text of the Joint Resolution (Library of Congress)](https://www.loc.gov/law/help/statutes-at-large/55th-congress/session-2/c55s2ch55.pdf)
*   [Congressional Record, 55th Congress, 2nd Session (Debates)](https://www.govinfo.gov/app/details/GPO-CRECB-1898-pt6-v31/GPO-CRECB-1898-pt6-v31-3/context)`,
    icon: 'gavel'
  },
  {
    year: '1959',
    title: 'Hawaii Admission Act',
    description: 'Following the passage of the Hawaii Admission Act (PL 86-3), a plebiscite was held to determine Hawaii\'s status. The ballot offered only two choices: "Statehood" or remaining a "Territory." Crucially, the option for Independence was omitted.',
    criticalAnalysis: 'The 1959 statehood vote is legally contested because it violated the United Nations Charter and General Assembly Resolution 742 (VIII). As a Non-Self-Governing Territory under US administration, Hawaii was entitled to a decolonization process that included the option of Independence. By excluding this option, the US manufactured a "choice" that ensured continued US control. Furthermore, the vote allowed American military personnel and settlers to participate, diluting the self-determination rights of the Native Hawaiian population. Consequently, the removal of Hawaii from the UN list of non-self-governing territories was based on a fraudulent plebiscite.',
    curatedEvidence: `### Primary Source: UN General Assembly Resolution 1469 (XIV)
**Date:** December 12, 1959

The US reported to the UN that Hawaii had achieved self-government, removing it from the list of non-self-governing territories. However, the vote offered violated the criteria of Resolution 742 (VIII).

#### The Flawed Ballot
The ballot presented to voters asked: *"Shall Hawaii immediately be admitted into the Union as a State?"*
*   ( ) Yes
*   ( ) No

![1959 Plebiscite Ballot](https://web.archive.org/web/20231205032308im_/https://hawaiiankingdom.org/blog/wp-content/uploads/2014/08/Plebiscite-Ballot.jpg)

It **did not** offer the option of Independence, which was required under international standards for decolonization.

#### Digitized Official Records
*   [United Nations Resolution 1469 (XIV) (UN Digital Library)](https://digitallibrary.un.org/record/203167?ln=en)
*   [US Public Law 86-3 (Hawaii Admission Act)](https://www.govinfo.gov/content/pkg/STATUTE-73/pdf/STATUTE-73-Pg4.pdf)`,
    icon: 'gavel'
  },
  {
    year: '1969',
    title: 'Secret Debate Revealed',
    description: 'The Associated Press publishes "Secret Debate on U.S. Seizure of Hawai\'i Revealed" in the Honolulu Star-Bulletin, exposing previously classified transcripts from the 1898 Senate Secret Session.',
    criticalAnalysis: 'This disclosure provides the definitive "mens rea" (guilty mind) for the illegal annexation. The transcripts reveal that US Senators debated the issue in secret precisely because they knew a Joint Resolution was unconstitutional and violated international law. They explicitly admitted on the record that they could not legally annex a foreign country via domestic law but proceeded anyway due to the military necessity of the Spanish-American War. This proves the US government did not mistakenly believe they owned Hawaii; they knowingly enacted a legal fiction to disguise a military seizure.',
    curatedEvidence: `### Primary Source: Senate Secret Session Transcripts (1898)
**Revealed:** 1969 (Honolulu Star-Bulletin) / Official Release

The transcripts of the Senate's secret session (May 31, 1898) confirm that Senators knew the Joint Resolution was unconstitutional but proceeded for military reasons.

#### Key Quote from Secret Session
Senator Henry Cabot Lodge (Proponent of Annexation):
> *"If I had my way, I would take them [the islands]... I would take them as a military necessity."*

This confirms the annexation was a military seizure, not a lawful democratic merger.

#### Digitized Official Records
*   [**Read Full Article: "Secret Debate on U.S. Seizure of Hawai'i Revealed" (Honolulu Star-Bulletin, 1969) - PDF**](https://hawaiiankingdom.org/pdf/Star_Bulletin(1969).pdf)
*   [Congressional Record - Senate, May 31, 1898 (Secret Session)](https://www.govinfo.gov/content/pkg/GPO-CRECB-1898-pt6-v31/pdf/GPO-CRECB-1898-pt6-v31-3.pdf)`,
    icon: 'alert'
  },
  {
    year: '1993',
    title: 'Public Law 103-150',
    description: 'The "Apology Resolution" signed by President Clinton acknowledges the overthrow was illegal and that the Native Hawaiian people never directly relinquished their claims to sovereignty.',
    criticalAnalysis: 'While technically a joint resolution itself, PL 103-150 is legally significant as a "Confession of Judgment." It formally admits facts that undermine the US claim to title: 1) The overthrow was illegal, 2) US agents were responsible, and 3) The Native Hawaiian people never relinquished their sovereignty. In international law, such an admission by a government validates the claim of the injured party (the Hawaiian Kingdom) that the occupation is prolonged and illegal.',
    curatedEvidence: `### Primary Source: Public Law 103-150 (The Apology Resolution)
**Date:** November 23, 1993
**Signed By:** President Bill Clinton

A Joint Resolution acknowledging the 100th anniversary of the illegal overthrow of the Kingdom of Hawaii.

#### Key Admissions (Section 1)
*   **Illegal Overthrow:** "The overthrow of the Government of Hawaii was effectively enabled by a United States diplomatic representative..."
*   **No Relinquishment:** "...the indigenous Hawaiian people never directly relinquished their claims to their inherent sovereignty as a people or over their national lands to the United States..."

#### Digitized Official Records
*   [Full Text of PL 103-150 (Congress.gov)](https://www.congress.gov/bill/103rd-congress/senate-joint-resolution/19/text)
*   [United States Statutes at Large (107 Stat. 1510) (GovInfo)](https://www.govinfo.gov/content/pkg/STATUTE-107/pdf/STATUTE-107-Pg1510.pdf)`,
    icon: 'gavel'
  }
];

const IconMap = {
  scroll: ScrollText,
  gavel: Gavel,
  crown: Crown,
  alert: AlertTriangle
};

const TimelineGraph: React.FC<{ onEventSelect: (event: HistoricalEvent) => void }> = ({ onEventSelect }) => {
  const startYear = 1840;
  const endYear = 2000;
  const totalYears = endYear - startYear;

  const getPosition = (yearStr: string) => {
    const year = parseInt(yearStr);
    return ((year - startYear) / totalYears) * 100;
  };

  const criticalYears = ['1887', '1893', '1897', '1898', '1969', '1993'];

  return (
    <div className="w-full bg-white p-4 md:p-8 rounded-xl shadow-sm mb-16 border border-gray-200 overflow-x-auto">
      <h3 className="text-xl font-serif font-bold text-deep-blue mb-8 text-center tracking-wide">Visual Chronology of Sovereignty</h3>
      
      <div className="relative h-64 min-w-[800px] mx-auto max-w-6xl">
        <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-gray-300 transform -translate-y-1/2 rounded"></div>
        <div className="absolute top-1/2 right-4 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-gray-300 transform -translate-y-1/2"></div>

        {events.map((evt, idx) => {
          const left = getPosition(evt.year);
          const isTop = idx % 2 === 0;
          const isCritical = criticalYears.includes(evt.year);
          const isLongStem = evt.year === '1898' || evt.year === '1969'; 
          const stemHeight = isLongStem ? 'h-24' : 'h-12';
          
          return (
            <div 
              key={idx} 
              className="absolute top-1/2 transform -translate-y-1/2 flex flex-col items-center group z-10"
              style={{ left: `${left}%` }}
            >
              <div 
                onClick={() => onEventSelect(evt)}
                className={`relative z-20 w-4 h-4 rounded-full border-2 border-white shadow-md transition-transform duration-300 group-hover:scale-150 cursor-pointer
                ${isCritical ? 'bg-kingdom-red w-5 h-5' : 'bg-royal-gold'}`}>
                 {isCritical && <div className="absolute inset-0 rounded-full bg-kingdom-red animate-ping opacity-20"></div>}
              </div>
              
              <div className={`absolute w-px bg-gray-300 transition-all duration-300 group-hover:bg-royal-gold pointer-events-none
                ${isTop ? `bottom-1/2 ${stemHeight}` : `top-1/2 ${stemHeight}`}`}>
              </div>

              <div 
                onClick={() => onEventSelect(evt)}
                className={`absolute w-32 text-center transition-all duration-300 cursor-pointer
                ${isTop ? `bottom-full ${isLongStem ? 'mb-24' : 'mb-12'}` : `top-full ${isLongStem ? 'mt-24' : 'mt-12'}`}`}>
                
                <div className={`font-bold text-lg font-serif leading-none mb-1 group-hover:scale-110 transition-transform origin-center
                  ${isCritical ? 'text-kingdom-red' : 'text-deep-blue'}`}>
                  {evt.year}
                </div>
                
                <div className={`text-[10px] uppercase tracking-wider font-medium leading-tight bg-white/90 px-1 rounded backdrop-blur-sm
                  ${isCritical ? 'text-kingdom-red font-bold' : 'text-gray-500'}`}>
                  {evt.title}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      <div className="mt-4 flex justify-center gap-6 text-xs uppercase tracking-widest text-gray-400">
         <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-kingdom-red"></span>
            Critical Violation / Proof
         </div>
         <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-royal-gold"></span>
            Historical Event
         </div>
      </div>
    </div>
  );
};

interface TimelineDetailProps {
  event: HistoricalEvent;
  onBack: () => void;
}

const TimelineDetail: React.FC<TimelineDetailProps> = ({ event, onBack }) => {
  const Icon = IconMap[event.icon];
  // Initializing evidence with curated content if available allows for instant "deep dives" without API calls
  const [evidence, setEvidence] = useState<string>(event.curatedEvidence || '');
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(!!event.curatedEvidence); // Auto-expand if we have curated evidence

  const handleLoadEvidence = async () => {
    if (evidence) {
      setExpanded(true);
      return;
    }
    setLoading(true);
    setExpanded(true);
    try {
      // We pass the event description and analysis to the citation service to find "receipts"
      const context = `Event: ${event.year} - ${event.title}\nDescription: ${event.description}\nCritical Legal Context: ${event.criticalAnalysis || ''}`;
      const result = await generateCitations(
        event.title, 
        context
      );
      setEvidence(result);
    } catch (e) {
      setEvidence("Unable to retrieve records at this time.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto animate-in slide-in-from-right duration-500">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 hover:text-royal-gold mb-6 transition-colors group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="uppercase tracking-widest text-xs font-bold">Back to Chronology</span>
      </button>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
        <div className="bg-deep-blue p-8 md:p-12 text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 opacity-5 transform translate-x-10 -translate-y-10">
             <Icon size={200} />
           </div>
           <div className="relative z-10">
             <span className="text-royal-gold font-serif text-6xl md:text-8xl font-bold opacity-50 block mb-2">{event.year}</span>
             <h2 className="text-3xl md:text-5xl font-bold font-serif mb-4">{event.title}</h2>
             <div className="w-24 h-1 bg-royal-gold mb-6"></div>
           </div>
        </div>

        <div className="p-8 md:p-12 space-y-8">
          <div>
             <h3 className="text-sm uppercase tracking-widest text-gray-400 font-bold mb-3 flex items-center gap-2">
               <FileText size={16} /> Historical Record
             </h3>
             <p className="text-xl text-gray-800 leading-relaxed font-serif">
               {event.description}
             </p>
          </div>

          {event.criticalAnalysis && (
            <div className="bg-red-50/50 border-l-4 border-kingdom-red p-6 rounded-r-lg">
              <h3 className="text-xs uppercase tracking-widest text-kingdom-red font-bold mb-3 flex items-center gap-2">
                <Gavel size={16} /> Critical Legal Analysis
              </h3>
              <div className="text-gray-800 font-medium italic leading-relaxed">
                <ReactMarkdown>{event.criticalAnalysis}</ReactMarkdown>
              </div>
            </div>
          )}

          {/* Evidence / Receipts Section */}
          <div className="pt-8 border-t border-gray-100">
            {!expanded ? (
              <button 
                onClick={handleLoadEvidence}
                className="w-full py-5 border-2 border-dashed border-royal-gold/40 rounded-xl text-deep-blue bg-royal-gold/5 hover:bg-royal-gold/10 hover:border-royal-gold transition-all duration-300 flex flex-col items-center gap-2 group"
              >
                <Library size={28} className="text-royal-gold group-hover:scale-110 transition-transform" />
                <span className="font-serif font-bold text-xl">View Official Records & Receipts</span>
                <span className="text-xs uppercase tracking-widest text-gray-500">Load Treaties, Legal Cases & Primary Sources</span>
              </button>
            ) : (
              <div className="animate-in fade-in duration-700 bg-paper/30 p-6 rounded-xl border border-royal-gold/20">
                <div className="flex items-center gap-3 mb-6 border-b border-gray-200 pb-4">
                   <Library size={20} className="text-royal-gold" />
                   <h3 className="font-serif font-bold text-xl text-deep-blue">
                     {event.curatedEvidence ? 'Verified Curated Records' : 'AI Retrieved Sources'}
                   </h3>
                </div>
                
                {loading ? (
                   <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                      <Loader2 size={32} className="animate-spin text-royal-gold mb-3" />
                      <p className="animate-pulse font-medium">Retrieving historical proofs from archives...</p>
                   </div>
                ) : (
                   <div className="prose prose-stone max-w-none">
                      <ReactMarkdown
                        components={{
                          a: ({node, ...props}) => {
                            // Custom renderer to style 'Find Digitized Copy' as a button
                            const isSearchButton = props.children === 'Find Digitized Copy';
                            if (isSearchButton) {
                                return (
                                    <a 
                                      {...props}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-2 px-4 py-2 bg-royal-gold/10 text-royal-gold rounded-md border border-royal-gold/30 hover:bg-royal-gold hover:text-white transition-colors text-sm font-bold uppercase tracking-wide mt-2 no-underline"
                                    >
                                      <Search size={14} />
                                      {props.children}
                                    </a>
                                )
                            }
                            return (
                              <a 
                                {...props} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-royal-gold font-bold hover:underline inline-flex items-center gap-1 break-words"
                              >
                                {props.children}
                                <ExternalLink size={12} className="flex-shrink-0" />
                              </a>
                            )
                          },
                          ul: ({node, ...props}) => (
                            <ul {...props} className="list-none space-y-4 pl-0" />
                          ),
                          li: ({node, ...props}) => {
                            return (
                              <li {...props} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col gap-2 transition-all hover:shadow-md">
                                <div className="prose-sm">
                                  {props.children}
                                </div>
                              </li>
                            );
                          },
                          img: ({node, ...props}) => (
                            <img {...props} className="rounded-lg border border-gray-200 shadow-md my-4 max-w-full h-auto" referrerPolicy="no-referrer" />
                          ),
                          h3: ({node, ...props}) => (
                            <h3 {...props} className="text-lg font-serif font-bold text-deep-blue mt-4 mb-2" />
                          ),
                          h4: ({node, ...props}) => (
                            <h4 {...props} className="text-md font-bold text-gray-800 mt-4 mb-2 uppercase tracking-wide" />
                          )
                        }}
                      >
                        {evidence}
                      </ReactMarkdown>
                   </div>
                )}
              </div>
            )}
          </div>

          {/* ADDED BOTTOM BACK BUTTON */}
          <div className="pt-8 mt-8 border-t border-gray-100 flex justify-center">
             <button 
                onClick={onBack}
                className="flex items-center gap-2 px-8 py-3 bg-gray-50 hover:bg-royal-gold hover:text-white text-gray-600 rounded-full transition-all duration-300 font-serif font-bold group shadow-sm border border-gray-200 hover:border-royal-gold"
             >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                Return to Timeline
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Timeline: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<HistoricalEvent | null>(null);

  // If an event is selected, show the detail view
  if (selectedEvent) {
    return <TimelineDetail event={selectedEvent} onBack={() => setSelectedEvent(null)} />;
  }

  // Otherwise show the list/graph view
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-serif font-bold text-deep-blue mb-4">Chronology of Jurisdiction</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          A timeline of events establishing the continuity of the Hawaiian Kingdom and the lack of legal transfer of sovereignty to the United States.
        </p>
      </div>

      <TimelineGraph onEventSelect={setSelectedEvent} />

      <div className="relative border-l-2 border-royal-gold/30 ml-3 md:ml-6 space-y-12 max-w-4xl mx-auto">
        {events.map((evt, idx) => {
          const Icon = IconMap[evt.icon];
          const isCritical = ['1887', '1893', '1897', '1898', '1969', '1993'].includes(evt.year);
          
          // 1843 and 1849 are foundational recognition treaties, so they get Gold styling
          const isFoundation = ['1843', '1849'].includes(evt.year);
          const analysisColorClass = isFoundation 
            ? 'bg-royal-gold/10 border-royal-gold' 
            : 'bg-red-50/50 border-kingdom-red';
          const analysisTextClass = isFoundation
            ? 'text-deep-blue'
            : 'text-kingdom-red';
          const analysisLabel = isFoundation
            ? 'International Legal Foundation'
            : 'International Law Violation';

          return (
            <div key={idx} className="relative pl-8 md:pl-12 group">
              <div className={`absolute -left-[9px] md:-left-[11px] top-0 border-2 border-paper rounded-full p-1 transition-colors duration-300
                 ${isCritical ? 'bg-kingdom-red' : 'bg-deep-blue'}`}>
                <div className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full"></div>
              </div>
              
              <div className={`bg-white p-8 rounded-xl shadow-sm border transition-all duration-300 hover:shadow-lg hover:-translate-y-1
                ${isCritical ? 'border-l-4 border-l-kingdom-red border-t border-r border-b border-gray-100' : 'border border-gray-100'}`}>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                  <div>
                    <span className={`text-3xl font-bold font-serif block mb-1
                      ${isCritical ? 'text-kingdom-red' : 'text-royal-gold'}`}>
                      {evt.year}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900">{evt.title}</h3>
                  </div>
                  <div className={`p-3 rounded-full bg-opacity-10 self-start md:self-center
                    ${isCritical ? 'bg-kingdom-red text-kingdom-red' : 'bg-deep-blue text-deep-blue'}`}>
                    <Icon size={24} />
                  </div>
                </div>
                
                <p className="text-gray-700 leading-relaxed text-lg font-light line-clamp-3">{evt.description}</p>
                
                <div className="mt-6 flex items-center justify-between">
                   {evt.criticalAnalysis && (
                     <span className={`text-xs font-bold uppercase tracking-widest flex items-center gap-2 ${analysisTextClass}`}>
                        <BookOpen size={14} />
                        {analysisLabel}
                     </span>
                   )}
                   <button 
                     onClick={() => setSelectedEvent(evt)}
                     className="text-royal-gold font-bold hover:text-deep-blue transition-colors text-sm flex items-center gap-1"
                   >
                     Deep Dive <ArrowLeft size={16} className="rotate-180" />
                   </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
