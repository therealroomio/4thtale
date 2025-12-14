# 4thtale Design System & Style Guide

A minimal, modern black and white design system for the 4thtale portfolio website.

## Philosophy

- **Minimal**: Clean, uncluttered interfaces that let content shine
- **Modern**: Contemporary design patterns with smooth interactions
- **Monochrome**: Black and white palette for sophisticated elegance
- **Responsive**: Mobile-first approach ensuring perfect display on all devices

---

## Color Palette

### Core Colors

```css
--color-black: #000000;       /* Primary text, CTA buttons */
--color-white: #ffffff;       /* Backgrounds, inverted text */
```

### Gray Scale

```css
--color-gray-50: #fafafa;     /* Subtle backgrounds */
--color-gray-100: #f5f5f5;    /* Surface backgrounds */
--color-gray-200: #e5e5e5;    /* Borders, dividers */
--color-gray-300: #d4d4d4;    /* Border hover states */
--color-gray-400: #a3a3a3;    /* Disabled states */
--color-gray-500: #737373;    /* Muted text */
--color-gray-600: #525252;    /* Secondary text */
--color-gray-700: #404040;    /* Body text */
--color-gray-800: #262626;    /* Headings */
--color-gray-900: #171717;    /* Primary headings */
```

### Semantic Colors

```css
--background: var(--color-white);
--foreground: var(--color-black);
--surface: var(--color-gray-50);
--border: var(--color-gray-200);
--border-hover: var(--color-gray-300);
--muted: var(--color-gray-500);
--accent: var(--color-black);
```

---

## Typography

### Font Family

- **Primary**: Inter, system-ui, -apple-system, sans-serif
- Optimized with Next.js font loading for performance

### Type Scale

```css
--font-size-xs: 0.75rem;      /* 12px - Small labels */
--font-size-sm: 0.875rem;     /* 14px - Navigation, captions */
--font-size-base: 1rem;       /* 16px - Body text */
--font-size-lg: 1.125rem;     /* 18px - Large body */
--font-size-xl: 1.25rem;      /* 20px - Subheadings */
--font-size-2xl: 1.5rem;      /* 24px - Section headers */
--font-size-3xl: 1.875rem;    /* 30px - Page titles */
--font-size-4xl: 2.25rem;     /* 36px - Hero text */
--font-size-5xl: 3rem;        /* 48px - Display text */
--font-size-6xl: 3.75rem;     /* 60px - Hero headlines */
```

### Responsive Typography

Use Tailwind's responsive variants:

```jsx
<h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
  Responsive Heading
</h1>
```

---

## Spacing System

```css
--space-xs: 0.5rem;   /* 8px */
--space-sm: 1rem;     /* 16px */
--space-md: 1.5rem;   /* 24px */
--space-lg: 2rem;     /* 32px */
--space-xl: 3rem;     /* 48px */
--space-2xl: 4rem;    /* 64px */
--space-3xl: 6rem;    /* 96px */
```

### Component Spacing

- **Sections**: `gap-16 sm:gap-20 md:gap-24` between major sections
- **Cards**: `gap-4 sm:gap-6` between grid items
- **Content**: `gap-3 sm:gap-4` within components

---

## Border Radius

```css
--radius-sm: 0.375rem;   /* 6px - Small elements */
--radius-md: 0.5rem;     /* 8px - Buttons, inputs */
--radius-lg: 0.75rem;    /* 12px - Cards (mobile) */
--radius-xl: 1rem;       /* 16px - Cards (desktop) */
--radius-2xl: 1.5rem;    /* 24px - Large cards */
--radius-full: 9999px;   /* Pills, circular elements */
```

---

## Shadows

Subtle shadows for minimal aesthetic:

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
```

### Usage

- **Floating Nav**: `shadow-lg` when scrolled
- **Dropdowns**: `shadow-xl`
- **Cards**: Hover state only, subtle lift effect

---

## Transitions

```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 350ms cubic-bezier(0.4, 0, 0.2, 1);
```

### Interactive States

- **Hover**: `hover:opacity-70` for images, `hover:scale-105` for CTAs
- **Active**: Minimal visual feedback, preserve elegance
- **Focus**: Subtle outline using border color

---

## Z-Index Scale

```css
--z-base: 0;        /* Normal flow */
--z-dropdown: 1000; /* Dropdowns */
--z-sticky: 1100;   /* Sticky elements */
--z-fixed: 1200;    /* Fixed navbar */
--z-modal: 1300;    /* Modals */
--z-popover: 1400;  /* Popovers */
--z-tooltip: 1500;  /* Tooltips */
```

---

## Components

### Navigation Bar

**Specs:**
- Fixed position at `top-6`
- Floating design with rounded-full borders
- Width: 95% with max-width of 6xl
- Background: Semi-transparent white with backdrop blur
- Shadow increases on scroll

**Responsive Behavior:**
- Desktop: Horizontal menu with dropdown
- Mobile: Hamburger menu with expandable panel

**Code Example:**
```jsx
<nav className="fixed left-1/2 top-6 z-[var(--z-fixed)] w-[95%] max-w-6xl -translate-x-1/2">
  {/* Content */}
