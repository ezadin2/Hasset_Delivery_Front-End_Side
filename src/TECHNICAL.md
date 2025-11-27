# Technical Documentation - Kuru Delivery Platform

## Architecture Overview

This document provides technical details about the Kuru Delivery Platform frontend architecture, patterns, and implementation details.

## 🏗️ Architecture Patterns

### Component Architecture
- **Presentational Components** - Pure UI components in `/components/ui/`
- **Container Components** - Page-level components in `/pages/`
- **Layout Components** - Global components like Header/Footer in `/components/global/`
- **Context Providers** - State management in `/contexts/`

### State Management Strategy
- **Local State** - React useState for component-specific state
- **Global State** - Context API for theme preferences
- **URL State** - React Router for navigation state
- **Future Backend State** - Ready for Redux Toolkit or React Query

### Routing Strategy
```typescript
// Nested routing for auth vs. main pages
<Route path="/login" element={<LoginPage />} />  // No header/footer
<Route path="/*" element={<>
  <Header />
  <Routes>
    <Route path="/" element={<HomePage />} />
    // ... other routes
  </Routes>
  <Footer />
</>} />
```

## 🎨 Styling Architecture

### Tailwind CSS Configuration
- **Utility-First Approach** - Leveraging Tailwind's utility classes
- **Custom Theme Variables** - CSS custom properties for colors
- **Dark Mode Support** - Class-based dark mode with ThemeContext
- **Responsive Design** - Mobile-first breakpoints

### CSS Variables Structure
```css
:root {
  /* Color System */
  --primary: #FF6600;
  --secondary: #1A1A1A;
  --background: #F1F1F1;
  
  /* Component Colors */
  --card: #ffffff;
  --border: rgba(0, 0, 0, 0.1);
  
  /* Typography */
  --font-weight-medium: 500;
  --font-weight-normal: 400;
}

.dark {
  /* Dark mode overrides */
  --background: #0f0f0f;
  --card: #1a1a1a;
  /* ... */
}
```

### Component Styling Pattern
```typescript
// Consistent styling using card components
<Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
  <CardContent className="p-6">
    {/* Content */}
  </CardContent>
</Card>
```

## 🎭 Animation Strategy

### Motion (Framer Motion) Implementation

**Scroll Animations:**
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-100px' }}
  transition={{ duration: 0.6 }}
>
```

**Hover Interactions:**
```typescript
<motion.div
  whileHover={{ y: -5, scale: 1.05 }}
  transition={{ type: 'spring', stiffness: 300 }}
>
```

**Page Transitions:**
```typescript
<motion.div
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
>
```

### Animation Best Practices
- Use `viewport={{ once: true }}` to prevent re-animation on scroll
- Stagger animations with delay multipliers: `delay={index * 0.1}`
- Keep duration between 0.3s - 0.8s for optimal UX
- Use spring animations for interactive elements

## 🔐 Type Safety

### TypeScript Patterns

**Component Props:**
```typescript
interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
}

export function SEO({ title = 'Default', ...props }: SEOProps) {
  // Implementation
}
```

**Context Typing:**
```typescript
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
```

**Event Handling:**
```typescript
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  // Type-safe event handling
};
```

## 🎯 SEO Implementation

### Dynamic Meta Tags
```typescript
// SEO Component updates document head dynamically
useEffect(() => {
  document.title = title;
  updateMetaTag('description', description);
  updateMetaTag('og:title', title, true);
}, [title, description]);
```

### Page-Level SEO
```typescript
// Each page can customize SEO
<SEO 
  title="Services - Kuru Delivery"
  description="Explore our delivery services..."
  keywords="delivery, shipping, courier"
/>
```

### Accessibility Features
- Semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<footer>`)
- ARIA labels for screen readers
- Focus management for keyboard navigation
- Alt text for all images

## 📊 Performance Optimizations

### Code Splitting
```typescript
// Automatic code splitting via React Router
<Route path="/services" element={<ServicesPage />} />
```

### Image Optimization
```typescript
// ImageWithFallback component for lazy loading
<ImageWithFallback 
  src={imageUrl}
  alt="Description"
  className="w-full h-full object-cover"
/>
```

### Animation Performance
- Use `transform` and `opacity` for GPU-accelerated animations
- Avoid animating layout properties
- Use `will-change` sparingly via Motion

## 🔌 API Integration Architecture

### Recommended API Client Setup

**Option 1: Axios**
```typescript
// /utils/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

**Option 2: React Query**
```typescript
// Recommended for advanced data fetching
import { useQuery, useMutation } from '@tanstack/react-query';

