# Kuru Delivery Platform - Payment System Documentation

## Overview

The Kuru Delivery Platform features a comprehensive payment system that supports both Ethiopian and international payment methods. The payment interface is designed as a modal dialog that can be triggered from various pages throughout the application.

## Supported Payment Methods

### Ethiopian Payment Methods (Local)

1. **Telebirr** - Mobile wallet payment
   - Phone number authentication
   - SMS confirmation
   
2. **CBE Birr** - Commercial Bank of Ethiopia
   - Mobile wallet integration
   - Phone number based

3. **Amole** - Mobile wallet
   - Phone number authentication
   
4. **HelloCash** - Mobile payment
   - Phone number based payment

5. **Bank Transfer** - Direct bank transfer
   - Account number required
   - Reference number provided

### International Payment Methods

1. **Visa** - Credit/Debit card
   - Card number, expiry, CVV required
   - Cardholder name verification

2. **Mastercard** - Credit/Debit card
   - Full card details required

3. **PayPal** - Digital wallet
   - Email authentication
   - Redirect to PayPal

## Currency

All payments are processed in **Ethiopian Birr (ETB)** by default. The currency is formatted using the Intl.NumberFormat API for proper localization.

## Payment Flow

The payment system follows a multi-step process:

### Step 1: Payment Method Selection
- User chooses between Ethiopian or international payment methods
- Visual cards with icons and descriptions
- Selected method is highlighted

### Step 2: Payment Details
- User enters payment-specific information
- Form fields adapt based on selected payment method
- Validation and error handling

### Step 3: Order Confirmation
- Review order summary
- Verify payment method and details
- Security notice with SSL encryption badge
- Final confirmation before payment

### Step 4: Success
- Animated success confirmation
- Order details and receipt
- Transaction summary

## Implementation

### PaymentPage Component

Located at: `/pages/PaymentPage.tsx`

The main payment component that handles the entire payment flow. It can be used as a standalone page or within a modal.

**Props:**
```typescript
interface PaymentPageProps {
  orderDetails?: {
    orderId: string;
    amount: number;
    items: string[];
  };
  onClose?: () => void;
  onSuccess?: () => void;
}
```

### PaymentModal Component

Located at: `/components/global/PaymentModal.tsx`

A wrapper component that displays the PaymentPage in a modal dialog using shadcn/ui Dialog component.

**Props:**
```typescript
interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderDetails?: {
    orderId: string;
    amount: number;
    items: string[];
  };
  onSuccess?: () => void;
}
```

## Usage Examples

### 1. Track Order Page

The payment modal is integrated into the Track Order page, appearing after users track their package:

```tsx
import { PaymentModal } from '../components/global/PaymentModal';

function TrackOrderPage() {
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  
  return (
    <>
      <Button onClick={() => setPaymentModalOpen(true)}>
        Pay Now
      </Button>
      
      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        orderDetails={{
          orderId: 'KRU123456789',
          amount: 2500,
          items: ['Express Delivery', 'Insurance Coverage']
        }}
        onSuccess={() => {
          setPaymentModalOpen(false);
          toast.success('Payment completed!');
        }}
      />
    </>
  );
}
```

### 2. Pricing Page

Users can subscribe to plans directly from the pricing page:

```tsx
const handlePlanSelection = (plan) => {
  setSelectedPlan(plan);
  setPaymentModalOpen(true);
};
```

### 3. Home Page

A payment demo button allows users to try the payment flow:

```tsx
<Button onClick={() => setPaymentModalOpen(true)}>
  Try Payment Demo
</Button>
```

## Design Features

### Modern UI Elements

- **3D Card Effects** - Interactive cards with depth and shadows
- **Glassmorphism** - Frosted glass effect on cards
- **Scroll Animations** - Smooth reveal animations on scroll
- **Motion Animations** - Using Motion (Framer Motion) for fluid interactions
- **Gradient Backgrounds** - Modern gradient combinations for visual appeal

### Responsive Design

- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interface elements
- Optimized for both desktop and mobile experiences

### Accessibility

- Keyboard navigation support
- ARIA labels and roles
- Focus management
- Screen reader friendly

## Security Features

1. **SSL Encryption Badge** - Displays security notice
2. **Form Validation** - Real-time input validation
3. **Secure Icons** - Lock icons to indicate security
4. **Masked Sensitive Data** - Card numbers are partially hidden in confirmation

## Integration Notes

### Frontend-Only Implementation

This is a frontend mockup and does not process real payments. For production use:

1. Integrate with payment gateway APIs (Stripe, PayPal, etc.)
2. Add backend payment processing
3. Implement proper error handling
4. Add payment verification
5. Store transaction records securely

### Future Backend Integration

The component structure is designed to easily integrate with backend APIs:

```typescript
const handleProcessPayment = async () => {
  setIsProcessing(true);
  
  try {
    const response = await fetch('/api/payments/process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        paymentMethod,
        orderDetails,
        paymentData: { /* payment-specific data */ }
      })
    });
    
    if (response.ok) {
      setStep('success');
    }
  } catch (error) {
    toast.error('Payment failed');
  } finally {
    setIsProcessing(false);
  }
};
```

## Navigation

**Important:** The payment page does NOT appear in the main navigation menu. It is only accessible through:

1. Modal dialogs triggered by buttons
2. Checkout flows
3. Direct payment links within the application

This design ensures users only access the payment page when they have a specific transaction to complete.

## Styling

The payment system uses:
- Tailwind CSS for utility classes
- Custom CSS variables from `/styles/globals.css`
- Poppins font for headings
- Inter font for body text
- Brand colors:
  - Primary: #FF6600 (Orange)
  - Secondary: #1A1A1A (Dark Gray)
  - Background: #F1F1F1 (Light Gray)

## Testing

To test the payment system:

1. Navigate to the Track Order page
2. Enter any tracking number and track
3. Click the "Pay Now" button
4. Select a payment method
5. Fill in the payment details
6. Review and confirm
7. See the success animation

Alternatively, try the payment demo from the homepage.

## Troubleshooting

### Modal not opening
- Check that `isOpen` state is being properly managed
- Verify Dialog component is properly imported from shadcn/ui

### Form validation errors
- Ensure all required fields are filled
- Check field format requirements (e.g., phone number length)

### Success callback not firing
- Verify `onSuccess` prop is passed to the component
- Check timing of the callback (it fires after a delay)

## Browser Support

The payment system is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Lazy loading of payment modal
- Optimized animations with GPU acceleration
- Minimal re-renders with proper state management
- Efficient form handling

## License

This payment interface is part of the Kuru Delivery Platform and follows the same license terms as the main application.
