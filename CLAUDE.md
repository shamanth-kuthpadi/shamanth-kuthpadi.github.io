# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Quarto-based academic portfolio website for a CS graduate student. Deployed on Netlify at shamanthkuthpadi.com.

## Build & Preview

```bash
# Build the site (outputs to _site/)
quarto render

# Preview with live reload
quarto preview

# Alternative build via script
./build.sh
```

Quarto must be installed (`brew install quarto` or from https://quarto.org/docs/get-started/).

## Architecture

- **`_quarto.yml`** — Main site configuration (theme, navbar, footer, format options)
- **`_publish.yml`** — Netlify deployment config
- **`index.qmd`** — Homepage (about, news feed, publications)
- **`blog.qmd`** — Blog listing page (grid layout, pulls from `posts/`)
- **`contact.qmd`** — Contact page
- **`styles.css`** — Custom CSS (news feed scrollable section, scrollbar styling)
- **`_footer.html`** — Custom footer HTML partial
- **`posts/_metadata.yml`** — Shared metadata for all blog posts (freeze, layout, title-block)

## Blog Posts

Every post lives in its own folder under `posts/` with the naming convention `YYYY-MM-DD-topic/`. Inside each folder:

- **`index.qmd`** for markdown posts (supports full LaTeX math) or **`index.ipynb`** for Jupyter notebook posts
- Any images/assets used by the post

To create a new post: `mkdir posts/YYYY-MM-DD-topic/` and add an `index.qmd` or `index.ipynb` with frontmatter (title, author, date, categories, image, draft).

- Set `draft: false` in frontmatter to publish (most posts are currently `draft: true`)
- Computational output is frozen via `posts/_metadata.yml` (`freeze: true`), cached in `_freeze/`

## Deployment

Netlify deploys from the `_site/` output directory. Publishing is configured in `_publish.yml`. Run `quarto publish netlify` to deploy.
