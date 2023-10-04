const fs = require('fs');
const path = require('path');

// Helper function to update the canister definition
function updateCanister(canister) {
    if (canister.root && canister.ts) {
        canister.main = canister.ts;
        delete canister.root;
        delete canister.ts;
    }
    // Put 'main' right below 'type'
    const { type, main, ...rest } = canister;
    return { type, main, ...rest };
}

// Path to the examples directory
const examplesDir = path.join(process.cwd(), 'examples');

// Read all directories under examples/
fs.readdir(examplesDir, { withFileTypes: true }, (err, entries) => {
    if (err) {
        console.error(`Error reading directory: ${err}`);
        return;
    }

    // Filter to keep only directories
    const directories = entries.filter((entry) => entry.isDirectory());

    directories.forEach((dir) => {
        const exampleName = dir.name;
        const dfxFilePath = path.join(examplesDir, exampleName, 'dfx.json');

        // Read dfx.json file
        fs.readFile(dfxFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error(`Error reading dfx.json: ${err}`);
                return;
            }

            // Parse JSON
            const json = JSON.parse(data);

            // Update canisters
            for (const canisterName in json.canisters) {
                json.canisters[canisterName] = updateCanister(
                    json.canisters[canisterName]
                );
            }

            // Write updated dfx.json back to file
            fs.writeFile(
                dfxFilePath,
                JSON.stringify(json, null, 2),
                'utf8',
                (err) => {
                    if (err) {
                        console.error(`Error writing updated dfx.json: ${err}`);
                        return;
                    }
                    console.log(`Successfully updated ${dfxFilePath}`);
                }
            );
        });
    });
});
