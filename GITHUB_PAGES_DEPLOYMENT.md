# GitHub Pages Deployment Guide

## 📦 Setup Complete!

Your project is now configured for automatic deployment to GitHub Pages. Here's what's been set up:

---

## 🛠️ What Was Configured

### 1. **GitHub Actions Workflow**
- **File**: `.github/workflows/deploy.yml`
- **Triggers**: Automatically on every push to `main` branch
- **What it does**:
  - Builds your React app
  - Deploys to GitHub Pages
  - Uses your environment variables securely

### 2. **Build Script**
- **Script**: `npm run build:gh-pages`
- **Config**: `vite.config.gh-pages.ts`
- **Output**: `dist/public/` (optimized production build)

---

## 🚀 Deployment Steps

### **Step 1: Push Your Code to GitHub**

First, create a new repository on GitHub, then:

```bash
# If you haven't already, initialize git and commit
git add .
git commit -m "feat: add GitHub Pages deployment"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git push -u origin main
```

---

### **Step 2: Add Environment Variables as GitHub Secrets**

Your form needs the StaticForms API key to work. Add it as a GitHub secret:

1. **Go to your GitHub repository**
2. **Click**: Settings → Secrets and variables → Actions → New repository secret
3. **Add these secrets**:

   | Name | Value |
   |------|-------|
   | `VITE_STATICFORMS_API_KEY` | `sf_6889d4a80i4k8fk9nd478i7i` |
   | `VITE_RECIPIENT_EMAIL` | `graceful.agingteam@gmail.com` |

**Screenshot guide:**
```
Repository → Settings → Secrets and variables → Actions
                                                   ↓
                                        "New repository secret"
```

---

### **Step 3: Enable GitHub Pages**

1. **Go to**: Repository → Settings → Pages
2. **Source**: Select "GitHub Actions"
3. **Save**

That's it! GitHub Actions will now deploy automatically.

---

### **Step 4: Configure Base Path (IMPORTANT!)**

GitHub Pages uses a URL like: `https://username.github.io/repo-name/`

You need to set the base path:

**Option A: If using `username.github.io/repo-name/`**

```bash
# Update the workflow file to set base path
# Edit .github/workflows/deploy.yml and add this to the build step:
VITE_BASE_PATH: '/${{ github.event.repository.name }}/'
```

**Option B: If using a custom domain (e.g., `gracefulaging.com`)**

No changes needed! The default `/` base path works.

**Quick fix - Update your workflow:**

```yaml
# In .github/workflows/deploy.yml, line 29, add:
- name: Build client for GitHub Pages
  run: |
    npm run build:gh-pages
  env:
    VITE_BASE_PATH: '/${{ github.event.repository.name }}/'  # Add this line
    VITE_STATICFORMS_API_KEY: ${{ secrets.VITE_STATICFORMS_API_KEY }}
    VITE_RECIPIENT_EMAIL: ${{ secrets.VITE_RECIPIENT_EMAIL }}
```

---

## 📍 Finding Your Deployed Site

After the first deployment (takes ~2-3 minutes):

1. **Go to**: Repository → Actions tab
2. **Wait for**: Green checkmark (deployment complete)
3. **Visit**: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

Or check Settings → Pages for the live URL.

---

## 🔄 How Auto-Deployment Works

```
┌─────────────────────────────────────────────────────┐
│  1. You push code to GitHub                         │
│     git push origin main                            │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│  2. GitHub Actions workflow triggers                │
│     (.github/workflows/deploy.yml)                  │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│  3. Workflow builds your React app                  │
│     npm run build:gh-pages                          │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│  4. Deploys to GitHub Pages                         │
│     Uploads dist/public/ to gh-pages                │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│  5. Your site is live! 🎉                           │
│     https://username.github.io/repo-name            │
└─────────────────────────────────────────────────────┘
```

---

## 📝 Manual Deployment (Optional)

If you want to deploy manually instead of auto:

```bash
# Build the app
npm run build:gh-pages

# The built files are in dist/public/
# You can deploy them to any static hosting service
```

---

## 🐛 Troubleshooting

### **Issue: Deployment fails with "API key not found"**

**Solution**: Add secrets to GitHub (Step 2 above)

---

### **Issue: Site loads but form doesn't work**

