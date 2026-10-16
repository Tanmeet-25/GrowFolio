import { Opportunity, UserProfile } from '../types';

export const currentUser: UserProfile = {
  name: 'Aryan Sharma',
  grade: 'Class 11',
  school: 'Bombay Scottish School, Mahim',
  city: 'Mumbai',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjjFgLc-il9IncBTXj3wS474bFIwifyDJY_xtUtWvJKLjqU-_Hywlkm4dmPkh0PrWgk2aafnt4C3Jo3vKLvyraa2w6otVnrGPowpjV-J0Pv5AkShIbHpMIp5WZDOnSYobQDARgy9l8PRha91Upl6prF9SaUporuzmz5TQ1yoR8OCdO8yx0u9vfJIgrsT433Kl7qHZNpJRHUy5mc-raq_Z1dstX8_6_DJbduoY39G7NFWN6RfgzpQOPTA',
  profileStrength: 85,
  strengthUpsell: '+15% with Math Olympiad',
  qualifiedCount: 14,
  interests: ['Robotics & Coding', 'Intermediate Python', 'Arduino Microcontrollers', 'Competitive Programming', 'Model UN'],
  badges: [
    { title: 'Intermediate Python', level: 'Level 4 / Advanced', icon: 'code', verified: true },
    { title: 'Arduino Hardware Prototyping', level: 'Verified IIT-M Credential', icon: 'memory', verified: true },
    { title: 'State Science Fair 2024', level: 'Silver Finalist', icon: 'military_tech', verified: true },
    { title: 'Youth Parliamentary Debate', level: 'Best Delegate Mumbai', icon: 'forum', verified: true }
  ]
};

export const urgentOpportunity = {
  id: 'tata-young-innovators',
  title: 'Tata Young Innovator Challenge 2025',
  organization: 'Tata Trust Innovation Labs',
  grant: '₹5,00,000 Seed Grant',
  deadlineNotice: 'Closes Thursday 11:59 PM',
  timeLeft: '36h',
  category: 'Innovation Grant',
  format: 'National Hybrid',
  summary: 'Seed funding grants for high school teams building impactful hardware and sustainable energy solutions.'
};

