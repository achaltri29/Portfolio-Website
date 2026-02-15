# Deploy Portfolio to Render

This guide will help you deploy your portfolio website to Render for free with a custom domain.

## 🚀 Quick Deployment Steps

### 1. Push to GitHub (if not already done)
```bash
git add .
git commit -m "Add Render deployment configuration"
git push origin main
```

### 2. Deploy on Render

1. **Go to [render.com](https://render.com)**
2. **Sign up/Login** with your GitHub account
3. **Click "New +"** → **"Static Site"**
4. **Connect your GitHub repository**:
   - Select `achaltri29/Portfolio-Website`
   - Choose the `main` branch
5. **Configure the deployment**:
   - **Name**: `achal-tripathi-portfolio`
   - **Build Command**: Leave empty (or use `echo "No build needed"`)
   - **Publish Directory**: Leave empty (or use `./`)
6. **Click "Create Static Site"**

### 3. Get Your Live URL
- Render will give you a URL like: `https://achal-tripathi-portfolio.onrender.com`
- Your portfolio will be live in 2-3 minutes!

## 🌐 Custom Domain Setup (Optional)

### If you want to use a custom domain:

1. **In Render Dashboard**:
   - Go to your site settings
   - Click "Custom Domains"
   - Add your domain (e.g., `achaltripathi.in`)

2. **Configure DNS**:
   ```
   Type: CNAME
   Name: www
   Value: [your-render-url].onrender.com
   
   Type: A
   Name: @
   Value: [render-ip-address]
   ```

## ✅ What You Get

- ✅ **Free hosting** on Render
- ✅ **HTTPS enabled** automatically
- ✅ **Custom domain** support
- ✅ **Automatic deployments** on git push
- ✅ **Global CDN** for fast loading
- ✅ **Professional URL**

## 🔄 Automatic Updates

Once deployed:
- Any push to your `main` branch
- Automatically triggers a new deployment
- Your live site updates in 2-3 minutes

## 📊 Performance Features

Your site includes:
- ✅ Optimized static files
- ✅ Fast loading times
- ✅ Mobile responsive design
- ✅ SEO-friendly structure
- ✅ Professional animations

## 🆚 Render vs GitHub Pages

| Feature | Render | GitHub Pages |
|---------|--------|--------------|
| Custom Domain | ✅ Easy setup | ❌ Complex DNS |
| HTTPS | ✅ Automatic | ✅ After DNS setup |
| Build Process | ✅ Flexible | ❌ Limited |
| Deploy Speed | ✅ 2-3 minutes | ✅ 1-2 minutes |
| Free Tier | ✅ Generous | ✅ Unlimited |

## 🎉 Your Portfolio Will Be Live At:

**Render URL**: `https://achal-tripathi-portfolio.onrender.com`

**Custom Domain** (if configured): `https://achaltripathi.in`

---

**Ready to deploy? Follow the steps above and your portfolio will be live in minutes!** 🚀

