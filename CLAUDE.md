# Claude AI Assistant Guide

This document helps AI assistants like Claude understand and work effectively with the Vital project.

## Project Overview

**Vital** is a modern React starter template built with the latest versions of Vite, React, TypeScript, and Tailwind CSS. It follows Atomic Design principles and includes comprehensive code quality tools.

## Tech Stack

### Core Framework
- **Vite 7.2.4** - Next-generation frontend build tool
- **React 19.2.0** - Latest React with improved performance
- **TypeScript 5.9.3** - Strict type checking enabled
- **Node.js**: >=18 required
- **Package Manager**: Yarn >=1.22.5

### Styling
- **Tailwind CSS v4.1.17** - Latest version with CSS-based configuration
- **@tailwindcss/forms 0.5.10** - Form styling plugin
- **PostCSS 8.5.6** with Autoprefixer 10.4.22

### Code Quality
- **ESLint 9.39.1** - Flat config format (ESLint 9+)
- **typescript-eslint 8.47.0** - TypeScript linting
- **Prettier 3.6.2** - Code formatting
- **lint-staged 16.2.7** - Pre-commit linting
- **Commitlint 20.0.0** - Conventional commits enforcement

### Additional Libraries
- **@heroicons/react 2.2.0** - Beautiful SVG icons

## Project Structure

```
vital/
├── public/
│   ├── favicon.svg
│   └── manifest.webmanifest
├── src/
│   ├── app/
│   │   └── app.tsx                    # Main App component
│   ├── components/                     # Atomic Design architecture
│   │   ├── atoms/                      # Basic building blocks
│   │   │   ├── button/
│   │   │   │   ├── button.tsx
│   │   │   │   └── index.ts
│   │   │   └── logos/
│   │   ├── molecules/                  # Simple component groups
│   │   │   └── copy-button/
│   │   ├── organisms/                  # Complex components
│   │   │   └── card/
│   │   └── templates/                  # Page layouts (empty)
│   ├── hooks/                          # Custom React hooks
│   ├── index.css                       # Global styles + Tailwind
│   ├── main.tsx                        # Entry point
│   └── vite-env.d.ts
├── commitlint.config.js
├── eslint.config.js                    # ESLint flat config
├── index.html                          # HTML entry
├── lint-staged.config.js
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json                       # Root TS config
├── tsconfig.app.json                   # App TS config
├── tsconfig.node.json                  # Node/Vite TS config
└── vite.config.ts
```

## Path Aliases

**IMPORTANT**: This project uses path aliases configured in both `vite.config.ts` and `tsconfig.app.json`.

### Available Aliases
```typescript
// Instead of: import Button from '../../components/atoms/button'
// Use:
import Button from "components/atoms/button";
import App from "app/app";
import { useCustomHook } from "hooks/useCustomHook";
```

**Configured paths:**
- `app/*` → `src/app/*`
- `components/*` → `src/components/*`
- `hooks/*` → `src/hooks/*`

## Available Scripts

```bash
yarn dev      # Start dev server on http://localhost:3000
yarn build    # TypeScript check + Vite build → dist/
yarn lint     # Run ESLint with auto-fix
yarn preview  # Preview production build locally
```

## TypeScript Configuration

### Key Settings (tsconfig.app.json)
- **Target**: ES2020
- **Module**: ESNext with Bundler resolution
- **JSX**: react-jsx (new transform, no React import needed)
- **Strict mode**: Enabled ✅
- **Additional strictness**:
  - `noUnusedLocals: true`
  - `noUnusedParameters: true`
  - `noFallthroughCasesInSwitch: true`
  - `noUncheckedSideEffectImports: true`

### Important
- Unused variables/parameters will cause compilation errors
- All imports must be properly typed
- Use `allowImportingTsExtensions: true` (Vite handles this)

## Tailwind CSS v4 Setup

**CRITICAL**: This project uses **Tailwind CSS v4**, which has a **CSS-first configuration** approach.

### Configuration (Pure CSS - NO tailwind.config.js)

Tailwind v4 does NOT use `tailwind.config.js`. All configuration is done in CSS using special directives.

### CSS Configuration (src/index.css)
```css
@import "tailwindcss" source(".");
@plugin "@tailwindcss/forms";

@layer base {
  /* Custom base styles */
}
```

