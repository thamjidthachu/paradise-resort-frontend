"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Calendar, Search, User, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useBooking } from '@/components/booking-provider'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from './ui/separator'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { state } = useBooking()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="text-2xl font-bold text-teal-600">Paradise Resort</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search services..."
                className="pl-10 pr-4"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <Calendar className="h-5 w-5" />
                {state.items.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {state.items.reduce((sum, item) => sum + item.quantity, 0)}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <Calendar className="h-5 w-5" />
                {state.items.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {state.items.reduce((sum, item) => sum + item.quantity, 0)}
                  </Badge>
                )}
              </Button>
            </Link>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-8 w-8" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col mt-8">
                  <div className="relative mx-2 my-4">
                    <Input
                      type="text"
                      placeholder="Search services..."
                      className="pl-10 pr-4"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  </div>
                  {navigation.map((item) => (
                    <><Link
                      key={item.name}
                      href={item.href}
                      className="text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md text-lg font-medium transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link><Separator /></>
                  ))}
                  <div className="absolute bottom-8 left-5 right-5 flex flex-col gap-2">
                    <Link href="/login">
                      <Button variant="outline" className="w-full hover:text-teal-600">Login</Button>
                    </Link>
                    <Link href="/register">
                      <Button variant="default" className="w-full hover:text-teal-600">Register</Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}

function AuthPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Account">
          <User className="h-6 w-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-40 p-2">
        <div className="flex flex-col gap-2">
          <Link href="/login">
            <Button variant="outline" className="w-full">Login</Button>
          </Link>
          <Link href="/register">
            <Button variant="default" className="w-full">Register</Button>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  )
}
<AuthPopover />
