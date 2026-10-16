import React from 'react';
import { Opportunity } from '../types';

interface SavedScreenProps {
  savedIds: string[];
  opportunities: Opportunity[];
  onSelectOpportunity: (opportunity: Opportunity) => void;
  onToggleSave: (id: string) => void;
  onExplore: () => void;
}

export const SavedScreen: React.FC<SavedScreenProps> = ({
  savedIds,
  opportunities,
  onSelectOpportunity,
  onToggleSave,
  onExplore
}) => {
  const savedOpportunities = opportunities.filter((o) => savedIds.includes(o.id));

  return (
    <div className="flex-1 flex flex-col min-h-screen text-[#F5F5F7] pb-24">
      <header
        className="fixed top-0 w-full z-40 backdrop-blur-xl"
        style={{
          backgroundColor: 'rgba(16, 16, 20, 0.92)',
          borderBottom: '1px solid #2B2B35'
        }}
      >
        <div className="max-w-2xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div>
            <h1 className="text-base font-bold text-[#F5F5F7]">Saved Opportunities</h1>
            <span className="text-xs text-[#A1A1AA]">
              {savedOpportunities.length} tracked items & deadline alerts
            </span>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#625BFF]/20 text-[#A78BFA] border border-[#625BFF]/40">
            {savedOpportunities.length} Saved
          </span>
        </div>
      </header>

      <main className="flex-1 flex flex-col pt-20 px-4 max-w-2xl mx-auto w-full space-y-4">
        {savedOpportunities.length === 0 ? (
          <div
            className="p-8 text-center rounded-2xl flex flex-col items-center gap-3 mt-4"
            style={{ backgroundColor: '#17171D', border: '1px solid #2B2B35' }}
          >
            <div className="w-12 h-12 rounded-full bg-[#1E1E26] flex items-center justify-center text-[#71717A]">
              <span className="material-symbols-outlined text-2xl">bookmark_border</span>
            </div>
            <h3 className="text-sm font-bold text-white">No saved opportunities yet</h3>
            <p className="text-xs text-[#A1A1AA] max-w-xs">
              Bookmark hackathons, grants, and workshops to receive deadline alerts and synergy updates.
            </p>
            <button
              onClick={onExplore}
              className="mt-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#625BFF] text-white hover:brightness-110 cursor-pointer"
            >
              Discover Opportunities
            </button>
          </div>
        ) : (
          savedOpportunities.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl p-4 flex flex-col gap-3 relative overflow-hidden transition-all hover:border-[#625BFF]"
              style={{ backgroundColor: '#17171D', border: '1px solid #2B2B35' }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#2B2B35]"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="text-[10px] font-bold text-[#A78BFA] uppercase tracking-wider block">
                      {item.category}
                    </span>
                    <h3 className="text-sm font-bold text-white leading-tight line-clamp-1">
                      {item.title}
                    </h3>
                    <span className="text-xs text-[#A1A1AA] block mt-0.5">
                      {item.organization}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onToggleSave(item.id)}
                  className="p-1.5 rounded-full text-[#A78BFA] hover:bg-[#2B2B35] cursor-pointer"
                  title="Remove from saved"
                >
                  <span className="material-symbols-outlined text-xl">bookmark</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-lg bg-[#14141B] border border-[#2B2B36] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-[#F59E0B]">schedule</span>
                  <span className="text-[#A1A1AA]">Deadline: <strong className="text-white">{item.deadline}</strong></span>
                </div>
                <div className="p-2 rounded-lg bg-[#14141B] border border-[#2B2B36] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-[#10B981]">payments</span>
                  <span className="text-[#A1A1AA]">Grant: <strong className="text-white">{item.prizePool}</strong></span>
                </div>
              </div>

              <button
                onClick={() => onSelectOpportunity(item)}
                className="w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#2B4CDE] hover:bg-[#243eb5] text-white flex items-center justify-center gap-1.5 cursor-pointer transition-all"
              >
                <span>View Full Details & Apply</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          ))
        )}
      </main>
    </div>
  );
};
