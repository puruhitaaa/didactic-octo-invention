import { ChevronDownIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { urlFor } from '../../sanity'
import useCartStore from '../../stores/cartStore'

interface Props {
  id: string
  items: Product[]
}

const CheckoutProduct = ({ id, items }: Props) => {
  const removeFromCart = useCartStore((state) => state.removeFromCart)

  const removeItemFromCart = () => {
    removeFromCart(id)

    toast.error(`${items[0].title} removed from cart`, {
      position: 'bottom-center',
    })
  }

  return (
    <div className='flex flex-col gap-x-4 border-b border-gray-300 pb-5 lg:flex-row lg:items-center'>
      <div className='relative h-44 w-44'>
        <Image
          alt={`product-${id}`}
          layout='fill'
          objectFit='contain'
          src={urlFor(items[0].image[0]).url()}
        />
      </div>

      <div className='flex flex-1 items-end lg:items-center'>
        <div className='flex-1 space-y-4'>
          <div className='flex flex-col gap-x-8 text-xl lg:flex-row lg:text-2xl'>
            <h4 className='font-semibold lg:w-96'>{items[0].title}</h4>
            <p className='flex items-end gap-x-1 font-semibold'>
              {items.length}{' '}
              <ChevronDownIcon className='h-6 w-6 text-blue-500' />
            </p>
          </div>

          <p className='flex cursor-pointer items-end text-blue-500 hover:underline'>
            Show product details <ChevronDownIcon className='h-6 w-6' />
          </p>
        </div>

        <div className='flex flex-col items-end space-y-4'>
          <h4 className='text-xl font-semibold lg:text-2xl'>
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(items.reduce((total, item) => total + item.price, 0))}
          </h4>
          <button
            className='text-blue-500 hover:underline'
            onClick={removeItemFromCart}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}

export default CheckoutProduct
