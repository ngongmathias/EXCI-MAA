export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  CONSULTATION: '/consultation',
  GLOBAL_OFFICES: '/global-offices',
  INSIGHTS: '/insights',
  CAREERS: '/careers',
  CONTACT: '/contact',
  ADMIN: '/admin',
  LEADERSHIP: '/about/leadership',
  QUALITY: '/about/quality',
  ETHICS: '/about/ethics',
  CASE_STUDIES: '/insights/case-studies',
  PRIVACY_POLICY: '/privacy-policy',
  COOKIE_POLICY: '/cookie-policy',
} as const;

export const API_ROUTES = {
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    ME: '/api/auth/me',
  },
  CONTENT: {
    SERVICES: '/api/content/services',
    EVENTS: '/api/content/events',
    BLOG: '/api/content/blog',
    OFFICES: '/api/content/offices',
  },
} as const;


