import { cookies } from 'next/headers';
import { DEMO_SESSION_COOKIE, DEMO_USER } from '@/lib/demo/config';

export type AppSession = {
  user: {
    id: string;
    name: string;
    email: string;
  };
};

export async function getDemoSession(): Promise<AppSession | null> {
  const cookieStore = await cookies();
  const value = cookieStore.get(DEMO_SESSION_COOKIE)?.value;
  if (value !== '1') return null;

  return { user: { ...DEMO_USER } };
}

export async function createDemoSession() {
  const cookieStore = await cookies();
  cookieStore.set(DEMO_SESSION_COOKIE, '1', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
  });
}

export async function clearDemoSession() {
  const cookieStore = await cookies();
  cookieStore.delete(DEMO_SESSION_COOKIE);
}
