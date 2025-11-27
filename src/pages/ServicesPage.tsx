import { Package, Truck, MapPin, Clock, Shield, Zap } from 'lucide-react';
import { SEO } from '../components/global/SEO';
import { Card3D } from '../components/global/Card3D';
import { GlassCard } from '../components/global/GlassCard';
import { ScrollReveal } from '../components/global/ScrollReveal';
import { ParallaxSection } from '../components/global/ParallaxSection';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

export function ServicesPage() {
  const services = [
    {
      icon: Zap,
      title: 'የፈጣን መላኪያ አገልግሎት',
      description: 'በአዲስ አበባ ውስጥ በተመሳሳይ ቀን ፈጣን የመላኪያ አገልግሎት',
      features: ['በተመሳሳይ ቀን የመላኪያ አገልግሎት', 'ቅድሚያ የሚሰጥ አያያዝ', 'የእውነተኛ ጊዜ መከታተያ', 'በ2 ሰዓት ውስጥ'],
      image: 'https://images.unsplash.com/photo-1758384077159-29cad24750d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpdmVyeSUyMGRyaXZlciUyMG1vZGVybnxlbnwxfHx8fDE3NjE3NTY5NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      gradient: 'from-orange-500 to-red-500',
      price: 'ከ 300 ብር',
    },
    {
      icon: Truck,
      title: 'መደበኛ የመላኪያ አገልግሎት',
      description: 'በተመጣጣኝ ዋጋ አስተማማኝ የመላኪያ አገልግሎት',
      features: ['በቀጣይ ቀን የመላኪያ አገልግሎት', 'መርሐግብር የተያዘ ማንሳት', 'የጥቅሉ ኢንሹራንስ', 'የፊርማ ማረጋገጫ'],
      image: 'https://images.unsplash.com/photo-1603902578860-6007596b5b12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpdmVyeSUyMHRydWNrJTIwRXRoaW9waWF8ZW58MXx8fHwxNzY0MTQwNTM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      gradient: 'from-blue-500 to-cyan-500',
      price: 'ከ 150 ብር',
    },
    {
      icon: MapPin,
      title: 'ሀገር ውስጥ የመላኪያ አገልግሎት',
      description: 'በመላው ኢትዮጵያ ከአዲስ አበባ እስከ ማንኛውም ክፍል',
      features: ['ከከተማ ወደ ከተማ', 'ሁሉንም የኢትዮጵያ ከተሞች', 'ከበር ወደ በር አገልግሎት', 'በሁሉም የኢትዮጵያ ክልሎች'],
      image: 'https://images.unsplash.com/photo-1652622945532-53bd67bcfd33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZGRpcyUyMEFiYWJhJTIwY2l0eXxlbnwxfHx8fDE3NjQxNDA1Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      gradient: 'from-green-500 to-emerald-500',
      price: 'ከ 200 ብር',
    },
    {
      icon: Package,
      title: 'የጅምላ መላኪያ አገልግሎት',
      description: 'ትላልቅ መላኪያዎች እና የጅምላ መላኪያዎች',
      features: ['የፓሌት መላኪያ', 'የመጋዘን ማከማቻ', 'የመጠን ቅናሾች', 'የንግድ ሽርክና'],
      image: 'https://images.unsplash.com/photo-1644079446600-219068676743?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJlaG91c2UlMjBsb2dpc3RpY3N8ZW58MXx8fHwxNzYxNzI4MDMzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      gradient: 'from-purple-500 to-pink-500',
      price: 'እንገናኝ',
    },
  ];

  const features = [
    {
      icon: Clock,
      title: 'Time-Sensitive Delivery',
      description: 'Guaranteed delivery windows with real-time updates',
    },
    {
      icon: MapPin,
      title: 'Smart Routing',
      description: 'AI-powered route optimization for faster deliveries',
    },
    {
      icon: Shield,
      title: 'Full Insurance',
      description: 'Comprehensive coverage for all your shipments',
    },
    {
      icon: Package,
      title: 'Special Handling',
      description: 'Expert care for fragile and valuable items',
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO 
        title="Our Services - ሀሴት Delivery"
        description="Explore our comprehensive delivery services including express, standard, international shipping, and freight services. Fast, reliable, and secure."
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
                <Package className="h-4 w-4 text-primary" />
                <span className="text-sm text-primary">Complete Delivery Solutions</span>
              </motion.div>
              
              <h1 className="text-5xl lg:text-6xl mb-6 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                Delivery Services for Every Need
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                From express local deliveries to international freight, we provide 
                comprehensive logistics solutions tailored to your requirements.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <Card3D>
                  <motion.div
                    className="relative overflow-hidden rounded-2xl bg-card border border-border group h-full"
                    whileHover={{ y: -5 }}
                  >
                    {/* Image Section */}
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-60`} />
                      
                      {/* Icon */}
                      <motion.div 
                        className="absolute top-6 left-6 bg-white/20 backdrop-blur-md w-14 h-14 rounded-xl flex items-center justify-center"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <service.icon className="h-7 w-7 text-white" />
                      </motion.div>

                      {/* Price Badge */}
                      <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
                        <span className="text-white text-sm">{service.price}</span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      <h3 className="text-2xl text-foreground mb-3">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        {service.description}
                      </p>

                      {/* Features List */}
                      <div className="space-y-3 mb-6">
                        {service.features.map((feature, idx) => (
                          <motion.div
                            key={idx}
                            className="flex items-center gap-2 group/item"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient} group-hover/item:scale-150 transition-transform`} />
                            <span className="text-sm text-foreground/80 group-hover/item:text-foreground transition-colors">{feature}</span>
                          </motion.div>
                        ))}
                      </div>

                      <Link to="/pricing">
                        <Button className={`w-full bg-gradient-to-r ${service.gradient} hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all`}>
                          Get Quote
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                </Card3D>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl text-foreground mb-4">
                Why Choose Our Services
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Industry-leading features that set us apart
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <ParallaxSection offset={20}>
                  <GlassCard className="p-6 h-full">
                    <motion.div
                      className="bg-gradient-to-br from-primary to-orange-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <feature.icon className="h-6 w-6 text-white" />
                    </motion.div>
                    <h3 className="text-lg text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </GlassCard>
                </ParallaxSection>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-orange-600 p-12 text-center">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]" />
              
              <div className="relative z-10">
                <h2 className="text-4xl text-white mb-4">
                  Ready to Ship?
                </h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Get an instant quote and start shipping with confidence today
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/pricing">
                    <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                      Calculate Shipping Cost
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}