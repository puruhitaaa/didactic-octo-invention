import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import { Tab } from '@headlessui/react'
import { getSession } from 'next-auth/react'
import type { Session } from 'next-auth'
import { Header, Landing } from '../layouts'
import { fetchCategories } from '../utils/fetchCategories'
import { fetchProducts } from '../utils/fetchProducts'
import { Cart, Product } from '../components'

interface Props {
  categories: Category[]
  products: Product[]
  session: Session | null
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const categories = await fetchCategories()
  const products = await fetchProducts()
  const session = await getSession(ctx)

  return {
    props: {
      categories,
      products,
      session,
    },
  }
}

const Home = ({ categories, products }: Props) => {
  const showProducts = (catidx: number) => {
    return products
      .filter((product) => product.category._ref === categories[catidx]._id)
      .map((product) => <Product key={product._id} product={product} />)
  }

  return (
    <div>
      <Head>
        <title>Apple Web App Redesigned</title>
        <meta
          name='description'
          content='An insane build with the idea of redesigning Apple website.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />

      <Cart />

      <main>
        <section className='relative h-[200vh] bg-brand-white-shade'>
          <Landing />
        </section>

        <section className='relative z-40 -mt-[100vh] min-h-screen bg-brand-black-dark'>
          <div className='space-y-10 py-16'>
            <div>
              <h1 className='text-center text-4xl font-medium tracking-wide text-white md:text-5xl'>
                New Promos
              </h1>
            </div>

            <Tab.Group>
              <Tab.List className='flex justify-center'>
                {categories.map((cat) => (
                  <Tab
                    key={cat._id}
                    id={cat._id}
                    className={({ selected }) =>
                      `whitespace-nowrap rounded-t-lg py-3 px-5 text-sm font-light outline-none md:py-4 md:px-6 md:text-base ${
                        selected
                          ? 'borderGradient bg-[#35383C] text-white'
                          : 'border-b-2 border-[#35383C] text-[#747474]'
                      }`
                    }
                  >
                    {cat.title}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels className='mx-auto max-w-fit pt-10 pb-24 sm:px-4'>
                <Tab.Panel className='tabPanel'>{showProducts(0)}</Tab.Panel>
                <Tab.Panel className='tabPanel'>{showProducts(1)}</Tab.Panel>
                <Tab.Panel className='tabPanel'>{showProducts(2)}</Tab.Panel>
                <Tab.Panel className='tabPanel'>{showProducts(3)}</Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home
