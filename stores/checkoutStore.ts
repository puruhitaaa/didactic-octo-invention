import create from 'zustand'

interface CheckoutState {
  loading: boolean
  setLoading: (isLoading: boolean) => void
}

const useCheckoutStore = create<CheckoutState>((set) => ({
  loading: false,
  setLoading: (isLoading: boolean) => {
    set({ loading: isLoading })
  },
}))

export default useCheckoutStore
