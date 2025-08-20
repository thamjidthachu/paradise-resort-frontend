"use client"

import { createContext, useContext, useEffect, useState } from "react"

interface CartItem {
  id: string | number
  name: string
  price: number
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (itemId: string | number) => void
  updateQuantity: (itemId: string | number, quantity: number) => void
  clearCart: () => void
  total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = 'paradise-resort-cart'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY)
      if (savedCart) {
        setItems(JSON.parse(savedCart))
      }
    } catch (error) {
      console.error('Failed to load cart:', error)
    }
    setMounted(true)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    }
  }, [items, mounted])

  const addItem = (newItem: CartItem) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === newItem.id)
      if (existingItem) {
        return currentItems.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + (newItem.quantity || 1) }
            : item
        )
      }
      return [...currentItems, { ...newItem, quantity: newItem.quantity || 1 }]
    })
  }

  const removeItem = (itemId: string | number) => {
    setItems(currentItems => currentItems.filter(item => item.id !== itemId))
  }

  const updateQuantity = (itemId: string | number, quantity: number) => {
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    total
  }

  // During SSR or initial mount, return a placeholder provider
  if (!mounted) {
    return (
      <CartContext.Provider value={{
        items: [],
        addItem: () => {},
        removeItem: () => {},
        updateQuantity: () => {},
        clearCart: () => {},
        total: 0
      }}>
        {children}
      </CartContext.Provider>
    )
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
