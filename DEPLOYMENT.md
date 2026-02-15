# Portfolio Website Deployment Guide

This guide will help you deploy your portfolio website to `https://www.achaltripathi.in` using GitHub Pages with a custom domain.

## 🚀 Quick Deployment Steps

### 1. Push Changes to GitHub
```bash
git add .
git commit -m "Add deployment configuration for custom domain"
git push origin main
```

### 2. Enable GitHub Pages
1. Go to your repository: https://github.com/achaltri29/Portfolio-Website
2. Click on **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **GitHub Actions**
5. The workflow will automatically deploy your site

### 3. Configure Custom Domain
1. In the same **Pages** settings section
2. Under **Custom domain**, enter: `achaltripathi.in`
3. Check **Enforce HTTPS** (this will be available after DNS is configured)

## 🌐 Domain Configuration

### Option A: Using a Domain Registrar (Recommended)

If you own the domain `achaltripathi.in`, configure these DNS records:

#### DNS Records to Add:
```
Type: CNAME
Name: www
Value: achaltri29.github.io
TTL: 3600

Type: A
Name: @
Value: 185.199.108.153
TTL: 3600

Type: A
Name: @
Value: 185.199.109.153
TTL: 3600

Type: A
Name: @
Value: 185.199.110.153
TTL: 3600

Type: A
Name: @
Value: 185.199.111.153
TTL: 3600
```

### Option B: Using GitHub's Free Subdomain

If you don't have a custom domain, your site will be available at:
`https://achaltri29.github.io/Portfolio-Website`

## 📁 Files Added for Deployment

- **CNAME**: Contains your custom domain name
- **.nojekyll**: Prevents Jekyll processing
- **.github/workflows/deploy.yml**: GitHub Actions workflow for automatic deployment

## 🔧 Troubleshooting

### Common Issues:

1. **Domain not working**: Wait 24-48 hours for DNS propagation
2. **HTTPS not enabled**: Wait for GitHub to provision SSL certificate
3. **404 errors**: Check if CNAME file is in the root directory
4. **Build failures**: Check GitHub Actions logs in the repository

### Verification Steps:

1. Visit `https://achaltripathi.in` (after DNS setup)
2. Check all links and functionality
3. Test on mobile devices
4. Verify contact form works

## 📊 Performance Optimization

Your site is already optimized with:
- ✅ Minified CSS and JavaScript
- ✅ Optimized images
- ✅ Fast loading times
- ✅ Mobile-responsive design
- ✅ SEO-friendly structure

## 🔄 Automatic Updates

Once configured, any push to the `main` branch will automatically:
1. Trigger GitHub Actions workflow
2. Deploy the latest changes
3. Update your live website

## 📞 Support

If you encounter any issues:
1. Check GitHub Actions logs
2. Verify DNS configuration
3. Contact your domain registrar if needed

---

**Your portfolio will be live at: https://www.achaltripathi.in** 🎉