**Key directives:**
- `@import "tailwindcss" source(".")` - Imports Tailwind and sets content path (relative to CSS file)
- `@plugin "@tailwindcss/forms"` - Loads official plugins
- `@theme { }` - Define custom design tokens (colors, spacing, fonts, etc.)
- `@utility { }` - Create custom utility classes
- `@source` - Additional content paths or safelisting

**Key differences from v3:**
- **NO tailwind.config.js** - All configuration in CSS
- No separate `@tailwind base/components/utilities` directives
- Use `@import "tailwindcss"` instead
- Content paths specified with `source()` function (relative to CSS file) or `@source` directive
- Plugins loaded via `@plugin` directive, not JS config
- Theme customization via `@theme` directive with CSS variables
- Requires `@tailwindcss/postcss` package for PostCSS integration

## Atomic Design Architecture

This project follows the Atomic Design methodology:

### Hierarchy
1. **Atoms** - Basic building blocks (Button, Logos)
2. **Molecules** - Simple component groups (CopyButton)
3. **Organisms** - Complex components (Card)
4. **Templates** - Page layouts (not yet used)
5. **Pages** - Specific instances (not yet used)

### Component Structure Pattern
```
component-name/
├── component-name.tsx    # Implementation
└── index.ts              # Default export
```

### Where to Place Components
- **Atoms**: Standalone UI elements (buttons, inputs, icons, badges)
- **Molecules**: 2-3 atoms working together (search box, form field, menu item)
- **Organisms**: Complex sections (header, card, form, navigation)

## Code Style & Patterns

### Component Pattern (Atoms)
```typescript
import { forwardRef, ComponentProps } from "react";

const Button = forwardRef<
  HTMLButtonElement,
  Omit<ComponentProps<"button">, "className">
>(({ children, ...rest }, ref) => {
  return (
    <button
      ref={ref}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...rest}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
```

### Component Pattern (with custom props)
```typescript
import { forwardRef, ComponentProps } from "react";

interface CardProps extends Omit<ComponentProps<"div">, "className"> {
  title: string;
  description: string;
  Icon?: React.ComponentType<{ className?: string }>;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ title, description, Icon, ...rest }, ref) => {
    return (
      <div ref={ref} className="p-6 bg-white rounded-lg shadow" {...rest}>
        {Icon && <Icon className="w-8 h-8 mb-4" />}
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
```

### Import Order
1. React imports
2. Third-party libraries (@heroicons, etc.)
3. Local components (using path aliases)
4. Types/interfaces (if separate file)

### Styling Conventions
- All Tailwind classes inline (no separate CSS modules)
- Responsive design: `sm:`, `md:`, `lg:`, `xl:` breakpoints
- Always include focus states for accessibility
- Color scheme: Purple/Blue/Gray dark theme
- Use Tailwind's utility classes, avoid custom CSS when possible

## ESLint Configuration

**Format**: ESLint 9 Flat Config (different from older `.eslintrc` format)

### Key Features
- Flat config array export
- TypeScript support via typescript-eslint
- React Hooks rules enforced
- React Refresh validation

### Common Rules
- `react-refresh/only-export-components`: Warns if non-components are exported from component files
- TypeScript strict rules enabled
- React Hooks rules enforced (exhaustive deps, rules of hooks)

## Git & Commit Conventions

### Commitlint (Conventional Commits)
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples
```
feat: add user authentication
fix: resolve navbar overflow on mobile
docs: update README with deployment instructions
refactor: simplify button component logic
```

### Pre-commit Hooks (lint-staged)
Automatically runs on staged files:
1. Prettier formatting (`*.{ts,tsx,css}`)
2. ESLint auto-fix (`*.{ts,tsx}`)
3. TypeScript type checking (`yarn tsc`)

## Build & Deployment

### Build Process
```bash
yarn build
# 1. Runs TypeScript compiler (type checking)
# 2. Runs Vite build
# 3. Outputs to dist/ directory
```

### Deployment Platforms
**Zero-config support:**
- **Netlify** - Auto-detects Vite configuration
- **Vercel** - Auto-detects Vite configuration

**Auto-configured:**
- Build Command: `yarn build`
- Output Directory: `dist`
- Install Command: `yarn install`

## Important Gotchas

