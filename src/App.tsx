import { useState } from 'react';
import { TabType, Opportunity } from './types';
import { currentUser, opportunities } from './data/opportunities';
import { StudentDashboard } from './components/StudentDashboard';
import { OpportunityFeed } from './components/OpportunityFeed';
import { OpportunityDetails } from './components/OpportunityDetails';
import { BottomNav } from './components/BottomNav';
import { AiMentorModal } from './components/AiMentorModal';
import { SynergyExplorerModal } from './components/SynergyExplorerModal';
import { ApplyModal } from './components/ApplyModal';
import { SavedScreen } from './components/SavedScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { NotificationsModal } from './components/NotificationsModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>([
    'national-youth-robotics-hackathon'
  ]);
  const [appliedIds, setAppliedIds] = useState<string[]>([]);
  const [feedFilter, setFeedFilter] = useState<string>('For You (14)');

  // Modals state
  const [aiMentorOpen, setAiMentorOpen] = useState<boolean>(false);
  const [aiMentorInitialPrompt, setAiMentorInitialPrompt] = useState<string | undefined>(undefined);
  const [synergyModalOpen, setSynergyModalOpen] = useState<boolean>(false);
  const [applyModalOpen, setApplyModalOpen] = useState<boolean>(false);
  const [opportunityToApply, setOpportunityToApply] = useState<Opportunity | null>(null);
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleToggleSave = (id: string) => {
    if (savedIds.includes(id)) {
      setSavedIds(savedIds.filter((savedId) => savedId !== id));
      showToast('Removed from saved opportunities');
    } else {
      setSavedIds([...savedIds, id]);
      showToast('Saved to your bookmarks');
    }
  };

  const handleSelectOpportunity = (opp: Opportunity) => {
    setSelectedOpportunity(opp);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromDetails = () => {
    setSelectedOpportunity(null);
  };

  const handleOpenApplyModal = (opp: Opportunity) => {
    setOpportunityToApply(opp);
    setApplyModalOpen(true);
  };

  const handleConfirmApplication = () => {
    if (opportunityToApply) {
      if (!appliedIds.includes(opportunityToApply.id)) {
        setAppliedIds([...appliedIds, opportunityToApply.id]);
      }
      showToast(`Application successfully registered for ${opportunityToApply.title}!`);
    }
    setApplyModalOpen(false);
  };

  const handleOpenAiMentorWithPrompt = (prompt?: string) => {
    setAiMentorInitialPrompt(prompt);
    setAiMentorOpen(true);
  };

  const handleNavigateToDiscover = (filter?: string) => {
    setSelectedOpportunity(null);
    setCurrentTab('discover');
    if (filter) {
      setFeedFilter(filter);
    }
  };

  const handleShare = (opp: Opportunity) => {
    if (navigator.share) {
      navigator.share({
        title: opp.title,
        text: `Check out ${opp.title} on Growfolio Student Platform!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      showToast('Link copied to clipboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] flex flex-col font-sans selection:bg-[#625BFF]/30">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#17171D] text-white px-4 py-2.5 rounded-2xl shadow-2xl border border-[#625BFF] flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-top-3 duration-300">
          <span className="material-symbols-outlined text-sm text-[#10B981]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Screen Rendering */}
      {selectedOpportunity ? (
        <OpportunityDetails
          opportunity={selectedOpportunity}
          user={currentUser}
          isSaved={savedIds.includes(selectedOpportunity.id)}
          onToggleSave={() => handleToggleSave(selectedOpportunity.id)}
          onBack={handleBackFromDetails}
          onApply={() => handleOpenApplyModal(selectedOpportunity)}
          onOpenSynergy={() => setSynergyModalOpen(true)}
          onAskAiMentor={() =>
            handleOpenAiMentorWithPrompt(`How should I prepare for the ${selectedOpportunity.title}?`)
          }
          onShare={() => handleShare(selectedOpportunity)}
          hasApplied={appliedIds.includes(selectedOpportunity.id)}
        />
      ) : (
        <>
          {currentTab === 'home' && (
            <StudentDashboard
              user={currentUser}
              opportunities={opportunities}
              onSelectOpportunity={handleSelectOpportunity}
              onOpenAiMentor={handleOpenAiMentorWithPrompt}
              onNavigateToDiscover={handleNavigateToDiscover}
              onOpenUrgentApply={() => handleOpenApplyModal(opportunities[0])}
              onOpenNotifications={() => setNotificationsOpen(true)}
            />
          )}

          {currentTab === 'discover' && (
            <OpportunityFeed
              user={currentUser}
              opportunities={opportunities}
              savedIds={savedIds}
              onToggleSave={handleToggleSave}
              onSelectOpportunity={handleSelectOpportunity}
              onOpenNotifications={() => setNotificationsOpen(true)}
              initialFilter={feedFilter}
            />
          )}

          {currentTab === 'saved' && (
            <SavedScreen
              savedIds={savedIds}
              opportunities={opportunities}
              onSelectOpportunity={handleSelectOpportunity}
              onToggleSave={handleToggleSave}
              onExplore={() => {
                setCurrentTab('discover');
              }}
            />
          )}

          {currentTab === 'ai-spark' && (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-[#F5F5F7]">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#625BFF] to-[#A78BFA] flex items-center justify-center text-white mb-4 shadow-xl">
                <span className="material-symbols-outlined text-3xl">smart_toy</span>
              </div>
              <h2 className="text-xl font-bold mb-2">Growfolio AI Spark Mentor</h2>
              <p className="text-xs text-[#A1A1AA] max-w-sm mb-6 leading-relaxed">
                Connect your academic interests, past achievements, and college admissions goals to receive personalized competition strategies.
              </p>
              <button
                onClick={() => setAiMentorOpen(true)}
                className="px-6 py-3 rounded-xl bg-[#625BFF] hover:bg-[#5249e0] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg transition-all"
              >
                <span>Launch Advisor Conversation</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </div>
          )}

          {currentTab === 'profile' && (
            <ProfileScreen
              user={currentUser}
              appliedCount={appliedIds.length}
              savedCount={savedIds.length}
              onExploreOpportunities={() => {
                setCurrentTab('discover');
              }}
            />
          )}

          {/* Persistent Bottom Navigation */}
          <BottomNav
            currentTab={currentTab}
            onTabChange={(tab) => {
              setSelectedOpportunity(null);
              setCurrentTab(tab);
            }}
            savedCount={savedIds.length}
          />
        </>
      )}

      {/* AI Mentor Dialog Modal */}
      <AiMentorModal
        isOpen={aiMentorOpen}
        onClose={() => {
          setAiMentorOpen(false);
          setAiMentorInitialPrompt(undefined);
        }}
        user={currentUser}
        initialPrompt={aiMentorInitialPrompt}
        onSelectOpportunity={handleSelectOpportunity}
        opportunities={opportunities}
      />

      {/* Synergy Explorer Modal */}
      {selectedOpportunity && (
        <SynergyExplorerModal
          isOpen={synergyModalOpen}
          onClose={() => setSynergyModalOpen(false)}
          opportunity={selectedOpportunity}
          user={currentUser}
        />
      )}

      {/* Instant Apply Modal */}
      {opportunityToApply && (
        <ApplyModal
          isOpen={applyModalOpen}
          onClose={() => setApplyModalOpen(false)}
          opportunity={opportunityToApply}
          user={currentUser}
          onConfirmSuccess={handleConfirmApplication}
        />
      )}

      {/* Notifications Modal */}
      <NotificationsModal
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        onSelectAction={(id) => {
          const opp = opportunities.find((o) => o.id === id);
          if (opp) handleSelectOpportunity(opp);
        }}
      />
    </div>
  );
}
