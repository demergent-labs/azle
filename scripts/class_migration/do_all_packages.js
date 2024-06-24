// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { exec } = require('child_process');

// Get the current directory name
const currentDirectory = process.cwd();

// Check if a script path is provided as a command-line argument
const updateScriptPath = process.argv[2];

if (!updateScriptPath) {
    console.error(
        'Please provide the path to the script as a command-line argument.\nFor example: node ../scripts/class_migration/do_all_packages.js ../scripts/class_migration/name_package.js'
    );
    process.exit(1);
}
const fullScriptPath = path.resolve(updateScriptPath);
console.log(fullScriptPath);

// Read all subdirectories in the current directory
fs.readdir(currentDirectory, (err, files) => {
    if (err) {
        console.error(`Error reading directory: ${err}`);
        return;
    }

    files.forEach((file) => {
        const fullPath = path.join(currentDirectory, file);

        // Check if the current file is a directory
        if (fs.lstatSync(fullPath).isDirectory()) {
            // Run the update script in the current directory
            exec(
                `node ${fullScriptPath}`,
                { cwd: fullPath },
                (execErr, stdout, stderr) => {
                    if (execErr) {
                        console.error(
                            `Error executing script in directory ${file}: ${execErr}`
                        );
                        return;
                    }

                    if (stderr) {
                        console.error(
                            `Error in script output for directory ${file}: ${stderr}`
                        );
                        return;
                    }

                    console.log(
                        `Successfully updated package in directory ${file}`
                    );
                    console.log(stdout);
                }
            );
        }
    });
});
