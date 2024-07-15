/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as fs from 'fs-extra';
import * as path from 'path';

// Helper function to reorder keys in an object.
const reorderKeys = (obj, order) => {
    return Object.keys(obj)
        .sort((a, b) => {
            const indexA = order.indexOf(a);
            const indexB = order.indexOf(b);
            if (indexA === -1 && indexB === -1) return 0; // both keys are not in order array, no sorting
            if (indexA === -1) return 1; // a is not in order array, sort it at the end
            if (indexB === -1) return -1; // b is not in order array, sort it at the end
            return indexA - indexB; // both are in order array, sort them based on the array
        })
        .reduce((result, key) => {
            result[key] = obj[key];
            return result;
        }, {});
};

// Read directory.
const dirPath = './examples/motoko_examples'; // Replace with the path to the directory containing folders with dfx.json files
fs.readdir(dirPath, (err, folders) => {
    if (err) {
        console.error('Could not list the directory.', err);
        return;
    }

    folders.forEach((folder) => {
        const dfxJsonPath = path.join(dirPath, folder, 'dfx.json');
        if (fs.existsSync(dfxJsonPath)) {
            fs.readJson(dfxJsonPath)
                .then((dfxConfig) => {
                    for (const canister in dfxConfig.canisters) {
                        if (
                            Object.prototype.hasOwnProperty.call(
                                dfxConfig.canisters,
                                canister
                            )
                        ) {
                            dfxConfig.canisters[canister] = reorderKeys(
                                dfxConfig.canisters[canister],
                                [
                                    'type',
                                    'main',
                                    'candid',
                                    'build',
                                    'wasm',
                                    'gzip',
                                    'declarations',
                                    'env'
                                ]
                            );
                        }
                    }
                    return fs.writeJson(dfxJsonPath, dfxConfig, { spaces: 4 });
                })
                .then(() => {
                    console.info(
                        `Successfully reordered keys in ${dfxJsonPath}`
                    );
                })
                .catch((err) => {
                    console.error(
                        `Error reading or writing dfx.json in ${folder}`,
                        err
                    );
                });
        }
    });
});