**Solution**:
1. Check GitHub Secrets are set correctly
2. Verify StaticForms API key is valid
3. Check browser console for errors

---

### **Issue: Assets (images, CSS) not loading**

**Solution**: Base path issue. Update `VITE_BASE_PATH` in workflow:

```yaml
env:
  VITE_BASE_PATH: '/${{ github.event.repository.name }}/'
```

---

### **Issue: "404 There isn't a GitHub Pages site here"**

**Solution**:
1. Go to Settings → Pages
2. Ensure Source is set to "GitHub Actions"
3. Wait 2-3 minutes for first deployment
4. Check Actions tab for deployment status

---

### **Issue: Workflow runs but doesn't deploy**

**Solution**: Check that Pages permissions are enabled:
1. Settings → Actions → General
2. Workflow permissions → "Read and write permissions"
3. Save

---

## 🔧 Advanced Configuration

### **Using a Custom Domain**

1. **Add domain to GitHub Pages**:
   - Settings → Pages → Custom domain
   - Enter: `yourdomain.com`

2. **Update DNS records** (at your domain registrar):
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
          185.199.109.153
          185.199.110.153
          185.199.111.153
   ```

3. **Update workflow** (remove VITE_BASE_PATH):
   ```yaml
   env:
     VITE_BASE_PATH: '/'  # Root for custom domain
   ```

---

### **Deploy to a Different Branch**

To deploy from a branch other than `main`:

```yaml
# Edit .github/workflows/deploy.yml
on:
  push:
    branches:
      - production  # Change to your branch name
```

---

### **Preview Deployments (Pull Requests)**

Want to preview changes before merging? Add this workflow:

**File**: `.github/workflows/preview.yml`

```yaml
name: Preview Deployment

on:
  pull_request:
    branches:
      - main

jobs:
  preview:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build:gh-pages
        env:
          VITE_STATICFORMS_API_KEY: ${{ secrets.VITE_STATICFORMS_API_KEY }}
      - name: Deploy preview
        run: echo "Preview would be available at PR environments"
```

---

## 📊 Monitoring Deployments

### **Check Deployment Status**

1. **Actions Tab**: See all workflow runs
2. **Green checkmark**: ✅ Deployment succeeded
3. **Red X**: ❌ Deployment failed (click for logs)
4. **Yellow dot**: ⏳ Currently deploying

### **View Deployment Logs**

1. Go to Actions tab
2. Click on the workflow run
3. Click "build" or "deploy" job
4. Expand steps to see detailed logs

---

## 🎯 Quick Reference

| Task | Command |
|------|---------|
| **Build locally** | `npm run build:gh-pages` |
| **Dev server** | `npm run dev:client` |
| **Check types** | `npm run check` |
| **View build output** | `ls dist/public` |

---

## 📁 Files Created/Modified

1. ✅ `.github/workflows/deploy.yml` - GitHub Actions workflow
2. ✅ `vite.config.gh-pages.ts` - Production build config
3. ✅ `package.json` - Added `build:gh-pages` script
4. ✅ `GITHUB_PAGES_DEPLOYMENT.md` - This documentation

---

## ✅ Final Checklist

Before pushing to GitHub:

- [ ] Created GitHub repository
- [ ] Added repository secrets (API keys)
- [ ] Enabled GitHub Pages (Source: GitHub Actions)
- [ ] Updated `VITE_BASE_PATH` in workflow (if using repo URL)
- [ ] Committed all changes
- [ ] Ready to push!

---

## 🚀 Deploy Now!

```bash
# Commit the deployment configuration
git add .
git commit -m "feat: configure GitHub Pages deployment"

# Add your GitHub repo
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push and trigger deployment
git push -u origin main

# Watch the deployment in Actions tab!
```

---

## 📞 Need Help?

- **GitHub Actions logs**: Repository → Actions tab
- **GitHub Pages**: Repository → Settings → Pages
- **Build errors**: Check the workflow logs
- **Form not working**: Verify GitHub Secrets are set

---

## 🎉 Success!

Once deployed, your site will be live at:
- **GitHub Pages URL**: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`
- **Custom domain** (if configured): `https://yourdomain.com/`

The form will work with your StaticForms integration, sending emails to `graceful.agingteam@gmail.com` and auto-deleting after 30 days!
