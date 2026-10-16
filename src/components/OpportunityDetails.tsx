import React, { useState } from 'react';
import { Opportunity, UserProfile } from '../types';

interface OpportunityDetailsProps {
  opportunity: Opportunity;
  user: UserProfile;
  isSaved: boolean;
  onToggleSave: () => void;
  onBack: () => void;
  onApply: () => void;
  onOpenSynergy: () => void;
  onAskAiMentor: () => void;
  onShare: () => void;
  hasApplied?: boolean;
}

export const OpportunityDetails: React.FC<OpportunityDetailsProps> = ({
  opportunity,
  user,
  isSaved,
  onToggleSave,
  onBack,
  onApply,
  onOpenSynergy,
  onAskAiMentor,
  onShare,
  hasApplied = false
}) => {
  const [activeTab, setActiveTab] = useState<'Overview' | 'Rounds & Schedule' | 'Prizes & Perks'>('Overview');
  const [documentUploaded, setDocumentUploaded] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#F8F9FD] text-[#0F172A] pb-32">
      {/* Top Header matching Image 5 */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-1 rounded-full text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              type="button"
              aria-label="Back"
            >
              <span className="material-symbols-outlined text-2xl">arrow_back</span>
            </button>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-[#625BFF] flex items-center justify-center text-white text-[10px] font-bold">
                G
              </div>
              <span className="text-xs font-semibold text-slate-500">Growfolio</span>
            </div>
            <h1 className="text-base font-bold text-slate-900 ml-1">Opportunity Details</h1>
          </div>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </header>

      {/* Floating Action Bar (Back, Share, Bookmark) */}
      <div className="max-w-2xl mx-auto px-4 pt-3 flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 cursor-pointer"
          type="button"
          aria-label="Back"
        >
          <span className="material-symbols-outlined text-xl">arrow_back</span>
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={onShare}
            className="w-9 h-9 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 cursor-pointer"
            type="button"
            aria-label="Share"
          >
            <span className="material-symbols-outlined text-xl">share</span>
          </button>
          <button
            onClick={onToggleSave}
            className="w-9 h-9 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center cursor-pointer transition-colors"
            style={{ color: isSaved ? '#625BFF' : '#475569' }}
            type="button"
            aria-label="Save"
          >
            <span
              className="material-symbols-outlined text-xl"
              style={{ fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0" }}
            >
              bookmark
            </span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 pt-3 space-y-4">
        {/* Hero Poster Banner */}
        <div className="relative w-full h-56 rounded-2xl overflow-hidden shadow-md border border-slate-200">
          <img
            src={opportunity.image}
            alt={opportunity.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wide flex items-center gap-1.5 bg-[#40EEA6] text-[#064E3B] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#059669]" />
              <span>{opportunity.levelBadge || 'NATIONAL LEVEL'}</span>
            </span>

            <span className="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 bg-white/90 backdrop-blur-md text-slate-800 shadow-sm">
              <span className="material-symbols-outlined text-sm">groups</span>
              <span>{opportunity.teamSizeBadge || 'Solo or 2-4 Members'}</span>
            </span>
          </div>

          {/* Bottom Card Overlay: GROWFOLIO VERIFIED CHALLENGE */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2.5 bg-slate-900/90 backdrop-blur-md border border-slate-700/60 rounded-xl p-2.5 text-white">
            <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <span className="material-symbols-outlined text-lg">workspace_premium</span>
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-wider text-blue-300 block uppercase">
                Growfolio Verified Challenge
              </span>
              <span className="text-xs font-semibold text-white">
                IIT Bombay Ecosystem
              </span>
            </div>
          </div>
        </div>

        {/* Title and Organizer */}
        <div className="space-y-2 pt-1">
          <h2 className="text-2xl font-bold leading-tight text-slate-900 tracking-tight">
            {opportunity.title}
          </h2>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">Organised by</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 font-semibold text-slate-800 truncate">
              {opportunity.organization}
            </span>
          </div>
        </div>

        {/* 3 Metric Cards Grid (Mode, Entry Fee, Eligibility) */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-sm flex flex-col items-center text-center">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#2B4CDE] mb-1.5">
              <span className="material-symbols-outlined text-lg">apartment</span>
            </div>
            <span className="text-[11px] text-slate-500">Mode</span>
            <span className="text-xs font-bold text-slate-900">Hybrid Finals</span>
            <span className="text-[10px] text-slate-500">Online Prelims</span>
          </div>

          <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-sm flex flex-col items-center text-center">
            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-1.5">
              <span className="material-symbols-outlined text-lg">payments</span>
            </div>
            <span className="text-[11px] text-slate-500">Entry Fee</span>
            <span className="text-xs font-bold text-emerald-600">{opportunity.costTag}</span>
            <span className="text-[10px] text-slate-500">Zero Hidden Cost</span>
          </div>

          <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-sm flex flex-col items-center text-center">
            <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mb-1.5">
              <span className="material-symbols-outlined text-lg">school</span>
            </div>
            <span className="text-[11px] text-slate-500">Eligibility</span>
            <span className="text-xs font-bold text-slate-900">Classes 9–12</span>
            <span className="text-[10px] text-slate-500">Ages 14–18 Yrs</span>
          </div>
        </div>

        {/* Applications Close Soon Notice Banner */}
        <div className="p-3.5 rounded-2xl bg-[#EEF2FF] border border-[#C7D2FE] flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
            <span className="material-symbols-outlined text-lg">schedule</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-rose-600">Applications Close Soon</span>
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            </div>
            <span className="text-xs font-semibold text-slate-800">
              Closes in 3 days, 14 hours (Oct 31, 2025)
            </span>
          </div>
        </div>

        {/* Why this fits your profile Card */}
        <div className="rounded-2xl bg-white p-4 border border-slate-200/90 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#2B4CDE] flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-base">auto_awesome</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">Why this fits your profile</h3>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#6EE7B7] text-[#064E3B] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
              <span>96% Match</span>
            </span>
          </div>

          <div className="space-y-2.5 pt-1">
            <div className="flex items-start gap-2.5 text-xs text-slate-700">
              <div className="w-5 h-5 rounded-full bg-blue-100 text-[#2B4CDE] flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-sm font-bold">check</span>
              </div>
              <p>
                You listed <strong className="font-semibold text-slate-900">Robotics & Coding</strong> as your target interests for Class 11.
              </p>
            </div>

            <div className="flex items-start gap-2.5 text-xs text-slate-700">
              <div className="w-5 h-5 rounded-full bg-blue-100 text-[#2B4CDE] flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-sm font-bold">check</span>
              </div>
              <p>
                Your recorded <strong className="font-semibold text-slate-900">Intermediate Python & Arduino</strong> badges exceed all prerequisite minimums.
              </p>
            </div>

            <div className="flex items-start gap-2.5 text-xs text-slate-700">
              <div className="w-5 h-5 rounded-full bg-blue-100 text-[#2B4CDE] flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-sm font-bold">verified</span>
              </div>
              <p>
                Top 10 finalists receive an <strong className="font-semibold text-slate-900">IIT-verified credential</strong> recognized globally for college admissions.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 text-[11px]">Calculated from your Growfolio Academic Graph</span>
            <button
              onClick={onOpenSynergy}
              className="text-[#2B4CDE] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>Explore synergy</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Segmented Navigation Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-200/80 rounded-xl">
          {(['Overview', 'Rounds & Schedule', 'Prizes & Perks'] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  isActive ? 'bg-[#0030C2] text-white shadow-sm' : 'text-slate-700 hover:text-slate-900'
                }`}
                type="button"
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'Overview' && (
          <div className="space-y-4">
            {/* What You Will Gain */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-xl text-[#0030C2]">military_tech</span>
                <h3 className="text-base font-bold text-slate-900">What You Will Gain</h3>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {/* 1 */}
                <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col gap-1.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-[#2B4CDE] flex items-center justify-center">
                    <span className="material-symbols-outlined text-base">stars</span>
                  </div>
                  <span className="text-xs font-bold text-slate-900">National Acclaim</span>
                  <span className="text-[11px] text-slate-600 leading-snug">
                    Coverage in leading academic media & IIT TechFest showcase.
                  </span>
                </div>

                {/* 2 */}
                <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col gap-1.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <span className="material-symbols-outlined text-base">currency_rupee</span>
                  </div>
                  <span className="text-xs font-bold text-slate-900">₹3,00,000 Pool</span>
                  <span className="text-[11px] text-slate-600 leading-snug">
                    Project development grants + hardware prototyping toolkits.
                  </span>
                </div>

                {/* 3 */}
                <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col gap-1.5">
                  <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                    <span className="material-symbols-outlined text-base">school</span>
                  </div>
                  <span className="text-xs font-bold text-slate-900">IIT Mentorship</span>
                  <span className="text-[11px] text-slate-600 leading-snug">
                    Direct 1:1 project refinement with senior research faculty.
                  </span>
                </div>

                {/* 4 */}
                <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col gap-1.5">
                  <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
                    <span className="material-symbols-outlined text-base">verified_user</span>
                  </div>
                  <span className="text-xs font-bold text-slate-900">Aura Portfolio</span>
                  <span className="text-[11px] text-slate-600 leading-snug">
                    Cryptographically signed badge auto-linked to your profile.
                  </span>
                </div>
              </div>
            </div>

            {/* Eligibility & Prerequisites */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-xl text-[#0030C2]">checklist</span>
                <h3 className="text-base font-bold text-slate-900">Eligibility & Prerequisites</h3>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
                <p className="text-xs text-slate-700 leading-relaxed">
                  Open to all high school students currently enrolled in <strong className="font-bold text-slate-900">Grades 9 through 12</strong> across India. Students can participate as an individual or register as a team of 2 to 4 members.
                </p>

                <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 flex items-start gap-2.5 text-xs text-slate-700">
                  <span className="material-symbols-outlined text-blue-600 text-base mt-0.5">lightbulb</span>
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">No prior hackathon wins required</span>
                    <span className="text-slate-600">
                      Foundational computational logic or basic block/Python coding is recommended, but passion and grit come first.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Required Documents */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-xl text-[#0030C2]">folder_open</span>
                <h3 className="text-base font-bold text-slate-900">Required Documents</h3>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
                <div className="p-3.5 rounded-xl bg-[#EEF2FF] border border-[#C7D2FE] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center text-[#2B4CDE] shrink-0">
                      <span className="material-symbols-outlined text-xl">badge</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">School ID Card or Bonafide Letter</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#E0E7FF] text-[#3730A3]">
                          Mandatory
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-600 block">
                        PDF or clear photo showing valid academic year 2024–25
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setDocumentUploaded(!documentUploaded)}
                    className="px-2.5 py-1 text-xs font-semibold rounded-lg border border-indigo-300 text-indigo-700 hover:bg-indigo-50 cursor-pointer shrink-0"
                  >
                    {documentUploaded ? 'Uploaded ✓' : 'Upload'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Rounds & Schedule */}
        {activeTab === 'Rounds & Schedule' && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Competition Milestones</h3>
            <div className="space-y-3">
              {opportunity.roundsSchedule?.map((round) => (
                <div
                  key={round.roundNumber}
                  className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-[#0030C2] font-bold text-xs flex items-center justify-center shrink-0">
                    R{round.roundNumber}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-xs font-bold text-slate-900">{round.title}</h4>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {round.mode}
                      </span>
                    </div>
                    <span className="text-[11px] font-medium text-indigo-600 block mb-1">
                      {round.dates}
                    </span>
                    <p className="text-xs text-slate-600">{round.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Prizes & Perks */}
        {activeTab === 'Prizes & Perks' && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Grants & Recognition</h3>
            <div className="space-y-3">
              {opportunity.prizes?.map((prize, idx) => (
                <div
                  key={prize.place}
                  className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-amber-500 text-lg">
                        {idx === 0 ? 'emoji_events' : idx === 1 ? 'workspace_premium' : 'military_tech'}
                      </span>
                      <span className="text-xs font-bold text-slate-900">{prize.place}</span>
                    </div>
                    <span className="text-sm font-bold text-emerald-600">{prize.amount}</span>
                  </div>
                  <ul className="space-y-1 text-xs text-slate-600 list-disc list-inside">
                    {prize.perks.map((perk) => (
                      <li key={perk}>{perk}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Sticky Bottom Action Bar matching Image 5 */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-slate-200 py-2.5 px-4">
        <div className="max-w-2xl mx-auto space-y-2">
          {/* Top row: Ask AI Mentor link + Deadline */}
          <div className="flex items-center justify-between text-xs px-1">
            <button
              onClick={onAskAiMentor}
              className="flex items-center gap-1.5 font-semibold text-[#0030C2] hover:underline cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">explore</span>
              <span>Ask AI Mentor about this event</span>
            </button>
            <span className="text-slate-500 font-medium">Oct 31 Deadline</span>
          </div>

          {/* Bottom row: Fee Status + Register CTA */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                Fee Status
              </span>
              <span className="text-base font-bold text-slate-900">
                {opportunity.costIsFree ? '₹0 Free' : opportunity.costTag}
              </span>
            </div>

            <button
              onClick={onApply}
              className={`flex-1 py-3 px-5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer ${
                hasApplied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#0030C2] hover:bg-[#00259e] text-white active:scale-[0.99]'
              }`}
              type="button"
            >
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              <span>{hasApplied ? 'Application Submitted ✓' : 'Register Now — Instant Apply'}</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