</nav>
```

### Buttons

**Primary CTA:**
```jsx
<button className="rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white transition-all hover:scale-105 hover:shadow-md">
  Get In Touch
</button>
```

**Text Links:**
```jsx
<a className="text-sm font-medium transition-colors hover:text-gray-600">
  Link Text
</a>
```

### Cards

**Work Cards:**
```jsx
<div className="group overflow-hidden rounded-xl bg-white transition-transform hover:-translate-y-1 sm:rounded-2xl">
  <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
    {/* Image */}
  </div>
  <div className="px-4 py-4 sm:px-5 sm:py-5">
    {/* Content */}
  </div>
</div>
```

### Dropdowns

```jsx
<div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[var(--shadow-xl)]">
  <div className="p-2">
    {/* Menu items */}
  </div>
</div>
```

---

## Animations

### Scroll Reveal

```css
.reveal-base {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.reveal-visible {
  opacity: 1;
  transform: translateY(0);
}
```

### Fade In

```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 200ms ease-out;
}
```

---

## Responsive Breakpoints

```css
/* Tailwind default breakpoints */
sm: 640px   /* Tablet portrait */
md: 768px   /* Tablet landscape */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large desktop */
```

### Mobile-First Approach

Always design for mobile first, then enhance for larger screens:

```jsx
<div className="px-4 sm:px-6 lg:px-20">
  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
    Responsive Heading
  </h1>
</div>
```

---

## Layout Patterns

### Container

```jsx
<main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-20">
  {/* Content */}
</main>
```

### Section Spacing

```jsx
<div className="flex flex-col gap-16 sm:gap-20 md:gap-24">
  <section>{/* Section 1 */}</section>
  <section>{/* Section 2 */}</section>
</div>
```

### Grid Layouts

**Two Column:**
```jsx
<div className="grid gap-4 sm:gap-6 md:grid-cols-2">
  {/* Items */}
</div>
```

**Four Column:**
```jsx
<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
  {/* Items */}
</div>
```

---

## Best Practices

### DO ✓

- Use semantic HTML elements
- Maintain consistent spacing using the spacing scale
- Follow mobile-first responsive design
- Use CSS variables for consistent theming
- Keep interactions subtle and elegant
- Test on multiple screen sizes
- Use Next.js Image component for optimized images

### DON'T ✗

- Introduce colors outside the monochrome palette
- Use heavy shadows or gradients
- Create complex animations that distract
- Ignore accessibility (ARIA labels, semantic HTML)
- Mix spacing values outside the defined scale
- Use fixed pixel widths (use max-width with %)

---

## Accessibility

- Maintain 4.5:1 contrast ratio minimum (WCAG AA)
- Use semantic HTML5 elements
- Include ARIA labels where needed
- Ensure keyboard navigation works
- Test with screen readers
- Provide focus states for interactive elements

---

## File Structure

```
app/
  ├── Navbar.tsx          # Navigation component
  ├── page.tsx            # Main page with all sections
  ├── layout.tsx          # Root layout
  └── globals.css         # Design system CSS variables

public/
  └── images/             # Optimized images
```

---

## Usage Examples

### Services Dropdown Categories

1. **Art Direction** - Brand vision and creative direction
2. **3D Rendering & Modeling** - Immersive 3D experiences
3. **Animation & Motion** - Dynamic motion systems
4. **Brand Identity** - Visual identity design
5. **Physical Installations** - Experiential design

### Color Usage

- **Black**: Primary CTAs, headings, high-emphasis text
- **White**: Page backgrounds, button text on black
- **Gray-900/800**: Headings and subheadings
- **Gray-700/600**: Body text, labels
- **Gray-500**: Muted text, placeholders
- **Gray-200/300**: Borders, dividers
- **Gray-100/50**: Subtle backgrounds, surfaces

---

## Version

**Version**: 1.0
**Last Updated**: 2025-11-16
**Framework**: Next.js 16.0.3 with Tailwind CSS v4
