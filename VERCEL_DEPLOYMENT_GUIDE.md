# 🚀 Vercel Deployment Guide - Klassic Group Companies

## ✅ What Was Prepared

- ✅ Created `vercel.json` configuration file
- ✅ Project is ready for deployment
- ✅ Build command configured: `npm run build`
- ✅ Output directory: `dist`

---

## 📦 Quick Deploy (Recommended)

### Option 1: Deploy via Vercel CLI (Fastest)

1. **Install Vercel CLI:**
   ```powershell
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```powershell
   vercel login
   ```

3. **Deploy:**
   ```powershell
   vercel
   ```
   
4. **Follow the prompts:**
   - Set up and deploy? **Y**
   - Which scope? Choose your account
   - Link to existing project? **N** (first time)
   - What's your project's name? **klassic-group-companies** (or your choice)
   - In which directory is your code located? **./** (press Enter)
   - Want to override settings? **N**

5. **Production Deploy:**
   ```powershell
   vercel --prod
   ```

---

### Option 2: Deploy via GitHub (Automatic Deployments)

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com/
   - Click **"Add New Project"**

2. **Import Git Repository:**
   - Click **"Import Git Repository"**
   - Select **GitHub**
   - Find: **Johsua1/HYT-KlassicGroupCompanies**
   - Click **"Import"**

3. **Configure Project:**
   - **Project Name:** `klassic-group-companies` (or your choice)
   - **Framework Preset:** Vite (auto-detected)
   - **Root Directory:** `./` (leave as is)
   - **Build Command:** `npm run build` (auto-filled)
   - **Output Directory:** `dist` (auto-filled)
   - **Install Command:** `npm install` (auto-filled)

4. **Environment Variables (Optional):**
   - If you want to hide EmailJS credentials, add:
     - `VITE_EMAILJS_SERVICE_ID`
     - `VITE_EMAILJS_TEMPLATE_ID`
     - `VITE_EMAILJS_PUBLIC_KEY`

5. **Click "Deploy"**

6. **Wait 2-3 minutes** for deployment to complete

---

## 🔧 Build Settings (Already Configured)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": "vite"
}
```

---

## 🌐 After Deployment

Once deployed, you'll get:

- **Production URL:** `https://klassic-group-companies.vercel.app` (or custom domain)
- **Preview URLs:** Automatic for every push to GitHub
- **Automatic SSL:** HTTPS enabled by default
- **CDN:** Global edge network for fast loading

---

## 🔄 Automatic Deployments (GitHub Integration)

After connecting to GitHub:

- ✅ **Every push to `main`** → Production deployment
- ✅ **Every pull request** → Preview deployment
- ✅ **Instant rollback** if issues occur
- ✅ **Auto SSL renewal**

---

## 🎯 Custom Domain (Optional)

1. Go to your project in Vercel dashboard
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain (e.g., `klassicgroup.com`)
4. Follow DNS configuration instructions
5. SSL automatically configured!

---

## 📧 Important: EmailJS Configuration

After deployment, make sure to:

1. **Update EmailJS Allowed Domains:**
   - Go to EmailJS Dashboard: https://dashboard.emailjs.com/
   - Settings → Email Services
   - Add your Vercel domain to allowed origins:
     - `https://klassic-group-companies.vercel.app`
     - Or your custom domain

2. **Test the contact form** on production URL

---

## 🔐 Environment Variables (Optional - More Secure)

To hide EmailJS credentials from source code:

### 1. Create `.env` file (locally):
```env
VITE_EMAILJS_SERVICE_ID=service_zu5xdwz
VITE_EMAILJS_TEMPLATE_ID=template_3s0w7o9
VITE_EMAILJS_PUBLIC_KEY=TK1-w3bQvv7O8462F
```

### 2. Update `src/config/emailjs.ts`:
```typescript
export const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_zu5xdwz',
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_3s0w7o9',
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'TK1-w3bQvv7O8462F',
  RECIPIENT_EMAIL: 'bol76335@gmail.com',
};
```

### 3. Add to Vercel:
- Project Settings → Environment Variables
- Add each variable

### 4. Add `.env` to `.gitignore`:
```
.env
.env.local
```

---

## 🧪 Testing After Deployment

1. ✅ Check homepage loads
2. ✅ Test navigation (smooth scroll)
3. ✅ Open company modals
4. ✅ Test contact form submission
5. ✅ Verify email received at bol76335@gmail.com
6. ✅ Check mobile responsiveness

---

## 📊 Vercel Features You Get

- ✅ **Instant deployments** (2-3 minutes)
- ✅ **Global CDN** (fast worldwide)
- ✅ **Automatic HTTPS**
- ✅ **Preview deployments** for PRs
- ✅ **Analytics** (optional upgrade)
- ✅ **Zero config** for Vite
- ✅ **100GB bandwidth/month** (free tier)

---

## 🆘 Troubleshooting

### Build fails
- Check Node.js version in Vercel settings (should be 18.x or 20.x)
- Verify `package.json` has correct build command
- Check build logs in Vercel dashboard

### Images not showing
- Verify image paths start with `/src/assets/images/`
- Check if Git LFS is properly configured for large images
- Ensure images are committed to repository

### Contact form not working
- Add Vercel domain to EmailJS allowed origins
- Check browser console for CORS errors
- Verify EmailJS credentials are correct

### 404 on refresh
- `vercel.json` already configured for SPA routing
- If issues persist, check Vercel dashboard → Settings → Rewrites

---

## 💰 Pricing

**Free Tier (Hobby):**
- Unlimited projects
- 100GB bandwidth/month
- 6,000 build minutes/month
- Perfect for personal projects and testing

**Pro Tier ($20/month):**
- Unlimited bandwidth
- Advanced analytics
- Team collaboration
- Priority support

---

## 📚 Useful Commands

```powershell
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy (preview)
vercel

# Deploy to production
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs

# Remove deployment
vercel remove klassic-group-companies
```

---

## ✅ Deployment Checklist

- [ ] Push latest code to GitHub
- [ ] Install Vercel CLI or connect GitHub to Vercel
- [ ] Deploy project
- [ ] Test production URL
- [ ] Add Vercel domain to EmailJS allowed origins
- [ ] Test contact form on production
- [ ] (Optional) Configure custom domain
- [ ] Share the live URL! 🎉

---

## 🎉 Expected Result

After deployment, your website will be live at:
- **Production:** `https://klassic-group-companies.vercel.app`
- **Custom domain (optional):** `https://yourcompany.com`

Features working:
- ✅ Professional homepage with beige gradient hero
- ✅ 10 company cards with proper logos
- ✅ Company detail modals
- ✅ Statistics section
- ✅ Contact form with professional email template
- ✅ Responsive design
- ✅ Fast global loading (CDN)

---

**Estimated deployment time:** 2-5 minutes  
**Zero downtime:** Automatic deployment with instant rollback

Let's get your site live! 🚀
