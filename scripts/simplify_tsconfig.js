const fs = require('fs-extra');
const path = require('path');

// Read directory.
const dirPath = './examples/motoko_examples'; // Replace with the path to the directory containing folders with tsconfig.json files

// Function to modify the tsconfig.json
const modifyTsConfig = (tsconfigPath) => {
    fs.readJson(tsconfigPath)
        .then((tsconfig) => {
            // Remove the specific keys
            delete tsconfig.compilerOptions.experimentalDecorators;
            delete tsconfig.compilerOptions.strictPropertyInitialization;
            return fs.writeJson(tsconfigPath, tsconfig, { spaces: 4 });
        })
        .then(() => {
            console.log(`Successfully modified ${tsconfigPath}`);
        })
        .catch((err) => {
            console.error(`Error reading or writing tsconfig.json: ${err}`);
        });
};

fs.readdir(dirPath, (err, folders) => {
    if (err) {
        console.error('Could not list the directory.', err);
        process.exit(1);
    }

    folders.forEach((folder) => {
        const tsconfigPath = path.join(dirPath, folder, 'tsconfig.json');
        if (fs.existsSync(tsconfigPath)) {
            modifyTsConfig(tsconfigPath);
        }
    });
});
