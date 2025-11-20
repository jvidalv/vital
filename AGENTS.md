# AI Agent Development Guide

This guide helps AI agents build features and components for the Vital project efficiently and consistently.

## Quick Reference

- **Architecture**: Atomic Design (atoms → molecules → organisms → templates → pages)
- **Styling**: Tailwind CSS v4 (inline utility classes)
- **TypeScript**: Strict mode, use `forwardRef` and `ComponentProps`
- **Imports**: Use path aliases (`components/*`, `app/*`, `hooks/*`)
- **Commits**: Conventional commits format

## Component Creation Workflow

### Step 1: Determine Component Level

Ask yourself:

**Is it an Atom?**
- Single, standalone UI element
- No other components inside (except maybe icons)
- Highly reusable
- Examples: Button, Input, Badge, Avatar, Icon

**Is it a Molecule?**
- Combines 2-3 atoms
- Serves a single, clear purpose
- Examples: SearchBox (input + button), FormField (label + input + error), MenuItem (icon + text)

**Is it an Organism?**
- Complex, feature-rich component
- Contains multiple molecules and/or atoms
- Often domain-specific
- Examples: Header, Card, Form, Navigation, ProductCard

**Is it a Template?**
- Page layout structure
- Defines content areas
- No actual content, just placeholders
- Examples: DashboardLayout, AuthLayout

**Is it a Page?**
- Specific instance of a template
- Contains real content
- Examples: HomePage, LoginPage, UserProfilePage

### Step 2: Create Component Files

#### Directory Structure
```bash
# Atoms
src/components/atoms/{component-name}/
├── {component-name}.tsx
└── index.ts

# Molecules
src/components/molecules/{component-name}/
├── {component-name}.tsx
└── index.ts

# Organisms
src/components/organisms/{component-name}/
├── {component-name}.tsx
└── index.ts
```

#### File Naming
- Use **kebab-case** for directories: `copy-button`, `user-card`, `search-input`
- Use **kebab-case** for files: `copy-button.tsx`, not `CopyButton.tsx`
- Component name is **PascalCase**: `const CopyButton = ...`

### Step 3: Component Implementation

#### Template for Simple Atoms

```typescript
import { forwardRef, ComponentProps } from "react";

const ComponentName = forwardRef<
  HTMLElementType,
  Omit<ComponentProps<"element">, "className">
>(({ children, ...rest }, ref) => {
  return (
    <element
      ref={ref}
      className="tailwind classes here"
      {...rest}
    >
      {children}
    </element>
  );
});

ComponentName.displayName = "ComponentName";

export default ComponentName;
```

**Example: Badge Atom**
```typescript
import { forwardRef, ComponentProps } from "react";

const Badge = forwardRef<
  HTMLSpanElement,
  Omit<ComponentProps<"span">, "className">
>(({ children, ...rest }, ref) => {
  return (
    <span
      ref={ref}
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
      {...rest}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;
```

#### Template for Components with Custom Props

```typescript
import { forwardRef, ComponentProps } from "react";

interface ComponentNameProps extends Omit<ComponentProps<"element">, "className"> {
  customProp: string;
  optionalProp?: boolean;
}

const ComponentName = forwardRef<HTMLElementType, ComponentNameProps>(
  ({ customProp, optionalProp = false, children, ...rest }, ref) => {
    return (
      <element
        ref={ref}
        className="tailwind classes here"
        {...rest}
      >
        {children}
      </element>
    );
  }
);

ComponentName.displayName = "ComponentName";

export default ComponentName;
```

**Example: Card Organism**
```typescript
import { forwardRef, ComponentProps } from "react";

interface CardProps extends Omit<ComponentProps<"div">, "className"> {
  title: string;
  description: string;
  Icon?: React.ComponentType<{ className?: string }>;
  href?: string;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ title, description, Icon, href, ...rest }, ref) => {
    const content = (
      <>
        {Icon && <Icon className="w-12 h-12 text-purple-400 mb-4" />}
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </>
    );

    if (href) {
      return (
        <a
          ref={ref}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
          {...rest}
        >
          {content}
        </a>
      );
    }

    return (
      <div
        ref={ref}
        className="p-6 bg-gray-800 rounded-lg"
        {...rest}
      >
        {content}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
```

### Step 4: Create Index File

Always create an `index.ts` that exports the component:

```typescript
export { default } from "./component-name";
```

This allows clean imports:
```typescript
// Good ✅
import Button from "components/atoms/button";

// Bad ❌
import Button from "components/atoms/button/button";
```

### Step 5: Import and Use

