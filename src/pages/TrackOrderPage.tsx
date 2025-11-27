import { useState } from 'react';
import { Search, Package, Truck, MapPin, CheckCircle, Clock, CreditCard, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { SEO } from '../components/global/SEO';
import { Card3D } from '../components/global/Card3D';
import { GlassCard } from '../components/global/GlassCard';
import { ScrollReveal } from '../components/global/ScrollReveal';
import { PaymentModal } from '../components/global/PaymentModal';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';

// Types for better type safety
interface TimelineEvent {
  status: string;
  location: string;
  time: string;
  completed: boolean;
  current?: boolean;
}

interface TrackingData {
  id: string;
  status: 'Order Placed' | 'Processing' | 'In Transit' | 'Out for Delivery' | 'Delivered' | 'Exception';
  currentLocation: string;
  estimatedDelivery: string;
  timeline: TimelineEvent[];
  packageDetails: {
    weight: string;
    dimensions: string;
    service: string;
  };
  deliveryInfo: {
    driver: string;
    vehicle: string;
    contact: string;
  };
  paymentRequired?: boolean;
  amount?: number;
}

export function TrackOrderPage() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  const validateTrackingNumber = (number: string): boolean => {
    // Basic validation - adjust based on your tracking number format
    return number.length >= 8 && number.length <= 20;
  };

  const handleTrack = async () => {
    if (!trackingNumber.trim()) {
      setError('Please enter a tracking number');
      return;
    }

    if (!validateTrackingNumber(trackingNumber)) {
      setError('Please enter a valid tracking number');
      return;
    }

    setIsLoading(true);
    setError(null);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock data - replace with actual API call
      const mockData: TrackingData = {
        id: trackingNumber.toUpperCase(),
        status: 'In Transit',
        currentLocation: 'Distribution Center - New York, NY',
        estimatedDelivery: 'Tomorrow, 2:30 PM',
        timeline: [
          { 
            status: 'Order Placed', 
            location: 'San Francisco, CA', 
            time: 'Yesterday, 10:30 AM', 
            completed: true 
          },
          { 
            status: 'Processing', 
            location: 'San Francisco Warehouse', 
            time: 'Yesterday, 11:45 AM', 
            completed: true 
          },
          { 
            status: 'In Transit', 
            location: 'Distribution Center - New York', 
            time: 'Today, 3:20 PM', 
            completed: true, 
            current: true 
          },
          { 
            status: 'Out for Delivery', 
            location: 'Local Delivery Hub', 
            time: 'Tomorrow, 8:00 AM', 
            completed: false 
          },
          { 
            status: 'Delivered', 
            location: 'Your Address', 
            time: 'Tomorrow, 2:30 PM', 
            completed: false 
          },
        ],
        packageDetails: {
          weight: '2.5 kg',
          dimensions: '30 × 20 × 15 cm',
          service: 'Express Delivery'
        },
        deliveryInfo: {
          driver: 'John Smith',
          vehicle: 'VAN-2847',
          contact: '+1 (555) 123-4567'
        },
        paymentRequired: true,
        amount: 2500
      };

      setTrackingData(mockData);
    } catch (err) {
      setError('Unable to retrieve tracking information. Please try again.');
      toast.error('Tracking information unavailable');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (item: TimelineEvent) => {
    if (item.completed) return CheckCircle;
    if (item.current) return Truck;
    return Clock;
  };

  const getStatusColor = (item: TimelineEvent) => {
    if (item.completed) return 'from-green-500 to-emerald-500';
    if (item.current) return 'from-primary to-orange-600';
    return 'from-gray-400 to-gray-500';
  };

  const getStatusBadgeColor = (status: TrackingData['status']) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'In Transit': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Out for Delivery': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Exception': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Track Your Order - ሀሴት Delivery"
        description="Track your package in real-time with ሀሴት Delivery. Get live updates and estimated delivery times."
        keywords="track package, delivery tracking, shipment status, ሀሴት delivery"
      />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-background via-primary/5 to-background">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center">
              <motion.div
                className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Real-Time Package Tracking</span>
              </motion.div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Track Your Shipment
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Enter your tracking number below to get real-time updates on your package location and estimated delivery time.
              </p>

              {/* Tracking Input */}
              <Card3D>
                <GlassCard className="p-6">
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="flex-1">
                        <Input
                          type="text"
                          placeholder="Enter tracking number (e.g., KRU123456789)"
                          value={trackingNumber}
                          onChange={(e) => {
                            setTrackingNumber(e.target.value);
                            setError(null);
                          }}
                          onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
                          className="h-12 text-base bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/30 focus:border-primary transition-colors duration-200"
                          disabled={isLoading}
                        />
                      </div>
                      <motion.div 
                        whileHover={{ scale: 1.01 }} 
                        whileTap={{ scale: 0.99 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Button
                          onClick={handleTrack}
                          disabled={!trackingNumber.trim() || isLoading}
                          size="lg"
                          className="h-12 px-8 bg-gradient-to-r from-primary to-orange-600 hover:from-primary/90 hover:to-orange-500 transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                          {isLoading ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            >
                              <Package className="h-5 w-5" />
                            </motion.div>
                          ) : (
                            <>
                              <Search className="h-5 w-5 mr-2" />
                              Track Package
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </div>
                    
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3"
                      >
                        <AlertCircle className="h-4 w-4" />
                        {error}
                      </motion.div>
                    )}
                    
                    <p className="text-xs text-muted-foreground text-center">
                      Need help finding your tracking number? Check your email confirmation or contact support.
                    </p>
                  </div>
                </GlassCard>
              </Card3D>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Tracking Results */}
      {trackingData && (
        <section className="py-16 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Summary Card */}
            <ScrollReveal>
              <Card3D className="mb-8">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-orange-600 p-6">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]" />
                  
                  <div className="relative z-10">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="space-y-2">
                        <div className="text-white/80 text-sm font-medium">Tracking Number</div>
                        <div className="text-white text-xl font-mono font-semibold">
                          {trackingData.id}
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="space-y-2">
                          <div className="text-white/80 text-sm font-medium">Current Status</div>
                          <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadgeColor(trackingData.status)}`}>
                              {trackingData.status}
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-white/80 text-sm font-medium">Estimated Delivery</div>
                          <div className="text-white text-lg font-semibold">
                            {trackingData.estimatedDelivery}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-white/20">
                      <div className="text-white/80 text-sm font-medium">Current Location</div>
                      <div className="text-white font-medium flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {trackingData.currentLocation}
                      </div>
                    </div>
                  </div>
                </div>
              </Card3D>
            </ScrollReveal>

            {/* Timeline */}
            <ScrollReveal>
              <Card3D className="mb-8">
                <GlassCard className="p-6 bg-background/50 backdrop-blur-sm">
                  <h2 className="text-2xl font-semibold text-foreground mb-6">
                    Shipment Progress
                  </h2>

                  <div className="space-y-6">
                    {trackingData.timeline.map((item, index) => {
                      const StatusIcon = getStatusIcon(item);
                      const statusColor = getStatusColor(item);
                      
                      return (
                        <motion.div
                          key={index}
                          className="relative flex gap-4"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          {/* Timeline Line */}
                          {index < trackingData.timeline.length - 1 && (
                            <div 
                              className={`absolute left-6 top-12 w-0.5 h-full ${
                                item.completed ? 'bg-green-500' : 'bg-border/50'
                              }`}
                            />
                          )}

                          {/* Icon */}
                          <motion.div
                            className={`relative z-10 bg-gradient-to-br ${statusColor} w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-md`}
                            animate={item.current ? { 
                              scale: [1, 1.05, 1],
                            } : {}}
                            transition={{
                              duration: 2,
                              repeat: item.current ? Infinity : 0,
                            }}
                            whileHover={{ scale: 1.05 }}
                          >
                            <StatusIcon className="h-5 w-5 text-white" />
                          </motion.div>

                          {/* Content */}
                          <div className="flex-1 pb-6">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-2">
                              <h3 className={`text-base font-medium ${
                                item.completed || item.current ? 'text-foreground' : 'text-muted-foreground'
                              }`}>
                                {item.status}
                              </h3>
                              <span className="text-sm text-muted-foreground font-medium">
                                {item.time}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              <span>{item.location}</span>
                            </div>
                            {item.current && (
                              <motion.div
                                className="mt-2 bg-primary/10 border border-primary/20 rounded-lg px-3 py-1 text-sm text-primary font-medium inline-block"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                              >
                                Current Location
                              </motion.div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </GlassCard>
              </Card3D>
            </ScrollReveal>

            {/* Additional Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <ScrollReveal delay={0.2}>
                <GlassCard className="p-6 h-full bg-background/50 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                      <Package className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Package Details</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between py-2 border-b border-border/50">
                          <span className="text-muted-foreground">Weight:</span>
                          <span className="font-medium">{trackingData.packageDetails.weight}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-border/50">
                          <span className="text-muted-foreground">Dimensions:</span>
                          <span className="font-medium">{trackingData.packageDetails.dimensions}</span>
                        </div>
                        <div className="flex justify-between py-2">
                          <span className="text-muted-foreground">Service:</span>
                          <span className="font-medium text-primary">{trackingData.packageDetails.service}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <GlassCard className="p-6 h-full bg-background/50 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                      <Truck className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Delivery Information</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between py-2 border-b border-border/50">
                          <span className="text-muted-foreground">Driver:</span>
                          <span className="font-medium">{trackingData.deliveryInfo.driver}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-border/50">
                          <span className="text-muted-foreground">Vehicle:</span>
                          <span className="font-medium">{trackingData.deliveryInfo.vehicle}</span>
                        </div>
                        <div className="flex justify-between py-2">
                          <span className="text-muted-foreground">Contact:</span>
                          <span className="font-medium">{trackingData.deliveryInfo.contact}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </ScrollReveal>
            </div>

            {/* Payment Section */}
            {trackingData.paymentRequired && (
              <ScrollReveal delay={0.4}>
                <Card3D>
                  <GlassCard className="p-6 bg-gradient-to-br from-primary/10 to-orange-600/10 border-primary/20">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-gradient-to-br from-primary to-orange-600 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                          <CreditCard className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-2">
                            Payment Required
                          </h3>
                          <p className="text-muted-foreground text-sm mb-2">
                            Complete your payment to confirm delivery schedule
                          </p>
                          <p className="text-xl font-bold text-primary">
                            ETB {trackingData.amount?.toLocaleString()}.00
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          onClick={() => {
                            toast.info('Payment reminder sent to your email');
                          }}
                        >
                          Remind Me Later
                        </Button>
                        <motion.div 
                          whileHover={{ scale: 1.02 }} 
                          whileTap={{ scale: 0.98 }}
                          transition={{ duration: 0.15 }}
                        >
                          <Button
                            onClick={() => setPaymentModalOpen(true)}
                            size="lg"
                            className="bg-gradient-to-r from-primary to-orange-600 hover:from-primary/90 hover:to-orange-500 shadow-md hover:shadow-lg transition-all duration-200"
                          >
                            <CreditCard className="mr-2 h-4 w-4" />
                            Pay Now
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </GlassCard>
                </Card3D>
              </ScrollReveal>
            )}
          </div>
        </section>
      )}

      {/* Features Section - Show when no tracking data */}
      {!trackingData && (
        <section className="py-16 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  Advanced Tracking Features
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Comprehensive tracking solutions for complete visibility of your shipments
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: MapPin,
                  title: 'Real-Time GPS Tracking',
                  description: 'Live location updates with precise GPS coordinates and route optimization',
                  gradient: 'from-green-500 to-emerald-500',
                },
                {
                  icon: Clock,
                  title: 'Automated Notifications',
                  description: 'Instant alerts for status changes, delays, and delivery milestones',
                  gradient: 'from-blue-500 to-cyan-500',
                },
                {
                  icon: Package,
                  title: 'Digital Proof of Delivery',
                  description: 'Secure electronic signatures and photo confirmation upon delivery',
                  gradient: 'from-purple-500 to-pink-500',
                },
              ].map((feature, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <Card3D>
                    <GlassCard className="p-6 h-full bg-background/50 backdrop-blur-sm transition-all duration-200 hover:shadow-md">
                      <motion.div
                        className={`bg-gradient-to-br ${feature.gradient} w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-md`}
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.2 }}
                      >
                        <feature.icon className="h-6 w-6 text-white" />
                      </motion.div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </GlassCard>
                  </Card3D>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Payment Modal */}
      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        orderDetails={{
          orderId: trackingData?.id || 'KRU123456789',
          amount: trackingData?.amount || 2500,
          items: ['Express Delivery Service', 'Package Insurance', 'Priority Handling']
        }}
        onSuccess={() => {
          setPaymentModalOpen(false);
          toast.success('Payment completed successfully! Your order will be delivered as scheduled.');
          if (trackingData) {
            setTrackingData({
              ...trackingData,
              paymentRequired: false
            });
          }
        }}
      />
    </div>
  );
}