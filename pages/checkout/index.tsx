import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Button, CheckoutProduct } from '../../components'
import { Header } from '../../layouts'
import useCartStore from '../../stores/cartStore'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import useCheckoutStore from '../../stores/checkoutStore'
import { Stripe } from 'stripe'
import { fetchPostJSON } from '../../utils/api-helpers'
import getStripe from '../../utils/get-stripejs'

const Checkout = () => {
  const subRef = useRef(true)
  const [groupedItemsInCart, setGroupedItemsInCart] = useState(
    {} as { [key: string]: Product[] }
  )
  const { items, cartPriceTotal, incrementPriceTotal } = useCartStore(
    (state) => ({
      items: state.items,
      cartPriceTotal: state.cartPriceTotal,
      incrementPriceTotal: state.incrementPriceTotal,
    })
  )
  const { loading, setLoading } = useCheckoutStore((state) => ({
    loading: state.loading,
    setLoading: state.setLoading,
  }))
  const router = useRouter()

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      ;(results[item._id] = results[item._id] || []).push(item)
      return results
    }, {} as { [key: string]: Product[] })

    setGroupedItemsInCart(groupedItems)
    incrementPriceTotal()

    return () => {
      subRef.current = false
    }
  }, [items, incrementPriceTotal])

  const createCheckoutSession = async () => {
    setLoading(true)

    const checkoutSession: Stripe.Checkout.Session = await fetchPostJSON(
      '/api/checkout_sessions',
      {
        items: items,
      }
    )

    if ((checkoutSession as any).statusCode === 500) {
      console.error((checkoutSession as any).message)
      return
    }

    const stripe = await getStripe()
    const { error } = await stripe!.redirectToCheckout({
      sessionId: checkoutSession.id,
    })

    console.warn(error.message)

    setLoading(false)
  }

  return (
    <div className='min-h-screen overflow-hidden bg-brand-white-shade'>
      <Head>
        <title>Cart - Apple Web App Redesigned</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />

      <main className='mx-auto max-w-5xl pb-24'>
        <div className='px-5'>
          <h1 className='my-4 text-3xl font-semibold lg:text-4xl'>
            {items.length > 0 ? 'Review your cart.' : 'Your cart is empty.'}
          </h1>

          <p className='my-4'>Free delivery and free returns.</p>

          {items.length === 0 && (
            <Button text='Continue Shopping' onClick={() => router.push('/')} />
          )}
        </div>

        {items.length > 0 && (
          <div className='mx-5 md:mx-8'>
            {Object.entries(groupedItemsInCart).map(([key, items]) => (
              <CheckoutProduct key={key} id={key} items={items} />
            ))}

            <div className='mb-12 mt-6 ml-auto max-w-3xl'>
              <div className='divide-y divide-gray-300'>
                <div className='pb-4'>
                  <div className='flex justify-between'>
                    <p>Subtotal</p>
                    <p>
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      }).format(cartPriceTotal)}
                    </p>
                  </div>

                  <div className='flex justify-between'>
                    <p>Shipping</p>
                    <p>FREE</p>
                  </div>
                </div>

                <div className='flex justify-between'>
                  <div className='flex flex-col gap-x-1 lg:flex-row'>
                    Estimated tax for:{' '}
                    <p className='flex cursor-pointer items-end text-blue-500 hover:underline'>
                      Enter zip code <ChevronDownIcon className='h-6 w-6' />
                    </p>
                  </div>

                  <p>$ -</p>
                </div>
              </div>

              <div className='flex justify-between pt-4 text-xl font-semibold'>
                <h4>Total</h4>
                <h4>
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(cartPriceTotal)}
                </h4>
              </div>
            </div>

            <div className='my-14 space-y-4'>
              <h4 className='text-xl font-semibold'>
                How would you like to check out?
              </h4>
              <div className='flex flex-col gap-4 md:flex-row'>
                <div className='order-2 flex flex-1 flex-col items-center rounded-xl bg-gray-200 px-8 py-12 text-center'>
                  <h4 className='mb-4 flex flex-col text-xl font-semibold'>
                    <span>Pay Monthly</span>
                    <span>with Apple Card</span>
                    <span>
                      $283.16/mo. at 0% APR<sup className='-top-1'></sup>
                    </span>
                  </h4>
                  <Button text='Check Out with Apple Card Monthly Installments' />
                  <p className='mt-2 max-w-[240px] text-[13px]'>
                    $0.00 due today, which includes applicable full-price items,
                    down payments, shipping, and taxes.
                  </p>
                </div>

                <div className='flex flex-1 flex-col items-center space-y-8 rounded-xl bg-gray-200 px-8 py-12 text-center md:order-2'>
                  <h4 className='mb-4 flex flex-col text-xl font-semibold'>
                    Pay in full
                    <span>
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      }).format(cartPriceTotal)}
                    </span>
                  </h4>

                  <Button
                    onClick={createCheckoutSession}
                    withIcon
                    loading={loading}
                    text='Check Out'
                    width='w-full'
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default Checkout