```typescript
// In another component
import Button from "components/atoms/button";
import Card from "components/organisms/card";
import { BeakerIcon } from "@heroicons/react/24/outline";

function MyComponent() {
  return (
    <Card
      title="Title"
      description="Description"
      Icon={BeakerIcon}
    >
      <Button>Click me</Button>
    </Card>
  );
}
```

## Styling Guidelines

### Tailwind CSS v4 Best Practices

#### Use Utility Classes
```typescript
// Good ✅
<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
  Click me
</button>

// Bad ❌
<button style={{ padding: "8px 16px", background: "blue" }}>
  Click me
</button>
```

#### Responsive Design
```typescript
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Responsive grid */}
</div>
```

**Breakpoints:**
- `sm:` - 640px and up
- `md:` - 768px and up
- `lg:` - 1024px and up
- `xl:` - 1280px and up
- `2xl:` - 1536px and up

#### Color Scheme
The project uses a **dark theme** with purple/blue accents:

```typescript
// Primary colors
bg-gray-900      // Main background
bg-gray-800      // Card backgrounds
text-purple-400  // Primary text accents
text-blue-500    // Links and highlights
text-gray-300    // Secondary text
text-gray-400    // Tertiary text

// Interactive states
hover:bg-gray-700
focus:ring-2 focus:ring-blue-500
focus:outline-none
```

#### Accessibility
Always include focus states and ARIA attributes:

```typescript
<button
  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
  aria-label="Submit form"
>
  Submit
</button>
```

### Common Patterns

#### Buttons
```typescript
// Primary button
className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"

// Secondary button
className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"

// Outline button
className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
```

#### Cards
```typescript
className="p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
```

#### Inputs
```typescript
className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
```

#### Containers
```typescript
className="max-w-screen-lg xl:max-w-screen-xl mx-auto px-4"
```

## TypeScript Patterns

### Props Typing

#### Extending HTML Props
```typescript
// For DOM elements
interface ButtonProps extends Omit<ComponentProps<"button">, "className"> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
}

// For custom elements
interface CardProps extends Omit<ComponentProps<"div">, "className" | "onClick"> {
  title: string;
  onCardClick?: () => void;
}
```

#### Component Type Props
```typescript
interface Props {
  Icon?: React.ComponentType<{ className?: string }>;
  renderContent?: () => React.ReactNode;
  children?: React.ReactNode;
}
```

### ForwardRef Pattern

**Always use forwardRef** for components that wrap DOM elements:

```typescript
const Component = forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    return <div ref={ref} {...props} />;
  }
);

Component.displayName = "Component";
```

### Event Handlers

```typescript
interface Props {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}
```

## Adding Custom Hooks

### Step 1: Create Hook File

```bash
src/hooks/useHookName.ts
```

### Step 2: Implement Hook

```typescript
import { useState, useEffect } from "react";

export function useHookName(initialValue: string) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    // Hook logic
  }, []);

  return { value, setValue };
}
```

### Step 3: Import and Use

```typescript
import { useHookName } from "hooks/useHookName";

function Component() {
  const { value, setValue } = useHookName("initial");

  return <div>{value}</div>;
}
```

## State Management Patterns

### Local State (useState)

```typescript
function Component() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState<User | null>(null);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

### Form State

```typescript
function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
    </form>
  );
}
```

## Adding Global Styles

### In src/index.css

```css
@import "tailwindcss";
@import "@tailwindcss/forms";

@layer base {
  html {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }

  /* Add custom base styles */
}

@layer components {
  /* Add custom component styles */
  .btn {
    @apply px-4 py-2 rounded font-medium;
  }
}

