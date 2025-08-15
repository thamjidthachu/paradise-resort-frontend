import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { BookingProvider } from '@/components/booking-provider'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Paradise Resort - Luxury Tropical Getaway',
  description: 'Experience luxury at Paradise Resort with world-class spa treatments, fine dining, and exclusive activities in a tropical paradise.',
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BookingProvider>
          {children}
          <Toaster />
        </BookingProvider>
      </body>
    </html>
  )
}
