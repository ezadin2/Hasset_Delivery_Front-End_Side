# API Integration Guide

This guide demonstrates how to connect the Kuru Delivery frontend to a backend API.

## 🔌 Quick Start

### Step 1: Create API Client

Create `/utils/api.ts`:

```typescript
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor - add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### Step 2: Create Service Modules

#### Authentication Service (`/services/auth.ts`)

```typescript
import api from '../utils/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  accountType: 'personal' | 'business';
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    localStorage.setItem('authToken', response.data.token);
    return response.data;
  },

  async signup(data: SignupData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/signup', data);
    localStorage.setItem('authToken', response.data.token);
    return response.data;
  },

  async logout(): Promise<void> {
    localStorage.removeItem('authToken');
    await api.post('/auth/logout');
  },

  async getCurrentUser() {
    const response = await api.get('/auth/me');
    return response.data;
  },

  async forgotPassword(email: string): Promise<void> {
    await api.post('/auth/forgot-password', { email });
  },

  async resetPassword(token: string, newPassword: string): Promise<void> {
    await api.post('/auth/reset-password', { token, password: newPassword });
  },
};
```

#### Tracking Service (`/services/tracking.ts`)

```typescript
import api from '../utils/api';

export interface TrackingData {
  trackingNumber: string;
  status: string;
  currentLocation: string;
  estimatedDelivery: string;
  progress: number;
  history: TrackingEvent[];
  packageDetails: PackageDetails;
}

export interface TrackingEvent {
  status: string;
  location: string;
  timestamp: string;
  completed: boolean;
}

export interface PackageDetails {
  weight: string;
  dimensions: string;
  service: string;
  sender: string;
  recipient: string;
}

export const trackingService = {
  async trackOrder(trackingId: string): Promise<TrackingData> {
    const response = await api.get<TrackingData>(`/tracking/${trackingId}`);
    return response.data;
  },

  async getMyOrders(): Promise<TrackingData[]> {
    const response = await api.get<TrackingData[]>('/tracking/my-orders');
    return response.data;
  },
};
```

#### Pricing Service (`/services/pricing.ts`)

```typescript
import api from '../utils/api';

export interface ShippingDetails {
  weight: number;
  distance: number;
  serviceType: 'standard' | 'next-day' | 'same-day' | 'international';
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  insurance?: boolean;
  signature?: boolean;
}

export interface PricingQuote {
  basePrice: number;
  serviceFee: number;
  insurance?: number;
  total: number;
  estimatedDelivery: string;
}

export const pricingService = {
  async calculatePrice(details: ShippingDetails): Promise<PricingQuote> {
    const response = await api.post<PricingQuote>('/pricing/calculate', details);
    return response.data;
  },

  async getPricingPlans() {
    const response = await api.get('/pricing/plans');
    return response.data;
  },
};
```

#### Contact Service (`/services/contact.ts`)

```typescript
import api from '../utils/api';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export const contactService = {
  async submitContactForm(data: ContactFormData): Promise<void> {
    await api.post('/contact/submit', data);
  },

  async subscribeNewsletter(email: string): Promise<void> {
    await api.post('/contact/newsletter', { email });
  },
};
```

### Step 3: Update Components

#### Login Page Integration

```typescript
// /pages/LoginPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth';
import { toast } from 'sonner@2.0.3';

export function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authService.login(formData);
      toast.success('Login successful!');
      navigate('/'); // Redirect to home
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  // ... rest of component
}
```

#### Track Order Page Integration

```typescript
// /pages/TrackOrderPage.tsx
import { useState } from 'react';
import { trackingService } from '../services/tracking';
import { toast } from 'sonner@2.0.3';
import { LoadingSpinner } from '../components/global/LoadingSpinner';

