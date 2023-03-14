import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import Layout from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Store } from '@/utils/Store';
import axios from 'axios';
import { toast } from 'react-toastify';
import Product from '@/models/Product';
import db from '@/utils/db';


export default function ProductScreen(props) {
    const { product } = props;
    const { state, dispatch } = useContext(Store);
    const router = useRouter();


    if (!product) {
        return <Layout title="Produt Not Found">Product Not Found</Layout>;
    }

    const addToCartHandler = async () => {
        const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/products/${product._id}`);

        if (data.countInStock < quantity) {
            return toast.error('Sorry. Product is out of stock');
        }

        dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
        router.push('/cart');

    };

    return (
        <Layout title={product.name}>
            <div className="py-5 px-5">
                <Link href="/">back to products</Link>
            </div>
            <div className="grid md:grid-cols-4 md:gap-3 px-5 pb-10">
                <div className="md:col-span-2">
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={640}
                        height={640}
                        layout="responsive"
                    ></Image>
                </div>
                <div>
                    <ul>
                        <li>
                            <h1>{product.name}</h1>
                        </li>
                        <li>Category: {product.category}</li>
                        <li>Brand: {product.brand}</li>
                        <li>
                            {product.rating} of {product.numReviews} reviews
            </li>
                        <li>Description: {product.description}</li>
                    </ul>
                </div>
                <div>
                    <div className="group relative rounded-lg border border-slate-200 bg-transparent  text-slate-900 shadow-md transition-shadow hover:shadow-lg p-5">
                        <div className="mb-2 flex justify-between">
                            <div>Price</div>
                            <div>${product.price}</div>
                        </div>
                        <div className="mb-2 flex justify-between">
                            <div>Status</div>
                            <div>{product.countInStock > 0 ? 'In stock' : 'Unavailable'}</div>
                        </div>
                        <Button className="primary-button w-full"
                            onClick={addToCartHandler}
                        >Add to cart</Button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const { params } = context;
    const { slug } = params;

    await db.connect();
    const product = await Product.findOne({ slug }).lean();
    await db.disconnect();
    return {
        props: {
            product: product ? db.convertDocToObj(product) : null,
        },
    };
}