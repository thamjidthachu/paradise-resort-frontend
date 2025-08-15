"use client"

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const trendingMessages = [
  "🌺 Summer Special: 30% off all spa treatments!",
  "🏖️ Book 3 nights, get 1 night free - Limited time offer",
  "🍽️ New beachfront restaurant now open with sunset dining",
  "🏄‍♂️ Adventure package: Water sports + Island tour included"
]

export function TrendingHeader() {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % trendingMessages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  if (!isVisible) return null

  return (
    <div className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-2 px-4 text-center relative">
      <div className="flex items-center justify-center">
        <p className="text-sm font-medium animate-pulse">
          {trendingMessages[currentMessage]}
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 hover:bg-white/20 rounded-full p-1"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
