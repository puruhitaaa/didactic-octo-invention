import Image from 'next/image'
import { Button } from '../../components'

const Landing = () => {
  return (
    <div className='sticky top-0 mx-auto flex h-screen max-w-[1350px] items-center justify-between px-8'>
      <div className='space-y-8'>
        <h1 className='space-y-3 text-5xl font-semibold tracking-wide lg:text-6xl'>
          <span className='bg-gradient-main block bg-clip-text text-transparent'>
            Powered
          </span>
          <span className='block'>By Intellect</span>
          <span className='block'>Driven By Values</span>
        </h1>

        <div className='flex items-center space-x-8'>
          <Button text='Buy Now' />
          <a href='/learn-more' className='link'>
            Learn More
          </a>
        </div>
      </div>

      <div className='relative hidden h-[450px] w-[450px] transition-all duration-500 md:inline lg:h-[650px] lg:w-[600px]'>
        <Image
          alt='iphone'
          src='https://rb.gy/vdj90k'
          layout='fill'
          objectFit='contain'
        />
      </div>
    </div>
  )
}

export default Landing
