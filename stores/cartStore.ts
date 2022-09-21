import create from 'zustand'
import { devtools } from 'zustand/middleware'

interface CartState {
  items: Product[]
  filteredItems: Product[]
  cartPriceTotal: number
  addToCart: (newItem: Product) => void
  removeFromCart: (payloadId: string) => void
  filterCartItems: (payloadId: string) => void
  incrementPriceTotal: () => void
}

const useCartStore = create<CartState>()(
  devtools((set, get) => ({
    items: [],
    filteredItems: [],
    cartPriceTotal: 0,
    addToCart: (newItem: Product) => {
      set((prevState) => ({ items: [...prevState.items, newItem] }))
    },
    removeFromCart: (payloadId: string) => {
      let items = get().items
      let index = items.findIndex((item) => item._id === payloadId)

      let newCart = [...items]

      if (index >= 0) {
        newCart.splice(index, 1)
        set({ items: newCart })
      } else {
        console.error(
          `Can't remove product (id: ${payloadId}) as it's not in the cart!`
        )
      }
    },
    filterCartItems: (payloadId: string) => {
      let items = get().items

      set({ filteredItems: items.filter((item) => item._id === payloadId) })
    },
    incrementPriceTotal: () => {
      let items = get().items

      set({
        cartPriceTotal: items.reduce(
          (total: number, item: Product) => (total += item.price),
          0
        ),
      })
    },
  }))
)

export default useCartStore
