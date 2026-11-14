'use server';

import { headers } from 'next/headers';
import { DEMO_CREDENTIALS, isDemoMode } from '@/lib/demo/config';
import { clearDemoSession, createDemoSession } from '@/lib/demo/session';
import { getAuth } from '@/lib/better-auth/auth';
import { inngest } from '@/lib/inngest/client';

export const signUpWithEmail = async ({
  email,
  password,
  fullName,
  country,
  investmentGoals,
  riskTolerance,
  preferredIndustry,
}: SignUpFormData) => {
  try {
    if (isDemoMode()) {
      await createDemoSession();
      return { success: true, data: { user: { email: DEMO_CREDENTIALS.email } } };
    }

    const auth = await getAuth();
    const response = await auth.api.signUpEmail({
      body: { email, password, name: fullName },
    });

    if (response) {
      await inngest.send({
        name: 'app/user.created',
        data: {
          email,
          name: fullName,
          country,
          investmentGoals,
          riskTolerance,
          preferredIndustry,
        },
      });
    }

    return { success: true, data: response };
  } catch (e) {
    console.log('Sign up failed', e);
    return { success: false, error: 'Sign up failed' };
  }
};

export const signInWithEmail = async ({ email, password }: SignInFormData) => {
  try {
    if (isDemoMode()) {
      const valid =
        email.trim().toLowerCase() === DEMO_CREDENTIALS.email &&
        password === DEMO_CREDENTIALS.password;

      if (!valid) {
        return {
          success: false,
          error: `Use ${DEMO_CREDENTIALS.email} / ${DEMO_CREDENTIALS.password}`,
        };
      }

      await createDemoSession();
      return { success: true, data: { user: { email: DEMO_CREDENTIALS.email } } };
    }

    const auth = await getAuth();
    const response = await auth.api.signInEmail({ body: { email, password } });

    return { success: true, data: response };
  } catch (e) {
    console.log('Sign in failed', e);
    return { success: false, error: 'Sign in failed' };
  }
};

export const signOut = async () => {
  try {
    if (isDemoMode()) {
      await clearDemoSession();
      return { success: true };
    }

    const auth = await getAuth();
    await auth.api.signOut({ headers: await headers() });
    return { success: true };
  } catch (e) {
    console.log('Sign out failed', e);
    return { success: false, error: 'Sign out failed' };
  }
};
