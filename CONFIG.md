# Configuration Quick Reference

Quick-reference for customizing your website template.

---

## CSS Variables (styles.css)

### Primary Colors
```css
--primary: #2563eb;           /* Main brand color */
--primary-dark: #1d4ed8;      /* Hover states, darker elements */
--primary-light: #60a5fa;     /* Highlights, accents */
--accent: #3b82f6;            /* Secondary accent color */
```

### Color Examples

| Industry | Primary | Dark | Light |
|----------|---------|------|-------|
| Blue (default) | `#2563eb` | `#1d4ed8` | `#60a5fa` |
| Green | `#16a34a` | `#15803d` | `#4ade80` |
| Purple | `#9333ea` | `#7e22ce` | `#c084fc` |
| Orange | `#ea580c` | `#c2410c` | `#fb923c` |
| Red | `#dc2626` | `#b91c1c` | `#f87171` |
| Teal | `#0d9488` | `#0f766e` | `#2dd4bf` |

---

## HTML Placeholders (index.html)

### Business Info
| Placeholder | Example |
|-------------|---------|
| `{{BUSINESS_NAME}}` | Acme Services |
| `{{TAGLINE}}` | Quality work, every time |
| `{{META_DESCRIPTION}}` | Professional services in Your City... |

### Contact
| Placeholder | Example |
|-------------|---------|
| `{{PHONE_DISPLAY}}` | (555) 123-4567 |
| `{{PHONE_LINK}}` | +15551234567 |
| `{{EMAIL}}` | hello@example.com |
| `{{HOURS}}` | Mon-Fri: 9am - 5pm |
| `{{LOCATION}}` | Your City, State |

### Hero
| Placeholder | Example |
|-------------|---------|
| `{{HERO_LABEL}}` | Welcome to |
| `{{HERO_TITLE}}` | Your Main Headline |
| `{{HERO_DESCRIPTION}}` | Brief description... |
| `{{HERO_CTA}}` | GET STARTED |
| `{{CTA_TEXT}}` | CALL NOW |

### Services (repeat for 1-6)
| Placeholder | Example |
|-------------|---------|
| `{{SERVICE_1_TITLE}}` | Web Design |
| `{{SERVICE_1_DESC}}` | Custom websites... |

### Stats
| Placeholder | Example |
|-------------|---------|
| `{{STAT_1_NUMBER}}` | 10+ |
| `{{STAT_1_LABEL}}` | Years Experience |

---

## Asset Sizes

| Asset | Recommended Size |
|-------|------------------|
| `logo.png` | 200×100px (or height ~100px) |
| `hero-logo.png` | 400×400px (square-ish) |
| `hero-bg.jpg` | 1920×1080px |

---

## Google Fonts (index.html)

Change the font by updating the `<link>` in `<head>`:

```html
<!-- Default: Inter -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">

<!-- Alternative: Poppins -->
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">

<!-- Alternative: Outfit -->
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

Then update `styles.css`:
```css
--font-primary: 'Poppins', sans-serif;
--font-heading: 'Poppins', sans-serif;
```
