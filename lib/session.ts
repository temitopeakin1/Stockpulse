import { headers } from 'next/headers';
import { isDemoMode } from '@/lib/demo/config';
import { getDemoSession, type AppSession } from '@/lib/demo/session';
import { getAuth } from '@/lib/better-auth/auth';

export async function getAppSession(): Promise<AppSession | null> {
  if (isDemoMode()) {
    return getDemoSession();
  }

  const auth = await getAuth();
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) return null;

  return {
    user: {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
    },
  };
}
