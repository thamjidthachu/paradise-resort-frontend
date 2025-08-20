"use client"

import { useCart } from "@/components/cart-provider"
import { useState, useEffect } from "react"

export default function ProductsList() {
  const { addItem } = useCart()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Show loading state during SSR
  if (!isClient) {
    return <div>Loading...</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* ...existing products grid and UI... */}
    </div>
  )
}