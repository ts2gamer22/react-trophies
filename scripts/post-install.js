#!/usr/bin/env node
const readline = require('readline');
const fs = require('fs');
const path = require('path');

// --- Configuration ---
// Define the project root relative to the script's location in node_modules
const projectRoot = path.resolve(__dirname, '..', '..', '..');

// Environment variable to skip the post-install script completely
const skipPostinstall = process.env.REACT_TROPHIES_SKIP_POSTINSTALL === 'true';

const directoriesToCreate = [
  './src/components/achievements',
  './src/lib/achievements',
  './public/sounds'
];

// ANSI color codes for a nice terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m'
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * A visually appealing welcome banner.
 */
function displayWelcomeBanner() {
  console.log(`
${colors.bright}${colors.yellow}╔════════════════════════════════════════════════════╗
║                                                    ║
║   🏆  Welcome to React-Trophies Setup  🏆         ║
║                                                    ║
╚════════════════════════════════════════════════════╝${colors.reset}

This optional setup will help you integrate react-trophies into your project.
`);
}

/**
 * Asks the user to choose their framework.
 */
function askFramework() {
  return new Promise((resolve) => {
    console.log(`${colors.cyan}Which framework are you using?${colors.reset}\n`);
    console.log(`  ${colors.bright}1)${colors.reset} Next.js`);
    console.log(`  ${colors.bright}2)${colors.reset} Vite`);
    console.log(`  ${colors.bright}3)${colors.reset} Other (Create React App, etc.)\n`);

    rl.question(`${colors.green}Enter your choice (1-3):${colors.reset} `, (answer) => {
      const choice = parseInt(answer.trim(), 10);
      const frameworks = ['nextjs', 'vite', 'cra'];
      if (isNaN(choice) || choice < 1 || choice > 3) {
        console.log(`${colors.red}Invalid choice. Please enter a number between 1 and 3.${colors.reset}\n`);
        return askFramework().then(resolve);
      }
      resolve(frameworks[choice - 1]);
    });
  });
}


/**
 * Asks the user to choose the type of project.
 */
function askProjectType() {
  return new Promise((resolve) => {
    console.log(`${colors.cyan}What are you building?${colors.reset}\n`);
    console.log(`  ${colors.bright}1)${colors.reset} Course / LMS`);
    console.log(`  ${colors.bright}2)${colors.reset} Builder / SaaS`);
    console.log(`  ${colors.bright}3)${colors.reset} Game`);
    console.log(`  ${colors.bright}4)${colors.reset} Other / Generic\n`);

    rl.question(`${colors.green}Enter your choice (1-4):${colors.reset} `, (answer) => {
      const choice = parseInt(answer.trim(), 10);
      const types = ['courses', 'builder', 'game', 'generic'];
      if (isNaN(choice) || choice < 1 || choice > 4) {
        console.log(`${colors.red}Invalid choice. Please enter a number between 1 and 4.${colors.reset}\n`);
        return askProjectType().then(resolve);
      }
      resolve(types[choice - 1]);
    });
  });
}

/**
 * Copies the template files to the user's project.
 */
