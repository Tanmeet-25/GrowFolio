import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  savedCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange, savedCount = 0 }) => {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl px-4 py-2"
      style={{
        backgroundColor: 'rgba(16, 16, 20, 0.95)',
        borderTop: '1px solid #2B2B35'
      }}
    >
      <div className="max-w-md mx-auto grid grid-cols-5 items-center text-center">
        <button
          onClick={() => onTabChange('home')}
          className="flex flex-col items-center gap-1 py-1 transition-colors cursor-pointer"
          style={{ color: currentTab === 'home' ? '#625BFF' : '#A1A1AA' }}
          type="button"
          aria-label="Home"
        >
          <span
            className="material-symbols-outlined text-xl"
            style={{ fontVariationSettings: currentTab === 'home' ? "'FILL' 1" : "'FILL' 0" }}
          >
            home
          </span>
          <span className={`text-[10px] ${currentTab === 'home' ? 'font-bold' : 'font-medium'}`}>
            Home
          </span>
        </button>

        <button
          onClick={() => onTabChange('discover')}
          className="flex flex-col items-center gap-1 py-1 transition-colors cursor-pointer"
          style={{ color: currentTab === 'discover' ? '#625BFF' : '#A1A1AA' }}
          type="button"
          aria-label="Discover"
        >
          <span
            className="material-symbols-outlined text-xl"
            style={{ fontVariationSettings: currentTab === 'discover' ? "'FILL' 1" : "'FILL' 0" }}
          >
            explore
          </span>
          <span className={`text-[10px] ${currentTab === 'discover' ? 'font-bold' : 'font-medium'}`}>
            Discover
          </span>
        </button>

        <button
          onClick={() => onTabChange('saved')}
          className="flex flex-col items-center gap-1 py-1 transition-colors cursor-pointer relative"
          style={{ color: currentTab === 'saved' ? '#625BFF' : '#A1A1AA' }}
          type="button"
          aria-label="Saved"
        >
          <div className="relative">
            <span
              className="material-symbols-outlined text-xl"
              style={{ fontVariationSettings: currentTab === 'saved' ? "'FILL' 1" : "'FILL' 0" }}
            >
              bookmark
            </span>
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-2 w-3.5 h-3.5 bg-[#625BFF] text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </div>
          <span className={`text-[10px] ${currentTab === 'saved' ? 'font-bold' : 'font-medium'}`}>
            Saved
          </span>
        </button>

        <button
          onClick={() => onTabChange('ai-spark')}
          className="flex flex-col items-center gap-1 py-1 transition-colors cursor-pointer"
          style={{ color: currentTab === 'ai-spark' ? '#625BFF' : '#A1A1AA' }}
          type="button"
          aria-label="AI Spark"
        >
          <span
            className="material-symbols-outlined text-xl"
            style={{ fontVariationSettings: currentTab === 'ai-spark' ? "'FILL' 1" : "'FILL' 0" }}
          >
            smart_toy
          </span>
          <span className={`text-[10px] ${currentTab === 'ai-spark' ? 'font-bold' : 'font-medium'}`}>
            AI Spark
          </span>
        </button>

        <button
          onClick={() => onTabChange('profile')}
          className="flex flex-col items-center gap-1 py-1 transition-colors cursor-pointer"
          style={{ color: currentTab === 'profile' ? '#625BFF' : '#A1A1AA' }}
          type="button"
          aria-label="Profile"
        >
          <span
            className="material-symbols-outlined text-xl"
            style={{ fontVariationSettings: currentTab === 'profile' ? "'FILL' 1" : "'FILL' 0" }}
          >
            person
          </span>
          <span className={`text-[10px] ${currentTab === 'profile' ? 'font-bold' : 'font-medium'}`}>
            Profile
          </span>
        </button>
      </div>
    </nav>
  );
};
