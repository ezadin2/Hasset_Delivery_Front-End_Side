# Deployment Guide - Kuru Delivery Platform

Complete guide for deploying the Kuru Delivery Platform frontend to various hosting platforms.

## 🎯 Pre-Deployment Checklist

Before deploying, ensure:

- [ ] All features tested and working
- [ ] Environment variables configured
- [ ] Build process runs successfully
- [ ] Meta tags and SEO optimized
- [ ] Images optimized
- [ ] Analytics configured (optional)
- [ ] Error tracking setup (optional)
- [ ] Domain name ready (if applicable)

## 🏗️ Build Process

### Production Build

```bash
# Install dependencies
npm install

# Create production build
npm run build

# Output will be in /dist directory
```

### Build Verification

```bash
# Preview production build locally
npm run preview

# Test on http://localhost:4173
```

## 🌐 Deployment Options

## Option 1: Vercel (Recommended)

### Why Vercel?
- ✅ Optimized for React applications
- ✅ Automatic deployments from Git
- ✅ Built-in CDN
- ✅ Free SSL certificates
- ✅ Excellent performance
- ✅ Easy rollbacks

### Deploy to Vercel

**Method 1: Using Vercel CLI**

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

**Method 2: GitHub Integration**

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure build settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
6. Add environment variables (if any)
7. Click "Deploy"

### Vercel Configuration

Create `vercel.json` in project root:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

---

## Option 2: Netlify

### Why Netlify?
- ✅ Simple deployment process
- ✅ Form handling built-in
- ✅ Split testing capabilities
- ✅ Free SSL
- ✅ Continuous deployment

### Deploy to Netlify

**Method 1: Drag and Drop**

1. Run `npm run build`
2. Go to [app.netlify.com](https://app.netlify.com)
3. Drag and drop the `dist` folder

**Method 2: GitHub Integration**

1. Push code to GitHub
2. Go to Netlify
3. Click "New site from Git"
4. Connect to GitHub
5. Configure:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Click "Deploy site"

**Method 3: Netlify CLI**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize
netlify init

# Deploy
netlify deploy --prod
```

### Netlify Configuration

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

---

## Option 3: GitHub Pages

### Deploy to GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Update `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/kuru-delivery",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Deploy:
```bash
npm run deploy
```

### GitHub Pages Configuration

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm install
      
    - name: Build
      run: npm run build
      
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

---

## Option 4: AWS S3 + CloudFront

### Deploy to AWS

**Step 1: Create S3 Bucket**

```bash
# Using AWS CLI
aws s3 mb s3://kuru-delivery-frontend
aws s3 website s3://kuru-delivery-frontend --index-document index.html
```

**Step 2: Upload Build**

```bash
npm run build
aws s3 sync dist/ s3://kuru-delivery-frontend
```

**Step 3: Configure CloudFront**

1. Create CloudFront distribution
2. Origin: S3 bucket
3. Enable HTTPS
4. Custom error pages: 404 → /index.html

**Automated Deployment Script:**

```bash
#!/bin/bash
# deploy-aws.sh

echo "Building application..."
npm run build

echo "Uploading to S3..."
aws s3 sync dist/ s3://kuru-delivery-frontend --delete

echo "Invalidating CloudFront cache..."
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"

echo "Deployment complete!"
```

---

## Option 5: Traditional Web Hosting

### Deploy to cPanel / Shared Hosting

1. Build the project:
```bash
npm run build
```

2. Upload contents of `dist` folder via FTP:
   - Use FileZilla, Cyberduck, or hosting file manager
   - Upload to `public_html` or equivalent

3. Configure `.htaccess` for routing:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## 🔐 Environment Variables

### Setting Environment Variables

**Vercel:**
```
Project Settings → Environment Variables
Add: REACT_APP_API_URL = https://api.kurudelivery.com
```

**Netlify:**
```
Site Settings → Build & Deploy → Environment
Add: REACT_APP_API_URL = https://api.kurudelivery.com
```

**Local Development:**
Create `.env.local`:
```env
REACT_APP_API_URL=http://localhost:3000
REACT_APP_GOOGLE_MAPS_KEY=your_key
```

### Required Environment Variables

```env
# API Configuration
REACT_APP_API_URL=https://api.kurudelivery.com

# Analytics (Optional)
REACT_APP_GA_ID=UA-XXXXX-Y
REACT_APP_ANALYTICS_ID=G-XXXXXXXXXX

# Maps (Optional)
REACT_APP_GOOGLE_MAPS_KEY=AIza...

# Feature Flags (Optional)
REACT_APP_ENABLE_ANALYTICS=true
REACT_APP_ENABLE_CHAT=false
```

---

## 🚀 Performance Optimization

### Pre-Deployment Optimizations

**1. Image Optimization**
```bash
# Install image optimizer
npm install --save-dev vite-plugin-imagemin

# Add to vite.config.ts
import imagemin from 'vite-plugin-imagemin';

export default {
  plugins: [imagemin()]
}
```

**2. Bundle Analysis**
```bash
npm install --save-dev rollup-plugin-visualizer
npm run build
# Opens bundle size visualization
```

**3. Lighthouse Audit**
```bash
npm install -g lighthouse
lighthouse https://your-site.com --view
```

### Post-Deployment

**Enable Compression:**
- Vercel/Netlify: Automatic
- Custom server: Enable Gzip/Brotli

**CDN Configuration:**
- Use CDN for static assets
- Configure cache headers

**Security Headers:**
```
Content-Security-Policy: default-src 'self'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Strict-Transport-Security: max-age=31536000
```

---

## 📊 Monitoring & Analytics

### Google Analytics Setup

```typescript
// Add to index.html or use react-ga4
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Error Tracking (Sentry)

```bash
npm install @sentry/react

# In App.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: process.env.NODE_ENV,
});
```

---

## 🔄 Continuous Deployment

### GitHub Actions Example

`.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Build
      run: npm run build
      env:
        REACT_APP_API_URL: ${{ secrets.API_URL }}
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

