import React from 'react';
import { Opportunity, UserProfile } from '../types';

interface SynergyExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
  opportunity: Opportunity;
  user: UserProfile;
}

export const SynergyExplorerModal: React.FC<SynergyExplorerModalProps> = ({
  isOpen,
  onClose,
  opportunity,
  user
}) => {
  if (!isOpen) return null;

  const synergyNodes = [
    {
      skill: 'Python & Computer Vision',
      profileStatus: 'Exceeds Prereqs',
      matchScore: '98%',
      relevance: 'Essential for Round 2 ROS/Gazebo simulation obstacle avoidance algorithms.',
      verified: true
    },
    {
      skill: 'Arduino Microcontroller Interfacing',
      profileStatus: 'IIT-M Verified Badge',
      matchScore: '95%',
      relevance: 'Directly applied in Round 3 on-campus physical rover hardware assembly.',
      verified: true
    },
    {
      skill: 'Class 11 STEM Curriculum',
      profileStatus: 'Eligible (Grade 9–12)',
      matchScore: '100%',
      relevance: 'Permits entry into junior division without competing against undergraduate students.',
      verified: true
    },
    {
      skill: 'Geographic Proximity (Mumbai)',
      profileStatus: 'Local Metropolitan Area',
      matchScore: '100%',
      relevance: 'Easy attendance for the Grand Finale at IIT Bombay Powai campus with zero travel friction.',
      verified: true
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-slate-700 bg-[#14141B] text-[#F5F5F7]"
      >
        {/* Header */}
        <div className="p-5 border-b border-[#2B2B36] flex items-center justify-between bg-[#1A1A24]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#625BFF]/20 border border-[#625BFF]/40 text-[#A78BFA] flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">hub</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Growfolio Academic Graph</h3>
              <span className="text-[11px] text-[#A1A1AA]">Synergy Breakdown for {user.name}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#A1A1AA] hover:text-white hover:bg-[#2B2B36] transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto no-scrollbar">
          {/* Top Overall Synergy Meter */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#171725] to-[#1F1F35] border border-[#38BDF8]/30 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-[#38BDF8] uppercase tracking-wider block">
                Overall Alignment
              </span>
              <h4 className="text-xl font-bold text-white">96% Competency Match</h4>
              <span className="text-xs text-[#A1A1AA]">4 of 4 critical evaluation vectors satisfied</span>
            </div>
            <div className="w-14 h-14 rounded-full bg-[#38BDF8]/15 border-2 border-[#38BDF8] flex items-center justify-center text-base font-bold text-[#38BDF8]">
              96%
            </div>
          </div>

          {/* Nodes Breakdown */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#A78BFA] uppercase tracking-wider">
              Calculated Synergy Nodes
            </h4>
            {synergyNodes.map((node) => (
              <div
                key={node.skill}
                className="p-3.5 rounded-xl bg-[#1C1C26] border border-[#2B2B36] space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#F5F5F7]">{node.skill}</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    {node.matchScore}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-[#A78BFA]">
                  <span className="material-symbols-outlined text-sm">verified</span>
                  <span>{node.profileStatus}</span>
                </div>
                <p className="text-[11px] text-[#A1A1AA] leading-relaxed">
                  {node.relevance}
                </p>
              </div>
            ))}
          </div>

          {/* Admission Impact Notice */}
          <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-700/50 text-xs text-indigo-200 flex items-start gap-2.5">
            <span className="material-symbols-outlined text-indigo-400 text-base mt-0.5">school</span>
            <div>
              <span className="font-bold text-white block mb-0.5">College Admissions Value</span>
              <span>
                Completing this challenge adds an IIT-verified credential with cryptographically provable rank to your Growfolio Student Dossier, ready for direct export into CommonApp & UC applications.
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#2B2B36] bg-[#17171D] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-[#625BFF] text-white hover:brightness-110 cursor-pointer transition-all"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
