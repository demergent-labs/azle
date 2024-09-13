import { basename } from 'path';

export function generateTestInfos(directories, excludeDirs) {
    const jsonArray = directories
        .filter((dir) => dir && !isExcluded(dir, excludeDirs))
        .map((dir) => generateJson(dir));

    return jsonArray;
}

// Function to generate JSON object for each directory
function generateJson(dir) {
    const path = dir;
    const name = basename(dir);
    const type = getType(dir);
    const displayPath = generateDisplayPath(dir);

    return { path, name, type, displayPath };
}

// Function to check if a directory is excluded
function isExcluded(dir, excludeDirs) {
    return excludeDirs.some((exclude) => dir.includes(exclude));
}

// Helper functions to determine type, syntax, and API
function getType(dir) {
    if (dir.includes('/examples/')) return 'ex';
    if (dir.includes('/end_to_end/')) return 'e2e';
    if (dir.includes('/property/')) return 'prop';
    return '';
}

function generateDisplayPath(path) {
    const replacements = {
        example: 'ex',
        property: 'prop',
        end_to_end: 'e2e',
        functional_syntax: 'func',
        functional_api: 'func',
        class_syntax: 'class',
        class_api: 'class',
        candid_rpc: 'crpc',
        http_server: 'http',
        tests: 't'
    };
    // Split the path into directories
    const directories = path.split('/');

    // Map over the directories and replace any that match the replacements list
    const updatedDirectories = directories.map((dir) => {
        // Replace directory if it exists in the replacements list
        return replacements[dir] || dir;
    });

    // Join the updated directories back into a path
    return updatedDirectories.join('/');
}