---

## 🌍 Custom Domain Setup

### Vercel
1. Go to Project Settings → Domains
2. Add custom domain
3. Update DNS records as instructed

### Netlify
1. Domain Settings → Add custom domain
2. Configure DNS:
   ```
   A Record: @ → 75.2.60.5
   CNAME: www → your-site.netlify.app
   ```

### Cloudflare (Recommended)
1. Add site to Cloudflare
2. Update nameservers
3. Enable:
   - Auto minify (JS, CSS, HTML)
   - Brotli compression
   - HTTP/3
   - Caching rules

---

## 🐛 Troubleshooting

### Common Issues

**404 on Refresh**
- Cause: SPA routing not configured
- Fix: Add redirects/rewrites (see platform configs above)

**Environment Variables Not Working**
- Ensure variables start with `REACT_APP_`
- Rebuild after adding variables
- Check platform environment settings

**Build Fails**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Slow Build Times**
- Enable build caching
- Check for large dependencies
- Consider code splitting

---

## 📋 Post-Deployment Checklist

- [ ] Site accessible at production URL
- [ ] All pages loading correctly
- [ ] Navigation working (including direct URLs)
- [ ] Forms submitting (if backend connected)
- [ ] Images loading
- [ ] Dark/light mode working
- [ ] Mobile responsive
- [ ] SSL certificate active
- [ ] Analytics tracking
- [ ] Error monitoring active
- [ ] SEO meta tags present
- [ ] Performance score > 90 (Lighthouse)

---

## 📞 Support

For deployment issues:
1. Check platform documentation
2. Review build logs
3. Test production build locally
4. Verify environment variables
5. Check browser console for errors

**Useful Commands:**
```bash
# Check build
npm run build && npm run preview

# Verify dependencies
npm list

# Check for security issues
npm audit

# Update dependencies
npm update
```

---

**Happy Deploying! 🚀**
