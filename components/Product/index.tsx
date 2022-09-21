import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { urlFor } from '../../sanity'
import useCartStore from '../../stores/cartStore'

interface Props {
  product: Product
}

const Product = ({ product }: Props) => {
  const addToCart = useCartStore((state) => state.addToCart)

  const addItemToCart = () => {
    addToCart(product)
    toast.success(`${product.title} added to cart`, {
      position: 'bottom-center',
    })
  }

  return (
    <div className='flex h-fit w-[320px] select-none flex-col space-y-3 rounded-xl bg-[#35383C] p-8 md:h-[500px] md:w-[400px] md:p-10'>
      <div className='relative h-64 w-full md:h-72'>
        <Image
          alt={product.title}
          layout='fill'
          objectFit='contain'
          src={urlFor(product.image[0]).url()}
        />
      </div>

      <div className='flex flex-1 items-center justify-between space-x-3'>
        <div className='space-y-2 text-xl text-white md:text-2xl'>
          <p>{product.title}</p>
          <p>
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(product.price)}
          </p>
        </div>

        <div
          className='bg-gradient-main flex h-16 w-16 flex-shrink-0 cursor-pointer items-center justify-center rounded-full md:h-[70px] md:w-[70px]'
          onClick={addItemToCart}
        >
          <ShoppingCartIcon className='h-8 w-8 text-white' />
        </div>
      </div>
    </div>
  )
}

export default Product
