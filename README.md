# Shamanth Kuthpadi Portfolio - Quarto Version

This is a Quarto-based portfolio website that has been converted from the original React portfolio.

## What is Quarto?

Quarto is a scientific and technical publishing system that allows you to create beautiful websites, books, presentations, and reports using Markdown. It's particularly well-suited for academic and technical content.

## Features

- **Static Site Generation**: Fast, lightweight website that can be hosted anywhere
- **Markdown-based**: Easy to write and maintain content
- **Math Support**: Built-in support for mathematical notation using MathJax
- **Responsive Design**: Mobile-friendly layout
- **Blog Capabilities**: Easy to add new blog posts and academic notes
- **No JavaScript Required**: Pure HTML/CSS for better performance

## File Structure

```
├── _quarto.yml          # Main Quarto configuration
├── index.qmd            # Home page
├── about.qmd            # About page with profile and publications
├── projects.qmd         # Projects showcase
├── blog.qmd             # Blog listing page
├── contact.qmd          # Contact information
├── styles.css           # Custom styling
├── _navbar.qmd          # Navigation partial
├── _footer.qmd          # Footer partial
├── profile.jpeg         # Profile image
└── resume.pdf           # Resume/CV
```

## Getting Started

### Prerequisites

1. Install Quarto: https://quarto.org/docs/get-started/
2. Ensure you have the profile image (`profile.jpeg`) and resume (`resume.pdf`) in the root directory

### Building the Site

```bash
# Preview the site locally
quarto preview

# Build the site
quarto render

# Build and serve locally
quarto preview --render
```

### Adding New Content

#### New Blog Post

Create a new `.qmd` file in the root directory and add it to the blog listing in `blog.qmd`.

#### New Project

Add new projects to the `projects.qmd` file using the existing project card format.

#### Update Publications

Modify the publications section in `about.qmd` to add new research work.

## Customization

### Styling

- Modify `styles.css` to change colors, fonts, and layout
- The design replicates the original React portfolio's dark theme with blue accents

### Navigation

- Edit `_navbar.qmd` to modify the navigation menu
- Update `_quarto.yml` to change the site structure

### Math Support

- Use `$...$` for inline math
- Use `$$...$$` for display math
- MathJax is configured to handle LaTeX-style notation

## Deployment

The built site will be in the `_site` directory. You can deploy this to:

- **GitHub Pages**: Push the `_site` contents to a `gh-pages` branch
- **Netlify**: Drag and drop the `_site` folder
- **Vercel**: Connect your repository and set build command to `quarto render`
- **Any static hosting service**: The `_site` folder contains pure HTML/CSS

## Contact Form

The contact form from the React version has been replaced with direct contact information. To add a working contact form, you can:

1. Use Netlify Forms (free)
2. Use Formspree (free tier available)
3. Implement a custom backend solution

## Benefits of Quarto Over React

- **Faster**: No JavaScript bundle to load
- **Easier Maintenance**: Markdown is simpler than JSX
- **Better SEO**: Static HTML is more search engine friendly
- **Academic Focus**: Better support for mathematical notation and citations
- **Hosting**: Can be hosted on any static hosting service
- **Performance**: Faster page loads and better accessibility

## Migration Notes

This Quarto version maintains:

- The same visual design and color scheme
- All the original content and structure
- Responsive design for mobile devices
- The dark theme aesthetic

Changes made:

- Removed React-specific animations (typing effects, scroll indicators)
- Simplified the contact form to direct contact methods
- Converted JSX components to Markdown with custom CSS classes
- Added Quarto-specific features like math support

## Support

For Quarto-specific questions, check the [Quarto documentation](https://quarto.org/docs/).
For styling issues, refer to the CSS file and Quarto's HTML output format.
