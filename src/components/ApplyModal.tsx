import React, { useState } from 'react';
import { Opportunity, UserProfile } from '../types';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  opportunity: Opportunity;
  user: UserProfile;
  onConfirmSuccess: () => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({
  isOpen,
  onClose,
  opportunity,
  user,
  onConfirmSuccess
}) => {
  const [entryMode, setEntryMode] = useState<'solo' | 'team'>('team');
  const [teamName, setTeamName] = useState('Team Growfolio Mumbai');
  const [teammateEmail, setTeammateEmail] = useState('');
  const [teammates, setTeammates] = useState<string[]>(['kabir.mehta@bombayscottish.edu.in']);
  const [bonafideConfirmed, setBonafideConfirmed] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleAddTeammate = () => {
    if (teammateEmail && !teammates.includes(teammateEmail)) {
      setTeammates([...teammates, teammateEmail]);
      setTeammateEmail('');
    }
  };

  const handleRemoveTeammate = (email: string) => {
    setTeammates(teammates.filter((t) => t !== email));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        onConfirmSuccess();
      }, 1200);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-slate-700 bg-[#14141B] text-[#F5F5F7]">
        {/* Header */}
        <div className="p-5 border-b border-[#2B2B36] flex items-center justify-between bg-[#1A1A24]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">how_to_reg</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Instant Application</h3>
              <span className="text-[11px] text-[#A1A1AA] truncate block max-w-xs">
                {opportunity.title}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#A1A1AA] hover:text-white hover:bg-[#2B2B35] transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center flex flex-col items-center justify-center gap-3">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 animate-bounce">
              <span className="material-symbols-outlined text-3xl font-bold">check</span>
            </div>
            <h4 className="text-lg font-bold text-white">Registration Confirmed!</h4>
            <p className="text-xs text-[#A1A1AA] max-w-xs">
              Your application has been registered with {opportunity.organization}. Confirmation sent to Aryan's student email.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[75vh] overflow-y-auto no-scrollbar">
            {/* Candidate Summary */}
            <div className="p-3.5 rounded-xl bg-[#1C1C26] border border-[#2B2B36] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-10 h-10 rounded-full border border-[#625BFF] object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="text-xs font-bold text-white block">{user.name}</span>
                  <span className="text-[11px] text-[#A1A1AA]">
                    {user.grade} • {user.school}
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40">
                Verified Profile
              </span>
            </div>

            {/* Solo vs Team Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#A1A1AA]">Participation Mode</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setEntryMode('solo')}
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    entryMode === 'solo'
                      ? 'bg-[#625BFF] text-white border-[#625BFF]'
                      : 'bg-[#1C1C26] text-[#A1A1AA] border-[#2B2B36]'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">person</span>
                  <span>Solo Entry</span>
                </button>
                <button
                  type="button"
                  onClick={() => setEntryMode('team')}
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    entryMode === 'team'
                      ? 'bg-[#625BFF] text-white border-[#625BFF]'
                      : 'bg-[#1C1C26] text-[#A1A1AA] border-[#2B2B36]'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">groups</span>
                  <span>Team (2-4 Members)</span>
                </button>
              </div>
            </div>

            {entryMode === 'team' && (
              <div className="space-y-3 p-3.5 rounded-xl bg-[#1C1C26] border border-[#2B2B36]">
                <div>
                  <label className="text-[11px] font-semibold text-[#A1A1AA] block mb-1">
                    Team Name
                  </label>
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-full bg-[#121218] border border-[#2B2B36] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#625BFF]"
                    required
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-[#A1A1AA] block mb-1">
                    Invite Teammates by Email
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={teammateEmail}
                      onChange={(e) => setTeammateEmail(e.target.value)}
                      placeholder="e.g. classmate@school.edu"
                      className="flex-1 bg-[#121218] border border-[#2B2B36] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#625BFF]"
                    />
                    <button
                      type="button"
                      onClick={handleAddTeammate}
                      className="px-3 py-2 rounded-lg bg-[#2B2B36] hover:bg-[#353445] text-xs font-semibold text-white cursor-pointer"
                    >
                      Add
                    </button>
                  </div>

                  <div className="space-y-1.5 mt-2">
                    {teammates.map((mate) => (
                      <div
                        key={mate}
                        className="flex items-center justify-between text-xs py-1 px-2.5 rounded bg-[#121218] border border-[#2B2B36]"
                      >
                        <span className="text-[#A1A1AA] truncate">{mate}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTeammate(mate)}
                          className="text-[#71717A] hover:text-rose-400 cursor-pointer ml-2"
                        >
                          <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Required Verification Documents */}
            <div className="p-3.5 rounded-xl bg-[#1C1C26] border border-[#2B2B36] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-emerald-400 text-xl">verified</span>
                <div>
                  <span className="text-xs font-semibold text-white block">
                    Academic Year 2024–25 ID Card
                  </span>
                  <span className="text-[11px] text-emerald-400">Attached from Growfolio Student Vault</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={bonafideConfirmed}
                onChange={(e) => setBonafideConfirmed(e.target.checked)}
                className="w-4 h-4 accent-[#625BFF] cursor-pointer"
              />
            </div>

            {/* Fee Status Summary */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#121218] border border-[#2B2B36]">
              <span className="text-xs text-[#A1A1AA]">Application Fee:</span>
              <span className="text-xs font-bold text-[#10B981]">
                {opportunity.costIsFree ? '₹0 (100% Free - Sponsored)' : opportunity.costTag}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-[#1C1C26] hover:bg-[#252535] text-[#A1A1AA] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !bonafideConfirmed}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#0030C2] hover:bg-[#00259e] text-white disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer transition-all"
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm & Apply</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
