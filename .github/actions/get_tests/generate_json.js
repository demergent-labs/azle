import { basename } from 'path';

// Function to check if a directory is excluded
function isExcluded(dir, excludeDirs) {
    return excludeDirs.some((exclude) => dir.includes(exclude));
}

// Function to generate JSON object for each directory
function generateJson(dir) {
    const name = basename(dir);
    let type = '';
    let syntax = '';
    let api = '';

    if (dir.includes('/examples/')) {
        type = 'ex';
    } else if (dir.includes('/property/')) {
        type = 'prop';
        if (dir.includes('/candid_rpc/')) {
            syntax = 'crpc';
            if (dir.includes('/functional_api/')) {
                api = 'functional';
            } else if (dir.includes('/class_api/')) {
                api = 'class';
            }
        } else if (dir.includes('/ic_api/')) {
            syntax = 'ic_api';
        }
    } else if (dir.includes('/end_to_end/')) {
        type = 'e2e';
        if (dir.includes('/http_server/')) {
            syntax = 'http';
        } else if (dir.includes('/candid_rpc/')) {
            syntax = 'crpc';
        }
    }

    return {
        path: dir,
        name: name,
        type: type,
        ...(syntax && { syntax: syntax }),
        ...(api && { api: api })
    };
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
