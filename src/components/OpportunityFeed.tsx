import React, { useState } from 'react';
import { Opportunity, UserProfile } from '../types';

interface OpportunityFeedProps {
  user: UserProfile;
  opportunities: Opportunity[];
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onSelectOpportunity: (opportunity: Opportunity) => void;
  onOpenNotifications: () => void;
  initialFilter?: string;
}

export const OpportunityFeed: React.FC<OpportunityFeedProps> = ({
  user,
  opportunities,
  savedIds,
  onToggleSave,
  onSelectOpportunity,
  onOpenNotifications,
  initialFilter = 'For You (14)'
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('Robotics & Coding');
  const [activeCategory, setActiveCategory] = useState<string>(initialFilter);
  const [sortBy, setSortBy] = useState<'relevance' | 'match' | 'deadline' | 'prize'>('relevance');
  const [showSortMenu, setShowSortMenu] = useState<boolean>(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState<boolean>(false);
  const [freeOnly, setFreeOnly] = useState<boolean>(false);

  const categories = [
    { id: 'For You (14)', label: 'For You (14)', icon: 'sparkles' },
    { id: 'Competitions', label: 'Competitions' },
    { id: 'Hackathons', label: 'Hackathons' },
    { id: 'Workshops', label: 'Workshops' },
    { id: 'Scholarships', label: 'Scholarships' }
  ];

  // Filtering
  const filteredOpportunities = opportunities.filter((item) => {
    // Search query
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchSearch =
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.organization.toLowerCase().includes(q) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(q));
      if (!matchSearch) return false;
    }

    if (freeOnly && !item.costIsFree) return false;

    if (activeCategory === 'Competitions') {
      return item.category.includes('Robotics') || item.category.includes('Debate');
    }
    if (activeCategory === 'Hackathons') {
      return item.title.includes('Hackathon') || item.title.includes('Sprint');
    }
    if (activeCategory === 'Workshops') {
      return item.format.includes('Online') || item.title.includes('Sprint');
    }
    if (activeCategory === 'Scholarships') {
      return item.prizePool.includes('₹') || item.costTag.includes('Scholarship');
    }

    return true;
  });

  // Sorting
  const sortedOpportunities = [...filteredOpportunities].sort((a, b) => {
    if (sortBy === 'match') {
      return b.matchPercentage - a.matchPercentage;
    }
    return 0; // default order preserves curated matching
  });

  return (
    <div className="flex-1 flex flex-col min-h-screen text-[#F5F5F7]">
      {/* Fixed Header */}
      <header
        className="fixed top-0 w-full z-40 backdrop-blur-xl"
        style={{
          backgroundColor: 'rgba(16, 16, 20, 0.92)',
          borderBottom: '1px solid #2B2B35'
        }}
      >
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-base shadow-sm"
              style={{ background: 'linear-gradient(135deg, #625BFF, #A78BFA)', color: '#FFFFFF' }}
            >
              G
            </div>
            <div>
              <h1 className="text-base font-bold leading-none text-[#F5F5F7]">Opportunity Feed</h1>
              <span className="text-xs" style={{ color: '#A1A1AA' }}>
                Curated for {user.name}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenNotifications}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer hover:bg-[#22222d]"
              style={{ backgroundColor: '#17171D', border: '1px solid #2B2B35', color: '#F5F5F7' }}
              type="button"
              aria-label="Notifications"
            >
              <span className="material-symbols-outlined text-[19px]">notifications</span>
            </button>
            <button
              onClick={() => setFilterDrawerOpen(!filterDrawerOpen)}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer hover:bg-[#22222d]"
              style={{ backgroundColor: '#17171D', border: '1px solid #2B2B35', color: '#F5F5F7' }}
              type="button"
              aria-label="Filters"
            >
              <span className="material-symbols-outlined text-[19px]">tune</span>
            </button>
          </div>
        </div>

        {/* Search Bar & Filters */}
        <div className="max-w-2xl mx-auto px-4 pb-3 flex flex-col gap-2.5">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-lg" style={{ color: '#71717A' }}>
              search
            </span>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2.5 pl-10 pr-10 rounded-xl text-sm transition-all focus:outline-none focus:ring-1 focus:ring-[#625BFF]"
              placeholder="Search hackathons, workshops, scholarships..."
              style={{ backgroundColor: '#121218', border: '1px solid #2B2B35', color: '#F5F5F7' }}
              type="text"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="material-symbols-outlined absolute right-3 text-base cursor-pointer hover:text-white"
                style={{ color: '#71717A' }}
                type="button"
              >
                close
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-xs transition-all cursor-pointer whitespace-nowrap shadow-sm flex items-center gap-1 ${
                    isActive ? 'font-semibold' : 'font-medium'
                  }`}
                  style={{
                    backgroundColor: isActive ? '#625BFF' : '#17171D',
                    border: isActive ? 'none' : '1px solid #2B2B35',
                    color: isActive ? '#FFFFFF' : '#A1A1AA'
                  }}
                  type="button"
                >
                  {cat.icon && <span className="material-symbols-outlined text-sm">{cat.icon}</span>}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Quick Filter Drawer Popover */}
      {filterDrawerOpen && (
        <div className="fixed inset-x-0 top-36 z-30 max-w-2xl mx-auto px-4 animate-in fade-in duration-200">
          <div
            className="p-4 rounded-2xl shadow-2xl flex flex-col gap-3 backdrop-blur-2xl"
            style={{ backgroundColor: '#14141B', border: '1px solid #2B2B36' }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A78BFA]">Filter Preferences</span>
              <button
                onClick={() => setFilterDrawerOpen(false)}
                className="text-xs text-[#71717A] hover:text-white cursor-pointer"
              >
                Done
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#F5F5F7]">Show 100% Free Opportunities only</span>
              <button
                onClick={() => setFreeOnly(!freeOnly)}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                  freeOnly ? 'bg-[#10B981]' : 'bg-[#2B2B35]'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                    freeOnly ? 'left-6' : 'left-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Feed with Dynamic Poster-Derived Accent Cards */}
      <main className="flex-1 flex flex-col pt-36 pb-24 px-4 max-w-2xl mx-auto w-full space-y-4">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#A1A1AA' }}>
            Showing {sortedOpportunities.length} Best Matches
          </span>
          <div className="relative">
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="text-xs flex items-center gap-1 cursor-pointer font-medium hover:underline"
              style={{ color: '#625BFF' }}
              type="button"
            >
              <span>Sort: {sortBy === 'relevance' ? 'Relevance' : 'Match Score'}</span>
              <span className="material-symbols-outlined text-sm">expand_more</span>
            </button>
            {showSortMenu && (
              <div
                className="absolute right-0 top-6 w-36 rounded-xl shadow-xl z-20 py-1"
                style={{ backgroundColor: '#17171D', border: '1px solid #2B2B35' }}
              >
                <button
                  onClick={() => {
                    setSortBy('relevance');
                    setShowSortMenu(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-[#F5F5F7] hover:bg-[#22222D]"
                >
                  Relevance
                </button>
                <button
                  onClick={() => {
                    setSortBy('match');
                    setShowSortMenu(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-[#F5F5F7] hover:bg-[#22222D]"
                >
                  Highest Match %
                </button>
              </div>
            )}
          </div>
        </div>

        {sortedOpportunities.length === 0 ? (
          <div
            className="p-8 text-center rounded-2xl flex flex-col items-center gap-3"
            style={{ backgroundColor: '#17171D', border: '1px solid #2B2B35' }}
          >
            <span className="material-symbols-outlined text-3xl text-[#71717A]">search_off</span>
            <p className="text-sm text-[#A1A1AA]">No opportunities match your search filter.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('For You (14)');
                setFreeOnly(false);
              }}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#625BFF] text-white"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          sortedOpportunities.map((item) => {
            const isSaved = savedIds.includes(item.id);

            // Styling variables by accent color matching Obsidian chroma design specs
            let borderStyle = '1px solid rgba(6, 182, 212, 0.4)';
            let glowStyle = 'rgba(6, 182, 212, 0.12)';
            let tagBg = 'rgba(6, 182, 212, 0.2)';
            let tagColor = '#38BDF8';
            let tagBorder = '1px solid rgba(6, 182, 212, 0.5)';
            let matchBg = 'rgba(6, 182, 212, 0.15)';
            let matchColor = '#38BDF8';
            let matchBorder = '1px solid rgba(6, 182, 212, 0.4)';
            let noteBg = 'rgba(6, 182, 212, 0.08)';
            let noteBorder = '1px solid rgba(6, 182, 212, 0.25)';
            let noteColor = '#38BDF8';
            let buttonGradient = 'linear-gradient(135deg, #0891B2, #0284C7)';
            let noteIcon = 'auto_awesome';

            if (item.categoryAccent === 'purple') {
              borderStyle = '1px solid rgba(168, 85, 247, 0.4)';
              glowStyle = 'rgba(168, 85, 247, 0.12)';
              tagBg = 'rgba(168, 85, 247, 0.2)';
              tagColor = '#C084FC';
              tagBorder = '1px solid rgba(168, 85, 247, 0.5)';
              matchBg = 'rgba(168, 85, 247, 0.15)';
              matchColor = '#C084FC';
              matchBorder = '1px solid rgba(168, 85, 247, 0.4)';
              noteBg = 'rgba(168, 85, 247, 0.08)';
              noteBorder = '1px solid rgba(168, 85, 247, 0.25)';
              noteColor = '#C084FC';
              buttonGradient = 'linear-gradient(135deg, #9333EA, #7C3AED)';
              noteIcon = 'code';
            } else if (item.categoryAccent === 'amber') {
              borderStyle = '1px solid rgba(245, 158, 11, 0.4)';
              glowStyle = 'rgba(245, 158, 11, 0.12)';
              tagBg = 'rgba(245, 158, 11, 0.2)';
              tagColor = '#FBBF24';
              tagBorder = '1px solid rgba(245, 158, 11, 0.5)';
              matchBg = 'rgba(245, 158, 11, 0.15)';
              matchColor = '#FBBF24';
              matchBorder = '1px solid rgba(245, 158, 11, 0.4)';
              noteBg = 'rgba(245, 158, 11, 0.08)';
              noteBorder = '1px solid rgba(245, 158, 11, 0.25)';
              noteColor = '#FBBF24';
              buttonGradient = 'linear-gradient(135deg, #D97706, #EA580C)';
              noteIcon = 'school';
            } else if (item.categoryAccent === 'rose') {
              borderStyle = '1px solid rgba(251, 113, 133, 0.4)';
              glowStyle = 'rgba(251, 113, 133, 0.12)';
              tagBg = 'rgba(251, 113, 133, 0.2)';
              tagColor = '#FDA4AF';
              tagBorder = '1px solid rgba(251, 113, 133, 0.5)';
              matchBg = 'rgba(251, 113, 133, 0.15)';
              matchColor = '#FDA4AF';
              matchBorder = '1px solid rgba(251, 113, 133, 0.4)';
              noteBg = 'rgba(251, 113, 133, 0.08)';
              noteBorder = '1px solid rgba(251, 113, 133, 0.25)';
              noteColor = '#FDA4AF';
              buttonGradient = 'linear-gradient(135deg, #FB7185, #E11D48)';
              noteIcon = 'forum';
            }

            return (
              <div
                key={item.id}
                className="rounded-2xl p-4 transition-all shadow-lg flex flex-col gap-3 relative overflow-hidden"
                style={{
                  backgroundColor: '#17171D',
                  border: borderStyle
                }}
              >
                {/* Subtle top corner gradient accent */}
                <div
                  className="absolute -right-8 -top-8 w-28 h-28 rounded-full blur-2xl pointer-events-none"
                  style={{ background: glowStyle }}
                />

                {/* Poster Banner Image */}
                <div className="relative w-full h-36 rounded-xl overflow-hidden" style={{ border: '1px solid #2B2B35' }}>
                  <img
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    src={item.image}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback if local asset is loading
                      (e.currentTarget as HTMLImageElement).src =
                        'https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#17171D] via-transparent to-black/30" />

                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span
                      className="px-2 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider"
                      style={{
                        backgroundColor: tagBg,
                        color: tagColor,
                        border: tagBorder
                      }}
                    >
                      {item.category}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded-md text-[11px] font-bold"
                      style={{
                        backgroundColor: '#101014',
                        color: item.costIsFree ? '#10B981' : '#F5F5F7',
                        border: '1px solid #2B2B35'
                      }}
                    >
                      {item.costTag}
                    </span>
                  </div>

                  <div className="absolute top-2.5 right-2.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSave(item.id);
                      }}
                      className="w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-md cursor-pointer hover:scale-110 active:scale-95 transition-all"
                      style={{
                        backgroundColor: isSaved ? '#625BFF' : 'rgba(16, 16, 20, 0.7)',
                        color: '#F5F5F7'
                      }}
                      type="button"
                      aria-label="Save Opportunity"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {isSaved ? 'bookmark' : 'bookmark_border'}
                      </span>
                    </button>
                  </div>

                  {item.verifiedOrgBadge && (
                    <div className="absolute bottom-2 left-2.5 flex items-center gap-1.5 text-xs font-semibold" style={{ color: tagColor }}>
                      <span className="material-symbols-outlined text-sm">verified</span>
                      <span>{item.verifiedOrgBadge}</span>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-base font-bold leading-tight text-[#F5F5F7] line-clamp-1">
                      {item.title}
                    </h2>
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-bold whitespace-nowrap shrink-0"
                      style={{
                        backgroundColor: matchBg,
                        color: matchColor,
                        border: matchBorder
                      }}
                    >
                      {item.matchPercentage}% Match
                    </span>
                  </div>
                  <p className="text-xs line-clamp-2" style={{ color: '#A1A1AA' }}>
                    {item.subtitle}
                  </p>
                </div>

                {/* Key Metadata Row */}
                <div className="grid grid-cols-3 gap-2 py-1 text-center">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: '#1E1E26', border: '1px solid #2B2B35' }}>
                    <span className="text-[10px] block" style={{ color: '#71717A' }}>
                      Format
                    </span>
                    <span className="text-xs font-semibold text-[#F5F5F7] truncate block">
                      {item.format}
                    </span>
                  </div>
                  <div className="p-2 rounded-lg" style={{ backgroundColor: '#1E1E26', border: '1px solid #2B2B35' }}>
                    <span className="text-[10px] block" style={{ color: '#71717A' }}>
                      {item.categoryAccent === 'amber' ? 'Cohort' : item.categoryAccent === 'rose' ? 'Role' : 'Prize Pool'}
                    </span>
                    <span
                      className="text-xs font-semibold truncate block"
                      style={{ color: item.costIsFree ? '#10B981' : tagColor }}
                    >
                      {item.prizePool}
                    </span>
                  </div>
                  <div className="p-2 rounded-lg" style={{ backgroundColor: '#1E1E26', border: '1px solid #2B2B35' }}>
                    <span className="text-[10px] block" style={{ color: '#71717A' }}>
                      Deadline
                    </span>
                    <span className="text-xs font-semibold text-[#F59E0B] truncate block">
                      {item.deadline}
                    </span>
                  </div>
                </div>

                {/* Match Explanation Chip */}
                <div
                  className="p-2.5 rounded-xl flex items-center gap-2 text-xs"
                  style={{
                    backgroundColor: noteBg,
                    border: noteBorder,
                    color: noteColor
                  }}
                >
                  <span className="material-symbols-outlined text-base shrink-0">{noteIcon}</span>
                  <span className="truncate">{item.matchReason}</span>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => onSelectOpportunity(item)}
                  className="w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer hover:brightness-110 active:scale-[0.99]"
                  style={{
                    background: buttonGradient,
                    color: '#FFFFFF'
                  }}
                  type="button"
                >
                  <span>View Opportunity Details</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            );
          })
        )}
      </main>
    </div>
  );
};
