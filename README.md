# Website Template

A professional, responsive single-page website template built with HTML, CSS, and vanilla JavaScript. Perfect for small businesses, service providers, and local companies.

## Quick Start

1. **Copy the template folder** to your new project location
2. **Update colors** in `styles.css` (see `:root` section at the top)
3. **Replace placeholder content** in `index.html` (search for `{{`)
4. **Add your assets** to the `assets/` folder
5. **Test locally** with a live server
6. **Deploy** to your hosting provider

## Files Overview

```
template/
├── index.html      # Main HTML with placeholder content
├── styles.css      # CSS design system with customizable variables  
├── script.js       # JavaScript utilities (navigation, forms, animations)
├── assets/         # Place your logos and images here
│   └── .gitkeep
├── README.md       # This file
└── CONFIG.md       # Quick reference for customization
```

## Customization

### 1. Brand Colors (styles.css)

Open `styles.css` and find the `:root` section at the top. Update these variables:

```css
:root {
    --primary: #2563eb;           /* Your main brand color */
    --primary-dark: #1d4ed8;      /* Darker shade for hovers */
    --primary-light: #60a5fa;     /* Lighter accent */
    --accent: #3b82f6;            /* Secondary accent */
}
```

### 2. Content (index.html)

Search for `{{` in `index.html` to find all placeholder variables. Key ones include:

| Variable | Description |
|----------|-------------|
| `{{BUSINESS_NAME}}` | Your company name |
| `{{TAGLINE}}` | Short tagline/slogan |
| `{{PHONE_DISPLAY}}` | Formatted phone number |
| `{{PHONE_LINK}}` | Phone number for `tel:` links |
| `{{EMAIL}}` | Contact email |
| `{{HERO_TITLE}}` | Main headline in hero |
| `{{SERVICE_X_TITLE}}` | Service card titles |

### 3. Assets

Place these images in the `assets/` folder:
- `logo.png` - Main logo (recommended: 200px width)
- `hero-logo.png` - Optional larger hero image
- `hero-bg.jpg` - Optional hero background image

### 4. Typography (Optional)

The template uses **Inter** from Google Fonts. To change fonts:
1. Update the `<link>` tag in `index.html`
2. Update `--font-primary` and `--font-heading` in `styles.css`

## Sections Included

- **Top Bar** - Contact info and quick message
- **Navigation** - Sticky nav with mobile hamburger menu
- **Hero** - Full-width hero with CTA and rating badges
- **Contact Bar** - Quick-access phone/email/hours cards
- **Services** - 6-card grid for your offerings
- **About** - Company story with stats and feature cards
- **Reviews** - Featured review + testimonials grid
- **Contact** - Business card style with CTAs
- **Footer** - Links, services, and contact info

## Deployment

### Static Hosting (Recommended)

Works great with:
- **Netlify** - Drag & drop deploy
- **Vercel** - Connect to Git
- **GitHub Pages** - Free hosting
- **Cloudflare Pages** - Fast global CDN

### Local Development

Use any live server:
```bash
# Using Python
python -m http.server 3000

# Using Node.js (npx)
npx serve

# Using VS Code
# Install "Live Server" extension, right-click index.html
```

## Browser Support

- Chrome, Edge, Firefox, Safari (latest 2 versions)
- Mobile responsive (down to 320px width)

## License

Free for personal and commercial use.
