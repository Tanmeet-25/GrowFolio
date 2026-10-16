import React from 'react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction: (opportunityId: string) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  onSelectAction
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: '1',
      title: 'Applications Close Soon (3 Days Remaining)',
      desc: 'National Youth AI & Robotics Hackathon 2025 registration closes Oct 31.',
      time: '12m ago',
      urgent: true,
      opportunityId: 'national-youth-robotics-hackathon'
    },
    {
      id: '2',
      title: 'Profile Merit Verified',
      desc: 'Your Intermediate Python & Arduino badges were verified by IIT Madras credentials.',
      time: '2h ago',
      urgent: false
    },
    {
      id: '3',
      title: 'Fee Waiver Qualified',
      desc: 'You qualify for a 100% full scholarship waiver on the Devfolio Junior Web3 Sprint.',
      time: '1d ago',
      urgent: false,
      opportunityId: 'national-high-school-web3-ai-builders-sprint'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-slate-700 bg-[#14141B] text-[#F5F5F7]">
        <div className="p-4 border-b border-[#2B2B36] flex items-center justify-between bg-[#1A1A24]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#625BFF] text-xl">notifications</span>
            <h3 className="text-sm font-bold text-white">Notifications</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#A1A1AA] hover:text-white cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto no-scrollbar">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                if (n.opportunityId) {
                  onSelectAction(n.opportunityId);
                  onClose();
                }
              }}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                n.urgent
                  ? 'bg-[#1A1513] border-[#78350F] hover:border-[#F59E0B]'
                  : 'bg-[#1C1C26] border-[#2B2B36] hover:border-[#625BFF]'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <span className={`text-xs font-bold ${n.urgent ? 'text-[#F59E0B]' : 'text-white'}`}>
                  {n.title}
                </span>
                <span className="text-[10px] text-[#71717A] shrink-0">{n.time}</span>
              </div>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">{n.desc}</p>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-[#2B2B36] bg-[#17171D] text-center">
          <button
            onClick={onClose}
            className="text-xs text-[#A78BFA] hover:underline font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
