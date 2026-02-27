# AGENTS.md

Coding agent guidelines for the resume-plus repository.

## Project Overview

Online resume generator built with Gatsby, React, TypeScript, and Ant Design. Users can preview, edit, and download PDF resumes with customizable templates and themes.

## Build / Development Commands

```bash
# Prerequisites: pnpm required (https://pnpm.io/installation)
pnpm install          # Install dependencies
npm start             # Development server (cleans cache first)
npm run build         # Production build with path prefix
npm run clean         # Clear Gatsby cache
npm run format        # Format all files with Prettier
npm run deploy        # Build and deploy to gh-pages
npm run extract       # Extract i18n messages for translation
```

**No test framework configured.** Testing commands not available.

## Code Style Guidelines

### Formatting (Prettier)

- **Single quotes** for strings
- **Semicolons** required
- **Arrow parens: avoid** - `() => {}` not `(x) => {}`
- Run `npm run format` before committing

### ESLint Rules

- Single quotes required
- Semicolons required
- Unix linebreak style
- `no-unused-vars` is OFF (but avoid unused imports)

### TypeScript

- Target: ES5, Module: CommonJS
- JSX mode: `react`
- Path alias: `@/*` → `./src/*` (use for all src imports)
- `strict` mode NOT enabled - but write type-safe code anyway
- Avoid `any` - define proper types in `types.ts` files

## Import Organization

Organize imports in this order:

1. React imports
2. Third-party libraries (antd, lodash-es, etc.)
3. Local imports using `@/` alias
4. Type imports (use `import type`)
5. Styles (`.less` files)

```typescript
// Example
import React, { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import _ from 'lodash-es';
import { FormattedMessage, useIntl } from 'react-intl';
import Header from '@/layout/header';
import type { ResumeConfig } from '@/components/types';
import './index.less';
```

## Component Patterns

### Functional Components

Use `React.FC<Props>` with explicit type definitions:

```typescript
type Props = {
  value: ResumeConfig;
  theme: ThemeConfig;
  onChange?: (value: ResumeConfig) => void;
};

export const ComponentName: React.FC<Props> = props => {
  const { value, theme, onChange } = props;
  // ...
};
```

### Component File Structure

- One component per directory: `ComponentName/index.tsx`
- Styles colocated: `ComponentName/index.less`
- Types in separate `types.ts` when shared

### Export Pattern

Named exports preferred over default exports:

```typescript
export const Template1: React.FC<Props> = props => { ... };
```

## Naming Conventions

| Element           | Convention                | Example                                 |
| ----------------- | ------------------------- | --------------------------------------- |
| Components        | PascalCase                | `Template1`, `FormCreator`              |
| Files/Directories | PascalCase for components | `Resume/`, `FormCreator/`               |
| Functions         | camelCase                 | `fetchResume`, `getDefaultTitleNameMap` |
| Constants         | camelCase or UPPER_SNAKE  | `LocaleMap`, `DEFAULT_VALUE`            |
| Types             | PascalCase                | `ResumeConfig`, `ThemeConfig`           |
| CSS classes       | kebab-case                | `.section-header`, `.info-name`         |

## Styling

- Use **Less** for stylesheets
- Colocate styles with components: `index.less` next to `index.tsx`
- Import styles at the bottom of imports
- Use BEM-like naming: `.section-header`, `.section-body`
- Theme colors via props or Less variables (defined in `gatsby-config.js`)

## Error Handling

- Use Promises with `.then()` chains (codebase uses this pattern)
- Return `Promise.reject(new Error())` for failures
- Check response status before parsing JSON

```typescript
return fetch(url)
  .then(data => {
    if (data.status !== 200) {
      return Promise.reject(new Error());
    }
    return data.json();
  })
  .then(data => {
    /* process */
  });
```

## Internationalization (i18n)

- Use `react-intl` with `FormattedMessage` for user-facing text
- Locale files in `src/i18n/locales/`
- Use `useIntl()` hook for dynamic messages: `intl.formatMessage({ id: 'key' })`
- Run `npm run extract` to extract new messages for translation

## State Management

- React hooks: `useState`, `useEffect`, `useMemo`
- Custom hooks in `src/hooks/` directory
- Lodash `_.get()` for safe nested property access

## Git / Husky

- Pre-commit hooks via lint-staged
- Automatically formats `.ts` and `.tsx` files on commit

## Key Files

| File                      | Purpose                          |
| ------------------------- | -------------------------------- |
| `src/components/types.ts` | Core type definitions            |
| `src/data/constant.ts`    | Default values and constants     |
| `src/helpers/`            | Utility functions                |
| `src/i18n/`               | Internationalization setup       |
| `gatsby-config.js`        | Gatsby plugins and configuration |

## Architecture Notes

- **Templates**: Three resume templates (`Template1`, `Template2`, `Template3`)
- **Data flow**: Resume config loaded from GitHub user's `resume.json` via URL params
- **Mode**: Read mode vs Edit mode controlled by `mode=edit` query param
