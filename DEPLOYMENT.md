# Deployment Guide

This guide will help you deploy your portfolio website to various hosting platforms.

## 🚀 Quick Deploy Options

### 1. GitHub Pages (Free)
1. Create a new repository on GitHub
2. Upload all files to the repository
3. Go to Settings > Pages
4. Select source branch (usually `main`)
5. Your site will be available at `https://username.github.io/repository-name`

### 2. Netlify (Free)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your project folder
3. Your site will be live instantly
4. Custom domain can be added later

### 3. Vercel (Free)
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Deploy with zero configuration
4. Automatic deployments on code changes

### 4. Firebase Hosting (Free)
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Run `firebase init hosting`
3. Select your project folder
4. Run `firebase deploy`

## 🔧 Local Development

### Using Python (Recommended)
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

### Using Node.js
```bash
# Install a simple server
npm install -g http-server

# Run the server
http-server -p 8000
```

### Using Live Server (VS Code)
1. Install Live Server extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 📁 File Structure for Deployment

Make sure your deployment includes these files:
```
achal-portfolio/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript
├── README.md           # Documentation
├── package.json        # Project metadata
└── DEPLOYMENT.md       # This file
```

## 🌐 Custom Domain Setup

### For GitHub Pages
1. Add a `CNAME` file with your domain name
2. Configure DNS records with your domain provider
3. Enable HTTPS in repository settings

### For Netlify
1. Go to Domain settings
2. Add your custom domain
3. Configure DNS records
4. Enable SSL certificate

## 🔒 HTTPS Configuration

Most hosting platforms provide free SSL certificates:
- **GitHub Pages**: Automatic HTTPS
- **Netlify**: Automatic HTTPS
- **Vercel**: Automatic HTTPS
- **Firebase**: Automatic HTTPS

## 📊 Performance Optimization

### Before Deployment
1. **Minify CSS and JavaScript** (optional)
2. **Optimize images** (if any)
3. **Test on multiple devices**
4. **Check loading speed**

### After Deployment
1. **Test all links and forms**
2. **Verify mobile responsiveness**
3. **Check browser compatibility**
4. **Monitor performance metrics**

## 🔄 Continuous Deployment

### GitHub Actions (GitHub Pages)
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

### Netlify
- Automatic deployments from GitHub
- Preview deployments for pull requests
- Branch-based deployments

## 📱 Mobile Testing

Test your deployed site on:
- **Real devices** (iOS, Android)
- **Browser dev tools** (mobile simulation)
- **Online tools** (Google Mobile-Friendly Test)

## 🐛 Troubleshooting

### Common Issues
1. **404 errors**: Check file paths and case sensitivity
2. **CSS not loading**: Verify file paths and server configuration
3. **JavaScript errors**: Check browser console for errors
4. **Mobile issues**: Test responsive design

### Debug Tools
- **Browser DevTools**: F12 in most browsers
- **Lighthouse**: Performance and SEO audit
- **GTmetrix**: Speed testing
- **W3C Validator**: HTML/CSS validation

## 📈 Analytics Setup

### Google Analytics
1. Create Google Analytics account
2. Add tracking code to `<head>` section
3. Monitor visitor statistics

### Other Analytics
- **Plausible**: Privacy-focused analytics
- **Fathom**: Simple and privacy-friendly
- **Hotjar**: User behavior analytics

## 🔧 Maintenance

### Regular Updates
1. **Update content** regularly
2. **Add new projects** as completed
3. **Update skills** and technologies
4. **Test functionality** periodically

### Security
1. **Keep dependencies updated**
2. **Use HTTPS** everywhere
3. **Regular backups** of your code
4. **Monitor for vulnerabilities**

## 📞 Support

If you encounter issues:
1. Check this deployment guide
2. Review hosting platform documentation
3. Check browser console for errors
4. Test locally first

---

**Happy Deploying! 🚀**