@layer utilities {
  /* Add custom utilities */
  .text-shadow {
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
}
```

## Working with Icons

### Using Hero Icons

```typescript
import { BeakerIcon, UserIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/solid";

function Component() {
  return (
    <div>
      {/* Outline icons */}
      <BeakerIcon className="w-6 h-6 text-blue-500" />

      {/* Solid icons */}
      <HeartIcon className="w-6 h-6 text-red-500" />
    </div>
  );
}
```

### Passing Icons as Props

```typescript
interface Props {
  Icon?: React.ComponentType<{ className?: string }>;
}

const Component = ({ Icon }: Props) => {
  return (
    <div>
      {Icon && <Icon className="w-8 h-8" />}
    </div>
  );
};

// Usage
<Component Icon={BeakerIcon} />
```

## Testing Your Component

### Manual Testing Checklist

1. **Functionality**
   - [ ] Component renders without errors
   - [ ] All props work as expected
   - [ ] Event handlers fire correctly

2. **Styling**
   - [ ] Looks good on mobile (< 640px)
   - [ ] Looks good on tablet (640px - 1024px)
   - [ ] Looks good on desktop (> 1024px)
   - [ ] Focus states visible
   - [ ] Hover states work

3. **Accessibility**
   - [ ] Keyboard navigable
   - [ ] ARIA labels present
   - [ ] Color contrast sufficient
   - [ ] Alt text on images

4. **TypeScript**
   - [ ] No type errors: `yarn tsc --noEmit`
   - [ ] Props properly typed
   - [ ] No `any` types

5. **Code Quality**
   - [ ] ESLint passes: `yarn lint`
   - [ ] Prettier formatted
   - [ ] Follows project conventions

## Common Mistakes to Avoid

### ❌ Don't Do This

```typescript
// Using relative imports instead of path aliases
import Button from "../../atoms/button";

// Missing forwardRef
const Button = ({ children }: Props) => <button>{children}</button>;

// Inline styles instead of Tailwind
<button style={{ padding: "8px 16px" }}>Click</button>

// Not omitting className from props
interface Props extends ComponentProps<"button"> {
  variant: string;
}

// Using any type
const [data, setData] = useState<any>(null);

// Missing displayName
const Button = forwardRef<HTMLButtonElement, Props>(() => <button />);

// Hardcoding colors
className="text-[#3b82f6]"

// Missing accessibility
<button>Submit</button> // No aria-label or visible text
```

### ✅ Do This Instead

```typescript
// Use path aliases
import Button from "components/atoms/button";

// Use forwardRef
const Button = forwardRef<HTMLButtonElement, Props>(
  ({ children }, ref) => <button ref={ref}>{children}</button>
);

// Use Tailwind classes
<button className="px-4 py-2">Click</button>

// Omit className from props
interface Props extends Omit<ComponentProps<"button">, "className"> {
  variant: string;
}

// Proper typing
const [data, setData] = useState<User | null>(null);

// Add displayName
Button.displayName = "Button";

// Use Tailwind color classes
className="text-blue-500"

// Add accessibility
<button aria-label="Submit form">Submit</button>
```

## Git Workflow

### Before Committing

```bash
# 1. Check TypeScript
yarn tsc --noEmit

# 2. Run linter
yarn lint

# 3. Test in browser
yarn dev

# 4. Stage changes
git add .

# 5. Commit with conventional format
git commit -m "feat: add user profile card component"
```

### Commit Message Format

```
<type>(<scope>): <description>

[optional body]
```

**Types:**
- `feat`: New feature or component
- `fix`: Bug fix
- `refactor`: Code refactoring
- `style`: Styling changes
- `docs`: Documentation
- `chore`: Maintenance

**Examples:**
```
feat: add badge atom component
feat(organisms): add navigation header
fix: resolve button focus state on Safari
refactor: simplify card component logic
style: update button hover colors
```

## Questions to Consider

When building a feature, ask:

1. **Component Level**: Is this an atom, molecule, or organism?
2. **Reusability**: Will this be used in multiple places?
3. **Props**: What should be configurable vs. hardcoded?
4. **Refs**: Does this need to support refs?
5. **Accessibility**: What ARIA attributes are needed?
6. **Responsive**: How should this behave on mobile?
7. **States**: What interactive states exist (hover, focus, active, disabled)?

## Advanced Patterns

### Compound Components

```typescript
// components/organisms/dropdown/dropdown.tsx
const Dropdown = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {children}
    </div>
  );
};

const DropdownTrigger = ({ children }: Props) => {
  return <button>{children}</button>;
};

const DropdownMenu = ({ children }: Props) => {
  return <div>{children}</div>;
};

Dropdown.Trigger = DropdownTrigger;
Dropdown.Menu = DropdownMenu;

export default Dropdown;

// Usage
<Dropdown>
  <Dropdown.Trigger>Open</Dropdown.Trigger>
  <Dropdown.Menu>
    <MenuItem>Item 1</MenuItem>
  </Dropdown.Menu>
</Dropdown>
```

### Polymorphic Components

```typescript
type PolymorphicProps<E extends React.ElementType> = {
  as?: E;
} & Omit<React.ComponentProps<E>, "as">;

const Text = <E extends React.ElementType = "p">({
  as,
  children,
  ...props
}: PolymorphicProps<E>) => {
  const Component = as || "p";
  return <Component {...props}>{children}</Component>;
};

// Usage
<Text as="h1">Heading</Text>
<Text as="span">Span text</Text>
```

## Summary

1. **Determine component level** (atom, molecule, organism)
2. **Create proper file structure** (kebab-case directories)
3. **Implement with TypeScript** (forwardRef, ComponentProps)
4. **Style with Tailwind** (utility classes, responsive, accessible)
5. **Export via index.ts** (clean imports)
6. **Test thoroughly** (functionality, styling, accessibility)
7. **Commit with conventional format** (feat, fix, etc.)

Follow these patterns for consistency and maintainability!
