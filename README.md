# LearnLattice — Deployment Guide

Your site is built with Hugo and deployed on Cloudflare Pages. A Decap CMS admin UI is included, but GitHub authentication for `/admin` requires a separate OAuth gateway and is not provided by Cloudflare Pages on its own.

---

## Step 1: Create a GitHub Repository

1. Go to github.com and sign in (create an account if needed)
2. Click the **+** icon → **New repository**
3. Name it `learnlattice`
4. Set it to **Public** (required for Decap CMS free tier)
5. Click **Create repository**

## Step 2: Push This Project to GitHub

On your computer, open a terminal and run:

```bash
cd learnlattice
git init
git add .
git commit -m "Initial LearnLattice site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/learnlattice.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 3: Update Decap CMS Config

Open `static/admin/config.yml` and change this line:

```yaml
repo: YOUR_GITHUB_USERNAME/learnlattice
```

to your actual GitHub username. Commit and push the change.

## Step 4: Connect Cloudflare Pages

1. Go to dash.cloudflare.com → **Workers & Pages** → **Create**
2. Select **Pages** → **Connect to Git**
3. Authorise GitHub and select the `learnlattice` repository
4. Configure build settings:
   - **Build command:** `hugo --minify`
   - **Build output directory:** `public`
   - **Environment variable:** Add `HUGO_VERSION` = `0.142.0`
5. Click **Save and Deploy**

Cloudflare will build and deploy your site. It'll give you a `*.pages.dev` URL.

## Step 5: Connect Your Domain

1. In Cloudflare Pages, go to your project → **Custom domains**
2. Add `learnlattice.org`
3. Since you're already on Cloudflare DNS, it should auto-configure
4. Wait a few minutes for DNS propagation

Your site will be live at https://learnlattice.org

## Step 6: Decide How You Want to Manage Content

### Option A: Git-first workflow

This is the simplest setup and is the one fully supported by the current deployment.

1. Edit Markdown files in `content/resources/`
2. Commit and push to GitHub
3. Cloudflare Pages rebuilds automatically

### Option B: Keep Decap CMS at `/admin`

The current admin config uses the `github` backend. That means the UI can load on Cloudflare Pages, but login will not work unless you add a separate OAuth gateway for Decap.

You need all of the following:
1. A GitHub OAuth app
2. A Decap-compatible auth gateway service
3. The gateway URL wired into the Decap config

Important:
- Netlify Identity instructions do **not** apply to this Cloudflare Pages deployment
- Cloudflare Pages does not provide Decap auth for GitHub automatically
- If you do not set up an OAuth gateway, `/admin` should be treated as a static shell only

If you want a browser-based CMS on Cloudflare, plan that explicitly as a separate integration task.

---

## How to Publish Content

### Recommended: edit content in Git

1. Add or edit Markdown files in `content/resources/`
2. Use the existing front matter structure from nearby resources
3. Commit and push to `main`
4. Cloudflare Pages rebuilds automatically

### If you later wire up Decap auth

The resource editor should use:
- **Subject** — Mathematics, Science, Biology, Ecology, Space Science, Earth Science, or Chemistry
- **Year Level** — MYP Year 1-5
- **Resource Type** — Unit Plan, Worksheet, Lab Activity, etc.
- **Tags** — topic tags such as Algebra, Cells, Ecology, Space Science, or Reaction Rates
- **Formula** — short text shown on the card thumbnail
- **Download File** — optional file upload
- **Body** — Markdown content

---

## File Structure

```
learnlattice/
├── hugo.toml              # Site configuration
├── assets/css/main.css    # All styles
├── content/
│   ├── resources/         # Your resource posts go here
│   └── pages/             # Static pages (About, etc.)
├── layouts/
│   ├── _default/          # Base templates
│   ├── resources/         # Resource-specific templates
│   └── partials/          # Reusable components
├── static/
│   ├── admin/             # Decap CMS UI shell (auth gateway not included)
│   └── uploads/           # Uploaded files (PDFs, images)
└── archetypes/            # Templates for new content
```

---

## Local Development (Optional)

If you want to preview changes locally:

1. Install Hugo: https://gohugo.io/installation/
2. Run `hugo server` in the project directory
3. Open http://localhost:1313

---

## Notes

- Production domain: `learnlattice.org`
- Cloudflare Pages project: `learnlattice`
- GitHub repo currently connected to Pages: `briscorey/learnlattice`
- Pages build root: `learnlattice-v2`

## Need Help?

Bring this project back here and ask for changes. The theme is primarily controlled by `layouts/`, `static/css/main.css`, and `hugo.toml`.
