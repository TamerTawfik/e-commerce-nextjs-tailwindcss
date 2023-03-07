import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import Layout from '@/components/layout'
import { Button } from '@/components/ui/button'
import data from '@/utils/data'

export default function ProductScreen() {
    const { query } = useRouter();
    const { slug } = query;
    const product = data.products.find((x) => x.slug === slug);
    if (!product) {
        return <div>Product Not Found</div>;
    }
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
                        <Button className="primary-button w-full">Add to cart</Button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}