import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">CONTACT</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ready to discuss your next project or have questions about our prints? We'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-gray-600 mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Phone</h3>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-gray-600 mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <p className="text-gray-600">hello@anthonymichael.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-gray-600 mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Studio</h3>
                      <p className="text-gray-600">
                        123 Photography Lane
                        <br />
                        Creative District
                        <br />
                        Los Angeles, CA 90210
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-4">Studio Hours</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>By Appointment</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form Placeholder */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-6">Send a Message</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <div className="h-10 bg-gray-100 rounded border"></div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <div className="h-10 bg-gray-100 rounded border"></div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <div className="h-10 bg-gray-100 rounded border"></div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <div className="h-10 bg-gray-100 rounded border"></div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <div className="h-32 bg-gray-100 rounded border"></div>
                </div>
                <div className="pt-4">
                  <div className="h-12 bg-black rounded text-white flex items-center justify-center font-medium cursor-pointer">
                    Send Message
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
