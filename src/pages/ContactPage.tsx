import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { SEO } from '../components/global/SEO';
import { Card3D } from '../components/global/Card3D';
import { GlassCard } from '../components/global/GlassCard';
import { ScrollReveal } from '../components/global/ScrollReveal';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { Link } from 'react-router-dom';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: '+251 911 234 567',
      link: 'tel:+251911234567',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'support@hasetdelivery.et',
      link: 'mailto:support@hasetdelivery.et',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: MapPin,
      title: 'Address',
      details: 'Bole Road, Addis Ababa, Ethiopia',
      link: 'https://maps.google.com',
      gradient: 'from-purple-500 to-pink-500',
    },
  ];

  const offices = [
    {
      city: 'Addis Ababa',
      address: 'Bole Road, Next to Friendship Center',
      hours: 'Mon-Sun: 6AM-10PM',
    },
    {
      city: 'Addis Ababa',
      address: 'Megenagna Square, Commercial Bank Building',
      hours: 'Mon-Sun: 6AM-10PM',
    },
    {
      city: 'Addis Ababa',
      address: 'Piazza, Historical District Office',
      hours: 'Mon-Sun: 6AM-9PM',
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO 
        title="Contact Us - ሀሴት Delivery"
        description="Get in touch with ሀሴት Delivery in Addis Ababa. We're here to help with any questions about our delivery services across Ethiopia."
      />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-background via-primary/5 to-background">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto">
              <motion.div
                className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <MessageSquare className="h-4 w-4 text-primary" />
                <span className="text-sm text-primary">We're Here to Help</span>
              </motion.div>
              
              <h1 className="text-5xl lg:text-6xl mb-6 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                Get In Touch
              </h1>
              
              <p className="text-xl text-muted-foreground">
                Have a question or need assistance with delivery services in Ethiopia? Our team is ready to help you
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-background -mt-10 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <Card3D>
                  <motion.a
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                    whileHover={{ y: -5 }}
                  >
                    <GlassCard className="p-6 text-center h-full">
                      <motion.div
                        className={`bg-gradient-to-br ${info.gradient} w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <info.icon className="h-7 w-7 text-white" />
                      </motion.div>
                      <h3 className="text-lg text-foreground mb-2">
                        {info.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {info.details}
                      </p>
                    </GlassCard>
                  </motion.a>
                </Card3D>
              </ScrollReveal>
            ))}
          </div>

          {/* Contact Form & Map Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <ScrollReveal>
              <div className="bg-card border border-border rounded-2xl p-8">
                <h2 className="text-3xl text-foreground mb-6">
                  Send Us a Message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Kaleb Demeke"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="kaleb@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+251 911 234 567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="Delivery service inquiry"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your delivery needs in Ethiopia..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={5}
                      className="mt-2"
                    />
                  </div>

                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <Button type="submit" className="w-full bg-gradient-to-r from-primary to-orange-600" size="lg">
                      Send Message
                      <Send className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                </form>
              </div>
            </ScrollReveal>

            {/* Office Locations */}
            <div className="space-y-6">
              <ScrollReveal>
                <h2 className="text-3xl text-foreground mb-6">
                  Our Offices in Addis Ababa
                </h2>
              </ScrollReveal>

              {offices.map((office, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <Card3D>
                    <GlassCard className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-gradient-to-br from-primary to-orange-600 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                          <MapPin className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl text-foreground mb-2">
                            {office.city} Office
                          </h3>
                          <p className="text-muted-foreground text-sm mb-2">
                            {office.address}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-primary">
                            <Clock className="h-4 w-4" />
                            <span>{office.hours}</span>
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  </Card3D>
                </ScrollReveal>
              ))}

              <ScrollReveal delay={0.3}>
                <Card3D>
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-orange-600 p-8 text-center">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]" />
                    
                    <div className="relative z-10">
                      <Clock className="h-12 w-12 text-white mx-auto mb-4" />
                      <h3 className="text-2xl text-white mb-2">
                        24/7 Support
                      </h3>
                      <p className="text-white/80">
                        Our customer support team is available around the clock to assist you across Ethiopia
                      </p>
                    </div>
                  </div>
                </Card3D>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Link Section */}
      <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-4xl lg:text-5xl text-foreground mb-6">
              Looking for Quick Answers?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Check out our FAQ section for instant solutions to common questions about delivery in Ethiopia
            </p>
            <Link to="/faq">
              <Button size="lg" variant="outline" className="group">
                Visit FAQ
                <MessageSquare className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}