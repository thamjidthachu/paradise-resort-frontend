"use client"

import { createContext, useContext, useReducer, ReactNode } from 'react'

interface Service {
  id: string
  name: string
  price: number
  image: string
  category: string
  duration: string
  description: string
}

interface BookingItem extends Service {
  quantity: number
  selectedDate?: string
  selectedTime?: string
}

interface BookingState {
  items: BookingItem[]
  total: number
}

type BookingAction = 
  | { type: 'ADD_SERVICE'; payload: Service & { selectedDate?: string; selectedTime?: string } }
  | { type: 'REMOVE_SERVICE'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }

const BookingContext = createContext<{
  state: BookingState
  dispatch: React.Dispatch<BookingAction>
} | null>(null)

function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case 'ADD_SERVICE': {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        return {
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
        }
      } else {
        const newItems = [...state.items, { ...action.payload, quantity: 1 }]
        return {
          items: newItems,
          total: newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
        }
      }
    }
    case 'REMOVE_SERVICE': {
      const newItems = state.items.filter(item => item.id !== action.payload)
      return {
        items: newItems,
        total: newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      }
    }
    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0)
      return {
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      }
    }
    case 'CLEAR_CART':
      return { items: [], total: 0 }
    default:
      return state
  }
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(bookingReducer, { items: [], total: 0 })

  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider')
  }
  return context
}
