import * as fs from 'fs';
import * as path from 'path';

// Path to the tsconfig.json file
const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');

// Read the tsconfig.json file
fs.readFile(tsconfigPath, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading tsconfig.json file: ${err}`);
        return;
    }

    // Parse the tsconfig.json content
    let tsconfig;
    try {
        tsconfig = JSON.parse(data);
    } catch (parseErr) {
        console.error(`Error parsing tsconfig.json: ${parseErr}`);
        return;
    }

    // Ensure compilerOptions exists
    tsconfig.compilerOptions = tsconfig.compilerOptions || {};

    // Add the required options
    tsconfig.compilerOptions.experimentalDecorators = true;
    tsconfig.compilerOptions.preserveSymlinks = true;

    // Write the updated tsconfig.json back to the file
    fs.writeFile(
        tsconfigPath,
        JSON.stringify(tsconfig, null, 2),
        'utf8',
        (writeErr) => {
            if (writeErr) {
                console.error(
                    `Error writing updated tsconfig.json: ${writeErr}`
                );
                return;
            }

            console.info(
                'tsconfig.json successfully updated with experimentalDecorators and preserveSymlinks options.'
            );
        }
    );
});
