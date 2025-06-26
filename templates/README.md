# React-Trophies Templates

This directory contains template files for various project types and frameworks. These templates are used by the post-install script to create starter files for achievement integration.

## Directory Structure

```
templates/
├── builder/       # Templates for web builder/SaaS applications (like Extensio)
│   ├── vite/      # Vite-specific templates
│   └── nextjs/    # Next.js-specific templates
├── courses/       # Templates for educational/course platforms
│   ├── vite/
│   └── nextjs/
├── game/          # Templates for game applications
│   ├── vite/
│   └── nextjs/
└── generic/       # Generic templates for any React application
    ├── vite/
    └── nextjs/
```

## Template Files

Each framework-specific directory typically contains these files:

- `AchievementWrapper.tsx` - Component to wrap your application with achievement providers
- `AchievementDemo.tsx` - Example component showing how to implement achievements
- `config.ts` - Achievement configuration with domain-specific achievements

## Custom Templates

When the post-install script runs, it will:

1. Ask users which framework they're using (Next.js, Vite, etc.)
2. Ask what type of project they're building (Courses, Builder, Game, Other)
3. Copy the appropriate template files to their project

## Adding New Templates

To add a new template:

1. Create a directory for the new project type under `templates/`
2. Add framework-specific directories inside
3. Create template files following the existing patterns
4. The post-install script will automatically detect and use these templates

## Customizing Templates

Each template type has achievement configurations tailored for specific domains:

- **Builder** - For web app builder tools like Extensio
- **Courses** - For learning management systems and educational platforms
- **Game** - For game applications with game-specific achievements
- **Generic** - Universal achievements suitable for any application
