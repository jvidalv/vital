# Bug Debugging Guide for AI Assistants

This guide helps AI assistants debug issues in the Vital project efficiently.

## Quick Diagnostic Commands

```bash
# Type check
yarn tsc -b

# Lint check
yarn lint

# Format check
yarn format:check

# Build check
yarn build

# Clear cache and rebuild
rm -rf node_modules/.vite dist && yarn dev
```

## Common Error Patterns

### 1. TypeScript Errors

#### Error: "Cannot find module 'components/atoms/button'"

**Cause**: Path alias not recognized by TypeScript

**Solution**:

1. Check `tsconfig.app.json` has correct paths:

   ```json
   {
     "compilerOptions": {
       "paths": {
         "app/*": ["./src/app/*"],
         "components/*": ["./src/components/*"],
         "hooks/*": ["./src/hooks/*"]
       }
     }
   }
   ```

2. Check `vite.config.ts` still reads those paths:

   ```typescript
   resolve: {
     tsconfigPaths: true,
   }
   ```

3. Restart TypeScript server in your editor

#### Error: "TS5090: Non-relative paths are not allowed" / "TS5102: Option 'baseUrl' has been removed"

**Cause**: TypeScript 7 removed `baseUrl`, so `paths` entries are resolved relative to the tsconfig and must start with `./`

**Solution**: Remove `baseUrl` and write paths as `"components/*": ["./src/components/*"]`

#### Error: "Cannot find namespace 'JSX'"

**Cause**: React 19 types no longer declare a global `JSX` namespace

**Solution**: Let TypeScript infer the component's return type, or import the type from React: `import type { JSX } from "react";`

#### Error: "Property 'X' does not exist on type 'IntrinsicAttributes'"

**Cause**: Incorrect prop typing or missing type definition

**Solution**:

```typescript
// Bad ❌
interface Props {
  customProp: string;
}
const Component = ({ customProp, ...rest }: Props) => <div {...rest} />;

// Good ✅
interface Props extends Omit<ComponentProps<"div">, "className"> {
  customProp: string;
}
const Component = forwardRef<HTMLDivElement, Props>(
  ({ customProp, ...rest }, ref) => <div ref={ref} {...rest} />
);
```

#### Error: "Type 'X' is not assignable to type 'Y'"

**Cause**: Type mismatch

**Solution**:

1. Check the expected type in the error message
2. Ensure your value matches that type
3. Use type assertion if you're certain: `value as Type`
4. Or fix the actual type: `const [state, setState] = useState<Type>(initialValue)`

#### Error: "'X' is declared but never used"

**Cause**: Unused variable (strict mode enabled)

**Solution**:

1. Remove the unused variable
2. Or prefix with underscore if intentional: `_unusedVar`
3. Or use the variable

**Note**: This project has `noUnusedLocals` enabled, so this will cause compilation to fail.

#### Error: "Cannot use JSX unless the '--jsx' flag is provided"

**Cause**: File has wrong extension

**Solution**: Rename `.ts` file to `.tsx` for files with JSX

### 2. Lint Errors (Oxlint)

#### Error: "React Hook useEffect has a missing dependency"

**Cause**: Missing dependency in useEffect/useCallback/useMemo

**Solution**:

```typescript
// Bad ❌
const [count, setCount] = useState(0);
useEffect(() => {
  console.log(count);
}, []); // Missing dependency

// Good ✅
useEffect(() => {
  console.log(count);
}, [count]); // Include dependency

// Or if you really don't need it
useEffect(() => {
  console.log(count);
  // oxlint-disable-next-line react-hooks/exhaustive-deps
}, []);
```

#### Error: "Fast refresh only works when a file only exports components"

**Cause**: Exporting both components and other values from same file

**Solution**:

```typescript
// Bad ❌
export const Button = () => <button />;
export const BUTTON_TYPES = ["primary", "secondary"];

// Good ✅
// button.tsx
const Button = () => <button />;
export default Button;

// constants.ts
export const BUTTON_TYPES = ["primary", "secondary"];
```

#### Error: "Unsafe usage of optional chaining"

**Cause**: Optional chaining in potentially unsafe context

**Solution**:

