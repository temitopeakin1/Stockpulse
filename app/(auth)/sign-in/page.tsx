'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import InputField from '@/components/forms/InputField';
import FooterLink from '@/components/forms/FooterLink';
import { signInWithEmail } from "@/lib/actions/auth.actions";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

const DEMO_EMAIL = 'demo@stockpulse.app';
const DEMO_PASSWORD = 'demo1234';

const SignIn = () => {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormData>({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onBlur',
    });

    const onSubmit = async (data: SignInFormData) => {
        try {
            const result = await signInWithEmail(data);
            if (result.success) {
                router.push('/');
                return;
            }
            toast.error('Sign in failed', {
                description: result.error || 'Failed to sign in.',
            });
        } catch (e) {
            console.error(e);
            toast.error('Sign in failed', {
                description: e instanceof Error ? e.message : 'Failed to sign in.'
            })
        }
    }

    const fillDemoCredentials = () => {
        setValue('email', DEMO_EMAIL);
        setValue('password', DEMO_PASSWORD);
    };

    return (
        <>
            <h1 className="form-title">Welcome back</h1>

            <div className="mb-5 rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-sm text-gray-300">
                <p className="font-medium text-yellow-500">Demo login</p>
                <p className="mt-1">
                    Email: <span className="text-gray-100">{DEMO_EMAIL}</span>
                </p>
                <p>
                    Password: <span className="text-gray-100">{DEMO_PASSWORD}</span>
                </p>
                <button
                    type="button"
                    onClick={fillDemoCredentials}
                    className="mt-2 text-yellow-500 underline underline-offset-2 hover:text-yellow-400"
                >
                    Autofill demo credentials
                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <InputField
                    name="email"
                    label="Email"
                    placeholder="demo@stockpulse.app"
                    register={register}
                    error={errors.email}
                    validation={{ required: 'Email is required', pattern: /^\w+@\w+\.\w+$/ }}
                />

                <InputField
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    register={register}
                    error={errors.password}
                    validation={{ required: 'Password is required', minLength: 8 }}
                />

                <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
                    {isSubmitting ? 'Signing In' : 'Sign In'}
                </Button>

                <FooterLink text="Don't have an account?" linkText="Create an account" href="/sign-up" />
            </form>
        </>
    );
};
export default SignIn;
