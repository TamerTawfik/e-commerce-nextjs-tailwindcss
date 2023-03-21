import Link from "next/link"
import { signOut, useSession } from 'next-auth/react';

import React, { useContext, useEffect, useState } from 'react';
import { Store } from '@/utils/Store';
import Cookies from 'js-cookie';

import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { buttonVariants } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function SiteHeader() {
    const { state, dispatch } = useContext(Store);

    const { status, data: session } = useSession();
    const { cart } = state;
    const [cartItemsCount, setCartItemsCount] = useState(0);

    useEffect(() => {
        setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
    }, [cart.cartItems]);

    const logoutClickHandler = () => {
        Cookies.remove('cart');
        dispatch({ type: 'CART_RESET' });
        signOut({ callbackUrl: '/login' });
    };

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
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Avatar>
                                            <AvatarImage src="https://www.mtsolar.us/wp-content/uploads/2020/04/avatar-placeholder.png" alt="profile pic" />
                                            <AvatarFallback>{session.user.name}</AvatarFallback>
                                        </Avatar>

                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="start"
                                        sideOffset={24}
                                        className="w-[300px]"
                                    >
                                        <DropdownMenuLabel>
                                            <span className="flex items-center">
                                                Account
                                            </span>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />

                                        <DropdownMenuItem asChild>
                                            <Link href='/profile'>Profile</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href='/order-history'>Order History</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href='' onClick={logoutClickHandler}>Logout</Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

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