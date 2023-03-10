import Link from "next/link"
import { useSession } from 'next-auth/react';

import React, { useContext, useEffect, useState } from 'react';
import { Store } from '@/utils/Store';

import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { buttonVariants } from "@/components/ui/button"

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function SiteHeader() {
    const { status, data: session } = useSession();
    const { state } = useContext(Store);
    const { cart } = state;
    const [cartItemsCount, setCartItemsCount] = useState(0);

    useEffect(() => {
        setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
    }, [cart.cartItems]);

    return (
        <>
            <ToastContainer position="bottom-center" limit={1} />

            <header className="sticky top-0 z-40 w-full border-b border-b-slate-200 bg-white dark:border-b-slate-700 dark:bg-slate-900">
                <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
                    <MainNav items={siteConfig.mainNav} />
                    <div className="flex flex-1 items-center justify-end space-x-4">
                        <nav className="flex items-center space-x-1">
                            <Link
                                href={siteConfig.links.cart}
                                rel="noreferrer"
                            >
                                <div
                                    className={buttonVariants({
                                        size: "sm",
                                        variant: "ghost",
                                        className: "text-slate-700 dark:text-slate-400",
                                    })}
                                >
                                    <Icons.ShoppingCart className="h-5 w-5" />
                                    {cartItemsCount > 0 && (
                                        <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                                            {cartItemsCount}
                                        </span>
                                    )}
                                    <span className="sr-only">Shopping Cart</span>
                                </div>
                            </Link>
                            {status === 'loading' ? (
                                'Loading'
                            ) : session?.user ? (
                                session.user.name
                            ) : (
                                        <Link
                                            href={siteConfig.links.login}
                                            rel="noreferrer"
                                        >
                                            <div
                                                className={buttonVariants({
                                                    size: "sm",
                                                    variant: "ghost",
                                                    className: "text-slate-700 dark:text-slate-400",
                                                })}
                                            >
                                                <Icons.LogIn className="h-5 w-5 fill-current" />
                                                <span className="sr-only">Login</span>
                                            </div>
                                        </Link>
                                    )}

                        </nav>
                    </div>
                </div>
            </header>
        </>
    )
}