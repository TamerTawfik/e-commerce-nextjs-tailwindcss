// @ts-nocheck comment

import Link from 'next/link'
import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form'
import Layout from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getError } from '@/utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export default function LoginScreen() {
    const { data: session } = useSession();

    const router = useRouter();
    const { redirect } = router.query;

    useEffect(() => {
        if (session?.user) {
            router.push(redirect || '/');
        }
    }, [router, session, redirect]);

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const submitHandler = async ({ email, password }) => {
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });
            if (result.error) {
                toast.error(result.error);
            }
        } catch (err) {
            toast.error(getError(err));
        }
    };

    return (
        <Layout title="Login">
            <form
                className="mx-auto max-w-screen-md py-12"
                onSubmit={handleSubmit(submitHandler)}
            >
                <h1 className="mb-4 text-xl">Login</h1>
                <div className="mb-4">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="email"
                        {...register('email', {
                            required: 'Please enter email',
                            pattern: {
                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                                message: 'Please enter valid email',
                            },
                        })}
                        id="email"
                        autoFocus
                    ></Input>
                    {errors.email && (
                        <div className="text-red-500">{errors.email.message}</div>
                    )}
                </div>
                <div className="mb-4">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        type="password"
                        {...register('password', {
                            required: 'Please enter password',
                            minLength: { value: 6, message: 'password is more than 5 chars' },
                        })}
                        id="password"
                    ></Input>
                    {errors.password && (
                        <div className="text-red-500 ">{errors.password.message}</div>
                    )}
                </div>
                <div className="mb-4 ">
                    <Button>Login</Button>
                </div>
                <div className="mb-4 ">
                    Don&apos;t have an account? &nbsp;
          <Link href={`/register?redirect=${redirect || '/'}`}>Register</Link>
                </div>
            </form>
        </Layout>
    );
}