# Deploy Pasabuy Live to Vercel

Your app is a **static site** — it runs entirely in the browser and needs no server. That makes hosting on Vercel very easy. After deploying you'll get a URL like `https://pasabuy-live.vercel.app` that you can open on any phone and install like a real app.

## What's in this folder
- `index.html` — the app (calculator + live watcher + cloud sync)
- `manifest.webmanifest`, `sw.js`, `icon-*.png`, `apple-touch-icon.png` — make it installable as an app (icon, standalone, offline open)
- `vercel.json` — small config (clean URLs + correct service-worker headers)
- `CLOUD-SYNC-SETUP.md` — **read this after deploying** to turn on shared data across all your devices (Supabase, free)

Keep all files together in the same folder — the app links to them by name.

---

## Easiest way — drag & drop (no tools, ~2 minutes)
1. Go to **vercel.com** and log in.
2. This method uses the Vercel dashboard's import, which is easiest from a GitHub repo. If you'd rather not use GitHub, use the CLI method below — it's the true drag-and-drop equivalent and just as quick.

## Recommended — Vercel CLI (fastest, no GitHub)
On a computer with the folder:
1. Install Node.js if you don't have it (nodejs.org).
2. Open a terminal **in this folder** and run:
   ```
   npm i -g vercel
   vercel
   ```
3. Log in when prompted, accept the defaults (it detects a static site). When it asks "In which directory is your code located?" press Enter for the current folder.
4. It prints a **Preview URL**. To publish the permanent one:
   ```
   vercel --prod
   ```
5. Done — open the `.vercel.app` URL on your phone.

## Alternative — GitHub (nice for updates)
1. Put this folder in a new GitHub repository.
2. In Vercel: **Add New → Project → Import** your repo.
3. Framework preset: **Other** (it's static). Leave build/output settings empty. Click **Deploy**.
4. Every time you push a change to GitHub, Vercel redeploys automatically.

---

## Put it on your phone as an app
Once you have the URL:
- **iPhone (Safari):** open the URL → Share → **Add to Home Screen**.
- **Android (Chrome):** open the URL → ⋮ menu → **Install app / Add to Home screen**.

It opens full-screen with its own icon, just like a native app.

## Custom domain (optional)
In your Vercel project → **Settings → Domains**, you can add a domain you own (e.g. `orders.yourshop.com`) for free.

---

## Important things to know

**Your data and Facebook token stay on your device.** The app saves everything (orders, products, rates, and your FB token) in your phone's browser storage — it is never uploaded anywhere except directly to Facebook when watching comments. Even though the URL is public, anyone else who opens it just gets an empty app with their own storage; they can't see your data. Still, treat the token like a password and don't paste it on a shared/public computer.

**It watches only while the app is open.** Like now, the live watcher checks for comments while the app is open on your screen (foreground). Closing the app or locking the phone for a long time pauses watching until you reopen it. Keep the app open during your live or while a selling post is active.

**Want true 24/7 background watching + push notifications** (orders captured even when your phone is closed, and a buzz when one comes in)? That needs a small backend — Facebook webhooks + a database + push — which Vercel *can* host with serverless functions. It's a bigger build than this static site, but it's the natural next step if you want it fully hands-off. Just ask and I'll scope it.

**Updating the app later.** If I send you a new `index.html`, replace the old one and redeploy (`vercel --prod`, or push to GitHub). Because of the service worker, tell your phone to refresh — usually closing and reopening the installed app a couple of times picks up the new version.
