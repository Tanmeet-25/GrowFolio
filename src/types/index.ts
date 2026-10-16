export type TabType = 'home' | 'discover' | 'saved' | 'ai-spark' | 'profile';

export interface Opportunity {
  id: string;
  title: string;
  subtitle?: string;
  organization: string;
  category: string;
  categoryAccent: 'cyan' | 'purple' | 'amber' | 'rose' | 'indigo';
  costTag: string;
  costIsFree?: boolean;
  matchPercentage: number;
  matchReason: string;
  image: string;
  verifiedOrgBadge?: string;
  isUrgent?: boolean;
  urgentHours?: number;
  format: string;
  prizePool: string;
  deadline: string;
  deadlineFullDate?: string;
  eligibility: string;
  modeDescription?: string;
  levelBadge?: string;
  teamSizeBadge?: string;
  verifiedChallengeBadge?: string;
  overviewPoints?: {
    title: string;
    description: string;
    icon: string;
  }[];
  whyItFitsProfile?: {
    matchText: string;
    reasons: string[];
  };
  roundsSchedule?: {
    roundNumber: number;
    title: string;
    dates: string;
    description: string;
    mode: 'Online' | 'In-Person' | 'Hybrid';
  }[];
  prizes?: {
    place: string;
    amount: string;
    perks: string[];
  }[];
  prerequisites?: string[];
  requiredDocs?: {
    name: string;
    description: string;
    mandatory: boolean;
  }[];
}

export interface UserProfile {
  name: string;
  grade: string;
  school: string;
  city: string;
  avatarUrl: string;
  profileStrength: number;
  strengthUpsell: string;
  qualifiedCount: number;
  interests: string[];
  badges: {
    title: string;
    level: string;
    icon: string;
    verified: boolean;
  }[];
}

export interface MentorMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  suggestions?: string[];
  recommendedOpportunityId?: string;
}
