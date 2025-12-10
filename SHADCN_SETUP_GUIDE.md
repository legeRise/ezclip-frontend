# Adding shadcn/ui to Any Vite + React Project

A step-by-step guide to add shadcn/ui to an existing or new Vite + React project with Tailwind CSS v4.

---

## Prerequisites

- Node.js 18+ installed
- An existing Vite + React project with Tailwind CSS v4
- npm (or yarn/pnpm)

---

## Quick Start (5 Steps)

### Step 1: Install Dependencies

```bash
npm install class-variance-authority clsx tailwind-merge lucide-react tw-animate-css
npm install -D @types/node
```

**What these do:**
- `class-variance-authority` - Creates component variants (like button sizes/colors)
- `clsx` - Conditionally join classNames together
- `tailwind-merge` - Merge Tailwind classes without conflicts
- `lucide-react` - Icon library used by shadcn components
- `tw-animate-css` - Animation utilities for Tailwind v4
- `@types/node` - Node.js types for path resolution

---

### Step 2: Create `jsconfig.json` (Root Directory)

Create `jsconfig.json` in your project root:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
```

> **For TypeScript projects:** Add the same `paths` to your `tsconfig.json` instead.

---

### Step 3: Update `vite.config.js`

Add path alias resolution to your Vite config:

```js
import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

---

### Step 4: Update `src/index.css`

Replace your CSS file content with shadcn's theme variables:

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --radius: 0.625rem;
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.145 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.145 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.396 0.141 25.723);
  --destructive-foreground: oklch(0.637 0.237 25.331);
  --border: oklch(0.269 0 0);
  --input: oklch(0.269 0 0);
  --ring: oklch(0.439 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(0.269 0 0);
  --sidebar-ring: oklch(0.439 0 0);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

---

### Step 5: Create `src/lib/utils.js`

Create the utility function for merging classes:

```js
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
```

---

### Step 6: Create `components.json` (Root Directory)

Create the shadcn configuration file:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": false,
  "tailwind": {
    "config": "",
    "css": "src/index.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components/shadcn",
    "utils": "@/lib/utils",
    "ui": "@/components/shadcn",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

**Configuration options explained:**
- `tsx: false` - Generate `.jsx` files instead of `.tsx`
- `rsc: false` - Disable React Server Components (for Vite)
- `style: "new-york"` - Modern style (or use `"default"` for original style)
- `aliases.ui` - Where components will be generated

---

## Adding Components

Now you can add any shadcn component:

```bash
# Add a single component
npx shadcn@latest add button

# Add multiple components
npx shadcn@latest add button card input

# Add all components (not recommended)
npx shadcn@latest add --all
```

Components will be created in `src/components/shadcn/`.

---

## Using Components

Import and use components in your React files:

```jsx
import { Button } from "@/components/shadcn/button"

function MyComponent() {
  return (
    <div>
      <Button>Click me</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="outline" size="lg">Large Outline</Button>
    </div>
  )
}
```

---

## Popular Components to Start With

```bash
# Essential UI components
npx shadcn@latest add button card input label

# Forms
npx shadcn@latest add form input textarea select checkbox

# Feedback
npx shadcn@latest add alert dialog toast

# Navigation
npx shadcn@latest add dropdown-menu navigation-menu tabs

# Data display
npx shadcn@latest add table badge avatar
```

---

## Dark Mode Setup

Add a class to toggle dark mode on your `<html>` element:

```jsx
// Toggle dark mode
document.documentElement.classList.toggle('dark')
```

Or use a theme provider - shadcn has one you can add:

```bash
npx shadcn@latest add theme
```

---

## Customizing Theme Colors

Edit the CSS variables in `src/index.css` to change colors:

```css
:root {
  --primary: oklch(0.6 0.2 250);  /* Change primary color */
  --radius: 0.5rem;               /* Change border radius */
}
```

Use the [shadcn themes tool](https://ui.shadcn.com/themes) to generate custom color schemes.

---

## TypeScript Projects

For TypeScript projects, change these in `components.json`:

```json
{
  "tsx": true,
  ...
}
```

And add paths to `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## Troubleshooting

### "Module not found" errors
- Ensure `vite.config.js` has the path alias configured
- Restart the dev server after config changes

### Components not styled correctly
- Check that `src/index.css` is imported in `main.jsx`
- Verify CSS variables are defined in `:root`

### TypeScript errors in JSX project
- Set `"tsx": false` in `components.json`
- Rename any `.tsx` files to `.jsx`

---

## Quick Reference

| File | Purpose |
|------|---------|
| `components.json` | shadcn CLI configuration |
| `jsconfig.json` | Path alias for imports |
| `vite.config.js` | Vite build configuration |
| `src/index.css` | Theme CSS variables |
| `src/lib/utils.js` | cn() utility function |
| `src/components/shadcn/` | Generated components |

---

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Component Examples](https://ui.shadcn.com/examples)
- [Theme Generator](https://ui.shadcn.com/themes)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
