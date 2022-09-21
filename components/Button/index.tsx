/* eslint-disable react/no-unknown-property */
type ButtonProps = {
  text: string
  onClick?: () => void
  width?: string
  loading?: boolean
  padding?: string
  withIcon?: boolean
}

const Button = ({
  text,
  onClick,
  width,
  loading,
  padding,
  withIcon,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`group relative z-30 box-border inline-flex ease-in ${
        width ? width : 'w-auto'
      } ${
        padding ? padding : 'px-8 py-3'
      } cursor-pointer items-center justify-center overflow-hidden rounded bg-indigo-600 bg-gradient-to-r from-pink-500 to-violet-500 font-bold text-white transition-all duration-300 focus:outline-none`}
    >
      <span className='absolute bottom-0 right-0 -mb-8 -mr-5 h-20 w-8 translate-x-1 rotate-45 transform bg-white opacity-10 transition-all duration-300 ease-out group-hover:translate-x-0' />
      <span className='absolute top-0 left-0 -mt-1 -ml-12 h-8 w-20 -translate-x-1 -rotate-45 transform bg-white opacity-10 transition-all duration-300 ease-out group-hover:translate-x-0' />

      <span className='relative z-20 flex items-center font-semibold'>
        {withIcon && (
          <svg
            className='relative mr-2 h-5 w-5 flex-shrink-0 text-white'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M13 10V3L4 14h7v7l9-11h-7z'
            ></path>
          </svg>
        )}
      </span>
      {loading ? 'Loading...' : text}
    </button>
  )
}

export default Button
