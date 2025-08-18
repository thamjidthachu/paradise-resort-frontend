"use client"
import { authFetch } from "@/utils/authFetch"
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Star, Calendar, Clock } from 'lucide-react'
import { TrendingHeader } from '@/components/trending-header'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { useBooking } from '@/components/booking-provider'
import { useToast } from '@/hooks/use-toast'

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([])
  const [sortBy, setSortBy] = useState('name')
  const [filterBy, setFilterBy] = useState('all')
  const { dispatch } = useBooking()
  const { toast } = useToast()

  useEffect(() => {
    authFetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/services/list/`)
      .then(res => res.json())
      .then(data => setServices(data))
  }, [])

  // If your API does not provide category, this will just be ['all']
  const categories = ['all', ...Array.from(new Set(services.map(s => s.category).filter(Boolean)))]

  const filteredServices = services
    .filter(service => filterBy === 'all' || service.category === filterBy)
    .sort((a, b) => {
      switch (sortBy) {
        // Static price/rating for now, update when API provides
        case 'price-low':
          return (a.price ?? 0) - (b.price ?? 0)
        case 'price-high':
          return (b.price ?? 0) - (a.price ?? 0)
        case 'rating':
          return (b.rating ?? 0) - (a.rating ?? 0)
        default:
          return a.name.localeCompare(b.name)
      }
    })

  const bookService = (service: any) => {
    dispatch({ type: 'ADD_SERVICE', payload: service })
    toast({
      title: "Service added to cart",
      description: `${service.name} has been added to your bookings.`,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TrendingHeader />
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Resort Services</h1>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <Card key={service.slug} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="relative mb-4">
                  <Image
                    src={service.files?.[0]?.images || "/placeholder.svg"}
                    alt={service.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  {service.category && (
                    <Badge className="absolute top-2 left-2 bg-teal-500">
                      {service.category}
                    </Badge>
                  )}
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-teal-600 transition-colors">
                  {service.name}
                </h3>
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(service.rating ?? 0)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">({service.review_count ?? 20})</span>
                </div>
                <div className="flex items-center mb-3 text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  {service.time ?? 0} hours
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {service.synopsis}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-teal-600">
                      ${service.price ?? 0}
                    </span>
                    <span className="text-sm text-gray-500">
                      / {service.unit ?? 'per unit'}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href={`/services/${service.slug}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </Link>
                  <Button
                    onClick={() => bookService(service)}
                    className="flex-1"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
