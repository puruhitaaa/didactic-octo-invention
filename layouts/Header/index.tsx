import Image from 'next/image'
import Link from 'next/link'
import {
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import { signIn, signOut, useSession } from 'next-auth/react'
import useCartStore from '../../stores/cartStore'

const Header = () => {
  const { data: session } = useSession()
  const cartItems = useCartStore((state) => state.items)

  return (
    <header className='sticky top-0 z-30 bg-brand-white-shade'>
      <div className='container mx-auto flex w-full items-center justify-between px-10 py-4 lg:px-20'>
        <div>
          <Link href='/'>
            <div className='relative h-10 w-5 cursor-pointer opacity-75 transition-opacity hover:opacity-100'>
              <Image
                src='https://rb.gy/vsvv2o'
                alt='apple-logo'
                layout='fill'
                objectFit='contain'
              />
            </div>
          </Link>
        </div>

        <div className='hidden flex-1 items-center justify-center space-x-8 md:flex'>
          <a className='headerLink' href='/products'>
            Product
          </a>
          <a className='headerLink' href='/explore'>
            Explore
          </a>
          <a className='headerLink' href='/support'>
            Support
          </a>
          <a className='headerLink' href='/business'>
            Business
          </a>
        </div>

        <div className='flex items-center gap-x-4'>
          <MagnifyingGlassIcon className='headerIcon' />

          <Link href='/checkout'>
            <div className='relative cursor-pointer'>
              {cartItems.length > 0 && (
                <span className='bg-gradient-main absolute -right-1 -top-1 z-50 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-medium text-white'>
                  {cartItems.length}
                </span>
              )}

              <ShoppingBagIcon className='headerIcon' />
            </div>
          </Link>

          {session ? (
            <div className='relative h-6 w-6' onClick={() => signOut()}>
              <Image
                src={session.user?.image || 'https://rb.gy/j055kb'}
                alt='user-avatar'
                className='cursor-pointer rounded-full'
                layout='fill'
                objectFit='contain'
              />
            </div>
          ) : (
            <UserIcon className='headerIcon' onClick={() => signIn()} />
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
