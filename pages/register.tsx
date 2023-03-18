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
import axios from 'axios';

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
        getValues,
        formState: { errors },
    } = useForm();

    const submitHandler = async ({ name, email, password }) => {
        try {
            await axios.post('/api/auth/signup', {
                name,
                email,
                password,
            });

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
        <Layout title="Create Account">
            <form
                className="mx-auto max-w-screen-md py-12"
                onSubmit={handleSubmit(submitHandler)}
            >
                <h1 className="mb-4 text-xl">Create Account</h1>
                <div className="mb-4">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        type="text"
                        {...register('name', {
                            required: 'Please enter Name',
                        })}
                        id="name"
                        autoFocus
                    ></Input>
                    {errors.name && (
                        <div className="text-red-500">{errors.name.message}</div>
                    )}
                </div>
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
                    ></Input>
                    {errors.email && (
                        <div className="text-red-500">{errors.email.message}</div>
                    )}
                </div>
                <div className="mb-4">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        type="password"
                        id="password"
                        {...register('password', {
                            required: 'Please enter password',
                            minLength: { value: 6, message: 'password is more than 5 chars' },
                        })}
                    ></Input>
                    {errors.password && (
                        <div className="text-red-500 ">{errors.password.message}</div>
                    )}
                </div>
                <div className="mb-4">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                        type="password"
                        id="confirmPassword"
                        {...register('confirmPassword', {
                            required: 'Please enter confirm password',
                            validate: (value) => value === getValues('password'),
                            minLength: {
                                value: 6,
                                message: 'confirm password is more than 5 chars',
                            },
                        })}
                    ></Input>
                    {errors.confirmPassword && (
                        <div className="text-red-500 ">{errors.confirmPassword.message}</div>
                    )}
                    {errors.confirmPassword &&
                        errors.confirmPassword.type === 'validate' && (
                            <div className="text-red-500 ">Password do not match</div>
                        )}
                </div>
                <div className="mb-4 ">
                    <Button>Register</Button>
                </div>
                <div className="mb-4 ">
                    already have an account? &nbsp;
          <Link href="login">Login</Link>
                </div>
            </form>
        </Layout>
    );
}