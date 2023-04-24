/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'
import { Button } from "@/components/ui/button"
import type { Product } from '@/types/product'
import { cn } from "@/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    product: Product
    addToCartHandler: any
    disabled?: boolean
}


export default function ProductItem({
    product,
    disabled,
    addToCartHandler,
}: CardProps) {
    return (
        <div
            className={cn(
                "group relative rounded-lg border border-slate-200 bg-transparent  text-slate-900 shadow-md transition-shadow hover:shadow-lg",
                disabled && "cursor-not-allowed opacity-60",
            )}>
            <Link href={`/product/${product.slug}`}>
                <img
                    src={product.image}
                    alt={product.name}
                    className="rounded shadow object-cover h-64 w-full"
                />
            </Link>
            <div className="flex flex-col items-center justify-center p-5">
                <Link href={`/product/${product.slug}`}>
                    <h2 className="text-lg">{product.name}</h2>
                </Link>
                <p className="mb-2">{product.brand}</p>
                <p>${product.price}</p>
                <Button className="primary-button" type="button"
                    onClick={() => addToCartHandler(product)}>
                    Add to cart
                </Button>
            </div>
        </div>
    );
}