export function TrackOrderPage() {
  const [trackingId, setTrackingId] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = async () => {
    if (!trackingId.trim()) {
      toast.error('Please enter a tracking number');
      return;
    }

    setLoading(true);
    try {
      const data = await trackingService.trackOrder(trackingId);
      setTrackingData(data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Tracking number not found');
      setTrackingData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Tracking form */}
      {loading && <LoadingSpinner />}
      {trackingData && <TrackingResults data={trackingData} />}
    </div>
  );
}
```

#### Pricing Calculator Integration

```typescript
// /pages/PricingPage.tsx
import { useState } from 'react';
import { pricingService } from '../services/pricing';
import { toast } from 'sonner@2.0.3';

export function PricingPage() {
  const [formData, setFormData] = useState({
    weight: 0,
    distance: 0,
    serviceType: 'standard' as const,
  });
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculatePrice = async () => {
    setLoading(true);
    try {
      const result = await pricingService.calculatePrice(formData);
      setQuote(result);
    } catch (error: any) {
      toast.error('Failed to calculate price');
    } finally {
      setLoading(false);
    }
  };

  // ... rest of component
}
```

## 🔐 Authentication Flow

### Protected Routes

Create `/components/ProtectedRoute.tsx`:

```typescript
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem('authToken');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
```

### Usage in App.tsx

```typescript
import { ProtectedRoute } from './components/ProtectedRoute';

<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  }
/>
```

## 🎣 Custom Hooks

### useAuth Hook

```typescript
// /hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { authService } from '../services/auth';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await authService.getCurrentUser();
        setUser(userData);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (credentials: any) => {
    const response = await authService.login(credentials);
    setUser(response.user);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return { user, loading, login, logout };
}
```

### useTracking Hook

```typescript
// /hooks/useTracking.ts
import { useState } from 'react';
import { trackingService } from '../services/tracking';

export function useTracking() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const trackOrder = async (trackingId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await trackingService.trackOrder(trackingId);
      return data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to track order');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { trackOrder, loading, error };
}
```

## 📦 React Query Integration (Advanced)

### Setup

```bash
npm install @tanstack/react-query
```

### Configuration

```typescript
// /App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {/* ... rest of app */}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
```

### Query Hooks

```typescript
// /hooks/queries.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { trackingService, authService } from '../services';

export function useTrackOrder(trackingId: string) {
  return useQuery({
    queryKey: ['tracking', trackingId],
    queryFn: () => trackingService.trackOrder(trackingId),
    enabled: !!trackingId,
  });
}

export function useMyOrders() {
  return useQuery({
    queryKey: ['my-orders'],
    queryFn: () => trackingService.getMyOrders(),
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
    },
  });
}
```

### Usage

```typescript
// In component
import { useTrackOrder } from '../hooks/queries';

function TrackingComponent({ trackingId }: { trackingId: string }) {
  const { data, isLoading, error } = useTrackOrder(trackingId);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error: {error.message}</div>;

  return <TrackingResults data={data} />;
}
```

## 🔄 WebSocket Integration (Real-time Tracking)

```typescript
// /utils/websocket.ts
import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const initializeSocket = () => {
  socket = io(process.env.REACT_APP_WS_URL || 'ws://localhost:3001', {
    auth: {
      token: localStorage.getItem('authToken'),
    },
  });

  socket.on('connect', () => {
    console.log('WebSocket connected');
  });

  socket.on('disconnect', () => {
    console.log('WebSocket disconnected');
  });

  return socket;
};

export const subscribeToTracking = (
  trackingId: string,
  callback: (update: any) => void
) => {
  if (!socket) initializeSocket();
  
  socket?.emit('subscribe:tracking', trackingId);
  socket?.on('tracking:update', callback);
};

export const unsubscribeFromTracking = (trackingId: string) => {
  socket?.emit('unsubscribe:tracking', trackingId);
  socket?.off('tracking:update');
};
```

## 🌐 Backend API Requirements

### Expected Endpoints

```
Authentication:
POST   /api/auth/login
POST   /api/auth/signup
POST   /api/auth/logout
GET    /api/auth/me
POST   /api/auth/forgot-password
POST   /api/auth/reset-password

Tracking:
GET    /api/tracking/:id
GET    /api/tracking/my-orders
POST   /api/tracking/create

Pricing:
POST   /api/pricing/calculate
GET    /api/pricing/plans

Contact:
POST   /api/contact/submit
POST   /api/contact/newsletter

Services:
GET    /api/services
GET    /api/services/:id
```

### Response Format

```typescript
// Success
{
  "success": true,
  "data": { /* response data */ }
}

// Error
{
  "success": false,
  "error": {
    "message": "Error message",
    "code": "ERROR_CODE"
  }
}
```

## 🧪 Testing API Integration

```typescript
// Mock API for testing
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.post('/api/auth/login', (req, res, ctx) => {
    return res(
      ctx.json({
        token: 'mock-token',
        user: { id: '1', email: 'test@example.com' },
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

## 📋 Migration Checklist

- [ ] Create API client with interceptors
- [ ] Set up environment variables
- [ ] Create service modules
- [ ] Update form submissions
- [ ] Add error handling
- [ ] Implement loading states
- [ ] Add authentication flow
- [ ] Set up protected routes
- [ ] Test all endpoints
- [ ] Add error logging

---

**Ready to connect to your backend! 🚀**
