"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Star, Calendar, Clock, Users, MapPin, Shield, RotateCcw } from 'lucide-react'
import { TrendingHeader } from '@/components/trending-header'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { getServiceById } from '@/lib/services'
import { useBooking } from '@/components/booking-provider'
import { useToast } from '@/hooks/use-toast'

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const service = getServiceById(params.id)
  const { dispatch } = useBooking()
  const { toast } = useToast()

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50">
        <TrendingHeader />
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Service not found</h1>
        </div>
        <Footer />
      </div>
    )
  }

  const bookService = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Please select date and time",
        description: "Date and time selection is required for booking.",
        variant: "destructive"
      })
      return
    }

    for (let i = 0; i < quantity; i++) {
      dispatch({ 
        type: 'ADD_SERVICE', 
        payload: { 
          ...service, 
          selectedDate, 
          selectedTime 
        } 
      })
    }
    toast({
      title: "Service booked!",
      description: `${quantity} ${service.name} booking(s) added to your cart.`,
    })
  }

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
    '05:00 PM', '06:00 PM'
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <TrendingHeader />
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Service Image */}
          <div className="space-y-4">
            <div className="relative">
              <Image
                src={service.image || "/placeholder.svg"}
                alt={service.name}
                width={600}
                height={600}
                className="w-full h-96 lg:h-[500px] object-cover rounded-lg"
              />
              <Badge className="absolute top-4 left-4 bg-teal-500 text-white">
                {service.category}
              </Badge>
            </div>
          </div>

          {/* Service Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {service.name}
              </h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(service.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 ml-2">
                  {service.rating} ({service.reviews} reviews)
                </span>
              </div>

              <div className="flex items-center space-x-6 mb-6 text-gray-600">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  {service.duration}
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Up to 4 guests
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Resort premises
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-teal-600">
                  ${service.price}
                </span>
                <span className="text-lg text-gray-500">
                  per {service.duration}
                </span>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>

            {service.features && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Features</h3>
                <ul className="space-y-2">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-teal-600 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {service.includes && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Includes</h3>
                <ul className="space-y-2">
                  {service.includes.map((item, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Separator />

            {/* Booking Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Book This Service</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Select Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Select Time</Label>
                  <select
                    id="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Choose time</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium">Guests:</label>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="px-4 py-2 text-center min-w-[60px]">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.min(4, quantity + 1))}
                  >
                    +
                  </Button>
                </div>
              </div>

              <Button
                onClick={bookService}
                disabled={!service.available}
                className="w-full"
                size="lg"
              >
                <Calendar className="h-5 w-5 mr-2" />
                {service.available ? `Book Now - $${service.price * quantity}` : 'Currently Unavailable'}
              </Button>
            </div>

            <Separator />

            {/* Service Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="text-sm text-gray-600">100% satisfaction guarantee</span>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-gray-600">Free cancellation up to 24 hours before</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-purple-600" />
                <span className="text-sm text-gray-600">Instant booking confirmation</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
