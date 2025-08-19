import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { BookingProvider } from '@/components/booking-provider'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'The Serene Escape - A peaceful place to escape stress.',
  description: 'Discover harmony and elegance at The Serene Escape. From peaceful retreats surrounded by nature to indulgent luxury experiences, every moment is designed to refresh your soul.',
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <BookingProvider>
            <main className="min-h-screen bg-background font-sans antialiased">
              {children}
            </main>
            <Toaster />
          </BookingProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
