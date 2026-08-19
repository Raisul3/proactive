// Content ported from the original vanilla-JS app (main.js) so the
// migrated pages keep the same copy while real data wiring is added later.

export const services = [
  {
    id: 'career',
    title: 'Career',
    description: 'Get personalized career recommendations based on your education, skills, and preferences.',
    icon: '💼',
    color: 'career',
  },
  {
    id: 'travel',
    title: 'Travel Planner',
    description: 'Plan your perfect trip with AI-powered recommendations for destinations, hotels, and transportation.',
    icon: '✈️',
    color: 'travel',
  },
  {
    id: 'healthcare',
    title: 'Healthcare',
    description: 'Find the right healthcare specialists and nearby hospitals based on your symptoms.',
    icon: '🏥',
    color: 'health',
  },
  {
    id: 'agriculture',
    title: 'Agriculture',
    description: 'Get crop recommendations based on your soil type, season, and land size.',
    icon: '🌾',
    color: 'agriculture',
  },
  {
    id: 'bd-hub',
    title: 'Bangladesh Service Hub',
    description: 'Finance planning, government & utility service guidance, and emergency contacts — all in one place.',
    icon: '🏛️',
    color: 'budget',
  },
  {
    id: 'assistant',
    title: 'AI Assistant',
    description: 'Get instant answers to your everyday questions with our intelligent AI assistant.',
    icon: '🤖',
    color: 'assistant',
  },
]

export const stats = [
  { label: 'Active Users', value: '50,000+', icon: '👥' },
  { label: 'Recommendations', value: '1M+', icon: '✨' },
  { label: 'Satisfaction Rate', value: '98%', icon: '⭐' },
  { label: 'Districts Covered', value: '64', icon: '📍' },
]

export const testimonials = [
  {
    name: 'Rahim Ahmed',
    role: 'Software Engineer, Dhaka',
    avatar: 'RA',
    rating: 5,
    text: 'Active Life Assistant helped me find the perfect career path. The AI recommendations were spot-on and helped me land my dream job!',
  },
  {
    name: 'Fatima Begum',
    role: 'Farmer, Bogra',
    avatar: 'FB',
    rating: 5,
    text: 'The agriculture recommendations helped me choose the right crops for my soil. My yield has increased by 40% this season!',
  },
  {
    name: 'Karim Khan',
    role: 'Business Owner, Chittagong',
    avatar: 'KK',
    rating: 5,
    text: 'The budget planner helped me save over 20% of my income. The financial tips are incredibly practical!',
  },
]

export const faqs = [
  {
    question: 'How does Proactive Life Management make recommendations?',
    answer: 'Our AI analyzes your inputs including location, preferences, budget, and goals to provide personalized recommendations.',
  },
  {
    question: 'Is my personal data secure?',
    answer: 'Yes, we take data privacy very seriously. All your information is encrypted and never shared with third parties.',
  },
  {
    question: 'Is the service free to use?',
    answer: 'Basic features are completely free. Premium features like detailed reports and unlimited recommendations require a subscription.',
  },
  {
    question: 'Which districts in Bangladesh are covered?',
    answer: 'We cover all 64 districts of Bangladesh, with local services, prices, and recommendations specific to each region.',
  },
  {
    question: 'How accurate are the recommendations?',
    answer: 'Our recommendations have a 98% satisfaction rate, and we continuously update our models with real-world feedback.',
  },
]

// Primary top-navbar links for the authenticated app shell — kept to the
// core modules so the navbar stays clean; everything else lives in the user
// menu dropdown (see navbarMenuItems below).
export const navbarPrimaryItems = [
  { id: 'assistant', label: 'AI Assistant', path: '/dashboard/assistant', icon: 'Bot' },
  { id: 'career', label: 'Career', path: '/dashboard/career', icon: 'Briefcase' },
  { id: 'travel', label: 'Travel', path: '/dashboard/travel', icon: 'Plane' },
  { id: 'healthcare', label: 'Healthcare', path: '/dashboard/healthcare', icon: 'Stethoscope' },
  { id: 'agriculture', label: 'Agriculture', path: '/dashboard/agriculture', icon: 'Wheat' },
  { id: 'bd-hub', label: 'BD Service Hub', path: '/dashboard/bd-hub', icon: 'Landmark' },
]

