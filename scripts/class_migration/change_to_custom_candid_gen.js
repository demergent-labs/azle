import * as fs from 'fs';
import * as path from 'path';

// Path to the dfx.json file
const dfxJsonPath = path.join(process.cwd(), 'dfx.json');

// Read the dfx.json file
fs.readFile(dfxJsonPath, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading dfx.json file: ${err}`);
        return;
    }

    // Parse the dfx.json content
    let dfxJson;
    try {
        dfxJson = JSON.parse(data);
    } catch (parseErr) {
        console.error(`Error parsing dfx.json: ${parseErr}`);
        return;
    }

    // Iterate over all canisters
    const canisters = dfxJson.canisters;
    if (canisters && typeof canisters === 'object') {
        Object.keys(canisters).forEach((canisterName) => {
            const canister = canisters[canisterName];

            // Check if the canister has a candid_gen field
            if (canister.candid_gen) {
                canister.candid_gen = 'custom';

                // Check for the main field and construct the candid field
                if (canister.main) {
                    const canisterType = canister.type;
                    const mainPath = canister.main;
                    const candidPath = mainPath.replace(/\.ts$/, '.did');

                    // Reconstruct the canister object with candid after main
                    const updatedCanister = {
                        type: canisterType,
                        main: mainPath,
                        candid: candidPath,
                        ...canister
                    };

                    // Update the canister in the main dfxJson object
                    dfxJson.canisters[canisterName] = updatedCanister;
                } else {
                    console.error(
                        `Main field is missing in canister: ${canisterName}`
                    );
                }
            }
        });

        // Write the updated dfx.json back to the file
        fs.writeFile(
            dfxJsonPath,
            JSON.stringify(dfxJson, null, 2),
            'utf8',
            (writeErr) => {
                if (writeErr) {
                    console.error(
                        `Error writing updated dfx.json: ${writeErr}`
                    );
                    return;
                }

                console.info('dfx.json successfully updated.');
            }
        );
    } else {
        console.error('Canisters field is missing or invalid in dfx.json.');
    }
});
