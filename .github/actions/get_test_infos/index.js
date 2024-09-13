// .github/actions/get_test_infos/process_dirs.js

import { processDirs } from './process_dirs.js'; // Import the processDirs function

// Parse command-line arguments
const [, , dirsArg, excludeDirsArg] = process.argv;

// Convert comma-separated strings to arrays
const dirs = dirsArg.split(',').filter((path) => path !== '');
const excludeDirs = excludeDirsArg.split(',').filter((path) => path !== '');

async function main() {
    try {
        const result = await processDirs(dirs, excludeDirs);
        console.log(JSON.stringify(result));
    } catch (error) {
        console.error('Error processing directories:', error);
        process.exit(1);
    }
}

main();