```typescript
// Bad ❌
(obj?.method)(); // Throws a TypeError if obj is undefined

// Good ✅
obj?.method?.();
```

### 3. Vite/Build Errors

#### Error: "The requested module does not provide an export named 'X'"

**Cause**: Import doesn't match export

**Solution**:

1. Check if export is default or named:

   ```typescript
   // If file has: export default Button
   import Button from "components/atoms/button"; // ✅

   // If file has: export const Button
   import { Button } from "components/atoms/button"; // ✅
   ```

2. Check the `index.ts` file exports correctly:
   ```typescript
   // index.ts
   export { default } from "./button"; // For default exports
   export * from "./button"; // For named exports
   ```

#### Error: "Failed to resolve import"

**Cause**: Missing dependency or wrong path

**Solution**:

1. Install missing dependency: `yarn add package-name`
2. Check import path is correct
3. Clear Vite cache: `rm -rf node_modules/.vite`
4. Restart dev server

#### Error: "Optimized dependencies changed. Reloading..."

**Cause**: Vite detected dependency changes

**Solution**: This is normal, just wait for the reload. If it loops:

```bash
rm -rf node_modules/.vite
yarn dev
```

### 4. Tailwind CSS Errors

#### Issue: Tailwind classes not applying

**Causes & Solutions**:

1. **Classes not in content paths**

   Check `src/index.css` (Tailwind v4 uses CSS-first config):

   ```css
   @import "tailwindcss" source(".");
   ```

   This tells Tailwind to scan all files in the current directory (src/) and subdirectories.
   The path is relative to the CSS file location.

2. **Classes in template literals**

   ```typescript
   // Bad ❌ - Tailwind can't detect these
   const color = "blue";
   className={`text-${color}-500`}

   // Good ✅ - Use full class names
   const className = isActive ? "text-blue-500" : "text-gray-500"
   ```

3. **CSS import order wrong**

   In `src/index.css`:

   ```css
   @import "tailwindcss" source(".");
   @plugin "@tailwindcss/forms";

   /* Your custom CSS after */
   ```

4. **Tailwind v4 syntax issues**

   Remember this is v4, not v3:

   ```css
   /* Bad ❌ (v3 syntax) */
   @tailwind base;
   @tailwind components;
   @tailwind utilities;

   /* Good ✅ (v4 syntax) */
   @import "tailwindcss";
   ```

#### Issue: @apply not working

**Cause**: Incorrect layer or syntax

**Solution**:

```css
@layer components {
  .btn {
    @apply px-4 py-2 rounded; /* ✅ */
  }
}

/* Not in a layer */
.btn {
  @apply px-4 py-2 rounded; /* ❌ May not work */
}
```

### 5. React 19 Specific Issues

#### Warning: "ReactDOM.render is deprecated"

**Cause**: Using old React 18 API

**Solution**: This project uses React 19's new API:

```typescript
// Old ❌
ReactDOM.render(<App />, document.getElementById('root'));

// New ✅ (already in main.tsx)
import { createRoot } from 'react-dom/client';
createRoot(document.getElementById('root')!).render(<App />);
```

#### Error: "Hooks can only be called inside the body of a function component"

**Causes & Solutions**:

1. **Calling hook outside component**

   ```typescript
   // Bad ❌
   const value = useState(0);
   function Component() { ... }

   // Good ✅
   function Component() {
     const value = useState(0);
   }
   ```

2. **Calling hook conditionally**

   ```typescript
   // Bad ❌
   if (condition) {
     useState(0);
   }

   // Good ✅
   const [value, setValue] = useState(0);
   if (condition) {
     setValue(newValue);
   }
   ```

3. **Calling hook in loop**
   ```typescript
   // Bad ❌
   items.forEach(() => {
     useState(0);
   });

   // Good ✅
   const [items, setItems] = useState([]);
   ```

### 6. Import/Export Errors

#### Error: "Attempted import error"

**Debugging steps**:

1. **Check file exists**

   ```bash
   ls -la src/components/atoms/button/
   # Should show: button.tsx, index.ts
   ```

2. **Check index.ts exports**

   ```typescript
   // index.ts should have:
   export { default } from "./button";
   ```

3. **Check component file exports**

   ```typescript
   // button.tsx should have:
   const Button = () => { ... };
   export default Button;
   ```