### 1. Tailwind v4 is New
- Most online tutorials cover Tailwind v3
- **NO tailwind.config.js** - All configuration in CSS
- Configuration is 100% CSS-based using directives
- Import syntax: `@import "tailwindcss" source(".")`
- Content paths via `source()` function (relative to CSS file location), not JS config
- Plugins via `@plugin` directive, not `@import`
- Requires `@tailwindcss/postcss` package for PostCSS
- Theme customization via `@theme` directive with CSS variables

### 2. ESLint 9 Flat Config
- Uses new flat config format (not `.eslintrc`)
- Export default array, not object
- Different plugin API

### 3. React 19
- Latest React version (cutting edge)
- New JSX transform (no React import needed)
- Some third-party libraries may not be compatible yet

### 4. TypeScript Strictness
- Very strict configuration
- Unused variables will error (not warn)
- All imports must be typed

### 5. Module System
- Type: "module" in package.json
- All config files use ESM syntax (export default)
- No CommonJS (no require())

### 6. Dev Server Port
- Runs on `http://localhost:3000` (not default Vite 5173)
- Configured in `vite.config.ts`

## Common Tasks

### Adding a New Component
1. Determine level: atom, molecule, or organism
2. Create directory: `src/components/{level}/{name}/`
3. Create `{name}.tsx` with component implementation
4. Create `index.ts` with default export
5. Use path alias for imports: `import Component from "components/atoms/component"`

### Adding a Custom Hook
1. Create file: `src/hooks/useHookName.ts`
2. Export hook function
3. Import using path alias: `import { useHookName } from "hooks/useHookName"`

### Adding Global Styles
- Edit `src/index.css`
- Use Tailwind's `@layer` directive
- Available layers: `base`, `components`, `utilities`

### Debugging Build Issues
1. Check TypeScript: `yarn tsc --noEmit`
2. Check ESLint: `yarn lint`
3. Clear cache: `rm -rf node_modules/.vite`
4. Reinstall: `rm -rf node_modules && yarn install`

## File Reference

### Entry Points
- HTML: `index.html`
- JS Entry: `src/main.tsx`
- Main Component: `src/app/app.tsx`

### Configuration Files
- **Vite**: `vite.config.ts`
- **TypeScript (app)**: `tsconfig.app.json`
- **TypeScript (node)**: `tsconfig.node.json`
- **ESLint**: `eslint.config.js`
- **Tailwind**: `src/index.css` (CSS-first config, NO tailwind.config.js)
- **PostCSS**: `postcss.config.js`
- **Prettier**: Uses defaults (no config file)
- **Commitlint**: `commitlint.config.js`
- **lint-staged**: `lint-staged.config.js`

## What's NOT Included

- Testing framework (can add Vitest)
- Routing library (can add React Router)
- State management (can add Redux/Zustand)
- API layer/data fetching (can add React Query/SWR)
- Environment variables setup
- Form validation library

## Best Practices

### When Writing Code
1. Use TypeScript strictly (no `any` types)
2. Always use path aliases for imports
3. Follow Atomic Design for component placement
4. Use `forwardRef` for all components that wrap DOM elements
5. Extend `ComponentProps` for proper typing
6. Always include accessibility attributes (aria-*, alt, etc.)
7. Use Tailwind utilities, avoid custom CSS
8. Write semantic HTML

### When Editing Files
1. Run `yarn lint` before committing
2. Ensure TypeScript compiles: `yarn tsc --noEmit`
3. Test in browser: `yarn dev`
4. Follow conventional commit format

### When Adding Dependencies
1. Use `yarn add` (not npm install)
2. Add types if needed: `yarn add -D @types/package-name`
3. Update CLAUDE.md if it's a significant dependency

## Questions to Ask User

Before implementing features, consider asking:
- "Should this be an atom, molecule, or organism?"
- "Do you want TypeScript interfaces in the same file or separate?"
- "Should this component support refs?"
- "Do you need any accessibility features (ARIA, keyboard nav)?"
- "Should this be responsive? What breakpoints?"

## Summary

This is a modern, cutting-edge React template with:
- Latest versions (React 19, Vite 7, Tailwind v4)
- Strict TypeScript configuration
- Atomic Design architecture
- Comprehensive code quality tools
- Zero-config deployment

Follow the patterns established in existing components, use path aliases, and maintain the Atomic Design structure.
