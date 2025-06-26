================================================
FILE: README.md
================================================
# 🏆 React-Achievements-Zustand

A flexible achievement system for React applications using Zustand for state management.

![React Achievements Demo](https://media.giphy.com/media/5sXoITml136LmyBPEc/giphy.gif)

Try it out: [StackBlitz Demo](https://stackblitz.com/edit/vitejs-vite-rymmutrx)

## Quick Start

```bash
npm install react react-dom zustand react-achievements-zustand
```

```jsx
import { AchievementProvider, useAchievement } from 'react-achievements-zustand';

// 1. Define achievements
const achievementConfig = {
  score: [{
    isConditionMet: (value) => value >= 100,
    achievementDetails: {
      achievementId: 'high-score',
      achievementTitle: 'High Score!',
      achievementDescription: 'Score 100 points',
      achievementIconKey: 'trophy'
    }
  }]
};

// 2. Use the provider
function App() {
  return (
    <AchievementProvider config={achievementConfig}>
      <Game />
    </AchievementProvider>
  );
}

// 3. Update metrics
function Game() {
  const { updateMetrics } = useAchievement();

  const handleScore = () => {
    updateMetrics({
      score: [100]  // Values are always passed in arrays
    });
  };

  return <button onClick={handleScore}>Score Points</button>;
}
```

## Core Features

### Metric Updates
```jsx
const { updateMetrics } = useAchievement();

// Single update
updateMetrics({ score: [100] });

// Multiple metrics
updateMetrics({
  score: [100],
  combo: [5],
  time: [60]
});

// Sequential updates
updateMetrics({ score: [50] });
setTimeout(() => updateMetrics({ score: [100] }), 1000);
```

### Achievement Notifications
- Powered by [Sonner](https://sonner.emilkowal.ski/)
- Shows multiple achievements simultaneously
- Customizable appearance

### Sound Effects
- Powered by [Howler.js](https://howlerjs.com/)
- Play a sound when an achievement is unlocked

```jsx
<AchievementProvider
  config={achievementConfig}
  soundUrl="/path/to/your/sound.mp3"
>
  <App />
</AchievementProvider>
```

### State Management
```jsx
// Save progress
const { metrics, previouslyAwardedAchievements } = useAchievementState();

// Load progress
<AchievementProvider
  config={achievementConfig}
  initialState={{
    metrics: savedMetrics,
    previouslyAwardedAchievements: savedAchievements
  }}
/>
```

### Reset Progress
```jsx
const { resetStorage } = useAchievement();
resetStorage(); // Clears all progress
```

## Available Icons

### Achievement Types
- 🏆 `trophy` - Classic achievement symbol
- ⭐ `star` - General achievement
- 🥉 `bronze` - Bronze tier achievement
- 🥈 `silver` - Silver tier achievement
- 🥇 `gold` - Gold tier achievement
- 💎 `diamond` - Diamond tier achievement
- ✨ `legendary` - Legendary achievement
- 💥 `epic` - Epic achievement
- 🔮 `rare` - Rare achievement
- 🔘 `common` - Common achievement
- 🎁 `special` - Special achievement

### Progress & Milestones
- 📈 `growth` - Progress indicator
- 🔥 `streak` - Streak achievements
- 👑 `master` - Mastery achievements
- 🚀 `pioneer` - Pioneer or early adopter
- 💡 `breakthrough` - Discovery or breakthrough
- 🌱 `newBeginnings` - First-time achievements
- 👣 `firstStep` - First achievement
- 🏅 `milestoneReached` - Milestone completion
- 🏁 `challengeCompleted` - Challenge completion

### Social & Engagement
- 🔗 `shared` - Sharing achievement
- ❤️ `liked` - Appreciation
- 💬 `commented` - Communication
- 👥 `followed` - Following achievement
- 🤝 `invited` - Invitation achievement
- 🏘️ `communityMember` - Community participation
- 🌟 `supporter` - Support achievement
- 🌐 `connected` - Connection achievement
- 🙋 `participant` - Participation
- 📣 `influencer` - Influence achievement

### Time & Activity
- ☀️ `activeDay` - Daily activity
- 📅 `activeWeek` - Weekly activity
- 🗓️ `activeMonth` - Monthly activity
- ⏰ `earlyBird` - Early participation
- 🌙 `nightOwl` - Late participation
- ⏳ `dedicated` - Time dedication
- ⏱️ `punctual` - Timeliness
- 🔄 `consistent` - Consistency
- 🏃 `marathon` - Long-term achievement

### Creativity & Expertise
- 🎨 `artist` - Artistic achievement
- ✍️ `writer` - Writing achievement
- 🔬 `innovator` - Innovation
- 🛠️ `creator` - Creation achievement
- 🎓 `expert` - Expertise achievement
- 🎭 `performer` - Performance achievement
- 🧠 `thinker` - Thinking achievement
- 🗺️ `explorer` - Exploration achievement

### Action & Interaction
- 🖱️ `clicked` - Click interaction
- 🔑 `used` - Usage achievement
- 🔍 `found` - Discovery achievement
- 🧱 `built` - Building achievement
- 🧩 `solved` - Problem solving
- 🔭 `discovered` - Discovery
- 🔓 `unlocked` - Unlocking achievement
- ⬆️ `upgraded` - Upgrade achievement
- 🔧 `repaired` - Fix achievement
- 🛡️ `defended` - Defense achievement

### Numbers & Counters
- 1️⃣ `one` - First achievement
- 🔟 `ten` - Tenth achievement
- 💯 `hundred` - Hundredth achievement
- 🔢 `thousand` - Thousandth achievement

### System Icons
- ⭐ `default` - Default fallback icon
- ⏳ `loading` - Loading state
- ⚠️ `error` - Error state
- ✅ `success` - Success state
- ❌ `failure` - Failure state

### Additional Decorative Icons
- 🚩 `flag` - Flag marker
- 💎 `gem` - Gem reward
- 🎗️ `ribbon` - Ribbon award
- 🎖️ `badge` - Badge award
- ⚔️ `monsterDefeated` - Combat achievement
- 📦 `itemCollected` - Collection achievement

### Usage Example
```jsx
const achievementConfig = {
  score: [{
    isConditionMet: (value) => value >= 100,
    achievementDetails: {
      achievementId: 'high-score',
      achievementTitle: 'High Score!',
      achievementDescription: 'Score 100 points',
      achievementIconKey: 'legendary' // Use any icon key from above
    }
  }]
};
```

## Advanced Features

### Custom Styling
```jsx
const styles = {
  badgesButton: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    // ...more styles
  },
  badgesModal: {
    overlay: { backgroundColor: 'rgba(0,0,0,0.8)' },
    // ...more styles
  }
};

<AchievementProvider styles={styles}>
  <App />
</AchievementProvider>
```

### Persistence
```jsx
<AchievementProvider
  config={achievementConfig}
  storageKey="my-game-achievements" // localStorage key
  initialState={loadedState}
/>
```

## Complete Documentation
- [Full Example](#full-example)
- [API Reference](#api-reference)
- [Icon List](#full-icon-list)
- [Styling Guide](#styling-guide)
- [Migration Guide](#migration-guide)



================================================
FILE: package.json
================================================
{
  "name": "react-achievements-zustand",
  "version": "0.2.4",
  "description": "This package allows users to transpose a React achievements engine over their React apps using Zustand for state management",
  "repository": {
    "type": "git",
    "url": "https://github.com/dave-b-b/react-achievements-zustand.git"
  },
  "keywords": [
    "react",
    "badge",
    "achievement"
  ],
  "main": "dist/cjs.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "rollup -c",
    "deploy": "npm run build && npm publish",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  },
  "author": "David Brown",
  "license": "ISC",
  "devDependencies": {
    "@chromatic-com/storybook": "^1.6.1",
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.0",
    "@mui/icons-material": "^6.4.11",
    "@rollup/plugin-commonjs": "^26.0.1",
    "@rollup/plugin-node-resolve": "^15.2.3",
    "@rollup/plugin-replace": "^6.0.2",
    "@storybook/addon-essentials": "^8.6.8",
    "@storybook/addon-interactions": "^8.6.8",
    "@storybook/addon-links": "^8.6.8",
    "@storybook/addon-onboarding": "^8.6.8",
    "@storybook/addon-webpack5-compiler-swc": "^1.0.5",
    "@storybook/blocks": "^8.6.8",
    "@storybook/react": "^8.6.8",
    "@storybook/react-webpack5": "^8.6.8",
    "@storybook/test": "^8.6.8",
    "@types/howler": "^2.2.12",
    "@types/jest": "^29.5.12",
    "@types/node": "^20.14.12",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@types/react-toastify": "^4.0.2",
    "react-toastify": "^9.0.0",
    "react-use": "^17.0.0",
    "rollup": "^4.19.0",
    "rollup-plugin-postcss": "^4.0.2",
    "rollup-plugin-typescript2": "^0.36.0",
    "storybook": "^8.6.8",
    "typescript": "^5.5.4"
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "react-confetti": "^6.0.0",
    "react-dom": "^18.0.0",
    "react-toastify": "^9.0.0",
    "react-use": "^17.0.0",
    "zustand": "^4.0.0"
  },
  "dependencies": {
    "@mui/material": "^7.0.2",
    "howler": "^2.2.4",
    "sonner": "^2.0.5"
  }
}



================================================
FILE: rollup.config.mjs
================================================
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import replace from '@rollup/plugin-replace';
import postcss from 'rollup-plugin-postcss';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/cjs.js',
            format: 'cjs',
        },
        {
            file: 'dist/index.esm.js',
            format: 'esm',
        }
    ],
    plugins: [
        replace({
            preventAssignment: true,
            'this': 'undefined',
        }),
        postcss({
            modules: false,
            extract: false,
            inject: true
        }),
        resolve(),
        commonjs(),
        typescript({ tsconfig: './tsconfig.json' })
    ],
    external: ['react', 'react-dom', 'zustand', 'react-confetti', 'react-use', 'react-toastify']
};



================================================
FILE: tsconfig.json
================================================
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig to read more about this file */

    /* Projects */
    // "incremental": true,                              /* Save .tsbuildinfo files to allow for incremental compilation of projects. */
    // "composite": true,                                /* Enable constraints that allow a TypeScript project to be used with project references. */
    // "tsBuildInfoFile": "./.tsbuildinfo",              /* Specify the path to .tsbuildinfo incremental compilation file. */
    // "disableSourceOfProjectReferenceRedirect": true,  /* Disable preferring source files instead of declaration files when referencing composite projects. */
    // "disableSolutionSearching": true,                 /* Opt a project out of multi-project reference checking when editing. */
    // "disableReferencedProjectLoad": true,             /* Reduce the number of projects loaded automatically by TypeScript. */

    /* Language and Environment */
    "target": "es2016",                                  /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
    // "lib": [],                                        /* Specify a set of bundled library declaration files that describe the target runtime environment. */
     "jsx": "react",                                /* Specify what JSX code is generated. */
    // "experimentalDecorators": true,                   /* Enable experimental support for legacy experimental decorators. */
    // "emitDecoratorMetadata": true,                    /* Emit design-type metadata for decorated declarations in source files. */
    // "jsxFactory": "",                                 /* Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h'. */
    // "jsxFragmentFactory": "",                         /* Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'. */
    // "jsxImportSource": "",                            /* Specify module specifier used to import the JSX factory functions when using 'jsx: react-jsx*'. */
    // "reactNamespace": "",                             /* Specify the object invoked for 'createElement'. This only applies when targeting 'react' JSX emit. */
    // "noLib": true,                                    /* Disable including any library files, including the default lib.d.ts. */
    // "useDefineForClassFields": true,                  /* Emit ECMAScript-standard-compliant class fields. */
    // "moduleDetection": "auto",                        /* Control what method is used to detect module-format JS files. */

    /* Modules */
    "module": "ES6",                                /* Specify what module code is generated. */
    // "rootDir": "./",                                  /* Specify the root folder within your source files. */
     "moduleResolution": "node10",                     /* Specify how TypeScript looks up a file from a given module specifier. */
    // "baseUrl": "./",                                  /* Specify the base directory to resolve non-relative module names. */
    // "paths": {},                                      /* Specify a set of entries that re-map imports to additional lookup locations. */
    // "rootDirs": [],                                   /* Allow multiple folders to be treated as one when resolving modules. */
    // "typeRoots": [],                                  /* Specify multiple folders that act like './node_modules/@types'. */
    // "types": [],                                      /* Specify type package names to be included without being referenced in a source file. */
    // "allowUmdGlobalAccess": true,                     /* Allow accessing UMD globals from modules. */
    // "moduleSuffixes": [],                             /* List of file name suffixes to search when resolving a module. */
    // "allowImportingTsExtensions": true,               /* Allow imports to include TypeScript file extensions. Requires '--moduleResolution bundler' and either '--noEmit' or '--emitDeclarationOnly' to be set. */
    // "resolvePackageJsonExports": true,                /* Use the package.json 'exports' field when resolving package imports. */
    // "resolvePackageJsonImports": true,                /* Use the package.json 'imports' field when resolving imports. */
    // "customConditions": [],                           /* Conditions to set in addition to the resolver-specific defaults when resolving imports. */
    // "resolveJsonModule": true,                        /* Enable importing .json files. */
    // "allowArbitraryExtensions": true,                 /* Enable importing files with any extension, provided a declaration file is present. */
    // "noResolve": true,                                /* Disallow 'import's, 'require's or '<reference>'s from expanding the number of files TypeScript should add to a project. */

    /* JavaScript Support */
    // "allowJs": true,                                  /* Allow JavaScript files to be a part of your program. Use the 'checkJS' option to get errors from these files. */
    // "checkJs": true,                                  /* Enable error reporting in type-checked JavaScript files. */
    // "maxNodeModuleJsDepth": 1,                        /* Specify the maximum folder depth used for checking JavaScript files from 'node_modules'. Only applicable with 'allowJs'. */

    /* Emit */
     "declaration": true,                              /* Generate .d.ts files from TypeScript and JavaScript files in your project. */
    // "declarationMap": true,                           /* Create sourcemaps for d.ts files. */
    // "emitDeclarationOnly": true,                      /* Only output d.ts files and not JavaScript files. */
    // "sourceMap": true,                                /* Create source map files for emitted JavaScript files. */
    // "inlineSourceMap": true,                          /* Include sourcemap files inside the emitted JavaScript. */
    // "outFile": "./",                                  /* Specify a file that bundles all outputs into one JavaScript file. If 'declaration' is true, also designates a file that bundles all .d.ts output. */
     "outDir": "./dist",                                   /* Specify an output folder for all emitted files. */
    // "removeComments": true,                           /* Disable emitting comments. */
    // "noEmit": true,                                   /* Disable emitting files from a compilation. */
    // "importHelpers": true,                            /* Allow importing helper functions from tslib once per project, instead of including them per-file. */
    // "downlevelIteration": true,                       /* Emit more compliant, but verbose and less performant JavaScript for iteration. */
    // "sourceRoot": "",                                 /* Specify the root path for debuggers to find the reference source code. */
    // "mapRoot": "",                                    /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSources": true,                            /* Include source code in the sourcemaps inside the emitted JavaScript. */
    // "emitBOM": true,                                  /* Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files. */
    // "newLine": "crlf",                                /* Set the newline character for emitting files. */
    // "stripInternal": true,                            /* Disable emitting declarations that have '@internal' in their JSDoc comments. */
    // "noEmitHelpers": true,                            /* Disable generating custom helper functions like '__extends' in compiled output. */
    // "noEmitOnError": true,                            /* Disable emitting files if any type checking errors are reported. */
    // "preserveConstEnums": true,                       /* Disable erasing 'const enum' declarations in generated code. */
    // "declarationDir": "./",                           /* Specify the output directory for generated declaration files. */

    /* Interop Constraints */
    // "isolatedModules": true,                          /* Ensure that each file can be safely transpiled without relying on other imports. */
    // "verbatimModuleSyntax": true,                     /* Do not transform or elide any imports or exports not marked as type-only, ensuring they are written in the output file's format based on the 'module' setting. */
    // "isolatedDeclarations": true,                     /* Require sufficient annotation on exports so other tools can trivially generate declaration files. */
    // "allowSyntheticDefaultImports": true,             /* Allow 'import x from y' when a module doesn't have a default export. */
    "esModuleInterop": true,                             /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */
     "preserveSymlinks": true,                         /* Disable resolving symlinks to their realpath. This correlates to the same flag in node. */
    "forceConsistentCasingInFileNames": true,            /* Ensure that casing is correct in imports. */

    /* Type Checking */
    "strict": true,                                      /* Enable all strict type-checking options. */
    // "noImplicitAny": true,                            /* Enable error reporting for expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,                         /* When type checking, take into account 'null' and 'undefined'. */
    // "strictFunctionTypes": true,                      /* When assigning functions, check to ensure parameters and the return values are subtype-compatible. */
    // "strictBindCallApply": true,                      /* Check that the arguments for 'bind', 'call', and 'apply' methods match the original function. */
    // "strictPropertyInitialization": true,             /* Check for class properties that are declared but not set in the constructor. */
    // "noImplicitThis": true,                           /* Enable error reporting when 'this' is given the type 'any'. */
    // "useUnknownInCatchVariables": true,               /* Default catch clause variables as 'unknown' instead of 'any'. */
    // "alwaysStrict": true,                             /* Ensure 'use strict' is always emitted. */
    // "noUnusedLocals": true,                           /* Enable error reporting when local variables aren't read. */
    // "noUnusedParameters": true,                       /* Raise an error when a function parameter isn't read. */
    // "exactOptionalPropertyTypes": true,               /* Interpret optional property types as written, rather than adding 'undefined'. */
    // "noImplicitReturns": true,                        /* Enable error reporting for codepaths that do not explicitly return in a function. */
    // "noFallthroughCasesInSwitch": true,               /* Enable error reporting for fallthrough cases in switch statements. */
    // "noUncheckedIndexedAccess": true,                 /* Add 'undefined' to a type when accessed using an index. */
    // "noImplicitOverride": true,                       /* Ensure overriding members in derived classes are marked with an override modifier. */
    // "noPropertyAccessFromIndexSignature": true,       /* Enforces using indexed accessors for keys declared using an indexed type. */
    // "allowUnusedLabels": true,                        /* Disable error reporting for unused labels. */
    // "allowUnreachableCode": true,                     /* Disable error reporting for unreachable code. */

    /* Completeness */
    // "skipDefaultLibCheck": true,                      /* Skip type checking .d.ts files that are included with TypeScript. */
    "skipLibCheck": true                                 /* Skip type checking all .d.ts files. */
  },
  "include": [
    "src",
    "react-confetti.d.ts"]
}



================================================
FILE: .npmignore
================================================
stories/
.storybook/
storybook-static/


================================================
FILE: src/defaultStyles.ts
================================================
type StyleObject = { [key: string]: string | number };

interface BadgesModalStyles {
    overlay: StyleObject;
    content: StyleObject;
    title: StyleObject;
    badgeContainer: StyleObject;
    badge: StyleObject;
    badgeIcon: StyleObject;
    badgeTitle: StyleObject;
    button: StyleObject;
}

export interface Styles {
    badgesModal: BadgesModalStyles;
    badgesButton: StyleObject;
}

export const defaultStyles: Styles = {
    badgesModal: {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        content: {
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            padding: '20px',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '80vh',
            overflowY: 'auto',
        },
        title: {
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '20px',
        },
        badgeContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
        },
        badge: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '10px',
        },
        badgeIcon: {
            width: '50px',
            height: '50px',
            marginBottom: '5px',
        },
        badgeTitle: {
            fontSize: '14px',
            textAlign: 'center',
        },
        button: {
            backgroundColor: '#007bff',
            color: '#ffffff',
            padding: '10px 20px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            marginTop: '20px',
        },
    },
    badgesButton: {
        position: 'fixed',
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#ffffff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        zIndex: 1000,
    },
};


================================================
FILE: src/index.ts
================================================
import { AchievementProvider, useAchievementContext } from './providers/AchievementProvider';
import type { 
    AchievementMetrics,
    AchievementConfiguration,
    AchievementDetails,
    AchievementUnlockCondition,
} from './types';
import ConfettiWrapper from './components/ConfettiWrapper';
import { useAchievementState } from './hooks/useAchievementState';
import { useAchievementStore } from './store/useAchievementStore';

export {
    AchievementProvider,
    useAchievementContext as useAchievement,
    ConfettiWrapper,
    useAchievementState,
    useAchievementStore,
};

export type {
    AchievementMetrics,
    AchievementConfiguration,
    AchievementDetails,
    AchievementUnlockCondition,
};


================================================
FILE: src/react-confetti.d.ts
================================================
declare module 'react-confetti' {
    import { ComponentType } from 'react';

    export interface ConfettiProps {
        width?: number;
        height?: number;
        numberOfPieces?: number;
        recycle?: boolean;
        run?: boolean;
        colors?: string[];
        gravity?: number;
        wind?: number;
        tweenDuration?: number;
        drawShape?: (ctx: CanvasRenderingContext2D) => void;
    }

    const Confetti: ComponentType<ConfettiProps>;
    export default Confetti;
}


================================================
FILE: src/react-use.d.ts
================================================
declare module 'react-use' {
    export function useWindowSize(): { width: number; height: number };
    // Add other functions from react-use that you're using
}


================================================
FILE: src/types.ts
================================================
import {Styles} from "./defaultStyles";

export type AchievementMetricValue = number | string | boolean | Date;

export interface AchievementDetails {
    achievementId: string;
    achievementTitle: string;
    achievementDescription: string;
    achievementIconKey?: string;
}

export type AchievementIconRecord = Record<string, string>;

export interface AchievementConfiguration {
    [metricName: string]: Array<AchievementUnlockCondition<AchievementMetricValue>>;
}

export type InitialAchievementMetrics = Record<string, AchievementMetricValue | AchievementMetricValue[] | undefined>;
export type AchievementMetrics = Record<string, AchievementMetricValue[]>;

export interface AchievementProviderProps {
    children: React.ReactNode;
    config: AchievementConfiguration;
    initialState?: InitialAchievementMetrics & { previouslyAwardedAchievements?: string[] }; // Add optional previouslyAwardedAchievements
    storageKey?: string;
    badgesButtonPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    styles?: Partial<Styles>;
    icons?: Record<string, string>;
    soundUrl?: string;
}

export interface AchievementUnlockCondition<T extends AchievementMetricValue> {
    isConditionMet: (value: T) => boolean;
    achievementDetails: AchievementDetails;
}

export interface SerializedAchievementUnlockCondition {
    achievementDetails: AchievementDetails;
    conditionType: 'number' | 'string' | 'boolean' | 'date';
    conditionValue: any;
}

export interface SerializedAchievementConfiguration {
    [metricName: string]: SerializedAchievementUnlockCondition[];
}


================================================
FILE: src/assets/defaultIcons.ts
================================================
// src/defaultIcons.ts

export const defaultAchievementIcons = {
    // General Progress & Milestones
    levelUp: '🏆',
    questComplete: '📜',
    monsterDefeated: '⚔️',
    itemCollected: '📦',
    challengeCompleted: '🏁',
    milestoneReached: '🏅',
    firstStep: '👣',
    newBeginnings: '🌱',
    breakthrough: '💡',
    growth: '📈',

    // Social & Engagement
    shared: '🔗',
    liked: '❤️',
    commented: '💬',
    followed: '👥',
    invited: '🤝',
    communityMember: '🏘️',
    supporter: '🌟',
    connected: '🌐',
    participant: '🙋',
    influencer: '📣',

    // Time & Activity
    activeDay: '☀️',
    activeWeek: '📅',
    activeMonth: '🗓️',
    earlyBird: '⏰',
    nightOwl: '🌙',
    streak: '🔥',
    dedicated: '⏳',
    punctual: '⏱️',
    consistent: '🔄',
    marathon: '🏃',

    // Creativity & Skill
    artist: '🎨',
    writer: '✍️',
    innovator: '🔬',
    creator: '🛠️',
    expert: '🎓',
    master: '👑',
    pioneer: '🚀',
    performer: '🎭',
    thinker: '🧠',
    explorer: '🗺️',

    // Achievement Types
    bronze: '🥉',
    silver: '🥈',
    gold: '🥇',
    diamond: '💎',
    legendary: '✨',
    epic: '💥',
    rare: '🔮',
    common: '🔘',
    special: '🎁',
    hidden: '❓',

    // Numbers & Counters
    one: '1️⃣',
    ten: '🔟',
    hundred: '💯',
    thousand: '🔢',

    // Actions & Interactions
    clicked: '🖱️',
    used: '🔑',
    found: '🔍',
    built: '🧱',
    solved: '🧩',
    discovered: '🔭',
    unlocked: '🔓',
    upgraded: '⬆️',
    repaired: '🔧',
    defended: '🛡️',

    // Placeholders
    default: '⭐', // A fallback icon
    loading: '⏳',
    error: '⚠️',
    success: '✅',
    failure: '❌',

    // Miscellaneous
    trophy: '🏆',
    star: '⭐',
    flag: '🚩',
    puzzle: '🧩',
    gem: '💎',
    crown: '👑',
    medal: '🏅',
    ribbon: '🎗️',
    badge: '🎖️',
    shield: '🛡️',
};


================================================
FILE: src/components/BadgesButton.tsx
================================================
import React from 'react';
import { Styles } from '../defaultStyles';
import { AchievementDetails } from '../types';

interface BadgesButtonProps {
    onClick: () => void;
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    styles: Styles['badgesButton'];
    unlockedAchievements: AchievementDetails[];
    icon?: React.ReactNode; // Allow custom icons
    drawer?: boolean; // Indicate if it triggers a drawer
    customStyles?: React.CSSProperties; // Allow custom styles
}

const BadgesButton: React.FC<BadgesButtonProps> = ({
                                                       onClick,
                                                       position,
                                                       styles,
                                                       unlockedAchievements,
                                                       icon,
                                                       drawer = false,
                                                       customStyles,
                                                   }) => {
    const positionStyle = position
        ? {
            [position.split('-')[0]]: '20px',
            [position.split('-')[1]]: '20px',
        }
        : {};

    const handleButtonClick = () => {
        onClick();
    };

    const achievementsText = 'View Achievements';

    const buttonContent = icon ? icon : achievementsText;

    return (
        <button
            onClick={handleButtonClick}
            style={{ ...styles, ...positionStyle, ...customStyles }}
        >
            {buttonContent}
        </button>
    );
};

export default React.memo(BadgesButton);


================================================
FILE: src/components/BadgesModal.tsx
================================================
import React from 'react';
import {AchievementDetails, AchievementIconRecord} from '../types';
import { Styles } from '../defaultStyles';
import { defaultAchievementIcons } from '../assets/defaultIcons'; // Import default icons

interface BadgesModalProps {
    isOpen: boolean;
    achievements: AchievementDetails[];
    onClose: () => void;
    styles: Styles['badgesModal'];
    icons?: Record<string, string>; // Optional user-specified icons
}

const BadgesModal: React.FC<BadgesModalProps> = ({ isOpen, achievements, onClose, styles, icons = {} }) => {
    if (!isOpen) return null;

    return (
        <div style={styles.overlay as React.CSSProperties}>
            <div style={styles.content}>
                <h2 style={styles.title}>Your Achievements</h2>
                <div style={styles.badgeContainer}>
                    {achievements.map((achievement) => {
                        const mergedIcons: AchievementIconRecord = { ...defaultAchievementIcons, ...icons };
                        let iconToDisplay: string | undefined = mergedIcons.default;
                        if (achievement.achievementIconKey && mergedIcons[achievement.achievementIconKey]) {
                            iconToDisplay = mergedIcons[achievement.achievementIconKey];
                        }
                        return (
                            <div key={achievement.achievementId} style={styles.badge}>
                                {/* Render icon based on type (Unicode or image path) */}
                                {iconToDisplay.startsWith('http') || iconToDisplay.startsWith('data:image') ? (
                                    <img src={iconToDisplay} alt={achievement.achievementTitle} style={styles.badgeIcon} />
                                ) : (
                                    <p style={{ fontSize: '2em' }}>{iconToDisplay}</p> // Render Unicode as large text
                                )}
                                <span style={styles.badgeTitle}>{achievement.achievementTitle}</span>
                            </div>
                        );
                    })}
                </div>
                <button onClick={onClose} style={styles.button}>Close</button>
            </div>
        </div>
    );
};

export default React.memo(BadgesModal);


================================================
FILE: src/components/ConfettiWrapper.tsx
================================================
import React from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

interface ConfettiWrapperProps {
    show: boolean;
}

const ConfettiWrapper: React.FC<ConfettiWrapperProps> = ({ show }) => {
    const { width, height } = useWindowSize();

    if (!show) return null;

    return <Confetti width={width} height={height} recycle={false} />;
};

export default ConfettiWrapper;


================================================
FILE: src/hooks/useAchievement.ts
================================================
import { useAchievementStore } from '../store/useAchievementStore';
import { useAchievementContext } from '../providers/AchievementProvider';

export const useAchievement = () => {
    const { updateMetrics, unlockedAchievements, resetStorage } = useAchievementContext() || {};
    const { metrics, config, notifications } = useAchievementStore();

    return {
        metrics,
        unlockedAchievements: unlockedAchievements || [],
        notifications,
        config,
        updateMetrics: updateMetrics || (() => {}),
        resetStorage: resetStorage || (() => {}),
    };
};


================================================
FILE: src/hooks/useAchievementState.ts
================================================
import { useAchievementStore } from '../store/useAchievementStore';

export const useAchievementState = () => {
    const { metrics, previouslyAwardedAchievements } = useAchievementStore();

    return {
        metrics,
        previouslyAwardedAchievements,
    };
};


================================================
FILE: src/providers/AchievementProvider.tsx
================================================
import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { Toaster, toast } from 'sonner';
import {
    AchievementDetails,
    AchievementMetricValue,
    SerializedAchievementUnlockCondition,
    SerializedAchievementConfiguration,
    AchievementProviderProps,
    AchievementMetrics,
    AchievementConfiguration,
    AchievementUnlockCondition,
} from '../types';
import { useAchievementStore } from '../store/useAchievementStore';
import BadgesButton from '../components/BadgesButton';
import BadgesModal from '../components/BadgesModal';
import ConfettiWrapper from '../components/ConfettiWrapper';
import { defaultStyles } from '../defaultStyles';
import { defaultAchievementIcons } from '../assets/defaultIcons';

export interface AchievementContextType {
    updateMetrics: (newMetrics: AchievementMetrics | ((prevMetrics: AchievementMetrics) => AchievementMetrics)) => void;
    unlockedAchievements: string[];
    resetStorage: () => void;
}

export const AchievementContext = React.createContext<AchievementContextType | undefined>(undefined);

export const useAchievementContext = () => {
    const context = React.useContext(AchievementContext);
    if (!context) {
        throw new Error('useAchievementContext must be used within an AchievementProvider');
    }
    return context;
};

import { Howl } from 'howler';

const AchievementProvider: React.FC<AchievementProviderProps> = ({
    children,
    config,
    initialState = {},
    storageKey = 'react-achievements',
    badgesButtonPosition = 'top-right',
    styles = {},
    icons = {},
    soundUrl,
}) => {
    const { 
        metrics, 
        unlockedAchievements: unlockedAchievementIds, 
        previouslyAwardedAchievements,
        notifications,
        isInitialized,
        initialize,
        setMetrics,
        unlockAchievement,
        markAchievementAsAwarded,
        addNotification,
        clearNotifications,
        resetAchievements
    } = useAchievementStore();

    const [showBadges, setShowBadges] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    const serializeConfig = (config: AchievementConfiguration): SerializedAchievementConfiguration => {
        const serializedConfig: SerializedAchievementConfiguration = {};
        Object.entries(config).forEach(([metricName, conditions]) => {
            if (!Array.isArray(conditions)) {
                console.error(`Invalid conditions for metric ${metricName}: expected array, got ${typeof conditions}`);
                return;
            }

            serializedConfig[metricName] = conditions.map((condition: AchievementUnlockCondition<AchievementMetricValue>) => {
                if (!condition || typeof condition.isConditionMet !== 'function') {
                    console.error(`Invalid condition for metric ${metricName}: missing isConditionMet function`);
                    return {
                        achievementDetails: {
                            achievementId: 'invalid',
                            achievementTitle: 'Invalid Achievement',
                            achievementDescription: 'Invalid condition',
                            achievementIconKey: 'error'
                        },
                        conditionType: 'number',
                        conditionValue: 0
                    };
                }

                // Analyze the isConditionMet function to determine type and value
                const funcString = condition.isConditionMet.toString();
                let conditionType: 'number' | 'string' | 'boolean' | 'date';
                let conditionValue: any;

                if (funcString.includes('typeof value === "number"') || funcString.includes('typeof value === \'number\'')) {
                    conditionType = 'number';
                    const matches = funcString.match(/value\s*>=?\s*(\d+)/);
                    conditionValue = matches ? parseInt(matches[1]) : 0;
                } else if (funcString.includes('typeof value === "string"') || funcString.includes('typeof value === \'string\'')) {
                    conditionType = 'string';
                    const matches = funcString.match(/value\s*===?\s*['"](.+)['"]/);
                    conditionValue = matches ? matches[1] : '';
                } else if (funcString.includes('typeof value === "boolean"') || funcString.includes('typeof value === \'boolean\'')) {
                    conditionType = 'boolean';
                    conditionValue = funcString.includes('=== true');
                } else if (funcString.includes('instanceof Date')) {
                    conditionType = 'date';
                    const matches = funcString.match(/new Date\(['"](.+)['"]\)/);
                    conditionValue = matches ? matches[1] : new Date().toISOString();
                } else {
                    // Default to number type if we can't determine the type
                    conditionType = 'number';
                    conditionValue = 1;
                }

                return {
                    achievementDetails: condition.achievementDetails,
                    conditionType,
                    conditionValue,
                };
            });
        });
        return serializedConfig;
    };

    const serializedConfig = useMemo(() => serializeConfig(config), [config]);

    const checkAchievements = useCallback(() => {
        if (!isInitialized) return;

        const newAchievements: AchievementDetails[] = [];
        
        Object.entries(serializedConfig).forEach(([metricName, conditions]) => {
            const metricValues = metrics[metricName];
            if (!Array.isArray(metricValues)) {
                return;
            }

            conditions.forEach((condition) => {
                const isConditionMet = (value: AchievementMetricValue) => {
                    switch (condition.conditionType) {
                        case 'number':
                            return typeof value === 'number' && value >= condition.conditionValue;
                        case 'string':
                            return typeof value === 'string' && value === condition.conditionValue;
                        case 'boolean':
                            return typeof value === 'boolean' && value === condition.conditionValue;
                        case 'date':
                            return value instanceof Date && 
                                value.getTime() >= new Date(condition.conditionValue).getTime();
                        default:
                            return false;
                    }
                };

                const latestValue = metricValues[metricValues.length - 1];
                if (
                    isConditionMet(latestValue) &&
                    !unlockedAchievementIds.includes(condition.achievementDetails.achievementId) &&
                    !previouslyAwardedAchievements.includes(condition.achievementDetails.achievementId)
                ) {
                    newAchievements.push(condition.achievementDetails);
                }
            });
        });

        if (newAchievements.length > 0) {
            newAchievements.forEach((achievement) => {
                unlockAchievement(achievement.achievementId);
                markAchievementAsAwarded(achievement.achievementId);
                addNotification(achievement);
            });
            setShowConfetti(true);
        }
    }, [serializedConfig, metrics, unlockedAchievementIds, previouslyAwardedAchievements, unlockAchievement, markAchievementAsAwarded, addNotification, isInitialized]);

    // Initialize only once
    useEffect(() => {
        if (!isInitialized) {
            initialize({
                config: serializedConfig,
                initialState,
                storageKey,
            });
        }
    }, [initialize, serializedConfig, initialState, storageKey, isInitialized]);

    // Check achievements when metrics change
    useEffect(() => {
        if (isInitialized) {
            checkAchievements();
        }
    }, [metrics, checkAchievements, isInitialized]);

    // Handle notifications
    useEffect(() => {
        if (notifications.length > 0) {
            if (soundUrl) {
                const sound = new Howl({
                    src: [soundUrl]
                });
                sound.play();
            }

            notifications.forEach(achievement => {
                const mergedIcons: Record<string, string> = { ...defaultAchievementIcons, ...icons };
                const iconToDisplay = achievement?.achievementIconKey && achievement.achievementIconKey in mergedIcons ? 
                    mergedIcons[achievement.achievementIconKey] : 
                    mergedIcons.default;

                toast(
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ fontSize: '2em', marginRight: '10px' }}>{iconToDisplay}</span>
                        <div>
                            <div style={{ fontWeight: 'bold' }}>{achievement.achievementTitle}</div>
                            <div>{achievement.achievementDescription}</div>
                        </div>
                    </div>
                );
            });

            clearNotifications();
            
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 3000);
        }
    }, [notifications, icons, clearNotifications]);

    const showBadgesModal = () => setShowBadges(true);

    return (
        <AchievementContext.Provider
            value={{
                updateMetrics: (newMetrics) => {
                    if (!isInitialized) return;
                    if (typeof newMetrics === 'function') {
                        const updatedMetrics = newMetrics(metrics);
                        setMetrics(updatedMetrics);
                    } else {
                        // Properly merge arrays for each metric key
                        const mergedMetrics = Object.entries(newMetrics).reduce((acc, [key, value]) => ({
                            ...acc,
                            [key]: Array.isArray(metrics[key]) 
                                ? [...metrics[key], ...value]  
                                : value  
                        }), { ...metrics });
                        setMetrics(mergedMetrics);
                    }
                },
                unlockedAchievements: unlockedAchievementIds,
                resetStorage: () => {
                    localStorage.removeItem(storageKey);
                    resetAchievements();
                },
            }}
        >
            {children}
            <Toaster />
            <ConfettiWrapper show={showConfetti} />
            <BadgesButton
                onClick={showBadgesModal}
                position={badgesButtonPosition}
                styles={styles.badgesButton || defaultStyles.badgesButton}
                unlockedAchievements={[...unlockedAchievementIds, ...previouslyAwardedAchievements]
                    .filter((id, index, self) => self.indexOf(id) === index)
                    .map(id => {
                        const achievement = Object.values(serializedConfig)
                            .flat()
                            .find(condition => condition.achievementDetails.achievementId === id);
                        return achievement?.achievementDetails;
                    }).filter((a): a is AchievementDetails => !!a)}
            />
            <BadgesModal
                isOpen={showBadges}
                achievements={[...unlockedAchievementIds, ...previouslyAwardedAchievements]
                    .filter((id, index, self) => self.indexOf(id) === index)
                    .map(id => {
                        const achievement = Object.values(serializedConfig)
                            .flat()
                            .find(condition => condition.achievementDetails.achievementId === id);
                        return achievement?.achievementDetails;
                    }).filter((a): a is AchievementDetails => !!a)}
                onClose={() => setShowBadges(false)}
                styles={styles.badgesModal || defaultStyles.badgesModal}
                icons={icons}
            />
        </AchievementContext.Provider>
    );
};

export { AchievementProvider };


================================================
FILE: src/store/useAchievementStore.ts
================================================
import { create } from 'zustand';
import {
    InitialAchievementMetrics,
    AchievementMetrics,
    AchievementDetails,
    SerializedAchievementConfiguration,
} from '../types';

interface AchievementState {
    isInitialized: boolean;
    config: SerializedAchievementConfiguration;
    metrics: AchievementMetrics;
    unlockedAchievements: string[];
    previouslyAwardedAchievements: string[];
    storageKey: string | null;
    notifications: AchievementDetails[];
    initialize: (params: { 
        config: SerializedAchievementConfiguration; 
        initialState?: InitialAchievementMetrics & { previouslyAwardedAchievements?: string[] }; 
        storageKey: string 
    }) => void;
    setMetrics: (metrics: AchievementMetrics) => void;
    unlockAchievement: (achievementId: string) => void;
    markAchievementAsAwarded: (achievementId: string) => void;
    resetAchievements: () => void;
    addNotification: (notification: AchievementDetails) => void;
    clearNotifications: () => void;
}

export const useAchievementStore = create<AchievementState>((set, get) => ({
    isInitialized: false,
    config: {},
    metrics: {},
    unlockedAchievements: [],
    previouslyAwardedAchievements: [],
    storageKey: null,
    notifications: [],

    initialize: ({ config, initialState, storageKey }) => {
        const state = get();
        if (state.isInitialized) return;

        const storedState = storageKey ? localStorage.getItem(storageKey) : null;

        const initialMetrics = initialState ? Object.keys(initialState)
            .filter(key => key !== 'previouslyAwardedAchievements')
            .reduce((acc, key) => ({ 
                ...acc, 
                [key]: Array.isArray(initialState[key]) ? initialState[key] : [initialState[key]] 
            }), {}) : {};

        const initialAwarded = initialState?.previouslyAwardedAchievements || [];

        if (storedState) {
            try {
                const parsedState = JSON.parse(storedState);
                set({
                    isInitialized: true,
                    config,
                    storageKey,
                    metrics: parsedState.achievements?.metrics || initialMetrics,
                    unlockedAchievements: parsedState.achievements?.unlockedAchievements || [],
                    previouslyAwardedAchievements: parsedState.achievements?.previouslyAwardedAchievements || initialAwarded,
                });
            } catch (error) {
                console.error('Error parsing stored achievement state:', error);
                set({
                    isInitialized: true,
                    config,
                    storageKey,
                    metrics: initialMetrics,
                    unlockedAchievements: [],
                    previouslyAwardedAchievements: initialAwarded,
                });
            }
        } else {
            set({
                isInitialized: true,
                config,
                storageKey,
                metrics: initialMetrics,
                unlockedAchievements: [],
                previouslyAwardedAchievements: initialAwarded,
            });
        }
    },

    setMetrics: (metrics) => {
        const state = get();
        set({ metrics });
        if (state.storageKey) {
            localStorage.setItem(state.storageKey, JSON.stringify({
                achievements: {
                    metrics,
                    unlockedAchievements: state.unlockedAchievements,
                    previouslyAwardedAchievements: state.previouslyAwardedAchievements
                }
            }));
        }
    },

    unlockAchievement: (achievementId) => {
        const state = get();
        if (!state.unlockedAchievements.includes(achievementId)) {
            const newUnlockedAchievements = [...state.unlockedAchievements, achievementId];
            set({ unlockedAchievements: newUnlockedAchievements });
            if (state.storageKey) {
                localStorage.setItem(state.storageKey, JSON.stringify({
                    achievements: {
                        metrics: state.metrics,
                        unlockedAchievements: newUnlockedAchievements,
                        previouslyAwardedAchievements: state.previouslyAwardedAchievements
                    }
                }));
            }
        }
    },

    markAchievementAsAwarded: (achievementId) => {
        const state = get();
        if (!state.previouslyAwardedAchievements.includes(achievementId)) {
            const newAwardedAchievements = [...state.previouslyAwardedAchievements, achievementId];
            set({ previouslyAwardedAchievements: newAwardedAchievements });
            if (state.storageKey) {
                localStorage.setItem(state.storageKey, JSON.stringify({
                    achievements: {
                        metrics: state.metrics,
                        unlockedAchievements: state.unlockedAchievements,
                        previouslyAwardedAchievements: newAwardedAchievements
                    }
                }));
            }
        }
    },

    resetAchievements: () => {
        const state = get();
        set({
            metrics: {},
            unlockedAchievements: [],
            previouslyAwardedAchievements: [],
        });
        if (state.storageKey) {
            localStorage.removeItem(state.storageKey);
        }
    },

    addNotification: (notification) => {
        const state = get();
        set({ notifications: [...state.notifications, notification] });
    },

    clearNotifications: () => {
        set({ notifications: [] });
    },
}));


================================================
FILE: stories/components/BadgesButton.defaultIcon.stories.tsx
================================================
// src/stories/components/BadgesButton.defaultIcon.stories.tsx
import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import BadgesButton from '../../src/components/BadgesButton';
import { AchievementDetails } from '../../src/types';
import { defaultAchievementIcons } from '../../src/assets/defaultIcons'
import {defaultStyles} from "../../src/defaultStyles";

export default {
    title: 'Components/BadgesButton',
    component: BadgesButton,
} as Meta;

const Template: StoryFn<{
    onClick: () => void;
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    unlockedAchievements: AchievementDetails[];
    icon: React.ReactNode;
}> = (args) => <BadgesButton {...args} styles={defaultStyles.badgesButton} />;

export const WithDefaultIcon = Template.bind({});
WithDefaultIcon.args = {
    onClick: () => alert('Button Clicked!'),
    position: 'top-right',
    unlockedAchievements: [
        {
            achievementId: 'test1',
            achievementTitle: 'Test Achievement 1',
            achievementDescription: 'Description 1',
            achievementIconKey: 'default',
        },
    ],
    icon: defaultAchievementIcons.levelUp
};


================================================
FILE: stories/components/BadgesButton.stories.tsx
================================================
import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import BadgesButton from '../../src/components/BadgesButton';
import { AchievementDetails } from '../../src/types';
import { defaultStyles } from '../../src/defaultStyles';

export default {
    title: 'Components/BadgesButton',
    component: BadgesButton,
} as Meta;

const Template: StoryFn<{
    onClick: () => void;
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    unlockedAchievements: AchievementDetails[];
}> = (args) => <BadgesButton {...args} styles={defaultStyles.badgesButton} />;

export const WithWords = Template.bind({});
WithWords.args = {
    onClick: () => alert('Button Clicked!'),
    position: 'top-right',
    unlockedAchievements: [
        {
            achievementId: 'test1',
            achievementTitle: 'Test Achievement 1',
            achievementDescription: 'Description 1',
            achievementIconKey: 'default',
        },
        {
            achievementId: 'test2',
            achievementTitle: 'Test Achievement 2',
            achievementDescription: 'Description 2',
            achievementIconKey: 'default',
        },
    ],
};


================================================
FILE: stories/components/BadgesButton.userIcon.stories.tsx
================================================
// src/stories/components/BadgesButton.userIcon.stories.tsx
import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import BadgesButton from '../../src/components/BadgesButton';
import { AchievementDetails } from '../../src/types';
import { defaultStyles } from '../../src/defaultStyles';
import MenuIcon from '@mui/icons-material/Menu';

export default {
    title: 'Components/BadgesButton',
    component: BadgesButton,
} as Meta;

const Template: StoryFn<{
    onClick: () => void;
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    unlockedAchievements: AchievementDetails[];
    icon: React.ReactNode;
}> = (args) => <BadgesButton {...args} styles={defaultStyles.badgesButton} />;

export const WithUserIcon = Template.bind({});
WithUserIcon.args = {
    onClick: () => alert('Button Clicked!'),
    position: 'top-right',
    unlockedAchievements: [
        {
            achievementId: 'test1',
            achievementTitle: 'Test Achievement 1',
            achievementDescription: 'Description 1',
            achievementIconKey: 'default',
        },
    ],
    icon: <MenuIcon />,
};


================================================
FILE: stories/components/ConfettiWrapper.stories.tsx
================================================
import React, { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import ConfettiWrapper from '../../src/components/ConfettiWrapper';

export default {
    title: 'Components/ConfettiWrapper',
    component: ConfettiWrapper,
} as Meta;

const Template: StoryFn = () => {
    const [showConfetti, setShowConfetti] = useState(false);

    return (
        <div style={{ padding: '20px' }}>
            <h2>Confetti Animation Demo</h2>
            <p>Click the button to trigger the confetti animation.</p>
            
            <button 
                onClick={() => {
                    setShowConfetti(true);
                    setTimeout(() => setShowConfetti(false), 5000);
                }}
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px'
                }}
            >
                Celebrate! 🎉
            </button>

            <ConfettiWrapper show={showConfetti} />

            <div style={{ marginTop: '20px' }}>
                <h3>Component Details:</h3>
                <ul>
                    <li>The confetti animation plays when the <code>show</code> prop is true</li>
                    <li>Animation automatically stops when particles fall off screen</li>
                    <li>Uses window dimensions for full-screen coverage</li>
                    <li>Reacts to window resize events</li>
                </ul>
            </div>
        </div>
    );
};

export const Default = Template.bind({});
Default.parameters = {
    docs: {
        description: {
            story: 'A celebratory confetti animation component used when achievements are unlocked.',
        },
    },
};


================================================
FILE: stories/modals/BadgesModal.stories.tsx
================================================
import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import BadgesModal from '../../src/components/BadgesModal';
import { defaultStyles } from '../../src/defaultStyles';
import { defaultAchievementIcons } from '../../src/assets/defaultIcons';

export default {
    title: 'Modals/BadgesModal',
    component: BadgesModal,
} as Meta;

const Template: StoryFn = (args) => (
    <BadgesModal {...args} styles={defaultStyles.badgesModal} />
);

export const Empty = Template.bind({});
Empty.args = {
    isOpen: true,
    achievements: [],
    onClose: () => console.log('Modal closed'),
};

export const WithAchievements = Template.bind({});
WithAchievements.args = {
    isOpen: true,
    achievements: [
        {
            achievementId: 'achievement1',
            achievementTitle: 'First Achievement',
            achievementDescription: 'You did it!',
            achievementIconKey: 'trophy'
        },
        {
            achievementId: 'achievement2',
            achievementTitle: 'Second Achievement',
            achievementDescription: 'You did it again!',
            achievementIconKey: 'star'
        },
        {
            achievementId: 'achievement3',
            achievementTitle: 'Third Achievement',
            achievementDescription: 'Hat trick!',
            achievementIconKey: 'crown'
        }
    ],
    onClose: () => console.log('Modal closed'),
    icons: defaultAchievementIcons
};

export const WithCustomStyles = Template.bind({});
WithCustomStyles.args = {
    isOpen: true,
    achievements: WithAchievements.args.achievements,
    onClose: () => console.log('Modal closed'),
    icons: defaultAchievementIcons,
    styles: {
        ...defaultStyles.badgesModal,
        overlay: {
            ...defaultStyles.badgesModal.overlay,
            backgroundColor: 'rgba(0, 0, 0, 0.8)'
        },
        content: {
            ...defaultStyles.badgesModal.content,
            backgroundColor: '#2a2a2a',
            color: '#ffffff'
        },
        title: {
            ...defaultStyles.badgesModal.title,
            color: '#ffd700'
        },
        badge: {
            ...defaultStyles.badgesModal.badge,
            backgroundColor: '#1a1a1a',
            padding: '15px',
            borderRadius: '8px'
        }
    }
};


================================================
FILE: stories/providers/AchievementProvider.Conditions.stories.tsx
================================================
import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { AchievementProvider } from '../../src';
import { AchievementConfiguration } from '../../src/types';
import { useAchievement } from '../../src/hooks/useAchievement';

export default {
    title: 'Achievement System/AchievementProvider/Conditions',
    component: AchievementProvider,
} as Meta;

const TestComponent = () => {
    const { metrics, updateMetrics } = useAchievement();

    const handleAddMetric = (type: string) => {
        const currentMetrics = metrics[type] || [];
        const newValue = type === 'date' ? new Date() : true;
        updateMetrics({ ...metrics, [type]: [...currentMetrics, newValue] });
    };

    return (
        <div>
            <h2>Test Different Condition Types</h2>
            <div>
                <button onClick={() => handleAddMetric('boolean')}>Add Boolean Metric</button>
                <button onClick={() => handleAddMetric('date')}>Add Date Metric</button>
            </div>
            <pre>{JSON.stringify(metrics, null, 2)}</pre>
        </div>
    );
};

const Template: StoryFn = (args) => {
    const config: AchievementConfiguration = {
        boolean: [
            {
                isConditionMet: (value) => typeof value === 'boolean' && value === true,
                achievementDetails: {
                    achievementId: 'boolean-achievement',
                    achievementTitle: 'Boolean Achievement',
                    achievementDescription: 'Triggered by a boolean condition',
                    achievementIconKey: 'star'
                }
            }
        ],
        date: [
            {
                isConditionMet: (value) => value instanceof Date && value >= new Date('2024-01-01'),
                achievementDetails: {
                    achievementId: 'date-achievement',
                    achievementTitle: 'Date Achievement',
                    achievementDescription: 'Triggered by a date condition',
                    achievementIconKey: 'calendar'
                }
            }
        ]
    };

    return (
        <AchievementProvider config={config} storageKey="condition-test">
            <TestComponent />
        </AchievementProvider>
    );
};

export const ConditionTypes = Template.bind({});
ConditionTypes.parameters = {
    docs: {
        description: {
            story: 'Tests different types of achievement conditions (boolean, date)'
        }
    }
};


================================================
FILE: stories/providers/AchievementProvider.CorruptedStorage.stories.tsx
================================================
import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { AchievementProvider } from '../../src';
import { AchievementConfiguration } from '../../src/types';
import { useAchievement } from '../../src/hooks/useAchievement';

export default {
    title: 'Achievement System/AchievementProvider/CorruptedStorage',
    component: AchievementProvider,
} as Meta;

const TestComponent = () => {
    const { metrics, updateMetrics, resetStorage } = useAchievement();

    const corruptStorage = () => {
        localStorage.setItem('corrupted-storage-test', 'invalid{JSON:data]]');
    };

    const setInvalidMetrics = () => {
        // @ts-ignore - Intentionally setting invalid metrics
        updateMetrics({
            score: "not-an-array",
            invalidType: undefined,
            malformedData: { nested: "object" }
        });
    };

    return (
        <div>
            <h2>Test Corrupted Storage and Invalid Data</h2>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <button onClick={corruptStorage}>
                    Corrupt Storage Data
                </button>
                <button onClick={setInvalidMetrics}>
                    Set Invalid Metrics
                </button>
                <button onClick={resetStorage}>
                    Reset Storage
                </button>
                <button onClick={() => window.location.reload()}>
                    Reload Page
                </button>
            </div>
            <div>
                <h3>Current Metrics:</h3>
                <pre>{JSON.stringify(metrics, null, 2)}</pre>
                <h3>Local Storage:</h3>
                <pre>{localStorage.getItem('corrupted-storage-test') || 'No stored data'}</pre>
            </div>
            <div>
                <h3>Test Instructions:</h3>
                <ol>
                    <li>Click "Corrupt Storage Data" to simulate corrupted localStorage</li>
                    <li>Reload the page to see how the system handles corrupted data</li>
                    <li>Try setting invalid metrics to test error handling</li>
                    <li>Use Reset Storage to clear everything and start fresh</li>
                </ol>
            </div>
        </div>
    );
};

const Template: StoryFn = () => {
    // Test both valid and invalid achievement configurations
    const config: AchievementConfiguration = {
        score: [
            {
                isConditionMet: (value) => typeof value === 'number' && value >= 100,
                achievementDetails: {
                    achievementId: 'high_score',
                    achievementTitle: 'High Score',
                    achievementDescription: 'Reached 100 points',
                    achievementIconKey: 'trophy'
                }
            },
            {
                // @ts-ignore - Intentionally invalid condition
                isConditionMet: "not a function",
                achievementDetails: {
                    achievementId: 'invalid_achievement',
                    achievementTitle: 'Invalid Achievement',
                    achievementDescription: 'This should be handled gracefully',
                    achievementIconKey: 'error'
                }
            }
        ],
        // @ts-ignore - Testing invalid metric type
        invalidMetric: "not an array of conditions",
    };

    return (
        <AchievementProvider 
            config={config} 
            storageKey="corrupted-storage-test"
            initialState={{
                score: [],
                // @ts-ignore - Testing invalid initial state
                invalidData: { nested: "object" }
            }}
        >
            <TestComponent />
        </AchievementProvider>
    );
};

export const CorruptedStorageTest = Template.bind({});
CorruptedStorageTest.parameters = {
    docs: {
        description: {
            story: 'Tests error handling for corrupted storage data and invalid configurations'
        }
    }
};


================================================
FILE: stories/providers/AchievementProvider.CustomStyles.stories.tsx
================================================
import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { AchievementProvider } from '../../src';
import { AchievementConfiguration } from '../../src/types';
import { useAchievement } from '../../src/hooks/useAchievement';
import { ToastContainer } from 'react-toastify';

export default {
    title: 'Achievement System/AchievementProvider/CustomStyles',
    component: AchievementProvider,
} as Meta;

const customStyles = {
    // Custom toast styles are handled via CSS classes and react-toastify's options
    badgesModal: {
        modal: {
            backgroundColor: '#34495e',
            borderRadius: '15px',
            padding: '20px',
        },
        title: {
            color: '#e67e22',
            fontSize: '24px',
        },
        content: {
            color: '#ecf0f1',
        },
        badge: {
            backgroundColor: '#2c3e50',
            padding: '15px',
            borderRadius: '8px',
            margin: '10px',
        },
    },
    badgesButton: {
        button: {
            backgroundColor: '#27ae60',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        },
    },
};

const TestComponent = () => {
    const { metrics, updateMetrics } = useAchievement();

    const triggerAchievement = () => {
        updateMetrics({
            visits: [...(metrics.visits || []), 1]
        });
    };

    return (
        <div>
            <h2>Test Custom Styles</h2>
            <button onClick={triggerAchievement}>Trigger Achievement</button>
            <div>
                <h3>Current State:</h3>
                <pre>{JSON.stringify(metrics, null, 2)}</pre>
            </div>
            <style>
                {`
                    .Toastify__toast {
                        background-color: #2c3e50;
                        color: #ecf0f1;
                        border-radius: 10px;
                    }
                    .Toastify__toast-body {
                        font-family: Arial, sans-serif;
                    }
                    .Toastify__progress-bar {
                        background: #27ae60;
                    }
                `}
            </style>
        </div>
    );
};

const Template: StoryFn = () => {
    const config: AchievementConfiguration = {
        visits: [
            {
                isConditionMet: (value) => typeof value === 'number' && value >= 1,
                achievementDetails: {
                    achievementId: 'styled-achievement',
                    achievementTitle: 'Styled Achievement',
                    achievementDescription: 'This achievement shows custom styling!',
                    achievementIconKey: 'star'
                }
            }
        ]
    };

    return (
        <AchievementProvider 
            config={config} 
            storageKey="styles-test"
            styles={customStyles}
        >
            <TestComponent />
        </AchievementProvider>
    );
};

export const CustomStylesTest = Template.bind({});
CustomStylesTest.parameters = {
    docs: {
        description: {
            story: 'Tests custom styling of achievement notifications and badges components'
        }
    }
};


================================================
FILE: stories/providers/AchievementProvider.ErrorHandling.stories.tsx
================================================
import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { AchievementProvider } from '../../src';
import { AchievementConfiguration } from '../../src/types';
import { useAchievement } from '../../src/hooks/useAchievement';

export default {
    title: 'Achievement System/AchievementProvider/ErrorHandling',
    component: AchievementProvider,
} as Meta;

const TestComponent = () => {
    const { metrics, updateMetrics } = useAchievement();

    const triggerInvalidMetric = () => {
        // @ts-ignore - Intentionally passing invalid data
        updateMetrics({
            invalidMetric: "not an array"
        });
    };

    const triggerMalformedStorage = () => {
        localStorage.setItem('error-test', 'invalid-json{');
    };

    const triggerUndefinedMetric = () => {
        updateMetrics({
            // @ts-ignore - Intentionally passing undefined
            undefinedMetric: undefined
        });
    };

    return (
        <div>
            <h2>Test Error Handling</h2>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <button onClick={triggerInvalidMetric}>Trigger Invalid Metric</button>
                <button onClick={triggerMalformedStorage}>Corrupt Storage</button>
                <button onClick={triggerUndefinedMetric}>Undefined Metric</button>
            </div>
            <div>
                <h3>Current Metrics:</h3>
                <pre>{JSON.stringify(metrics, null, 2)}</pre>
            </div>
            <div>
                <h3>Local Storage:</h3>
                <pre>{localStorage.getItem('error-test') || 'No stored data'}</pre>
            </div>
        </div>
    );
};

const Template: StoryFn = () => {
    const config: AchievementConfiguration = {
        testMetric: [
            {
                isConditionMet: (value) => typeof value === 'number' && value >= 1,
                achievementDetails: {
                    achievementId: 'test-achievement',
                    achievementTitle: 'Test Achievement',
                    achievementDescription: 'This is a test achievement',
                    achievementIconKey: 'star'
                }
            }
        ]
    };

    return (
        <AchievementProvider 
            config={config} 
            storageKey="error-test"
        >
            <TestComponent />
        </AchievementProvider>
    );
};

export const ErrorHandlingTest = Template.bind({});
ErrorHandlingTest.parameters = {
    docs: {
        description: {
            story: 'Tests error handling for invalid metrics, malformed storage data, and undefined values'
        }
    }
};


================================================
FILE: stories/providers/AchievementProvider.Icons.stories.tsx
================================================
import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { AchievementProvider } from '../../src';
import { AchievementConfiguration } from '../../src/types';
import { useAchievement } from '../../src/hooks/useAchievement';

export default {
    title: 'Achievement System/AchievementProvider/Icons',
    component: AchievementProvider,
} as Meta;

const customIcons = {
    star: '⭐️',
    badge: '🏅',
    trophy: '🏆',
    medal: '🎖️',
};

const TestComponent = () => {
    const { metrics, updateMetrics } = useAchievement();

    const triggerAchievement = (type: string) => {
        updateMetrics({ 
            ...metrics, 
            [type]: [...(metrics[type] || []), 1] 
        });
    };

    return (
        <div>
            <h2>Test Custom Icons</h2>
            <button onClick={() => triggerAchievement('star')}>Trigger Star Achievement</button>
            <button onClick={() => triggerAchievement('trophy')}>Trigger Trophy Achievement</button>
            <button onClick={() => triggerAchievement('medal')}>Trigger Medal Achievement</button>
            <pre>{JSON.stringify(metrics, null, 2)}</pre>
        </div>
    );
};

const Template: StoryFn = (args) => {
    const config: AchievementConfiguration = {
        star: [
            {
                isConditionMet: (value) => typeof value === 'number' && value >= 1,
                achievementDetails: {
                    achievementId: 'star-achievement',
                    achievementTitle: 'Star Achievement',
                    achievementDescription: 'Earned a star!',
                    achievementIconKey: 'star'
                }
            }
        ],
        trophy: [
            {
                isConditionMet: (value) => typeof value === 'number' && value >= 1,
                achievementDetails: {
                    achievementId: 'trophy-achievement',
                    achievementTitle: 'Trophy Achievement',
                    achievementDescription: 'Earned a trophy!',
                    achievementIconKey: 'trophy'
                }
            }
        ],
        medal: [
            {
                isConditionMet: (value) => typeof value === 'number' && value >= 1,
                achievementDetails: {
                    achievementId: 'medal-achievement',
                    achievementTitle: 'Medal Achievement',
                    achievementDescription: 'Earned a medal!',
                    achievementIconKey: 'medal'
                }
            }
        ]
    };

    return (
        <AchievementProvider 
            config={config} 
            storageKey="icons-test"
            icons={customIcons}
        >
            <TestComponent />
        </AchievementProvider>
    );
};

export const CustomIcons = Template.bind({});
CustomIcons.parameters = {
    docs: {
        description: {
            story: 'Tests custom icons for achievements'
        }
    }
};


================================================
FILE: stories/providers/AchievementProvider.LocalStorage.stories.tsx
================================================
import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { AchievementProvider } from '../../src';
import { AchievementConfiguration } from '../../src/types';
import { useAchievement } from '../../src/hooks/useAchievement';

export default {
    title: 'Achievement System/AchievementProvider/LocalStorage',
    component: AchievementProvider,
} as Meta;

const TestComponent = () => {
    const { metrics, updateMetrics } = useAchievement();

    const addVisit = () => {
        updateMetrics({
            visits: [...(metrics.visits || []), 1]
        });
    };

    return (
        <div>
            <h2>Test Local Storage Persistence</h2>
            <p>Current visits: {metrics.visits?.length || 0}</p>
            <button onClick={addVisit}>Add Visit</button>
            <div>
                <h3>Current State:</h3>
                <pre>{JSON.stringify(metrics, null, 2)}</pre>
            </div>
            <div>
                <h3>Instructions:</h3>
                <ol>
                    <li>Click "Add Visit" a few times</li>
                    <li>Refresh the page</li>
                    <li>State should persist</li>
                </ol>
            </div>
        </div>
    );
};

const Template: StoryFn = (args) => {
    const config: AchievementConfiguration = {
        visits: [
            {
                isConditionMet: (value) => typeof value === 'number' && value >= 1,
                achievementDetails: {
                    achievementId: 'first-visit',
                    achievementTitle: 'First Visit',
                    achievementDescription: 'You visited for the first time!',
                    achievementIconKey: 'star'
                }
            }
        ]
    };

    return (
        <AchievementProvider 
            config={config} 
            storageKey="storage-test"
        >
            <TestComponent />
        </AchievementProvider>
    );
};

export const LocalStorageTest = Template.bind({});
LocalStorageTest.parameters = {
    docs: {
        description: {
            story: 'Tests the local storage persistence functionality'
        }
    }
};


================================================
FILE: stories/providers/AchievementProvider.MultipleMetrics.stories.tsx
================================================
import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { AchievementProvider } from '../../src';
import { AchievementConfiguration } from '../../src/types';
import { useAchievement } from '../../src/hooks/useAchievement';

export default {
    title: 'Achievement System/AchievementProvider/MultipleMetrics',
    component: AchievementProvider,
} as Meta;

const TestComponent = () => {
    const { metrics, updateMetrics } = useAchievement();

    const handleClick = () => {
        const currentClicks = typeof metrics.clicks?.[0] === 'number' ? metrics.clicks[0] : 0;
        updateMetrics({
            ...metrics,
            clicks: [currentClicks + 1]
        });
    };

    const handlePointsGain = () => {
        const currentPoints = typeof metrics.points?.[0] === 'number' ? metrics.points[0] : 0;
        updateMetrics({
            ...metrics,
            points: [currentPoints + 10]
        });
    };

    const handleLevelUp = () => {
        const currentLevel = typeof metrics.level?.[0] === 'number' ? metrics.level[0] : 0;
        updateMetrics({
            ...metrics,
            level: [currentLevel + 1]
        });
    };

    return (
        <div>
            <h2>Test Multiple Achievement Types</h2>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <button onClick={handleClick}>Click (Count)</button>
                <button onClick={handlePointsGain}>Gain Points</button>
                <button onClick={handleLevelUp}>Level Up</button>
            </div>
            <div>
                <h3>Current Metrics:</h3>
                <pre>{JSON.stringify(metrics, null, 2)}</pre>
            </div>
        </div>
    );
};

const Template: StoryFn = (args) => {
    const config: AchievementConfiguration = {
        clicks: [
            {
                isConditionMet: (value) => typeof value === 'number' && value >= 5,
                achievementDetails: {
                    achievementId: 'clicker',
                    achievementTitle: 'Dedicated Clicker',
                    achievementDescription: 'Clicked 5 times!',
                    achievementIconKey: 'star'
                }
            }
        ],
        points: [
            {
                isConditionMet: (value) => typeof value === 'number' && value >= 50,
                achievementDetails: {
                    achievementId: 'point-collector',
                    achievementTitle: 'Point Collector',
                    achievementDescription: 'Earned 50 points!',
                    achievementIconKey: 'trophy'
                }
            }
        ],
        level: [
            {
                isConditionMet: (value) => typeof value === 'number' && value >= 3,
                achievementDetails: {
                    achievementId: 'level-master',
                    achievementTitle: 'Level Master',
                    achievementDescription: 'Reached level 3!',
                    achievementIconKey: 'medal'
                }
            }
        ]
    };

    return (
        <AchievementProvider 
            config={config} 
            storageKey="multiple-metrics-test"
        >
            <TestComponent />
        </AchievementProvider>
    );
};

export const MultipleMetricsTest = Template.bind({});
MultipleMetricsTest.parameters = {
    docs: {
        description: {
            story: 'Tests tracking and achieving multiple types of metrics simultaneously'
        }
    }
};


================================================
FILE: stories/providers/AchievementProvider.ProviderTest.stories.tsx
================================================
import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { AchievementProvider } from '../../src';
import {
    AchievementConfiguration,
    AchievementMetrics,
    AchievementDetails,
    InitialAchievementMetrics,
    AchievementMetricValue
} from '../../src/types';

// Define achievement details according to the correct interface
const firstVisitAchievement: AchievementDetails = {
    achievementId: 'first-visit',
    achievementTitle: 'Welcome!',
    achievementDescription: 'Visit the application for the first time',
    achievementIconKey: 'star'
};

// Simple test achievement configuration with proper types
const testAchievementConfig: AchievementConfiguration = {
    'pageVisits': [
        {
            isConditionMet: (metricValue: AchievementMetricValue) => typeof metricValue ===
                'number' && metricValue >= 1,
            achievementDetails: firstVisitAchievement
        }
    ]
};

// Initial metrics structure following the AchievementMetrics interface
const initialMetrics: AchievementMetrics = {
    'pageVisits': [1]
};

// Initial state for achievements following InitialAchievementMetrics interface
const initialAchievementState: InitialAchievementMetrics = {
    'pageVisits': 0
};

export default {
    title: 'Achievement System/AchievementProvider Test',
    component: AchievementProvider,
    parameters: {
        controls: { expanded: true },
        docs: {
            description: {
                component: 'This story tests the basic functionality of the AchievementProvider component.'
            }
        }
    },
    argTypes: {
        storageKey: {
            control: 'text',
            description: 'Key used for localStorage',
            defaultValue: 'test-achievements'
        },
        badgesButtonPosition: {
            control: 'select',
            options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
            description: 'Position of the badges button',
            defaultValue: 'top-right'
        }
    }
} as Meta;

// Create a wrapper component for the story
interface ProviderTestProps {
    storageKey?: string;
    badgesButtonPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const ProviderTest = (args: { storageKey?: "test-achievements" | undefined; badgesButtonPosition?: "top-right" | undefined; }) => {
    const { storageKey = 'test-achievements', badgesButtonPosition = 'top-right' } = args;

    // State to track trigger count
    const [triggerCount, setTriggerCount] = React.useState(0);

    const triggerAchievement = () => {
        const event = new CustomEvent('achievement-trigger', {
            detail: {
                metric: 'pageVisits',
                value: 1
            }
        });
        window.dispatchEvent(event);
        setTriggerCount(prevCount => prevCount + 1);
    };

    return (
        <AchievementProvider
            config={testAchievementConfig}
            initialState={initialAchievementState}
            storageKey={storageKey}
            badgesButtonPosition={badgesButtonPosition}
        >
            <div style={{
                padding: '2rem',
                border: '1px solid #eaeaea',
                borderRadius: '8px',
                maxWidth: '600px',
                margin: '0 auto',
                background: '#f9f9f9'
            }}>
                <h1>Achievement Provider Test</h1>
                <p>This story tests the basic functionality of the AchievementProvider component.</p>

                <div style={{ marginTop: '2rem' }}>
                    <div style={{ marginBottom: '1rem' }}>
                        <strong>Configuration:</strong>
                        <ul>
                            <li>Storage Key: {storageKey}</li>
                            <li>Badges Button Position: {badgesButtonPosition}</li>
                            <li>Achievement triggers: {triggerCount}</li>
                        </ul>
                    </div>

                    <div style={{
                        marginTop: '1rem',
                        padding: '1rem',
                        background: '#f0f0f0',
                        borderRadius: '4px',
                        fontFamily: 'monospace',
                        fontSize: '14px'
                    }}>
                        <strong>Achievement Configuration:</strong>
                        <pre>{JSON.stringify(testAchievementConfig, null, 2)}</pre>

                        <strong>Initial Metrics:</strong>
                        <pre>{JSON.stringify(initialMetrics, null, 2)}</pre>

                        <strong>Initial Achievement State:</strong>
                        <pre>{JSON.stringify(initialAchievementState, null, 2)}</pre>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                        <button
                            style={{
                                padding: '0.75rem 1.5rem',
                                background: '#0070f3',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                            onClick={triggerAchievement}
                        >
                            Trigger Achievement
                        </button>

                        <button
                            style={{
                                padding: '0.75rem 1.5rem',
                                background: '#f5f5f5',
                                color: '#333',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                            onClick={() => {
                                localStorage.removeItem(storageKey);
                                window.location.reload();
                            }}
                        >
                            Reset Storage
                        </button>
                    </div>

                    <div style={{
                        marginTop: '2rem',
                        padding: '1rem',
                        border: '1px dashed #ccc',
                        borderRadius: '4px',
                        background: '#fff'
                    }}>
                        <h3>Test Instructions:</h3>
                        <ol>
                            <li>Click the "Trigger Achievement" button to simulate a page visit</li>
                            <li>Observe the achievement notification that appears</li>
                            <li>Click on the badges button to view unlocked achievements</li>
                            <li>Use the "Reset Storage" button to clear stored achievements and start fresh</li>
                        </ol>
                    </div>
                </div>
            </div>
        </AchievementProvider>
    );
};

export const BasicProviderTest = (args: { storageKey?: "test-achievements" | undefined; badgesButtonPosition?: "top-right" | undefined; }) => (
    <ProviderTest {...args} />
);
BasicProviderTest.storyName = 'Basic Provider Test';


================================================
FILE: stories/providers/AchievementProvider.RaceConditions.stories.tsx
================================================
import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { AchievementProvider } from '../../src';
import { AchievementConfiguration } from '../../src/types';
import { useAchievement } from '../../src/hooks/useAchievement';

export default {
    title: 'Achievement System/AchievementProvider/RaceConditions',
    component: AchievementProvider,
} as Meta;

const TestComponent = () => {
    const { metrics, updateMetrics } = useAchievement();

    const triggerMultipleAchievements = () => {
        // Update multiple metrics simultaneously in a single update
        updateMetrics({
            score: [100],
            time: [60],
            combo: [5]
        });
    };

    const triggerRapidAchievements = () => {
        // Rapidly update metrics in succession
        updateMetrics({
            score: [10]
        });
        
        setTimeout(() => {
            updateMetrics({
                time: [20],
                score: [50]
            });
        }, 100);
        
        setTimeout(() => {
            updateMetrics({
                combo: [5],
                score: [100]  // This should trigger the high score achievement
            });
        }, 200);
    };

    return (
        <div>
            <h2>Test Multiple Achievement Race Conditions</h2>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <button onClick={triggerMultipleAchievements}>
                    Trigger Multiple Achievements (Simultaneous)
                </button>
                <button onClick={triggerRapidAchievements}>
                    Trigger Rapid Achievements (Sequential)
                </button>
            </div>
            <div>
                <h3>Current Metrics:</h3>
                <pre>{JSON.stringify(metrics, null, 2)}</pre>
            </div>
            <div style={{ marginTop: '20px' }}>
                <h3>Test Instructions:</h3>
                <ol>
                    <li>Click "Trigger Multiple Achievements" to see all achievements trigger at once</li>
                    <li>Click "Trigger Rapid Achievements" to see score increase over time until reaching 100</li>
                    <li>Observe how achievements trigger as their conditions are met</li>
                </ol>
            </div>
        </div>
    );
};

const Template: StoryFn = () => {
    const config: AchievementConfiguration = {
        score: [
            {
                isConditionMet: (value) => typeof value === 'number' && value >= 100,
                achievementDetails: {
                    achievementId: 'high_score',
                    achievementTitle: 'High Score',
                    achievementDescription: 'Reached 100 points',
                    achievementIconKey: 'trophy'
                }
            }
        ],
        time: [
            {
                isConditionMet: (value) => typeof value === 'number' && value >= 60,
                achievementDetails: {
                    achievementId: 'time_master',
                    achievementTitle: 'Time Master',
                    achievementDescription: 'Lasted 60 seconds',
                    achievementIconKey: 'clock'
                }
            }
        ],
        combo: [
            {
                isConditionMet: (value) => typeof value === 'number' && value >= 5,
                achievementDetails: {
                    achievementId: 'combo_king',
                    achievementTitle: 'Combo King',
                    achievementDescription: 'Got a 5x combo',
                    achievementIconKey: 'star'
                }
            }
        ]
    };

    return (
        <AchievementProvider 
            config={config} 
            storageKey="race-conditions-test"
        >
            <TestComponent />
        </AchievementProvider>
    );
};

export const RaceConditionsTest = Template.bind({});
RaceConditionsTest.parameters = {
    docs: {
        description: {
            story: 'Tests handling of multiple achievements being triggered simultaneously or in rapid succession'
        }
    }
};


================================================
FILE: stories/providers/AchievementProvider.ResetStorage.stories.tsx
================================================
// stories/AchievementProvider.ProviderTest.stories.tsx

import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { AchievementProvider } from '../../src';
import { AchievementConfiguration } from '../../src/types';
import { useAchievement } from '../../src/hooks/useAchievement';

export default {
    title: 'Achievement System/AchievementProvider/ResetStorage',
    component: AchievementProvider,
} as Meta;

const TestComponent = () => {
    const { metrics, updateMetrics, resetStorage } = useAchievement();

    const triggerAchievement = () => {
        updateMetrics({
            visits: [...(metrics.visits || []), 1]
        });
    };

    return (
        <div>
            <h2>Test Storage Reset</h2>
            <button onClick={triggerAchievement}>Trigger Achievement</button>
            <button onClick={resetStorage}>Reset Storage</button>
            <pre>{JSON.stringify(metrics, null, 2)}</pre>
        </div>
    );
};

const Template: StoryFn = (args) => {
    const config: AchievementConfiguration = {
        visits: [
            {
                isConditionMet: (value) => typeof value === 'number' && value >= 1,
                achievementDetails: {
                    achievementId: 'first-visit',
                    achievementTitle: 'First Visit',
                    achievementDescription: 'You visited for the first time!',
                    achievementIconKey: 'star'
                }
            }
        ]
    };

    return (
        <AchievementProvider 
            config={config} 
            storageKey="reset-test"
        >
            <TestComponent />
        </AchievementProvider>
    );
};

export const ResetStorageTest = Template.bind({});
ResetStorageTest.parameters = {
    docs: {
        description: {
            story: 'Tests the storage reset functionality'
        }
    }
};


================================================
FILE: stories/providers/AchievementProvider.TestPreviousSavedState.stories.tsx
================================================
import React, { useState, useEffect } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { AchievementProvider } from '../../src';
import { AchievementConfiguration, AchievementMetricValue, InitialAchievementMetrics } from '../../src/types';
import { useAchievement } from '../../src/hooks/useAchievement';
import { defaultAchievementIcons } from '../../src/assets/defaultIcons';

export default {
    title: 'Achievement System/AchievementProvider/TestPreviousSavedState',
    component: AchievementProvider,
} as Meta;

const TestComponent = () => {
    const { metrics, updateMetrics, unlockedAchievements } = useAchievement();
    const [clickCount, setClickCount] = useState<number>(0);
    const [viewCount, setViewCount] = useState<number>(0);
    const [pointCount, setPointCount] = useState<number>(0);

    // Initialize state from metrics
    useEffect(() => {
        const initialClicks = typeof metrics.clicks?.[0] === 'number' ? metrics.clicks[0] : 0;
        const initialViews = typeof metrics.views?.[0] === 'number' ? metrics.views[0] : 0;
        const initialPoints = typeof metrics.points?.[0] === 'number' ? metrics.points[0] : 0;

        setClickCount(initialClicks);
        setViewCount(initialViews);
        setPointCount(initialPoints);
    }, [metrics]);

    const handleButtonClick = () => {
        const newClickCount = clickCount + 1;
        setClickCount(newClickCount);
        updateMetrics({ 
            ...metrics,
            clicks: [newClickCount] 
        });
    };

    const handleView = () => {
        const newViewCount = viewCount + 1;
        setViewCount(newViewCount);
        updateMetrics({ 
            ...metrics,
            views: [newViewCount] 
        });
    };

    const handlePointGain = () => {
        const newPointCount = pointCount + 50;
        setPointCount(newPointCount);
        updateMetrics({ 
            ...metrics,
            points: [newPointCount] 
        });
    };

    return (
        <div>
            <h2>Test Previously Awarded Achievements</h2>
            <div style={{ marginBottom: '20px' }}>
                <p>Test different scenarios with previously awarded achievements:</p>
                <ul>
                    <li>View achievement already awarded (should not trigger again)</li>
                    <li>Points achievement partially completed</li>
                    <li>Click achievement not started</li>
                </ul>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <button onClick={handleButtonClick}>Click ({clickCount})</button>
                <button onClick={handleView}>View Page ({viewCount})</button>
                <button onClick={handlePointGain}>Gain Points ({pointCount})</button>
            </div>
            <div>
                <h3>Current State:</h3>
                <div>
                    <h4>Metrics:</h4>
                    <pre>{JSON.stringify(metrics, null, 2)}</pre>
                </div>
                <div>
                    <h4>Unlocked Achievements:</h4>
                    <pre>{JSON.stringify(unlockedAchievements, null, 2)}</pre>
                </div>
            </div>
        </div>
    );
};

const Template: StoryFn = () => {
    const config: AchievementConfiguration = {
        clicks: [
            {
                isConditionMet: (value: AchievementMetricValue) => typeof value === 'number' && value >= 5,
                achievementDetails: {
                    achievementId: 'click_master_bronze',
                    achievementTitle: 'Bronze Click Master',
                    achievementDescription: 'Clicked 5 times!',
                    achievementIconKey: 'bronze',
                },
            },
            {
                isConditionMet: (value: AchievementMetricValue) => typeof value === 'number' && value >= 10,
                achievementDetails: {
                    achievementId: 'click_master_silver',
                    achievementTitle: 'Silver Click Master',
                    achievementDescription: 'Clicked 10 times!',
                    achievementIconKey: 'silver',
                },
            }
        ],
        views: [
            {
                isConditionMet: (value: AchievementMetricValue) => typeof value === 'number' && value >= 3,
                achievementDetails: {
                    achievementId: 'view_watcher_bronze',
                    achievementTitle: 'Bronze View Watcher',
                    achievementDescription: 'Viewed 3 times!',
                    achievementIconKey: 'bronze',
                },
            },
            {
                isConditionMet: (value: AchievementMetricValue) => typeof value === 'number' && value >= 5,
                achievementDetails: {
                    achievementId: 'view_watcher_silver',
                    achievementTitle: 'Silver View Watcher',
                    achievementDescription: 'Viewed 5 times!',
                    achievementIconKey: 'silver',
                },
            }
        ],
        points: [
            {
                isConditionMet: (value: AchievementMetricValue) => typeof value === 'number' && value >= 100,
                achievementDetails: {
                    achievementId: 'point_collector_bronze',
                    achievementTitle: 'Bronze Point Collector',
                    achievementDescription: 'Collected 100 points!',
                    achievementIconKey: 'bronze',
                },
            },
            {
                isConditionMet: (value: AchievementMetricValue) => typeof value === 'number' && value >= 200,
                achievementDetails: {
                    achievementId: 'point_collector_silver',
                    achievementTitle: 'Silver Point Collector',
                    achievementDescription: 'Collected 200 points!',
                    achievementIconKey: 'silver',
                },
            }
        ],
    };

    // Initial state with mixed scenarios:
    // 1. Views achievement already completed
    // 2. Points achievement partially completed
    // 3. Clicks achievement not started
    const initialState = {
        clicks: 0,
        views: 4, // Already passed bronze (3), approaching silver (5)
        points: 50, // Halfway to bronze (100)
        previouslyAwardedAchievements: ['view_watcher_bronze'], // Bronze view achievement already awarded
    };

    return (
        <AchievementProvider
            config={config}
            initialState={initialState}
            icons={defaultAchievementIcons}
            storageKey="previous-state-test"
        >
            <TestComponent />
            <ResetStorageButton storageKey="previous-state-test" />
        </AchievementProvider>
    );
};

export const TestPreviousSavedState = Template.bind({});
TestPreviousSavedState.parameters = {
    docs: {
        description: {
            story: 'Tests various scenarios with previously awarded achievements and partially completed progress.'
        }
    }
};

const ResetStorageButton = ({ storageKey }: { storageKey: string }) => {
    const handleResetStorage = () => {
        localStorage.removeItem(storageKey);
        window.location.reload();
    };

    return (
        <button
            style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                padding: '8px 16px',
                background: '#f5f5f5',
                color: '#333',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer',
            }}
            onClick={handleResetStorage}
        >
            Reset Storage
        </button>
    );
};


================================================
FILE: stories/providers/AchievementProvider.ToastNotifications.stories.tsx
================================================
import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { AchievementProvider } from '../../src';
import { AchievementConfiguration } from '../../src/types';
import { useAchievement } from '../../src/hooks/useAchievement';

export default {
    title: 'Achievement System/AchievementProvider/ToastNotifications',
    component: AchievementProvider,
} as Meta;

const TestComponent = () => {
    const { metrics, updateMetrics } = useAchievement();

    const triggerSimpleAchievement = () => {
        updateMetrics({
            basic: [...(metrics.basic || []), 1]
        });
    };

    const triggerSpecialAchievement = () => {
        updateMetrics({
            special: [...(metrics.special || []), 1]
        });
    };

    const triggerRareAchievement = () => {
        updateMetrics({
            rare: [...(metrics.rare || []), 1]
        });
    };

    const triggerEpicAchievement = () => {
        updateMetrics({
            epic: [...(metrics.epic || []), 1]
        });
    };

    const triggerLegendaryAchievement = () => {
        updateMetrics({
            legendary: [...(metrics.legendary || []), 1]
        });
    };

    return (
        <div>
            <h2>Test Achievement Toast Notifications</h2>
            <p>Click the buttons below to trigger different types of achievements and see their toast notifications:</p>
            
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <button 
                    onClick={triggerSimpleAchievement}
                    style={{ padding: '10px 20px', background: '#f0f0f0' }}
                >
                    Trigger Basic Achievement
                </button>
                <button 
                    onClick={triggerSpecialAchievement}
                    style={{ padding: '10px 20px', background: '#4CAF50', color: 'white' }}
                >
                    Trigger Special Achievement
                </button>
                <button 
                    onClick={triggerRareAchievement}
                    style={{ padding: '10px 20px', background: '#2196F3', color: 'white' }}
                >
                    Trigger Rare Achievement
                </button>
                <button 
                    onClick={triggerEpicAchievement}
                    style={{ padding: '10px 20px', background: '#9C27B0', color: 'white' }}
                >
                    Trigger Epic Achievement
                </button>
                <button 
                    onClick={triggerLegendaryAchievement}
                    style={{ padding: '10px 20px', background: '#FF9800', color: 'white' }}
                >
                    Trigger Legendary Achievement
                </button>
            </div>

            <div>
                <h3>Current Metrics:</h3>
                <pre>{JSON.stringify(metrics, null, 2)}</pre>
            </div>

            <div style={{ marginTop: '20px' }}>
                <h3>Test Instructions:</h3>
                <ol>
                    <li>Click different buttons to trigger various achievement types</li>
                    <li>Observe how each achievement type has its own icon and style</li>
                    <li>Note how toast notifications stack and queue when triggered rapidly</li>
                    <li>Try hovering over notifications to pause their auto-dismiss</li>
                    <li>Click on notifications to dismiss them manually</li>
                </ol>
            </div>

            <style>
                {`
                    .Toastify__toast {
                        border-radius: 8px;
                        margin-bottom: 8px;
                    }
                    .Toastify__toast-body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    }
                    .Toastify__progress-bar {
                        height: 3px;
                    }
                `}
            </style>
        </div>
    );
};

const Template: StoryFn = () => {
    const config: AchievementConfiguration = {
        basic: [
            {
                isConditionMet: (value) => typeof value === 'number' && value >= 1,
                achievementDetails: {
                    achievementId: 'basic-achievement',
                    achievementTitle: 'First Steps',
                    achievementDescription: 'You earned your first achievement!',
                    achievementIconKey: 'firstStep'
                }
            }
        ],
        special: [
            {
                isConditionMet: (value) => typeof value === 'number' && value >= 1,
                achievementDetails: {
                    achievementId: 'special-achievement',
                    achievementTitle: 'Special Discovery',
                    achievementDescription: 'You found something special!',
                    achievementIconKey: 'special'
                }
            }
        ],
        rare: [
            {
                isConditionMet: (value) => typeof value === 'number' && value >= 1,
                achievementDetails: {
                    achievementId: 'rare-achievement',
                    achievementTitle: 'Rare Find',
                    achievementDescription: 'You discovered something rare!',
                    achievementIconKey: 'rare'
                }
            }
        ],
        epic: [
            {
                isConditionMet: (value) => typeof value === 'number' && value >= 1,
                achievementDetails: {
                    achievementId: 'epic-achievement',
                    achievementTitle: 'Epic Victory',
                    achievementDescription: 'You accomplished something epic!',
                    achievementIconKey: 'epic'
                }
            }
        ],
        legendary: [
            {
                isConditionMet: (value) => typeof value === 'number' && value >= 1,
                achievementDetails: {
                    achievementId: 'legendary-achievement',
                    achievementTitle: 'Legendary Status',
                    achievementDescription: 'You achieved legendary status!',
                    achievementIconKey: 'legendary'
                }
            }
        ]
    };

    return (
        <AchievementProvider 
            config={config} 
            storageKey="toast-test"
            soundUrl="/trophy.mp3"
        >
            <TestComponent />
        </AchievementProvider>
    );
};

export const ToastNotificationsTest = Template.bind({});
ToastNotificationsTest.parameters = {
    docs: {
        description: {
            story: 'Tests different types of achievement toast notifications with various styles and interactions'
        }
    }
};


================================================
FILE: .storybook/main.ts
================================================
import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
    "../stories/**/*.mdx"
  ],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
  staticDirs: ['../public'],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    check: false,
  }
};

export default config;



================================================
FILE: .storybook/preview.ts
================================================
// @ts-ignore
import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;


