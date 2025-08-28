# Deployment Guide

This guide covers how to deploy the Porta Cabin CRM to Cloudflare Pages.

## Prerequisites

1. **Cloudflare Account**: Sign up at [cloudflare.com](https://cloudflare.com)
2. **GitHub Repository**: Push your code to GitHub
3. **Wrangler CLI** (optional): `npm install -g wrangler`

## Cloudflare Pages Deployment

### Method 1: Connect via Cloudflare Dashboard (Recommended)

1. **Login to Cloudflare Dashboard**
   - Go to [dash.cloudflare.com](https://dash.cloudflare.com)
   - Navigate to "Pages" in the sidebar

2. **Create New Project**
   - Click "Create a project"
   - Select "Connect to Git"
   - Authorize and select your GitHub repository

3. **Configure Build Settings**
   ```
   Framework preset: Create React App
   Build command: npm run build
   Build output directory: build
   Root directory: porta-cabin-crm (if in subdirectory)
   ```

4. **Environment Variables**
   Set the following in the Cloudflare dashboard:
   ```
   REACT_APP_ENV=production
   REACT_APP_API_BASE_URL=https://your-api-domain.com/api
   REACT_APP_APP_NAME=Porta Cabin CRM
   REACT_APP_COMPANY_NAME=Porta Cabin Solutions
   ```

5. **Deploy**
   - Click "Save and Deploy"
   - Your app will be available at `https://your-project.pages.dev`

### Method 2: Using Wrangler CLI

1. **Install Wrangler**
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare**
   ```bash
   wrangler login
   ```

3. **Deploy**
   ```bash
   npm run deploy:cloudflare
   ```

## Custom Domain Setup

1. **Add Custom Domain**
   - In Cloudflare Pages dashboard, go to your project
   - Click "Custom domains" tab
   - Click "Set up a custom domain"
   - Enter your domain (e.g., `crm.yourcompany.com`)

2. **DNS Configuration**
   - Add a CNAME record pointing to `your-project.pages.dev`
   - Or transfer your domain to Cloudflare for automatic setup

## Environment-Specific Deployments

### Production
```bash
npm run build:prod
# This sets REACT_APP_ENV=production
```

### Staging
```bash
npm run build:staging
# This sets REACT_APP_ENV=staging
```

## Performance Optimization

The build is already optimized for Cloudflare Pages:

1. **Static Asset Caching**: Configured for 1 year cache on static files
2. **Security Headers**: HTTPS, CSP, and other security headers
3. **SPA Routing**: Proper handling of client-side routing
4. **Gzip Compression**: Automatic compression by Cloudflare

## Monitoring and Analytics

1. **Cloudflare Analytics**: Available in the Pages dashboard
2. **Web Vitals**: Built into the React app
3. **Error Tracking**: Consider adding Sentry (see .env.example)

## Troubleshooting

### Build Failures

1. **Check Build Logs**: Available in Cloudflare Pages dashboard
2. **Local Build Test**: Run `npm run build` locally first
3. **Dependencies**: Ensure all dependencies are in package.json

### Runtime Issues

1. **Environment Variables**: Verify all REACT_APP_* variables are set
2. **CORS Issues**: Configure your API to allow requests from your domain
3. **Routing Issues**: Ensure _redirects file is in build output

### Performance Issues

1. **Bundle Analysis**: Run `npm run analyze` to check bundle size
2. **Asset Optimization**: Optimize images and fonts
3. **Code Splitting**: Consider lazy loading for large components

## Security Considerations

1. **HTTPS Only**: Cloudflare Pages enforces HTTPS
2. **CSP Headers**: Content Security Policy is configured
3. **XSS Protection**: Headers prevent common attacks
4. **API Security**: Ensure your backend API has proper authentication

## Backup and Rollback

1. **Git History**: Each deployment is tied to a Git commit
2. **Rollback**: Use Cloudflare Pages dashboard to rollback to previous deployment
3. **Preview Deployments**: Every branch gets a preview deployment

## Cost Considerations

Cloudflare Pages offers:
- **Free Tier**: 1 build per minute, 500 builds per month
- **Unlimited Bandwidth**: No bandwidth charges
- **Global CDN**: Included in all plans

For high-traffic applications, consider Cloudflare's paid plans for additional build capacity.

## Support

- **Cloudflare Docs**: [developers.cloudflare.com/pages](https://developers.cloudflare.com/pages)
- **Community**: [community.cloudflare.com](https://community.cloudflare.com)
- **Support**: Available with paid Cloudflare plans