export const opportunities: Opportunity[] = [
  {
    id: 'national-youth-robotics-hackathon',
    title: 'National Youth AI & Robotics Hackathon 2025',
    subtitle: 'Build real-world autonomous rovers and computer vision models. High school teams of 2-4 members with direct IIT mentorship.',
    organization: 'IIT Bombay TechFest Junior & AI Student Network',
    category: 'Robotics & AI',
    categoryAccent: 'cyan',
    costTag: '100% Free',
    costIsFree: true,
    matchPercentage: 98,
    matchReason: 'Recommended because you listed Robotics & Intermediate Python',
    image: '/src/assets/images/robotics_hackathon_banner_1792135688190.jpg',
    verifiedOrgBadge: 'IIT Bombay TechFest Junior 2025',
    format: 'Hybrid (IIT-B)',
    modeDescription: 'Hybrid Finals • Online Prelims',
    prizePool: '₹3,00,000',
    deadline: 'In 3 Days',
    deadlineFullDate: 'Closes in 3 days, 14 hours (Oct 31, 2025)',
    eligibility: 'Classes 9–12 (Ages 14–18 Yrs)',
    levelBadge: 'NATIONAL LEVEL',
    teamSizeBadge: 'Solo or 2-4 Members',
    verifiedChallengeBadge: 'GROWFOLIO VERIFIED CHALLENGE • IIT Bombay Ecosystem',
    whyItFitsProfile: {
      matchText: '96% Match',
      reasons: [
        'You listed Robotics & Coding as your target interests for Class 11.',
        'Your recorded Intermediate Python & Arduino badges exceed all prerequisite minimums.',
        'Top 10 finalists receive an IIT-verified credential recognized globally for college admissions.'
      ]
    },
    overviewPoints: [
      {
        title: 'National Acclaim',
        description: 'Coverage in leading academic media & IIT TechFest showcase.',
        icon: 'stars'
      },
      {
        title: '₹3,00,000 Pool',
        description: 'Project development grants + hardware prototyping toolkits.',
        icon: 'payments'
      },
      {
        title: 'IIT Mentorship',
        description: 'Direct 1:1 project refinement with senior research faculty.',
        icon: 'school'
      },
      {
        title: 'Growfolio Portfolio',
        description: 'Cryptographically signed badge auto-linked to your profile.',
        icon: 'verified_user'
      }
    ],
    prerequisites: [
      'Open to all high school students currently enrolled in Grades 9 through 12 across India.',
      'Students can participate as an individual or register as a team of 2 to 4 members.',
      'No prior hackathon wins required — Foundational computational logic or basic block/Python coding is recommended, but passion and grit come first.'
    ],
    requiredDocs: [
      {
        name: 'School ID Card or Bonafide Letter',
        description: 'PDF or clear photo showing valid academic year 2024–25',
        mandatory: true
      }
    ],
    roundsSchedule: [
      {
        roundNumber: 1,
        title: 'Ideation & System Design Brief',
        dates: 'Oct 31 – Nov 5, 2025',
        description: 'Submit rover mechanical schema and computer vision architecture concept.',
        mode: 'Online'
      },
      {
        roundNumber: 2,
        title: 'Prototype Code Simulation',
        dates: 'Nov 12 – Nov 20, 2025',
        description: 'Live Gazebo/ROS simulation testing pathfinding obstacle avoidance.',
        mode: 'Online'
      },
      {
        roundNumber: 3,
        title: 'Grand Finale Showcase at IIT Bombay',
        dates: 'Dec 12 – Dec 14, 2025',
        description: '36-hour physical hackathon on IIT Bombay campus with physical testing arena.',
        mode: 'In-Person'
      }
    ],
    prizes: [
      {
        place: '1st Place Champion',
        amount: '₹1,50,000',
        perks: ['IIT Bombay TechFest Trophy', 'Patent Filing Guidance', 'Direct Summer Lab Fellowship']
      },
      {
        place: '1st Runner Up',
        amount: '₹90,000',
        perks: ['Hardware Prototyping Grant', 'Robotics Sensor Suite']
      },
      {
        place: '2nd Runner Up',
        amount: '₹60,000',
        perks: ['Hardware Toolkits', 'Merit Certificate of Excellence']
      }
    ]
  },
  {
    id: 'national-high-school-web3-ai-builders-sprint',
    title: 'National High School Web3 & AI Builders Sprint',
    subtitle: 'Learn decentralized smart contracts and integrate lightweight on-device LLMs. Earn verifiable credential badges for your portfolio.',
    organization: 'Devfolio Junior Builders Network',
    category: 'Coding & Web3',
    categoryAccent: 'purple',
    costTag: '₹499 (Scholarships Available)',
    costIsFree: false,
    matchPercentage: 94,
    matchReason: 'Matches your Competitive Coding goal for Ivy League showcase',
    image: '/src/assets/images/web3_builders_sprint_1792135688603.jpg',
    verifiedOrgBadge: 'Devfolio Junior Builders Network',
    format: '100% Online',
    modeDescription: '100% Virtual • Asynchronous Mentorship',
    prizePool: '₹2,50,000 Pool',
    deadline: 'In 7 Days',
    deadlineFullDate: 'Closes Nov 4, 2025',
    eligibility: 'Grades 8–12 (Ages 13–19 Yrs)',
    levelBadge: 'NATIONAL SPRINT',
    teamSizeBadge: 'Teams of 1-3 Builders',
    verifiedChallengeBadge: 'DEVFOLIO JUNIOR VERIFIED',
    whyItFitsProfile: {
      matchText: '94% Match',
      reasons: [
        'Matches your target goal for an Ivy League / Top Tier CS portfolio showcase.',
        'Accelerates your Intermediate Python skills into modern generative AI integration.',
        '100% scholarship fee waiver available based on your 85% Growfolio profile strength.'
      ]
    },
    overviewPoints: [
      {
        title: 'Verifiable On-Chain Badges',
        description: 'Proof of skill NFT token minted to student builder wallet.',
        icon: 'badge'
      },
      {
        title: '₹2,50,000 Pool',
        description: 'Micro-grants for outstanding student AI web agents.',
        icon: 'payments'
      },
      {
        title: 'Senior Dev Mentors',
        description: 'Weekly office hours with engineers from Polygon & Google.',
        icon: 'laptop_chromebook'
      },
      {
        title: 'GitHub Portfolio',
        description: 'Deploy production dApps with CI/CD and custom subdomains.',
        icon: 'code'
      }
    ],
    prerequisites: [
      'Basic familiarity with Python, JavaScript, or C++.',
      'A personal laptop capable of running Node.js or browser dev tools.',
      'No previous blockchain knowledge required.'
    ],
    requiredDocs: [
      {
        name: 'GitHub Profile URL & Student ID',
        description: 'Active GitHub handle with at least one committed repository',
        mandatory: true
      }
    ],
    roundsSchedule: [
      {
        roundNumber: 1,
        title: 'Sprint Kickoff & Smart Contract Workshop',
        dates: 'Nov 6 – Nov 8, 2025',
        description: 'Interactive live workshops with starter repositories.',
        mode: 'Online'
      },
      {
        roundNumber: 2,
        title: 'AI Agent Integration & Ship Day',
        dates: 'Nov 12 – Nov 14, 2025',
        description: 'Connect Gemini API and smart contracts; test locally.',
        mode: 'Online'
      }
    ],
    prizes: [
      {
        place: 'Best Overall Project',
        amount: '₹1,00,000',
        perks: ['Devfolio Fellowship Spotlight', 'MacBook Air M3 for Team Lead']
      },
      {
        place: 'Best AI Agent Track',
        amount: '₹75,000',
        perks: ['API Credits', 'Technical Advisory Sessions']
      }
    ]
  },
  {
    id: 'young-leaders-social-impact-fellowship',
    title: 'Young Leaders Social Impact Fellowship 2025',
    subtitle: '6-week immersive weekend cohort tackling community education in Mumbai. Directly leads to verified social leadership credit.',
    organization: 'Teach for India Youth Initiative',
    category: 'Social Impact',
    categoryAccent: 'amber',
    costTag: 'Fully Funded',
    costIsFree: true,
    matchPercentage: 88,
    matchReason: 'High portfolio weight for US College CommonApp leadership essays',
    image: '/src/assets/images/social_impact_fellowship_1792135689664.jpg',
    verifiedOrgBadge: 'Teach for India Youth Initiative',
    format: 'Mumbai (In-Person)',
    modeDescription: 'Alternate Weekends • On-Ground Field Work',
    prizePool: '30 Fellows Cohort',
    deadline: 'Starts Nov 15',
    deadlineFullDate: 'Applications close Nov 8, 2025',
    eligibility: 'Classes 10–12 (Mumbai Region)',
    levelBadge: 'CITY FELLOWSHIP',
    teamSizeBadge: 'Individual Application',
    verifiedChallengeBadge: 'TFI CIVIC ENGAGEMENT ACCREDITED',
    whyItFitsProfile: {
      matchText: '88% Match',
      reasons: [
        'Satisfies the community service and sustained civic commitment requirement for CommonApp.',
        'Mentored by alumni from Harvard Kennedy School and Ashoka University.',
        'In-person workshops located in South & Central Mumbai, 20 mins from your school.'
      ]
    },
    overviewPoints: [
      {
        title: 'Community Fieldwork',
        description: 'Direct grassroots project implementation in municipal schools.',
        icon: 'volunteer_activism'
      },
      {
        title: 'Letter of Recommendation',
        description: 'Personalized evaluation signed by Lead Directors of Teach for India.',
        icon: 'mark_email_read'
      },
      {
        title: 'Social Innovation Grant',
        description: '₹25,00,000 micro-fund per cohort project to deploy educational kits.',
        icon: 'account_balance'
      },
      {
        title: 'Growfolio Leadership Seal',
        description: 'Tier-1 verified civic accomplishment badge for your profile.',
        icon: 'verified'
      }
    ],
    prerequisites: [
      'Enrolled in Class 10, 11, or 12 in Mumbai Metropolitan Region.',
      'Able to commit 4 hours every Saturday for 6 consecutive weeks.',
      'Empathy, curiosity, and willingness to listen to grassroots communities.'
    ],
    requiredDocs: [
      {
        name: 'Statement of Purpose (300 Words)',
        description: 'Why do you wish to address educational equity in Mumbai?',
        mandatory: true
      }
    ]
  },
  {
    id: 'hmc-asia-mun',
    title: 'HMC Asia International High School Delegation',
    subtitle: 'Represent global policy committees in Asian geopolitics. High school delegate selection open for Grade 10-12 students.',
    organization: 'Harvard Model Congress Asia 2025',
    category: 'Debate & MUN',
    categoryAccent: 'rose',
    costTag: 'International',
    costIsFree: false,
    matchPercentage: 91,
    matchReason: 'Matches your active interest in Debate & Model UN',
    image: '/src/assets/images/mun_delegation_debate_1792135690785.jpg',
    verifiedOrgBadge: 'Harvard Model Congress Asia 2025',
    format: 'Hybrid Prelims',
    modeDescription: 'Online Mock Sessions + Final Delegation',
    prizePool: 'Best Delegate Trophy',
    deadline: 'Nov 5',
    deadlineFullDate: 'Registration deadline Nov 5, 2025',
    eligibility: 'Grades 9–12 (Ages 14–19 Yrs)',
    levelBadge: 'INTERNATIONAL DELEGATION',
    teamSizeBadge: 'Individual Delegate / School Delegation',
    verifiedChallengeBadge: 'HARVARD STUDENT CONGRESS ACCREDITED',
    whyItFitsProfile: {
      matchText: '91% Match',
      reasons: [
        'Builds upon your Best Delegate win at Mumbai Youth Parliamentary Debate.',
        'Direct committee simulation led by undergraduate Harvard staffers.',
        'High honors recognized by international admissions officers.'
      ]
    },
    overviewPoints: [
      {
        title: 'Global Diplomacy',
        description: 'Simulate crisis response, multilateral treaties, and international law.',
        icon: 'public'
      },
      {
        title: 'Harvard Mentors',
        description: 'Chaired and moderated by Harvard College debaters and researchers.',
        icon: 'school'
      },
      {
        title: 'Country Delegate Status',
        description: 'Represent key economic delegations in UN Security Council & G20.',
        icon: 'flag'
      },
      {
        title: 'Distinguished Delegate Awards',
        description: 'Top speeches receive Harvard Model Congress citations.',
        icon: 'military_tech'
      }
    ],
    prerequisites: [
      'Enrolled in Grades 9–12 with English fluency.',
      'Commitment to research assigned country position papers.',
      'Active participation in caucus debates and draft resolutions.'
    ],
    requiredDocs: [
      {
        name: 'Position Paper Sample or Past MUN Certificate',
        description: 'Short policy writing sample or prior conference participation certificate',
        mandatory: true
      }
    ]
  }
];
