import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useCartStore from '../../stores/cartStore'

const Cart = () => {
  const cartItems = useCartStore((state) => state.items)

  if (cartItems.length === 0) return null

  return (
    <Link href='/checkout'>
      <div className='fixed bottom-10 right-10 z-50 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-gray-300'>
        {cartItems.length > 0 && (
          <span className='bg-gradient-main absolute -right-0 -top-2 z-50 flex h-7 w-7 items-center justify-center rounded-full text-[10px] text-white'>
            {cartItems.length}
          </span>
        )}
        <ShoppingBagIcon className='headerIcon h-8 w-8' />
      </div>
    </Link>
  )
}

export default Cart