4. **Check import syntax matches**
   ```typescript
   // If default export:
   import Button from "components/atoms/button";

   // If named export:
   import { Button } from "components/atoms/button";
   ```

### 7. Performance Issues

#### Issue: Slow hot module replacement (HMR)

**Solutions**:

1. **Clear Vite cache**

   ```bash
   rm -rf node_modules/.vite
   ```

2. **Reduce file watching**
   Check you don't have unnecessary files in `src/`

3. **Check for circular dependencies**
   ```bash
   # Install and run madge
   npx madge --circular src/
   ```

#### Issue: Large bundle size

**Debug**:

1. **Analyze bundle**

   ```bash
   yarn build
   npx vite-bundle-visualizer
   ```

2. **Check for unnecessary imports**
   ```typescript
   // Bad ❌
   import _ from "lodash"; // Imports entire library

   // Good ✅
   import debounce from "lodash/debounce"; // Import specific function
   ```

### 8. Runtime Errors

#### Error: "Cannot read properties of undefined (reading 'X')"

**Causes & Solutions**:

1. **Missing null check**

   ```typescript
   // Bad ❌
   const name = user.name;

   // Good ✅
   const name = user?.name;
   // or
   const name = user ? user.name : "Default";
   ```

2. **State not initialized**
   ```typescript
   // Bad ❌
   const [user, setUser] = useState();

   // Good ✅
   const [user, setUser] = useState<User | null>(null);
   ```

#### Error: "Cannot update a component while rendering a different component"

**Cause**: Setting state during render

**Solution**:

```typescript
// Bad ❌
function Component() {
  if (condition) {
    setState(value); // Don't set state during render
  }
  return <div />;
}

// Good ✅
function Component() {
  useEffect(() => {
    if (condition) {
      setState(value); // Set state in effect
    }
  }, [condition]);
  return <div />;
}
```

#### Error: "Too many re-renders"

**Cause**: Infinite render loop

**Solution**:

```typescript
// Bad ❌
function Component() {
  const [count, setCount] = useState(0);
  setCount(count + 1); // Infinite loop!
  return <div />;
}

// Good ✅
function Component() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count + 1); // Only runs once
  }, []); // Empty deps

  return <div />;
}

// Or event handler
function Component() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>+</button>;
}
```

## Debugging Workflows

### TypeScript Issues

```bash
# 1. Run type check with verbose output
yarn tsc -b --pretty

# 2. Check only the app (or node) project
yarn tsc -p tsconfig.app.json

# 3. Get trace for complex errors
yarn tsc -p tsconfig.app.json --extendedDiagnostics
```

### Lint Issues (Oxlint)

```bash
# 1. Run lint with detailed output
yarn lint --format stylish

# 2. Check specific file
npx oxlint src/path/to/file.tsx

# 3. Auto-fix issues
yarn lint:fix

# 4. Check what files are being linted
npx oxlint --debug=files

# 5. Show the resolved rules
npx oxlint --print-config
```

### Build Issues

```bash
# 1. Clean build
rm -rf dist node_modules/.vite
yarn build

# 2. Verbose build
yarn build --debug

# 3. Check bundle
npx vite-bundle-visualizer
```

### Runtime Issues

1. **Open Browser DevTools**
   - Chrome: Cmd+Option+I (Mac) or F12 (Windows)
   - Check Console tab for errors
   - Check Network tab for failed requests

2. **Use React DevTools**
   - Install React DevTools extension
   - Inspect component props/state
   - Check component hierarchy

3. **Add console.log debugging**

   ```typescript
   function Component() {
     console.log("Component rendering");
     const [state, setState] = useState(0);
     console.log("Current state:", state);

     useEffect(() => {
       console.log("Effect running");
     }, [state]);

     return <div />;
   }
   ```

4. **Use debugger statement**
   ```typescript
   function Component() {
     debugger; // Pauses execution here
     const value = someComplexCalculation();
     return <div />;
   }
   ```

## Environment Issues

### Port Already in Use

**Error**: "Port 3000 is already in use"

**Solution**:

```bash
# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
yarn dev --port 3001
```

### Node Version Issues

**Error**: `The engine "node" is incompatible with this module. Expected version ">=22.22.1"`, or various errors due to wrong Node version

