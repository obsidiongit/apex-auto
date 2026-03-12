---
description: Start a new website project from the template
---

# New Website Project Workflow

Follow these steps to create a new website from the template.

## 1. Copy the Template

Copy the `template/` folder to your new project location:

```powershell
Copy-Item -Path "template" -Destination "C:\path\to\new-project" -Recurse
```

Or manually copy/paste the template folder.

## 2. Customize Brand Colors

Open `styles.css` and update the primary colors in the `:root` section:

```css
:root {
    --primary: #YOUR_COLOR;
    --primary-dark: #DARKER_SHADE;
    --primary-light: #LIGHTER_SHADE;
    --accent: #ACCENT_COLOR;
}
```

**Tip:** Use a tool like [coolors.co](https://coolors.co) to generate a color palette.

## 3. Update Hero Section

In `styles.css`, find the `.hero-bg` rule and either:
- Add a background image: `background: url('assets/hero-bg.jpg') center/cover no-repeat;`
- Or keep the gradient and adjust the colors

## 4. Replace Placeholder Content

In `index.html`, search for `{{` and replace all placeholders:

**Essential replacements:**
- `{{BUSINESS_NAME}}` - Your company name
- `{{TAGLINE}}` - Your slogan
- `{{PHONE_DISPLAY}}` - e.g., (555) 123-4567
- `{{PHONE_LINK}}` - e.g., +15551234567
- `{{EMAIL}}` - Your contact email
- `{{HERO_TITLE}}` - Main headline
- `{{HERO_DESCRIPTION}}` - Brief description
- `{{HERO_CTA}}` - Button text (e.g., "GET STARTED")

## 5. Add Your Assets

Place these files in the `assets/` folder:
- `logo.png` - Main logo (~200px wide)
- `hero-logo.png` - Optional hero image
- Any other images you need

## 6. Customize Services

Update the 6 service cards with your offerings:
- `{{SERVICE_1_TITLE}}` through `{{SERVICE_6_TITLE}}`
- `{{SERVICE_1_DESC}}` through `{{SERVICE_6_DESC}}`

You can also change the SVG icons inside each `.service-icon` div.

## 7. Add Testimonials

Replace the testimonial placeholders with real reviews:
- `{{TESTIMONIAL_1_TEXT}}`, `{{TESTIMONIAL_1_NAME}}`, etc.
- `{{FEATURED_REVIEW_TEXT}}`, `{{FEATURED_REVIEW_NAME}}`, etc.

## 8. Test Locally

// turbo
```powershell
npx serve
```

Or use VS Code's Live Server extension.

## 9. Deploy

Options for deployment:
- **Netlify**: Drag & drop the folder
- **Vercel**: Connect to your Git repo
- **GitHub Pages**: Push to a `gh-pages` branch
- **Cloudflare Pages**: Connect to Git

## Quick Checklist

- [ ] Colors updated in `:root`
- [ ] All `{{PLACEHOLDER}}` replaced
- [ ] Logo added to assets
- [ ] Services customized
- [ ] Contact info updated
- [ ] Testimonials added
- [ ] Tested on mobile
- [ ] Deployed
