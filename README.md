# Portfolio

Static, single-page portfolio. Plain HTML, CSS and JavaScript: no build step, no dependencies, works on any static host.

```
index.html              all content lives here
assets/css/styles.css   design tokens (colours, fonts) at the top, then sections
assets/js/main.js       theme toggle, mobile menu, project filters, scroll reveal
assets/img/             favicon and the social-share image (og.png)
```

## Preview locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy for free

### Option A: GitHub Pages (this site's home)

Live at `https://malishouket.github.io`, free, with HTTPS.

1. On GitHub, create a new **public**, empty repository named exactly `malishouket.github.io`
   (no README, no .gitignore, no licence).
2. Push this folder to it:

```bash
cd ~/Documents/portfolio
git remote add origin git@github-malishouket:malishouket/malishouket.github.io.git   # first time only
git push -u origin main
```

`github-malishouket` is an SSH host alias, so the push uses the key that belongs to this GitHub account.

The site is live a minute or two after the first push. If it is not, open the repository on GitHub, go to Settings,
then Pages, and set the source to "Deploy from a branch", branch `main`, folder `/ (root)`.

To update later: edit, then `git add . && git commit -m "Update" && git push`.

### Option B: Netlify Drop (no Git, about one minute)

1. Go to https://app.netlify.com/drop and sign up (free).
2. Drag the whole `portfolio` folder onto the page.
3. In Site settings, change the site name to get `https://your-name.netlify.app`.

### Option C: Cloudflare Pages

Create a Pages project, choose "Upload assets", and upload this folder. You get `https://your-name.pages.dev` with
unlimited bandwidth.

## Link previews

The share-card tags in `index.html` (`og:url`, `og:image`, `canonical`) point at `https://malishouket.github.io`.
If you ever move the site to another address, update those three URLs. You can test the preview at
https://www.linkedin.com/post-inspector/.

## Editing content

- **Profile links:** GitHub, LinkedIn and phone are in the `socials` paragraph in the Contact section of `index.html`.
- **Projects:** each project is an `<article class="project">`. The `data-tags` attribute controls which filter
  buttons show it (`agents`, `ai`, `backend`, `fullstack`). Counts update automatically.
- **Colours and fonts:** the `:root` block at the top of `styles.css`. Light and dark values are defined separately.
- **Social image:** `assets/img/og.png` is 1200 x 630.

## Custom domain (optional)

All three hosts let you attach your own domain for free; you only pay for the domain itself (roughly $10 to $15 a
year). A custom domain looks stronger on a resume, but the free subdomain works fine.
