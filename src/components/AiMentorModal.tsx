import React, { useState } from 'react';
import { UserProfile, Opportunity } from '../types';

interface AiMentorModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  initialPrompt?: string;
  onSelectOpportunity: (opportunity: Opportunity) => void;
  opportunities: Opportunity[];
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
  recommendedOppId?: string;
}

export const AiMentorModal: React.FC<AiMentorModalProps> = ({
  isOpen,
  onClose,
  user,
  initialPrompt,
  onSelectOpportunity,
  opportunities
}) => {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: `Hello ${user.name.split(' ')[0]}! I'm Growfolio, your AI Academic & Career Mentor. Based on your Class 11 profile in Mumbai and your Intermediate Python + Arduino badges, I've prioritized opportunities with the highest admission synergy for you.`,
      time: 'Just now'
    }
  ]);
  const [isThinking, setIsThinking] = useState(false);

  React.useEffect(() => {
    if (initialPrompt && isOpen) {
      handleUserSend(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  if (!isOpen) return null;

  const quickPrompts = [
    'Which competition should I enter this month?',
    'How should I prepare for IIT Bombay Hackathon?',
    'Can I balance Class 11 exams with these hackathons?',
    'How do these badges help US college admissions?'
  ];

  const handleUserSend = (promptText: string) => {
    if (!promptText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: promptText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsThinking(true);

    setTimeout(() => {
      let aiReply = '';
      let recommendedId: string | undefined = undefined;

      const lower = promptText.toLowerCase();

      if (lower.includes('which competition') || lower.includes('this month') || lower.includes('enter')) {
        aiReply = `For October/November, your top recommendation is the **National Youth AI & Robotics Hackathon 2025** organized by IIT Bombay TechFest Junior.
        
Why this is your #1 match (98% Synergy):
1. **Zero Cost & Hybrid Format**: The prelims are online, and the finals take place at IIT Bombay campus right here in Mumbai.
2. **Badge Match**: Your Arduino and Intermediate Python skills give you an immediate edge over 90% of applicants.
3. **Closing in 3 Days**: Deadline is Oct 31, 2025. I suggest registering right away!`;
        recommendedId = 'national-youth-robotics-hackathon';
      } else if (lower.includes('iit bombay') || lower.includes('prepare') || lower.includes('rover')) {
        aiReply = `Here is your 3-step action roadmap for the **IIT Bombay Robotics Hackathon**:

1. **Round 1 (Abstract Due Nov 5)**: Submit a 2-page architecture brief focusing on computer vision SLAM and obstacle avoidance.
2. **Tooling**: Use ROS / Gazebo simulation for the preliminary prototype. Your Python skills are ideal for writing the pathfinding algorithm.
3. **Team Strategy**: Pair with 1-2 classmates from Bombay Scottish who excel at mechanical CAD or 3D modeling so you can focus on the code and sensor integration!`;
        recommendedId = 'national-youth-robotics-hackathon';
      } else if (lower.includes('exam') || lower.includes('balance') || lower.includes('time')) {
        aiReply = `Great question! The IIT Bombay Hackathon prelims are structured as an asynchronous submission, requiring ~6 hours total across 2 weeks. The in-person finals happen in mid-December after typical Class 11 mid-terms.

If you also want an online sprint with zero travel, the **Devfolio Web3 & AI Builders Sprint** runs on weekends and can be done entirely from your desk.`;
        recommendedId = 'national-high-school-web3-ai-builders-sprint';
      } else {
        aiReply = `Based on your academic graph, participating in national challenges like the **IIT Bombay TechFest Junior** and **Teach for India Fellowship** directly satisfies the high-impact leadership and STEM criteria for Tier-1 engineering colleges (IITs, BITS, and US CommonApp Tier-1 universities). Let me know if you want help drafting your project abstract!`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: aiReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          recommendedOppId: recommendedId
        }
      ]);
      setIsThinking(false);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-xl h-[85vh] rounded-3xl flex flex-col shadow-2xl overflow-hidden border border-[#2B2B36]"
        style={{ backgroundColor: '#131317', color: '#F5F5F7' }}
      >
        {/* Header */}
        <div className="px-5 py-4 flex items-center justify-between border-b border-[#2B2B36] bg-[#17171D]">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md"
              style={{ background: 'linear-gradient(135deg, #625BFF, #8B5CF6)', color: '#FFFFFF' }}
            >
              <span className="material-symbols-outlined text-2xl">smart_toy</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[#F5F5F7]">Growfolio AI Mentor</h3>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  Online
                </span>
              </div>
              <span className="text-[11px] text-[#A1A1AA]">
                Personalized advisor for {user.name} ({user.grade})
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#A1A1AA] hover:text-[#F5F5F7] hover:bg-[#2B2B35] transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
          {messages.map((m) => {
            const isUser = m.sender === 'user';
            const matchedOpp = m.recommendedOppId
              ? opportunities.find((o) => o.id === m.recommendedOppId)
              : null;

            return (
              <div key={m.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed whitespace-pre-line shadow-sm ${
                    isUser
                      ? 'bg-[#625BFF] text-white rounded-tr-sm'
                      : 'bg-[#1C1C26] text-[#F5F5F7] border border-[#2B2B36] rounded-tl-sm'
                  }`}
                >
                  {m.text}

                  {matchedOpp && (
                    <div
                      onClick={() => {
                        onClose();
                        onSelectOpportunity(matchedOpp);
                      }}
                      className="mt-3 p-2.5 rounded-xl bg-[#121218] border border-[#38BDF8]/40 hover:border-[#38BDF8] flex items-center justify-between cursor-pointer transition-all active:scale-95"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="material-symbols-outlined text-[#38BDF8] text-base shrink-0">
                          rocket_launch
                        </span>
                        <div className="truncate">
                          <span className="text-[11px] font-bold text-white block truncate">
                            {matchedOpp.title}
                          </span>
                          <span className="text-[10px] text-[#38BDF8]">
                            {matchedOpp.matchPercentage}% Match • View details →
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-[#71717A] mt-1 px-1">{m.time}</span>
              </div>
            );
          })}

          {isThinking && (
            <div className="flex items-center gap-2 p-3 bg-[#1C1C26] rounded-2xl w-28 text-xs text-[#A1A1AA] border border-[#2B2B36]">
              <span className="material-symbols-outlined text-sm animate-spin text-[#625BFF]">
                progress_activity
              </span>
              <span>Thinking...</span>
            </div>
          )}
        </div>

        {/* Quick prompt chips */}
        <div className="px-4 py-2 border-t border-[#2B2B36] bg-[#17171D] overflow-x-auto no-scrollbar flex items-center gap-2">
          {quickPrompts.map((q) => (
            <button
              key={q}
              onClick={() => handleUserSend(q)}
              className="text-[11px] whitespace-nowrap px-3 py-1.5 rounded-full bg-[#1C1C26] hover:bg-[#252535] text-[#A1A1AA] hover:text-[#F5F5F7] border border-[#2B2B36] transition-colors cursor-pointer shrink-0"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-[#2B2B36] bg-[#14141B]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUserSend(input);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about hackathons, essay topics, team matching..."
              className="flex-1 bg-[#1C1C26] text-xs text-[#F5F5F7] py-2.5 px-4 rounded-xl border border-[#2B2B36] focus:outline-none focus:ring-1 focus:ring-[#625BFF]"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-9 h-9 rounded-xl bg-[#625BFF] text-white flex items-center justify-center disabled:opacity-50 hover:brightness-110 cursor-pointer transition-all"
            >
              <span className="material-symbols-outlined text-lg">send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