function setupFramework(framework, projectType = 'generic') {
    // Determine the correct file extensions by checking for tsconfig.json in the project root
    const useTypeScript = fs.existsSync(path.join(projectRoot, 'tsconfig.json'));
    const ext = useTypeScript ? 'tsx' : 'jsx';
    const configExt = useTypeScript ? 'ts' : 'js';

    console.log(`\n${colors.bright}Setting up a ${projectType.toUpperCase()} on ${framework.toUpperCase()} using ${useTypeScript ? 'TypeScript' : 'JavaScript'}...${colors.reset}\n`);
    
    // Create directories in the project root
    directoriesToCreate.forEach(dir => {
        const fullPath = path.join(projectRoot, dir);
        if (!fs.existsSync(fullPath)) {
            fs.mkdirSync(fullPath, { recursive: true });
            console.log(`  ${colors.green}✓ Created directory:${colors.reset} ${dir}`);
        }
    });

    // Define source and target files using absolute paths
    const packageDir = path.resolve(__dirname, '..');
    let templateDir = path.join(packageDir, 'templates', projectType, framework);
    if (!fs.existsSync(templateDir)) {
        templateDir = path.join(packageDir, 'examples', framework); // Fallback for older package versions
    }
    const sourceFiles = [
        {
          source: path.join(templateDir, `config.${configExt}`),
          target: path.join(projectRoot, `./src/lib/achievements/config.${configExt}`)
        },
        {
          source: path.join(templateDir, `AchievementWrapper.${ext}`),
          target: path.join(projectRoot, `./src/components/achievements/AchievementWrapper.${ext}`)
        },
        {
          source: path.join(templateDir, `AchievementDemo.${ext}`),
          target: path.join(projectRoot, `./src/components/achievements/AchievementDemo.${ext}`)
        }
    ];

    // Copy each file, with overwrite protection
    sourceFiles.forEach(file => {
        let sourcePath = file.source;
        if (!fs.existsSync(sourcePath)) {
            sourcePath = path.join(packageDir, 'examples', 'basic', path.basename(file.source));
        }

        if (fs.existsSync(file.target)) {
            console.log(`  ${colors.yellow}✓ Skipped (already exists):${colors.reset} ${path.relative(projectRoot, file.target)}`);
        } else if (fs.existsSync(sourcePath)) {
            fs.copyFileSync(sourcePath, file.target);
            console.log(`  ${colors.green}✓ Created:${colors.reset} ${path.relative(projectRoot, file.target)}`);
        } else {
            console.log(`  ${colors.red}✗ Error:${colors.reset} Could not find template file for ${path.relative(projectRoot, file.target)}`);
            console.log(`    Template file not bundled - please file an issue at https://github.com/ts2gamer22/react-trophies/issues`);
        }
    });

    // Create a sample sound file marker in the project root
    const readmePath = path.join(projectRoot, './public/sounds/README.txt');
    if (!fs.existsSync(path.join(projectRoot, './public/sounds/achievement.mp3'))) {
        fs.writeFileSync(readmePath, 
          'Place your achievement sound effect here named "achievement.mp3".\nYou can find free sound effects at https://freesound.org/ or https://mixkit.co/free-sound-effects/');
        console.log(`  ${colors.green}✓ Created:${colors.reset} ./public/sounds/README.txt`);
    }

    console.log(`\n${colors.bright}${colors.green}✅ Files and directories have been created!${colors.reset}`);
}


/**
 * The main setup function.
 */
async function runSetup() {
    // IMPORTANT SAFEGUARD: Skip postinstall if explicitly requested
    if (skipPostinstall) {
        console.log(`${colors.yellow}REACT_TROPHIES_SKIP_POSTINSTALL=true detected, skipping setup.${colors.reset}`);
        return;
    }
    
    // IMPORTANT SAFEGUARD: Skip postinstall in CI environments
    if (process.env.CI || process.env.CI === 'true' || process.env.CONTINUOUS_INTEGRATION) {
        console.log(`${colors.yellow}CI environment detected. Running default, non-interactive setup...${colors.reset}`);
        setupFramework('vite', 'generic'); // Default to Vite for non-interactive setup
        return;
    }

    // IMPORTANT SAFEGUARD: Skip if installing globally
    if (process.env.npm_config_global) {
        console.log(`${colors.yellow}Global install detected, skipping post-install script.${colors.reset}`);
        return;
    }

    // If not in an interactive terminal, run a default setup and inform the user.
    if (!process.stdout.isTTY) {
        console.log(`
${colors.yellow}🏆 React-Trophies post-install${colors.reset}`);
        console.log('Non-interactive environment detected. Running default setup...');
        setupFramework('vite', 'generic'); // Default to Vite, a good generic choice
        console.log(`\n${colors.bright}✅ Default setup complete!${colors.reset}`);
        console.log(`   For more options, run: ${colors.bright}${colors.cyan}npx react-trophies-setup${colors.reset}\n`);
        return; // Exit gracefully
    }

    // --- Interactive Setup --- 
    displayWelcomeBanner();

    rl.question(`${colors.green}Would you like to run the guided setup? (Y/n):${colors.reset} `, async (answer) => {
        if (answer.trim().toLowerCase() === 'n') {
            console.log(`\n${colors.cyan}Setup skipped. You can run it manually later with: ${colors.bright}npx react-trophies-setup${colors.reset}`);
            rl.close();
            return;
        }

        const framework = await askFramework();
        const projectType = await askProjectType();
        setupFramework(framework, projectType);
        
        console.log(`\n${colors.bright}${colors.green}🎉 All done! Check the new files in your project to get started.${colors.reset}`);
        rl.close();
    });
}

runSetup();

