// @ts-nocheck comment
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import Layout from '@/components/layout';
import { Icons } from "@/components/icons"
import { Store } from '@/utils/Store';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button'
import axios from 'axios';
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic';



function CartScreen() {
    const router = useRouter();
    const { state, dispatch } = useContext(Store);
    const { cart: { cartItems } } = state;

    const removeItemHandler = (item) => {
        dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
    };

    const updateCartHandler = async (item, qty) => {
        const quantity = Number(qty);
        const { data } = await axios.get(`/api/products/${item._id}`);
        if (data.countInStock < quantity) {
            return toast.error('Sorry. Product is out of stock');
        }
        dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
        toast.success('Product updated in the cart');
    };

    return (
        <Layout title="Shopping Cart">
            <h1 className="my-4 py-4 pl-5 text-xl">Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <div className="py-4 pl-5">
                    Cart is empty. <Link href="/">Go shopping</Link>
                </div>
            ) : (
                    <div className="grid md:grid-cols-4 md:gap-5 px-5">
                        <div className="overflow-x-auto md:col-span-3">
                            <table className="min-w-full ">
                                <thead className="border-b">
                                    <tr>
                                        <th className="p-5 text-left">Item</th>
                                        <th className="p-5 text-right">Quantity</th>
                                        <th className="p-5 text-right">Price</th>
                                        <th className="p-5">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item) => (
                                        <tr key={item.slug} className="border-b">
                                            <td>
                                                <Link className="flex items-center" href={`/product/${item.slug}`}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        width={50}
                                                        height={50}
                                                    ></Image>
                                                        &nbsp;
                                                        {item.name}
                                                </Link>
                                            </td>
                                            <td className="p-5 text-right">
                                                <select
                                                    value={item.quantity}
                                                    onChange={(e) =>
                                                        updateCartHandler(item, e.target.value)
                                                    }
                                                >
                                                    {[...Array(item.countInStock).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td className="p-5 text-right">${item.price}</td>
                                            <td className="p-5 text-center">
                                                <button onClick={() => removeItemHandler(item)}>
                                                    <Icons.xcircle className="h-5 w-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="group relative rounded-lg border border-slate-200 bg-transparent  text-slate-900 shadow-md transition-shadow hover:shadow-lg p-5">
                            <ul>
                                <li>
                                    <div className="pb-3 text-xl">
                                        Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) : $
                                        {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                                    </div>
                                </li>
                                <li>
                                    <Button
                                        onClick={() => router.push('login?redirect=/shipping')}
                                        className="w-full"
                                    >
                                        Check Out
                                    </Button>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
        </Layout>
    );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
