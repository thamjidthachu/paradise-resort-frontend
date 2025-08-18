"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Mail, Phone, MapPin, Clock, Waves, Palmtree } from 'lucide-react'
import { TrendingHeader } from '@/components/trending-header'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { useToast } from '@/hooks/use-toast'

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Message sent!",
        description: "Our concierge team will get back to you within 2 hours.",
      })
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <TrendingHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Paradise Resort</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Planning your perfect getaway? Our dedicated concierge team is here to help you create unforgettable memories.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Mail className="h-6 w-6 text-teal-600 mr-3" />
                  <div>
                    <h3 className="font-semibold">Email Us</h3>
                    <p className="text-gray-600">info@paradiseresort.com</p>
                    <p className="text-sm text-gray-500">Response within 2 hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Phone className="h-6 w-6 text-teal-600 mr-3" />
                  <div>
                    <h3 className="font-semibold">Call Us</h3>
                    <p className="text-gray-600">+960 123-4567</p>
                    <p className="text-sm text-gray-500">24/7 Concierge Service</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <MapPin className="h-6 w-6 text-teal-600 mr-3" />
                  <div>
                    <h3 className="font-semibold">Visit Us</h3>
                    <p className="text-gray-600">
                      Paradise Island<br />
                      North Malé Atoll<br />
                      Maldives 20026
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Clock className="h-6 w-6 text-teal-600 mr-3" />
                  <div>
                    <h3 className="font-semibold">Resort Hours</h3>
                    <p className="text-gray-600">
                      Check-in: 3:00 PM<br />
                      Check-out: 12:00 PM<br />
                      Concierge: 24/7
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-teal-50 to-blue-50">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Waves className="h-6 w-6 text-teal-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-teal-800">Getting Here</h3>
                    <p className="text-teal-700 text-sm">
                      30-minute seaplane transfer from Malé International Airport
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palmtree className="h-5 w-5 mr-2 text-teal-600" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" required />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" required />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" />
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="booking">New Booking Inquiry</SelectItem>
                        <SelectItem value="existing">Existing Booking</SelectItem>
                        <SelectItem value="services">Service Information</SelectItem>
                        <SelectItem value="special">Special Occasions</SelectItem>
                        <SelectItem value="group">Group Bookings</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="dates">Preferred Dates (Optional)</Label>
                    <Input id="dates" placeholder="e.g., March 15-20, 2024" />
                  </div>

                  <div>
                    <Label htmlFor="guests">Number of Guests (Optional)</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select number of guests" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Guest</SelectItem>
                        <SelectItem value="2">2 Guests</SelectItem>
                        <SelectItem value="3">3 Guests</SelectItem>
                        <SelectItem value="4">4 Guests</SelectItem>
                        <SelectItem value="5+">5+ Guests</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      rows={6} 
                      placeholder="Tell us about your dream vacation or any special requests..."
                      required 
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>

                  <p className="text-sm text-gray-500 text-center">
                    Our concierge team typically responds within 2 hours during business hours
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
