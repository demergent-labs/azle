const fs = require('fs');
const path = require('path');

const targetDirectory = process.argv[2] || '.'; // Use the provided directory or default to the current directory

const metadataToAdd = [
    {
        name: 'candid:service',
        path: 'src/backend/index.did' // Adjust this path as needed for each canister
    },
    {
        name: 'cdk:name',
        content: 'azle'
    }
];

function updateDfxJson(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const json = JSON.parse(data);

        // Check each canister in the 'canisters' object
        for (let canisterName in json.canisters) {
            let canister = json.canisters[canisterName];

            // Check if the canister has a 'build' property that starts with 'npx azle'
            if (canister.build && canister.build.startsWith('npx azle')) {
                // Update the 'metadata' property for this canister
                canister.metadata = metadataToAdd;

                // Optionally, adjust the 'path' in 'metadata' based on the canister
                canister.metadata[0].path =
                    canister.candid || 'specify/candid/path';
            }
        }

        fs.writeFileSync(filePath, JSON.stringify(json, null, 4), 'utf8');
        console.log(`Updated ${filePath}`);
    } catch (err) {
        console.error(`Error processing file ${filePath}: ${err}`);
    }
}

const entries = fs.readdirSync(targetDirectory, { withFileTypes: true });

entries.forEach((entry) => {
    if (entry.isDirectory()) {
        const dfxJsonPath = path.join(targetDirectory, entry.name, 'dfx.json');
        if (fs.existsSync(dfxJsonPath)) {
            updateDfxJson(dfxJsonPath);
        }
    }
});
