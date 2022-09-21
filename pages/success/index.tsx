import { useEffect, useState } from 'react'
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMediaQuery } from 'react-responsive'
import { Button } from '../../components'
import { GetServerSideProps } from 'next'
import { fetchLineItems } from '../../utils/fetchLineItems'

interface Props {
  products: StripeProduct[]
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const sessionId = query.session_id as string
  const products = await fetchLineItems(sessionId)

  return {
    props: {
      products,
    },
  }
}

const Success = ({ products }: Props) => {
  const [mounted, setMounted] = useState(false)
  const [showOrderSummary, setShowOrderSummary] = useState(false)
  const router = useRouter()
  const { session_id } = router.query
  const subtotal = products.reduce(
    (acc, product) => acc + product.price.unit_amount / 100,
    0
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' })
  let showOrderSummaryCondition = isTabletOrMobile ? showOrderSummary : true

  return (
    <div>
      <Head>
        <title>Thank you! - Apple</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <header className='mx-auto max-w-xl'>
        <Link href='/'>
          <div className='relative ml-4 h-16 w-8 cursor-pointer transition lg:hidden'>
            <Image
              alt='apple'
              src='https://rb.gy/vsvv2o'
              layout='fill'
              objectFit='contain'
            />
          </div>
        </Link>
      </header>

      <main className='grid grid-cols-1 lg:grid-cols-9'>
        <section className='order-2 mx-auto max-w-xl pb-12 lg:col-span-5 lg:mx-0 lg:max-w-none lg:pr-16 lg:pt-16 xl:pl-16 2xl:pl-44'>
          <Link href='/'>
            <div className='relative ml-4 hidden h-16 w-8 cursor-pointer transition lg:inline-flex'>
              <Image
                alt='apple'
                src='https://rb.gy/vsvv2o'
                layout='fill'
                objectFit='contain'
              />
            </div>
          </Link>

          <div className='my-8 ml-4 flex space-x-4 lg:ml-14 xl:ml-0'>
            <div className='flex h-11 w-11 items-center justify-center rounded-full border-2 border-black'>
              <CheckIcon className='h-8 w-8' />
            </div>
            <div>
              <p className='text-sm text-gray-600'>
                Order #{session_id?.slice(-5)}
              </p>
              <h4 className='text-lg'>
                Thank you{' '}
                {/* {session ? session_id.user?.name?.split(' ')[0] : 'Guest'} */}
              </h4>
            </div>
          </div>

          <div className='mx-4 divide-y divide-gray-300 rounded-md border border-gray-300 p-4 lg:ml-14'>
            <div className='space-y-2 pb-3'>
              <p>Your order is confirmed</p>
              <p className='text-sm text-gray-600'>
                We&apos;ve accepted your order, and we&apos;re getting it ready.
                Come back to this page for updates on your shipment status.
              </p>
            </div>

            <div className='pt-3 text-sm'>
              <p className='font-medium text-gray-600'>
                Other tracking number:
              </p>
              <p>CNB21441622</p>
            </div>
          </div>

          <div className='m-4 space-y-2 rounded-md border border-gray-300 p-4 lg:ml-14'>
            <p>Order updates</p>
            <p className='text-sm text-gray-600'>
              You&apos;ll get shipping and delivery updates by email and text.
            </p>
          </div>

          <div className='mx-4 flex flex-col items-center justify-between text-sm lg:ml-14 lg:flex-row'>
            <p className='hidden lg:inline'>Need help? Contact us</p>
            {mounted && (
              <Button
                text='Continue Shopping'
                onClick={() => router.push('/')}
                width={isTabletOrMobile ? 'w-full' : undefined}
                padding='py-4 px-8'
              />
            )}
          </div>
        </section>

        {mounted && (
          <section className='overflow-y-scroll border-y border-l border-gray-300 bg-brand-white-light lg:order-2 lg:col-span-4 lg:h-screen lg:border-y-0'>
            <div
              className={`w-full ${
                showOrderSummaryCondition ? 'border-b' : ''
              } border-gray-300 text-sm lg:hidden`.trim()}
            >
              <div className='mx-auto flex max-w-xl items-center justify-between px-4 py-6'>
                <button
                  className='flex items-center space-x-2'
                  onClick={() => setShowOrderSummary(!showOrderSummary)}
                >
                  <ShoppingCartIcon className='h-6 w-6' />
                  <p>Show order summary</p>
                  {showOrderSummaryCondition ? (
                    <ChevronUpIcon className='h-4 w-4' />
                  ) : (
                    <ChevronDownIcon className='h-4 w-4' />
                  )}
                </button>

                <p className='text-xl font-medium'>
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(subtotal + 20)}
                </p>
              </div>
            </div>

            {showOrderSummaryCondition && (
              <div className='mx-auto max-w-xl divide-y border-gray-300 p-4 lg:mx-0 lg:max-w-lg lg:px-10 lg:py-16'>
                <div className='space-y-4 pb-4'>
                  {products.map((product) => (
                    <div
                      className='flex items-center space-x-4 text-sm font-medium'
                      // eslint-disable-next-line react/no-unknown-property
                      key={product.id}
                    >
                      <div className='relative flex h-16 w-16 items-center justify-center rounded-md border border-gray-300 bg-brand-white-shade text-xs text-white'>
                        <div className='relative h-7 w-7 animate-bounce'>
                          <Image
                            alt='apple'
                            src='https://rb.gy/vsvv2o'
                            layout='fill'
                            objectFit='contain'
                          />
                        </div>
                        <div className='absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-gray-600 text-xs'>
                          <p>{product.quantity}</p>
                        </div>
                      </div>
                      <p className='flex-1'>{product.description}</p>
                      <p>
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        }).format(product.price.unit_amount / 100)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className='space-y-1 py-4'>
                  <div className='flex justify-between text-sm'>
                    <p className='text-gray-600'>Subtotal</p>
                    <p className='font-medium'>
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      }).format(subtotal)}
                    </p>
                  </div>

                  <div className='flex-justify-between-text-sm'>
                    <p className='text-gray-600'>Discount</p>
                    <p className='font-medium'></p>
                  </div>
                  <div className='flex-justify-between-text-sm'>
                    <p className='text-gray-600'>Shipping</p>
                    <p className='font-medium'>
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      }).format(20)}
                    </p>
                  </div>
                </div>

                <div className='flex-justify-between pt-4'>
                  <p>Total</p>
                  <p className='flex items-center gap-x-2 text-xs text-gray-600'>
                    USD
                    <span className='text-xl font-medium'>
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      }).format(subtotal + 20)}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  )
}

export default Success
