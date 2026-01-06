# Contributing to CipherCore Audits

Thank you for your interest in contributing to CipherCore Audits! This document provides guidelines and best practices for development.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style Guidelines](#code-style-guidelines)
- [Component Guidelines](#component-guidelines)
- [API Development](#api-development)
- [Testing](#testing)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

## 🤝 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the project
- Show empathy towards other contributors

## 🚀 Getting Started

1. **Fork the repository** and clone your fork
2. **Install dependencies**: `npm install`
3. **Create a branch**: `git checkout -b feature/your-feature-name`
4. **Start development server**: `npm run dev`
5. **Make your changes** following the guidelines below
6. **Test your changes**: `npm run check`
7. **Commit your changes**: Follow commit guidelines
8. **Push to your fork**: `git push origin feature/your-feature-name`
9. **Open a Pull Request**

## 💻 Development Workflow

### Branch Naming Convention

- `feature/` - New features (e.g., `feature/add-pricing-page`)
- `fix/` - Bug fixes (e.g., `fix/contact-form-validation`)
- `refactor/` - Code refactoring (e.g., `refactor/optimize-storage-layer`)
- `docs/` - Documentation updates (e.g., `docs/update-api-reference`)
- `style/` - Styling changes (e.g., `style/improve-mobile-nav`)

### Development Process

1. **Always work on a feature branch**, never directly on `main`
2. **Pull latest changes** before starting: `git pull origin main`
3. **Keep changes focused** - One feature/fix per branch
4. **Test locally** before pushing
5. **Run type checking**: `npm run check`
6. **Build to verify**: `npm run build`

## 🎨 Code Style Guidelines

### TypeScript

```typescript
// ✅ Good - Use explicit types for function parameters and return types
export function createUser(data: InsertUser): Promise<User> {
  // Implementation
}

// ❌ Bad - Avoid 'any' type
function createUser(data: any): any {
  // Implementation
}

// ✅ Good - Use const for immutable values
const MAX_MESSAGE_LENGTH = 2000;

// ❌ Bad - Avoid var
var maxLength = 2000;

// ✅ Good - Use interfaces for object shapes
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

// ✅ Good - Use type for unions and primitives
type Status = "pending" | "completed" | "failed";
```

### React Components

```typescript
// ✅ Good - Functional components with TypeScript
interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  onCtaClick: () => void;
}

export function HeroSection({ title, subtitle, ctaText, onCtaClick }: HeroSectionProps) {
  return (
    <section className="hero">
      <h1>{title}</h1>
      <p>{subtitle}</p>
      <button onClick={onCtaClick}>{ctaText}</button>
    </section>
  );
}

// ❌ Bad - Avoid default exports for components
export default function HeroSection() {
  // Implementation
}
```

### File Naming

- **Components**: PascalCase (e.g., `ContactForm.tsx`, `HeroSection.tsx`)
- **Utilities**: camelCase (e.g., `queryClient.ts`, `utils.ts`)
- **Pages**: lowercase with hyphens (e.g., `service-soc2.tsx`, `not-found.tsx`)
- **Types/Schemas**: camelCase (e.g., `schema.ts`, `types.ts`)

### Import Order

```typescript
// 1. External dependencies
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

// 2. Internal components
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ContactForm";

// 3. Utilities and types
import { cn } from "@/lib/utils";
import type { User } from "@shared/schema";

// 4. Styles (if applicable)
import "./styles.css";
```

## 🧩 Component Guidelines

### Component Structure

```typescript
// 1. Imports
import { useState } from "react";
import { Button } from "@/components/ui/button";

// 2. Types
interface MyComponentProps {
  title: string;
  onSubmit: (data: FormData) => void;
}

// 3. Component
export function MyComponent({ title, onSubmit }: MyComponentProps) {
  // 3a. Hooks
  const [isLoading, setIsLoading] = useState(false);

  // 3b. Event handlers
  const handleSubmit = async () => {
    setIsLoading(true);
    // Implementation
    setIsLoading(false);
  };

  // 3c. Render
  return (
    <div>
      <h2>{title}</h2>
      <Button onClick={handleSubmit} disabled={isLoading}>
        Submit
      </Button>
    </div>
  );
}
```

### Styling Guidelines

```typescript
// ✅ Good - Use Tailwind CSS utility classes
<div className="flex items-center justify-between p-4 rounded-lg bg-gray-100">
  <h2 className="text-2xl font-bold text-gray-900">Title</h2>
</div>

// ✅ Good - Use cn() for conditional classes
import { cn } from "@/lib/utils";

<button className={cn(
  "px-4 py-2 rounded-md",
  isActive && "bg-blue-500 text-white",
  isDisabled && "opacity-50 cursor-not-allowed"
)}>
  Click me
</button>

// ❌ Bad - Avoid inline styles unless absolutely necessary
<div style={{ display: "flex", padding: "16px" }}>
  Content
</div>
```

### Accessibility

```typescript
// ✅ Good - Include ARIA labels and semantic HTML
<button
  aria-label="Close dialog"
  onClick={handleClose}
  className="close-button"
>
  <X className="h-4 w-4" aria-hidden="true" />
</button>

// ✅ Good - Use semantic HTML
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/about">About</a></li>
    <li><a href="/services">Services</a></li>
  </ul>
</nav>

// ❌ Bad - Don't use div for interactive elements
<div onClick={handleClick}>Click me</div>
```

## 🔌 API Development

### Adding New Endpoints

1. **Define schema in `shared/schema.ts`**

```typescript
export const insertExampleSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().toLowerCase().trim(),
});

export type InsertExample = z.infer<typeof insertExampleSchema>;
```

2. **Add storage method in `server/storage.ts`**

```typescript
async createExample(insertExample: InsertExample): Promise<Example> {
  const id = randomUUID();
  const example: Example = {
    ...insertExample,
    id,
    createdAt: new Date(),
  };
  this.examples.set(id, example);
  return example;
}
```

3. **Add route in `server/routes.ts`**

```typescript
app.post("/api/examples", async (req, res) => {
  try {
    const parsed = insertExampleSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: "Invalid data",
        details: parsed.error.flatten()
      });
    }

    const example = await storage.createExample(parsed.data);

    res.status(201).json({
      success: true,
      data: example
    });
  } catch (error) {
    console.error("Example error:", error);
    res.status(500).json({ error: "Failed to create example" });
  }
});
```

### API Best Practices

- **Always validate** input with Zod schemas
- **Use proper HTTP status codes**: 200 (OK), 201 (Created), 400 (Bad Request), 500 (Error)
- **Return consistent response format**
- **Include error details** for validation failures
- **Log errors** for debugging
- **Use try-catch blocks** for error handling

## 🧪 Testing

### Type Checking

```bash
# Run TypeScript type checker
npm run check
```

### Manual Testing Checklist

Before submitting a PR, test:

- [ ] All forms validate correctly
- [ ] API endpoints return expected data
- [ ] Error states display properly
- [ ] Loading states work correctly
- [ ] Responsive design on mobile/tablet/desktop
- [ ] Accessibility with keyboard navigation
- [ ] Browser console has no errors

### Testing New Features

1. Test happy path (everything works correctly)
2. Test error cases (validation failures, network errors)
3. Test edge cases (empty inputs, very long inputs, special characters)
4. Test on different screen sizes
5. Test keyboard navigation and screen readers

## 📝 Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code refactoring
- `style`: Styling changes (CSS, formatting)
- `docs`: Documentation updates
- `chore`: Maintenance tasks (dependencies, config)
- `perf`: Performance improvements

### Examples

```bash
# Feature
feat(contact): add email validation to contact form

# Bug fix
fix(chat): resolve message ordering issue

# Refactoring
refactor(storage): simplify data access layer

# Documentation
docs(readme): update installation instructions

# Styling
style(hero): improve mobile responsiveness
```

### Commit Best Practices

- **Write clear, descriptive messages**
- **Keep commits focused** - One logical change per commit
- **Use present tense** - "Add feature" not "Added feature"
- **Reference issues** - Include issue numbers if applicable
- **Explain why**, not just what

## 🔄 Pull Request Process

### Before Submitting

1. **Sync with main branch**
   ```bash
   git checkout main
   git pull origin main
   git checkout your-branch
   git rebase main
   ```

2. **Run checks**
   ```bash
   npm run check
   npm run build
   ```

3. **Review your changes**
   ```bash
   git diff main
   ```

### PR Description Template

```markdown
## Description
Brief description of what this PR does

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Refactoring
- [ ] Documentation update

## Changes Made
- List of specific changes
- Another change
- etc.

## Testing
- [ ] Tested locally
- [ ] Type checking passes
- [ ] Build succeeds

## Screenshots (if applicable)
Add screenshots for UI changes

## Related Issues
Closes #123
```

### PR Guidelines

- **Keep PRs focused** - One feature/fix per PR
- **Write clear descriptions** - Explain what and why
- **Include screenshots** for UI changes
- **Reference related issues**
- **Respond to feedback** promptly
- **Update documentation** if needed

### Review Process

1. Automated checks must pass
2. At least one approval required
3. Address review comments
4. Maintain a professional and collaborative tone

## 🐛 Reporting Issues

### Bug Report Template

```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: [e.g., Windows 11]
- Browser: [e.g., Chrome 120]
- Node version: [e.g., 20.10.0]

## Screenshots
If applicable
```

### Feature Request Template

```markdown
## Feature Description
Clear description of the proposed feature

## Problem Statement
What problem does this solve?

## Proposed Solution
How should it work?

## Alternatives Considered
Other approaches you've thought about

## Additional Context
Any other relevant information
```

## 📚 Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Zod Documentation](https://zod.dev)
- [Express.js Guide](https://expressjs.com/)

## ❓ Questions?

If you have questions:
1. Check existing documentation
2. Search closed issues
3. Ask in discussions
4. Create a new issue

---

Thank you for contributing to CipherCore Audits! 🎉