// Items shown inside the user avatar dropdown in the navbar.
export const navbarMenuItems = [
  { id: 'reports', label: 'Reports & Analytics', path: '/dashboard/reports', icon: 'BarChart3' },
  { id: 'notifications', label: 'Notifications', path: '/dashboard/notifications', icon: 'Bell' },
  { id: 'goals', label: 'Goal Planner', path: '/dashboard/goals', icon: 'Target' },
  { id: 'habits', label: 'Habit Tracker', path: '/dashboard/habits', icon: 'Repeat' },
  { id: 'planner', label: 'Daily Planner', path: '/dashboard/planner', icon: 'CalendarDays' },
  { id: 'profile', label: 'Profile', path: '/dashboard/profile', icon: 'User' },
  { id: 'settings', label: 'Settings', path: '/dashboard/settings', icon: 'Settings' },
]

// Module tiles shown on the home/overview page grid.
export const moduleTiles = [
  { id: 'assistant', title: 'AI Assistant', description: 'Chat, get a success roadmap, and let Aida route you to the right tool.', path: '/dashboard/assistant', icon: 'Bot' },
  { id: 'career', title: 'Career', description: 'Resume tools, ATS checks, interview practice, and job matching.', path: '/dashboard/career', icon: 'Briefcase' },
  { id: 'travel', title: 'Travel Planner', description: 'Routes, transport options, and trip planning across Bangladesh.', path: '/dashboard/travel', icon: 'Plane' },
  { id: 'healthcare', title: 'Healthcare', description: 'Symptom guidance, nearby hospitals, and emergency SOS.', path: '/dashboard/healthcare', icon: 'Stethoscope' },
  { id: 'agriculture', title: 'Agriculture', description: 'Crop recommendations, disease detection, and market prices.', path: '/dashboard/agriculture', icon: 'Wheat' },
  { id: 'bd-hub', title: 'Bangladesh Service Hub', description: 'Finance, government & utility guidance, and emergency contacts.', path: '/dashboard/bd-hub', icon: 'Landmark' },
]

// Sub-navigation (tab bar) for the AI Assistant hub — /dashboard/assistant/*
export const assistantTabs = [
  { id: 'chat', label: 'AI Chat', path: '/dashboard/assistant', icon: 'MessageCircle' },
  { id: 'roadmap', label: 'Success Roadmap', path: '/dashboard/assistant/roadmap', icon: 'Map' },
  { id: 'resume', label: 'Resume Analyzer', path: '/dashboard/assistant/resume', icon: 'FileText' },
  { id: 'interview', label: 'Interview Coach', path: '/dashboard/assistant/interview', icon: 'Mic' },
  { id: 'skill-gap', label: 'Skill Gap Analyzer', path: '/dashboard/assistant/skill-gap', icon: 'Target' },
  { id: 'learning-plan', label: 'Learning Planner', path: '/dashboard/assistant/learning-plan', icon: 'BookOpen' },
  { id: 'memory', label: 'AI Memory', path: '/dashboard/assistant/memory', icon: 'BrainCircuit' },
]

// Sub-navigation (tab bar) for the Bangladesh Service Hub — /dashboard/bd-hub/*
export const bdHubTabs = [
  { id: 'finance', label: 'Finance & Budget', path: '/dashboard/bd-hub', icon: 'Wallet' },
  { id: 'government', label: 'Government Services', path: '/dashboard/bd-hub/government', icon: 'Landmark' },
  { id: 'utility', label: 'Utility Bills', path: '/dashboard/bd-hub/utility', icon: 'Zap' },
  { id: 'emergency', label: 'Emergency Contacts', path: '/dashboard/bd-hub/emergency', icon: 'Siren' },
]
