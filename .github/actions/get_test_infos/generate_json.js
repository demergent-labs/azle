import { basename } from 'path';

// Function to check if a directory is excluded
function isExcluded(dir, excludeDirs) {
    return excludeDirs.some((exclude) => dir.includes(exclude));
}

// Function to generate JSON object for each directory
function generateJson(dir) {
    const name = basename(dir);
    const type = getType(dir);
    const methodology = getMethodology(dir);
    const api = getApi(dir);

    return {
        path: dir,
        name: name,
        type: type,
        ...(methodology != '' && { methodology }),
        ...(api != '' && { api })
    };
}

// Helper functions to determine type, syntax, and API
function getType(dir) {
    if (dir.includes('/examples/')) return 'ex';
    if (dir.includes('/end_to_end/')) return 'e2e';
    if (dir.includes('/property/')) return 'prop';
    return '';
}

function getMethodology(dir) {
    if (dir.includes('/candid_rpc/')) return 'crpc';
    if (dir.includes('/http_server/')) return 'http';
    if (dir.includes('/ic_api/')) return 'ic_api';
    return '';
}

function getApi(dir) {
    const functionalPattern = /\/functional(?:_api|_syntax)?\//;
    const classPattern = /\/class(?:_api|_syntax)?\//;
    if (functionalPattern.test(dir)) return 'functional';
    if (classPattern.test(dir)) return 'class';
    return '';
}

// Get input from the command-line arguments
const directories = process.argv[2].split(' ').filter((path) => path !== '');
const excludeDirs = process.argv[3].split(',').filter((path) => path !== '');

// Filter directories and generate JSON
const jsonArray = directories
    .filter((dir) => dir && !isExcluded(dir, excludeDirs))
    .map((dir) => generateJson(dir));

// Output the final JSON string
console.log(JSON.stringify(jsonArray));
