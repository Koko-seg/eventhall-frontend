"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, CreditCard, Smartphone, QrCode, Check, Calendar, MapPin, Users } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import ProtectedRoute from "@/components/protected-route"
import QRCodeGenerator from "@/components/qr-code-generator"

export default function PaymentPage() {
  const [bookingData, setBookingData] = useState<any>(null)
  const [paymentMethod, setPaymentMethod] = useState("qr")
  const [paymentProcessing, setPaymentProcessing] = useState(false)
  const [paymentCompleted, setPaymentCompleted] = useState(false)
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  })
  const router = useRouter()

  useEffect(() => {
    const savedBooking = localStorage.getItem("pendingBooking")
    if (savedBooking) {
      setBookingData(JSON.parse(savedBooking))
    } else {
      router.push("/booking")
    }
  }, [router])

  if (!bookingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-emerald-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-400"></div>
      </div>
    )
  }

  const handlePayment = async () => {
    setPaymentProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Generate booking confirmation
    const bookingId = `EVH-${Date.now().toString().slice(-6)}`
    const confirmedBooking = {
      ...bookingData,
      bookingId,
      paymentMethod,
      paymentStatus: "completed",
      createdAt: new Date().toISOString(),
    }

    // Save to localStorage (in real app, this would be saved to database)
    const existingBookings = JSON.parse(localStorage.getItem("userBookings") || "[]")
    existingBookings.push(confirmedBooking)
    localStorage.setItem("userBookings", JSON.stringify(existingBookings))

    // Clear pending booking
    localStorage.removeItem("pendingBooking")

    setPaymentCompleted(true)
    setPaymentProcessing(false)
  }

  const generatePaymentQR = () => {
    const paymentData = {
      amount: bookingData.totalAmount,
      venue: bookingData.venue.name,
      date: new Date(bookingData.selectedDate).toLocaleDateString(),
      time: bookingData.selectedTime,
      paymentId: `PAY-${Date.now()}`,
      merchantId: "EVENTHALLS-001",
    }
    return JSON.stringify(paymentData)
  }

  if (paymentCompleted) {
    const bookingId = `EVH-${Date.now().toString().slice(-6)}`
    const confirmationData = {
      bookingId,
      venue: bookingData.venue.name,
      date: new Date(bookingData.selectedDate).toLocaleDateString(),
      time: bookingData.selectedTime,
      event: bookingData.bookingDetails.eventName,
      contact: bookingData.user.email,
      amount: bookingData.totalAmount,
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-emerald-50 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-8 animate-fade-in-up">
            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-in">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
            <p className="text-xl text-gray-600">Your event reservation has been confirmed</p>
          </div>

          <Card className="p-8 mb-8 animate-slide-up">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Booking Confirmation</h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-semibold text-gray-600">Booking ID</Label>
                    <p className="text-lg font-mono text-amber-600">{bookingId}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-gray-600">Venue</Label>
                    <p className="text-lg">{bookingData.venue.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-gray-600">Date & Time</Label>
                    <p className="text-lg">
                      {new Date(bookingData.selectedDate).toLocaleDateString()} - {bookingData.selectedTime}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-gray-600">Event</Label>
                    <p className="text-lg">{bookingData.bookingDetails.eventName}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-gray-600">Amount Paid</Label>
                    <p className="text-lg font-bold text-emerald-600">${bookingData.totalAmount}</p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Check-in QR Code</h3>
                <div className="animate-fade-in">
                  <QRCodeGenerator data={JSON.stringify(confirmationData)} />
                </div>
                <p className="text-sm text-gray-600 mt-4">Present this QR code at the venue for quick check-in</p>
              </div>
            </div>
          </Card>

          <div className="text-center space-x-4">
            <Link href="/">
              <Button className="bg-black text-white hover:bg-gray-800 transform hover:scale-105 transition-all duration-300">
                Return Home
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={() => window.print()}
              className="transform hover:scale-105 transition-all duration-300"
            >
              Print Confirmation
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <ProtectedRoute requiredRole="user">
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-emerald-50">
        {/* Navigation */}
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link href="/booking" className="flex items-center text-gray-900 hover:text-amber-600 transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Booking
              </Link>
              <div className="text-2xl font-bold text-amber-600">EventHalls</div>
            </div>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Booking Summary */}
            <div className="lg:col-span-2">
              <Card className="sticky top-24">
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking Summary</h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-semibold">{bookingData.venue.name}</p>
                        <p className="text-sm text-gray-600">{bookingData.venue.location}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-semibold">{new Date(bookingData.selectedDate).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-600">{bookingData.selectedTime}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-semibold">{bookingData.bookingDetails.eventName}</p>
                        <p className="text-sm text-gray-600">{bookingData.bookingDetails.eventType}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">Venue Fee</span>
                      <span className="font-semibold">${bookingData.totalAmount}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">Service Fee</span>
                      <span className="font-semibold">$0</span>
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold">Total</span>
                        <span className="text-2xl font-bold text-emerald-600">${bookingData.totalAmount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Payment Form */}
            <div className="lg:col-span-3">
              <Card className="p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Complete Payment</h1>

                {/* Payment Method Selection */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Payment Method</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button
                      type="button"
                      variant={paymentMethod === "qr" ? "default" : "outline"}
                      className={`p-6 h-auto flex flex-col items-center space-y-2 transition-all duration-300 ${
                        paymentMethod === "qr"
                          ? "bg-amber-400 text-black hover:bg-amber-500 transform scale-105"
                          : "hover:scale-105"
                      }`}
                      onClick={() => setPaymentMethod("qr")}
                    >
                      <QrCode className="w-8 h-8" />
                      <div className="text-center">
                        <div className="font-semibold">QR Code Payment</div>
                        <div className="text-sm opacity-75">Scan to pay with mobile wallet</div>
                      </div>
                    </Button>

                    <Button
                      type="button"
                      variant={paymentMethod === "card" ? "default" : "outline"}
                      className={`p-6 h-auto flex flex-col items-center space-y-2 transition-all duration-300 ${
                        paymentMethod === "card"
                          ? "bg-amber-400 text-black hover:bg-amber-500 transform scale-105"
                          : "hover:scale-105"
                      }`}
                      onClick={() => setPaymentMethod("card")}
                    >
                      <CreditCard className="w-8 h-8" />
                      <div className="text-center">
                        <div className="font-semibold">Credit Card</div>
                        <div className="text-sm opacity-75">Pay with credit or debit card</div>
                      </div>
                    </Button>
                  </div>
                </div>

                {/* QR Code Payment */}
                {paymentMethod === "qr" && (
                  <div className="text-center space-y-6">
                    <div className="bg-white p-8 rounded-lg border-2 border-dashed border-gray-300 inline-block">
                      <QRCodeGenerator data={generatePaymentQR()} />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Scan QR Code to Pay</h4>
                      <p className="text-gray-600 mb-4">
                        Use your mobile banking app or digital wallet to scan this QR code and complete the payment of $
                        {bookingData.totalAmount}
                      </p>
                      <div className="flex items-center justify-center space-x-4">
                        <Smartphone className="w-6 h-6 text-gray-400" />
                        <span className="text-sm text-gray-500">Compatible with most mobile payment apps</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Credit Card Payment */}
                {paymentMethod === "card" && (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="cardholderName">Cardholder Name</Label>
                      <Input
                        id="cardholderName"
                        value={paymentDetails.cardholderName}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, cardholderName: e.target.value })}
                        placeholder="John Doe"
                        className="transition-all duration-300 focus:ring-2 focus:ring-amber-400"
                      />
                    </div>

                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        value={paymentDetails.cardNumber}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
                        placeholder="1234 5678 9012 3456"
                        className="transition-all duration-300 focus:ring-2 focus:ring-amber-400"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          value={paymentDetails.expiryDate}
                          onChange={(e) => setPaymentDetails({ ...paymentDetails, expiryDate: e.target.value })}
                          placeholder="MM/YY"
                          className="transition-all duration-300 focus:ring-2 focus:ring-amber-400"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          value={paymentDetails.cvv}
                          onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
                          placeholder="123"
                          className="transition-all duration-300 focus:ring-2 focus:ring-amber-400"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Payment Button */}
                <div className="pt-8 border-t mt-8">
                  <Button
                    onClick={handlePayment}
                    disabled={paymentProcessing}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {paymentProcessing ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Processing Payment...</span>
                      </div>
                    ) : (
                      `Complete Payment - $${bookingData.totalAmount}`
                    )}
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
