import Layout from '@/components/layout'
import ProductItem from '@/components/product-item'

import data from '@/utils/data'

export default function Home() {
  return (
    <>
      <Layout title=''>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 my-10 mx-5">
          {data.products.map((product) => (
            <ProductItem product={product} key={product.slug}></ProductItem>
          ))}
        </div>
      </Layout>
    </>
  )
}
