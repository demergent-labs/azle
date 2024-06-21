// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { exec } = require('child_process');

// Get the current directory name
const currentDirectory = process.cwd();

// Read all subdirectories in the parent directory
fs.readdir(currentDirectory, (err, files) => {
    if (err) {
        console.error(`Error reading directory: ${err}`);
        return;
    }

    files.forEach((file) => {
        const fullPath = path.join(currentDirectory, file);

        // Check if the current file is a directory
        if (fs.lstatSync(fullPath).isDirectory()) {
            // Path to the update-package-name script
            const updateScriptPath = path.join(__dirname, 'name_package.js');

            // Run the update script in the current directory
            exec(
                `node ${updateScriptPath}`,
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
