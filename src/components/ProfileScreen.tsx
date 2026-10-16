import React from 'react';
import { UserProfile } from '../types';

interface ProfileScreenProps {
  user: UserProfile;
  appliedCount: number;
  savedCount: number;
  onExploreOpportunities: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  appliedCount,
  savedCount,
  onExploreOpportunities
}) => {
  return (
    <div className="flex-1 flex flex-col min-h-screen text-[#F5F5F7] pb-24">
      {/* Header */}
      <header
        className="fixed top-0 w-full z-40 backdrop-blur-xl"
        style={{
          backgroundColor: 'rgba(16, 16, 20, 0.92)',
          borderBottom: '1px solid #2B2B35'
        }}
      >
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-base font-bold text-[#F5F5F7]">Student Dossier & Profile</h1>
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/40">
            Growfolio Verified
          </span>
        </div>
      </header>

      <main className="flex-1 flex flex-col pt-20 px-4 max-w-2xl mx-auto w-full space-y-4">
        {/* User Bio Card */}
        <div
          className="rounded-2xl p-5 shadow-sm flex flex-col gap-4 relative overflow-hidden"
          style={{ backgroundColor: '#17171D', border: '1px solid #2B2B35' }}
        >
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#625BFF] shadow-lg">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#17171D]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">{user.name}</h2>
                <span className="material-symbols-outlined text-[#625BFF] text-base">verified</span>
              </div>
              <span className="text-xs font-semibold text-[#A78BFA] block">
                {user.grade} • {user.city}
              </span>
              <span className="text-xs text-[#A1A1AA] block">{user.school}</span>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-[#2B2B35]">
            <div className="p-2.5 rounded-xl bg-[#121218] border border-[#2B2B35]">
              <span className="text-[10px] text-[#71717A] block">Profile Strength</span>
              <span className="text-sm font-bold text-[#A78BFA]">{user.profileStrength}%</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#121218] border border-[#2B2B35]">
              <span className="text-[10px] text-[#71717A] block">Submitted</span>
              <span className="text-sm font-bold text-[#10B981]">{appliedCount}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#121218] border border-[#2B2B35]">
              <span className="text-[10px] text-[#71717A] block">Saved</span>
              <span className="text-sm font-bold text-[#F59E0B]">{savedCount}</span>
            </div>
          </div>
        </div>

        {/* Profile Strength & Recommendations */}
        <div
          className="rounded-2xl p-4 shadow-sm flex flex-col gap-2.5"
          style={{ backgroundColor: '#17171D', border: '1px solid #2B2B35' }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#F5F5F7]">Academic Competency Score</span>
            <span className="text-xs font-semibold text-[#A78BFA]">{user.strengthUpsell}</span>
          </div>
          <div className="w-full rounded-full h-2.5 bg-[#1E1E26] overflow-hidden">
            <div
              className="h-2.5 rounded-full"
              style={{
                width: `${user.profileStrength}%`,
                background: 'linear-gradient(90deg, #625BFF, #A78BFA)'
              }}
            />
          </div>
          <p className="text-xs text-[#A1A1AA] leading-relaxed">
            Your credentials qualify you for Tier-1 engineering & innovation cohorts. Add a national Olympiad participation certificate to reach 100% top percentile.
          </p>
        </div>

        {/* Verified Badges & Micro-Credentials */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#A1A1AA]">
              Verified Credentials & Badges ({user.badges.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {user.badges.map((badge) => (
              <div
                key={badge.title}
                className="p-3 rounded-xl bg-[#17171D] border border-[#2B2B35] flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-lg bg-[#625BFF]/15 border border-[#625BFF]/30 text-[#A78BFA] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg">{badge.icon}</span>
                </div>
                <div className="flex-1 truncate">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white truncate">{badge.title}</span>
                    <span className="material-symbols-outlined text-xs text-emerald-400">verified</span>
                  </div>
                  <span className="text-[11px] text-[#A1A1AA] block">{badge.level}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Target Focus Areas */}
        <div
          className="rounded-2xl p-4 shadow-sm space-y-2.5"
          style={{ backgroundColor: '#17171D', border: '1px solid #2B2B35' }}
        >
          <span className="text-xs font-bold uppercase tracking-wider text-[#A1A1AA] block">
            Target Focus Areas for Class 11
          </span>
          <div className="flex flex-wrap gap-1.5">
            {user.interests.map((interest) => (
              <span
                key={interest}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#14141B] border border-[#2B2B36] text-[#A78BFA]"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onExploreOpportunities}
          className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#625BFF] hover:bg-[#5249e0] text-white flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md"
        >
          <span>Explore Recommended Opportunities</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </main>
    </div>
  );
};
