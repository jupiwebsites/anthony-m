"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type FrameOption = "black" | "white" | "natural" | "silver"

export type SizeOption = {
  value: string
  label: string
  dimensions: string
  price: number
}

export type CartItem = {
  id: string
  title: string
  image: string
  size: SizeOption
  frame: FrameOption
  quantity: number
  currency?: string
  unitPrice?: number
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  itemCount: number
  subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [itemCount, setItemCount] = useState(0)
  const [subtotal, setSubtotal] = useState(0)

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("anthony-michael-cart")
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart)
        setItems(parsedCart)
      }
    } catch (e) {
      console.error("Failed to parse cart from localStorage:", e)
      localStorage.removeItem("anthony-michael-cart")
    }
  }, [])

  // Save cart to localStorage and calculate totals when items change
  useEffect(() => {
    try {
      if (items.length > 0) {
        localStorage.setItem("anthony-michael-cart", JSON.stringify(items))
      } else {
        localStorage.removeItem("anthony-michael-cart")
      }

      // Calculate item count and subtotal
      const count = items.reduce((total, item) => total + item.quantity, 0)
      const total = items.reduce((total, item) => {
        const price = item.unitPrice || item.size.price
        return total + price * item.quantity
      }, 0)

      setItemCount(count)
      setSubtotal(total)
    } catch (e) {
      console.error("Failed to save cart to localStorage:", e)
    }
  }, [items])

  const addItem = (newItem: CartItem) => {
    setItems((prevItems) => {
      // Create unique key for item based on id, size, and frame
      const itemKey = `${newItem.id}-${newItem.size.value}-${newItem.frame}`

      // Check if item already exists
      const existingItemIndex = prevItems.findIndex((item) => `${item.id}-${item.size.value}-${item.frame}` === itemKey)

      if (existingItemIndex > -1) {
        // Update quantity of existing item
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + newItem.quantity,
        }
        return updatedItems
      } else {
        // Add new item
        return [...prevItems, { ...newItem }]
      }
    })
  }

  const removeItem = (itemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId))
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId)
      return
    }

    setItems((prevItems) =>
      prevItems.map((item) => (item.id === itemId ? { ...item, quantity: Math.max(1, quantity) } : item)),
    )
  }

  const clearCart = () => {
    setItems([])
    localStorage.removeItem("anthony-michael-cart")
  }

  const contextValue: CartContextType = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    itemCount,
    subtotal,
  }

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
