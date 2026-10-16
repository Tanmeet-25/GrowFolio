import React, { useState } from 'react';
import { Opportunity, UserProfile } from '../types';
import { urgentOpportunity } from '../data/opportunities';

interface StudentDashboardProps {
  user: UserProfile;
  opportunities: Opportunity[];
  onSelectOpportunity: (opportunity: Opportunity) => void;
  onOpenAiMentor: (initialPrompt?: string) => void;
  onNavigateToDiscover: (filter?: string) => void;
  onOpenUrgentApply: () => void;
  onOpenNotifications: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  user,
  opportunities,
  onSelectOpportunity,
  onOpenAiMentor,
  onNavigateToDiscover,
  onOpenUrgentApply,
  onOpenNotifications
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('For You');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterPills = ['For You', 'Competitions', 'Workshops', 'Hackathons', 'Study Abroad'];

  // The 2 primary best matches shown in dashboard
  const roboticsOpp = opportunities.find((o) => o.id === 'national-youth-robotics-hackathon') || opportunities[0];
  const web3Opp = opportunities.find((o) => o.id === 'national-high-school-web3-ai-builders-sprint') || opportunities[1];

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    if (filter !== 'For You') {
      onNavigateToDiscover(filter);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigateToDiscover(searchQuery.trim());
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen pb-24 text-[#F5F5F7]">
      {/* Header with Greeting & Avatar */}
      <header
        className="fixed top-0 w-full z-40 backdrop-blur-xl"
        style={{
          backgroundColor: 'rgba(16, 16, 20, 0.92)',
          borderBottom: '1px solid #2B2B35'
        }}
      >
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden" style={{ border: '2px solid #625BFF' }}>
              <img
                className="w-full h-full object-cover"
                src={user.avatarUrl}
                alt={user.name}
                referrerPolicy="no-referrer"
              />
              <span
                className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: '#10B981', border: '1.5px solid #101014' }}
              />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider block" style={{ color: '#A78BFA' }}>
                {user.grade} • {user.city}
              </span>
              <h1 className="text-base font-bold leading-tight text-[#F5F5F7]">
                Good morning, {user.name.split(' ')[0]}!
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenNotifications}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors relative cursor-pointer hover:bg-[#22222d]"
              style={{
                backgroundColor: '#17171D',
                border: '1px solid #2B2B35',
                color: '#F5F5F7'
              }}
              type="button"
              aria-label="Notifications"
            >
              <span className="material-symbols-outlined text-[19px]">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ backgroundColor: '#625BFF' }} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col pt-20 px-4 max-w-2xl mx-auto w-full space-y-4">
        {/* Profile Completion Indicator Card */}
        <div
          className="rounded-2xl p-4 shadow-sm flex flex-col gap-2.5"
          style={{ backgroundColor: '#17171D', border: '1px solid #2B2B35' }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-lg" style={{ color: '#625BFF' }}>
                verified_user
              </span>
              <span className="text-xs font-bold text-[#F5F5F7]">
                Profile Strength: {user.profileStrength}%
              </span>
            </div>
            <button
              onClick={() => onNavigateToDiscover('Olympiad')}
              className="text-xs font-semibold cursor-pointer hover:underline"
              style={{ color: '#A78BFA' }}
            >
              {user.strengthUpsell}
            </button>
          </div>
          <div className="w-full rounded-full h-2 overflow-hidden" style={{ backgroundColor: '#1E1E26' }}>
            <div
              className="h-2 rounded-full transition-all duration-700"
              style={{
                width: `${user.profileStrength}%`,
                background: 'linear-gradient(90deg, #625BFF, #A78BFA)'
              }}
            />
          </div>
          <span className="text-[11px]" style={{ color: '#A1A1AA' }}>
            Your profile qualifies for {user.qualifiedCount} verified Tier-1 competitions and research grants.
          </span>
        </div>

        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-3.5 text-lg" style={{ color: '#71717A' }}>
            search
          </span>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-3 pl-11 pr-4 rounded-xl text-sm transition-all focus:outline-none focus:ring-1 focus:ring-[#625BFF]"
            placeholder="Find competitions, workshops, scholarships..."
            style={{
              backgroundColor: '#121218',
              border: '1px solid #2B2B35',
              color: '#F5F5F7'
            }}
            type="text"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 text-[#71717A] hover:text-[#F5F5F7] text-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">close</span>
            </button>
          )}
        </form>

        {/* Quick Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          {filterPills.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => handleFilterClick(filter)}
                className={`px-3.5 py-1.5 rounded-full text-xs transition-all cursor-pointer whitespace-nowrap shadow-sm ${
                  isActive ? 'font-semibold' : 'font-medium'
                }`}
                style={{
                  backgroundColor: isActive ? '#625BFF' : '#17171D',
                  border: isActive ? 'none' : '1px solid #2B2B35',
                  color: isActive ? '#FFFFFF' : '#A1A1AA'
                }}
                type="button"
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Section: Urgent Deadlines ("Closing Soon") */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base" style={{ color: '#F59E0B' }}>
                timer
              </span>
              <h2 className="text-sm font-bold text-[#F5F5F7]">Closing Soon (Next 72 Hours)</h2>
            </div>
            <span className="text-xs font-medium" style={{ color: '#F59E0B' }}>
              2 Urgent
            </span>
          </div>

          <div
            className="p-3.5 rounded-xl flex items-center justify-between shadow-sm transition-transform active:scale-[0.99]"
            style={{
              backgroundColor: '#1A1513',
              border: '1px solid #78350F'
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs shrink-0"
                style={{
                  backgroundColor: 'rgba(245, 158, 11, 0.15)',
                  color: '#F59E0B',
                  border: '1px solid rgba(245, 158, 11, 0.4)'
                }}
              >
                {urgentOpportunity.timeLeft}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#F5F5F7] line-clamp-1">
                  {urgentOpportunity.title}
                </span>
                <span className="text-[11px]" style={{ color: '#A1A1AA' }}>
                  {urgentOpportunity.grant} • {urgentOpportunity.deadlineNotice}
                </span>
              </div>
            </div>
            <button
              onClick={onOpenUrgentApply}
              className="px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer hover:brightness-110 active:scale-95 transition-all shrink-0 ml-2"
              style={{ backgroundColor: '#F59E0B', color: '#000000' }}
              type="button"
            >
              Apply
            </button>
          </div>
        </div>

        {/* Section: Best Matches for You */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base" style={{ color: '#625BFF' }}>
                stars
              </span>
              <h2 className="text-sm font-bold text-[#F5F5F7]">Best Matches for You</h2>
            </div>
            <button
              onClick={() => onNavigateToDiscover()}
              className="text-xs font-semibold cursor-pointer hover:underline"
              style={{ color: '#625BFF' }}
            >
              See All
            </button>
          </div>

          {/* Match Card 1: Electric Cyan Accent (Robotics) */}
          <div
            onClick={() => onSelectOpportunity(roboticsOpp)}
            className="rounded-2xl p-4 shadow-sm flex flex-col gap-3 relative overflow-hidden cursor-pointer transition-all hover:border-[#38BDF8] active:scale-[0.99]"
            style={{
              backgroundColor: '#17171D',
              border: '1px solid rgba(6, 182, 212, 0.4)'
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"
                    style={{
                      backgroundColor: 'rgba(6, 182, 212, 0.2)',
                      color: '#38BDF8',
                      border: '1px solid rgba(6, 182, 212, 0.4)'
                    }}
                  >
                    {roboticsOpp.category}
                  </span>
                  <span className="text-[11px] font-medium" style={{ color: '#10B981' }}>
                    {roboticsOpp.costTag}
                  </span>
                </div>
                <h3 className="text-sm font-bold leading-snug text-[#F5F5F7]">
                  {roboticsOpp.title}
                </h3>
                <span className="text-xs" style={{ color: '#A1A1AA' }}>
                  Organized by {roboticsOpp.organization.split('&')[0]}
                </span>
              </div>
              <span
                className="px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap shrink-0 ml-2"
                style={{
                  backgroundColor: 'rgba(6, 182, 212, 0.15)',
                  color: '#38BDF8',
                  border: '1px solid rgba(6, 182, 212, 0.4)'
                }}
              >
                {roboticsOpp.matchPercentage}% Match
              </span>
            </div>
            <div
              className="p-2.5 rounded-xl text-xs flex items-center gap-2"
              style={{
                backgroundColor: 'rgba(6, 182, 212, 0.08)',
                border: '1px solid rgba(6, 182, 212, 0.2)',
                color: '#38BDF8'
              }}
            >
              <span className="material-symbols-outlined text-base shrink-0">psychology</span>
              <span className="truncate">Recommended because you enjoy Robotics at intermediate level</span>
            </div>
          </div>

          {/* Match Card 2: Violet Accent (Coding & Web3) */}
          <div
            onClick={() => onSelectOpportunity(web3Opp)}
            className="rounded-2xl p-4 shadow-sm flex flex-col gap-3 relative overflow-hidden cursor-pointer transition-all hover:border-[#C084FC] active:scale-[0.99]"
            style={{
              backgroundColor: '#17171D',
              border: '1px solid rgba(168, 85, 247, 0.4)'
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"
                    style={{
                      backgroundColor: 'rgba(168, 85, 247, 0.2)',
                      color: '#C084FC',
                      border: '1px solid rgba(168, 85, 247, 0.4)'
                    }}
                  >
                    Coding Sprint
                  </span>
                  <span className="text-[11px] font-medium" style={{ color: '#C084FC' }}>
                    {web3Opp.prizePool}
                  </span>
                </div>
                <h3 className="text-sm font-bold leading-snug text-[#F5F5F7]">
                  {web3Opp.title}
                </h3>
                <span className="text-xs" style={{ color: '#A1A1AA' }}>
                  Organized by {web3Opp.organization}
                </span>
              </div>
              <span
                className="px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap shrink-0 ml-2"
                style={{
                  backgroundColor: 'rgba(168, 85, 247, 0.15)',
                  color: '#C084FC',
                  border: '1px solid rgba(168, 85, 247, 0.4)'
                }}
              >
                {web3Opp.matchPercentage}% Match
              </span>
            </div>
            <div
              className="p-2.5 rounded-xl text-xs flex items-center gap-2"
              style={{
                backgroundColor: 'rgba(168, 85, 247, 0.08)',
                border: '1px solid rgba(168, 85, 247, 0.2)',
                color: '#C084FC'
              }}
            >
              <span className="material-symbols-outlined text-base shrink-0">code</span>
              <span className="truncate">Matches your Competitive Coding goal for Ivy League showcase</span>
            </div>
          </div>
        </div>

        {/* AI Career Spark Module */}
        <div
          className="rounded-2xl p-4 shadow-sm flex items-center justify-between relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #18182E 0%, #101018 100%)',
            border: '1px solid #2B2B35'
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background: 'rgba(99, 102, 241, 0.25)',
                color: '#A78BFA',
                border: '1px solid rgba(99, 102, 241, 0.4)'
              }}
            >
              <span className="material-symbols-outlined text-xl">smart_toy</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#F5F5F7]">Ask Growfolio AI Mentor</span>
              <span className="text-[11px]" style={{ color: '#A1A1AA' }}>
                "Which competition should I enter this month?"
              </span>
            </div>
          </div>
          <button
            onClick={() => onOpenAiMentor('Which competition should I enter this month?')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 shadow-sm transition-all hover:brightness-110 active:scale-95 cursor-pointer shrink-0 ml-2"
            style={{ backgroundColor: '#625BFF', color: '#FFFFFF' }}
            type="button"
          >
            <span>Chat</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </main>
    </div>
  );
};
