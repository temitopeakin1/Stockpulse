export const DEMO_SESSION_COOKIE = 'signalist_demo_session';

export const DEMO_CREDENTIALS = {
  email: 'demo@signalist.app',
  password: 'demo1234',
} as const;

export const DEMO_USER = {
  id: 'demo-user',
  name: 'Demo User',
  email: DEMO_CREDENTIALS.email,
} as const;

/** Auto-on when MongoDB is missing; force with DEMO_MODE=true */
export const isDemoMode = () =>
  process.env.DEMO_MODE === 'true' || !process.env.MONGODB_URI;