const useTrackOrder = (trackingId: string) => {
  return useQuery({
    queryKey: ['order', trackingId],
    queryFn: () => fetchOrderDetails(trackingId),
  });
};
```

### API Integration Points

**Authentication:**
```typescript
// /services/auth.ts
export const login = async (credentials: LoginCredentials) => {
  const response = await api.post('/auth/login', credentials);
  localStorage.setItem('authToken', response.data.token);
  return response.data;
};
```

**Order Tracking:**
```typescript
// /services/tracking.ts
export const trackOrder = async (trackingId: string) => {
  const response = await api.get(`/orders/track/${trackingId}`);
  return response.data;
};
```

**Pricing Calculator:**
```typescript
// /services/pricing.ts
export const calculatePrice = async (details: ShippingDetails) => {
  const response = await api.post('/pricing/calculate', details);
  return response.data;
};
```

## 🧪 Testing Strategy

### Recommended Testing Setup

**Unit Tests (Jest + React Testing Library):**
```typescript
// Example test
import { render, screen } from '@testing-library/react';
import { Header } from '../components/global/Header';

test('renders navigation links', () => {
  render(<Header />);
  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('Services')).toBeInTheDocument();
});
```

**Integration Tests:**
```typescript
// Test user flows
test('user can navigate to track order page', async () => {
  render(<App />);
  const trackButton = screen.getByText('Track Order');
  fireEvent.click(trackButton);
  expect(await screen.findByText('Enter tracking number')).toBeInTheDocument();
});
```

**E2E Tests (Cypress/Playwright):**
```typescript
// cypress/e2e/tracking.cy.ts
describe('Order Tracking', () => {
  it('should track an order', () => {
    cy.visit('/track-order');
    cy.get('input[placeholder*="tracking"]').type('KD123456789');
    cy.contains('Track Package').click();
    cy.contains('In Transit').should('be.visible');
  });
});
```

## 🔄 State Management Patterns

### Theme State (Context API)
```typescript
// Global theme preference
const { theme, toggleTheme } = useTheme();
```

### Form State (Local State)
```typescript
// Component-level form handling
const [formData, setFormData] = useState({
  email: '',
  password: '',
});
```

### Async State (Future)
```typescript
// Recommended: React Query for server state
const { data, isLoading, error } = useQuery(['orders'], fetchOrders);
```

## 📦 Component Library (ShadCN)

### Core Components Used
- `Button` - Interactive buttons with variants
- `Card` - Content containers
- `Input` / `Textarea` - Form inputs
- `Select` - Dropdown menus
- `Accordion` - Expandable content
- `Dialog` / `Sheet` - Modals and drawers
- `Progress` - Progress indicators
- `Checkbox` / `RadioGroup` - Form controls

### Component Customization
```typescript
// Extend ShadCN components
import { Button } from './components/ui/button';

<Button className="bg-primary hover:bg-primary/90">
  Custom Styled Button
</Button>
```

## 🌐 Environment Configuration

### Environment Variables
```env
# .env.local
REACT_APP_API_URL=https://api.kurudelivery.com
REACT_APP_GOOGLE_MAPS_KEY=your_key_here
REACT_APP_ANALYTICS_ID=your_id_here
```

### Usage
```typescript
const API_URL = process.env.REACT_APP_API_URL;
```

## 🚀 Deployment

### Build Optimization
```bash
# Production build
npm run build

# Output: /dist folder with optimized assets
```

### Deployment Platforms

**Vercel (Recommended):**
```bash
vercel --prod
```

**Netlify:**
```bash
netlify deploy --prod
```

**Static Hosting:**
- Build the project: `npm run build`
- Upload `/dist` folder to any static host

### Performance Checklist
- ✅ Minified JavaScript and CSS
- ✅ Image optimization
- ✅ Lazy loading for routes
- ✅ Gzip compression
- ✅ CDN for static assets
- ✅ Caching headers configured

## 🔧 Development Workflow

### Code Organization
1. Create components in appropriate directories
2. Use TypeScript for type safety
3. Follow naming conventions (PascalCase for components)
4. Keep components small and focused
5. Extract reusable logic into hooks

### Git Workflow
```bash
# Feature development
git checkout -b feature/new-feature
git commit -m "feat: add new feature"
git push origin feature/new-feature

# Pull request and merge to main
```

### Code Review Checklist
- [ ] TypeScript types defined
- [ ] Responsive design tested
- [ ] Accessibility considerations
- [ ] Performance optimized
- [ ] SEO meta tags added (if page)
- [ ] Error handling implemented

## 📚 Additional Resources

### Documentation Links
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Motion (Framer Motion)](https://motion.dev)
- [ShadCN UI](https://ui.shadcn.com)
- [React Router](https://reactrouter.com)

### Best Practices
- Keep components under 300 lines
- Extract complex logic into custom hooks
- Use semantic HTML
- Optimize images before use
- Test on multiple devices

---

**Technical Stack Version:**
- React 18+
- TypeScript 5+
- Tailwind CSS 4.0
- Motion (Framer Motion) latest
- React Router 6+