**Solution**:

```bash
# Check current version
node --version

# Should be >= 22.22.1
# If not, install/switch to Node 24 LTS

# Using nvm:
nvm install 24
nvm use 24
```

### Yarn Issues

**Error**: `yarn: command not found`, or a newer Yarn rewriting `yarn.lock`

**Solution**: This project uses Yarn 1 (classic)

```bash
# Check version
yarn --version

# Should be 1.x
# Install if needed:
npm install -g yarn
```

## Preventive Measures

### Before Committing

```bash
# 1. Type check
yarn tsc -b

# 2. Lint and format
yarn lint
yarn format

# 3. Build
yarn build

# 4. Test in browser
yarn dev
# Open http://localhost:3000 and test functionality
```

### Code Review Checklist

- [ ] No TypeScript errors
- [ ] No Oxlint findings (`yarn lint`)
- [ ] Formatted (`yarn format:check`)
- [ ] Builds successfully
- [ ] Works in browser
- [ ] No console errors
- [ ] Responsive on mobile
- [ ] Accessible (keyboard navigation works)
- [ ] Proper git commit message

## Getting Help

### Useful Commands for Diagnostics

```bash
# Show package versions
yarn list --depth=0

# Show Vite info
npx vite --version

# Show TypeScript info
yarn tsc --version

# Show Node info
node --version

# Clear all caches
rm -rf node_modules/.vite node_modules/.tmp dist
yarn install
```

### Information to Provide

When reporting an issue, include:

1. **Error message** (full stack trace)
2. **Command that caused error**
3. **Relevant code snippet**
4. **File path**
5. **Node version**: `node --version`
6. **Yarn version**: `yarn --version`
7. **Browser** (if runtime error)
8. **What you've tried**

## Common Solutions Summary

| Problem              | Quick Fix                                                                   |
| -------------------- | --------------------------------------------------------------------------- |
| TypeScript errors    | `yarn tsc -b`                                                               |
| Linting errors       | `yarn lint:fix`                                                             |
| Build fails          | `rm -rf node_modules/.vite dist && yarn build`                              |
| HMR slow             | `rm -rf node_modules/.vite`                                                 |
| Import errors        | Check `paths` in `tsconfig.app.json` (Vite reads them via `tsconfigPaths`)  |
| Tailwind not working | Check `src/index.css` source directive: `@import "tailwindcss" source(".")` |
| Port in use          | `lsof -ti:3000 \| xargs kill -9`                                            |
| Dependencies weird   | `rm -rf node_modules yarn.lock && yarn install`                             |

## Advanced Debugging

### Enable Source Maps

The dev server (`yarn dev`) serves source maps by default. Check browser DevTools sources tab to see original TypeScript files. For production builds, set `build.sourcemap: true` in `vite.config.ts`.

### Performance Profiling

```typescript
// Add to component
import { Profiler } from "react";

function onRender(
  id: string,
  phase: "mount" | "update",
  actualDuration: number
) {
  console.log(`${id} (${phase}) took ${actualDuration}ms`);
}

<Profiler id="MyComponent" onRender={onRender}>
  <MyComponent />
</Profiler>
```

### Network Debugging

1. Open DevTools Network tab
2. Filter by type (XHR, JS, CSS, etc.)
3. Check response status codes
4. Inspect request/response headers
5. Check payload

### Memory Leaks

Use Chrome DevTools Memory tab:

1. Take heap snapshot
2. Perform action
3. Take another snapshot
4. Compare to find leaks

## Summary

**Most common issues:**

1. Path alias not working → Check `paths` in `tsconfig.app.json`
2. TypeScript error → Run `yarn tsc -b` for details
3. Lint error → Run `yarn lint` for details
4. Build error → Clear cache: `rm -rf node_modules/.vite dist`
5. Tailwind not working → Check v4 syntax in `index.css`

**First steps when debugging:**

1. Read the error message completely
2. Check the file and line number
3. Run diagnostic commands
4. Clear caches
5. Restart dev server

**When stuck:**

- Check this guide
- Check CLAUDE.md for project setup
- Check AGENTS.md for patterns
- Read official docs (Vite, React, TypeScript, Tailwind)
