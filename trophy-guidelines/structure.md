# Trophy Components Examples - Structure Recommendations

## Current Structure Issues

The examples folder currently contains a mix of:
1. Actual component implementations copied from src folder (with broken imports)
2. Example files showing how to use the components

## Recommended Organization

```
examples/
├── trophy-components/           # Main examples directory
│   ├── example-components/      # Usage examples showing how to import from the package
│   │   ├── ExampleTrophyCard.tsx
│   │   ├── ExampleAchievementProvider.tsx
│   │   └── ... (other examples)
│   │
│   ├── reference/               # Reference implementations (optional)
│   │   ├── TrophyCard.tsx
│   │   ├── AchievementProgress.tsx
│   │   └── ... (other component files)
│   │
│   ├── react-trophies.d.ts      # Type declarations for the examples
│   └── README.md                # Explains how to use the examples
│
├── nextjs/                      # Framework-specific examples
├── vite-integration.js          # Setup scripts
└── INTEGRATION_GUIDE.md         # Documentation
```

## Recommended Actions

1. **Create Example Components**: For each main component, create an example file showing:
   - How to import from the package
   - Basic usage patterns
   - Prop variations

2. **Move Original Components**: Move the current component files to a "reference" subfolder
   - These serve as reference implementations
   - They won't be used directly by consumers of your package

3. **Add Clear Documentation**: In each example file, explain:
   - When/why to use the component
   - Available props and options
   - Common patterns and integration with other components
