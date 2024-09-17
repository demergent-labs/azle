import { getTestInfos } from './get_test_infos.js';

// Parse command-line arguments
const [, , dirsArg, excludeDirsArg] = process.argv;

// Convert comma-separated strings to arrays
const dirs = dirsArg.split(',').filter((path) => path !== '');
const excludeDirs = excludeDirsArg.split(',').filter((path) => path !== '');

async function main(): Promise<void> {
    try {
        const result = await getTestInfos(dirs, excludeDirs);
        process.stdout.write(JSON.stringify(result));
    } catch (error) {
        console.error('Error processing directories:', error);
        process.exit(1);
    }
}

main();
