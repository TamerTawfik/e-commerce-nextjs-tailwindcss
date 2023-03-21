import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { getError } from '@/utils/error';
import axios from 'axios';
import Layout from '@/components/layout';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ProfileScreen() {
    const { data: session } = useSession();

    const {
        handleSubmit,
        register,
        getValues,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        setValue('name', session.user.name);
        setValue('email', session.user.email);
    }, [session.user, setValue]);

    const submitHandler = async ({ name, email, password }) => {
        try {
            await axios.put('/api/auth/update', {
                name,
                email,
                password,
            });
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });
            toast.success('Profile updated successfully');
            if (result.error) {
                toast.error(result.error);
            }
        } catch (err) {
            toast.error(getError(err));
        }
    };

    return (
        <Layout title="Profile">
            <form
                className="mx-auto max-w-screen-md p-5"
                onSubmit={handleSubmit(submitHandler)}
            >
                <h1 className="mb-4 text-xl">Update Profile</h1>

                <div className="mb-4">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        type="text"
                        className="w-full"
                        id="name"
                        autoFocus
                        {...register('name', {
                            required: 'Please enter name',
                        })}
                    />
                    {errors.name && (
                        <div className="text-red-500">{errors.name.message}</div>
                    )}
                </div>

                <div className="mb-4">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="email"
                        className="w-full"
                        id="email"
                        {...register('email', {
                            required: 'Please enter email',
                            pattern: {
                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                                message: 'Please enter valid email',
                            },
                        })}
                    />
                    {errors.email && (
                        <div className="text-red-500">{errors.email.message}</div>
                    )}
                </div>

                <div className="mb-4">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        className="w-full"
                        type="password"
                        id="password"
                        {...register('password', {
                            minLength: { value: 6, message: 'password is more than 5 chars' },
                        })}
                    />
                    {errors.password && (
                        <div className="text-red-500 ">{errors.password.message}</div>
                    )}
                </div>

                <div className="mb-4">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                        className="w-full"
                        type="password"
                        id="confirmPassword"
                        {...register('confirmPassword', {
                            validate: (value) => value === getValues('password'),
                            minLength: {
                                value: 6,
                                message: 'confirm password is more than 5 chars',
                            },
                        })}
                    />
                    {errors.confirmPassword && (
                        <div className="text-red-500 ">
                            {errors.confirmPassword.message}
                        </div>
                    )}
                    {errors.confirmPassword &&
                        errors.confirmPassword.type === 'validate' && (
                            <div className="text-red-500 ">Password do not match</div>
                        )}
                </div>
                <div className="mb-4">
                    <Button className="primary-button">Update Profile</Button>
                </div>
            </form>
        </Layout>
    );
}

ProfileScreen.auth = true;