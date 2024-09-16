import { IOType } from 'child_process';
import { readFile } from 'fs/promises';
import { join } from 'path';

import { execSyncPretty } from '../../utils/exec_sync_pretty';
import { AZLE_PACKAGE_PATH } from '../../utils/global_paths';

type Versions = {
    [key in ValidFlag]: string;
};

type ValidFlag = 'node' | 'dfx' | 'rustc' | 'wasi2ic';

// TODO Hey Jordan, I'm not wild about the package property name, but it works for now
// TODO for that matter the whole idea of package is a little odd. We only need it for rust. I suppose we could just make the flag --rustc and then we wouldn't have to worry about it. I'm just worried if rustc is a lest obvious flag name
// TODO though on the other hand, we do have a nice little usage message that would let them know right away that it was wrong.
// TODO Hey Jordan, Is it too much to stipulate for future dependencies that the install script is install_${name}? Then we wouldn't have to specify the script here
const validFlags = {
    node: { name: 'Node.js', script: 'install_node.sh' },
    dfx: { name: 'DFX', script: 'install_dfx.sh' },
    rustc: { name: 'Rust', script: 'install_rust.sh' },
    wasi2ic: { name: 'wasi2ic', script: 'install_wasi2ic.sh' }
};

// TODO don't forget, we do want a separate script to get all of these versions so that we can run it as an action. We want this because we are not the ones that install node for the github workflows

export async function runCommand(ioType: IOType): Promise<void> {
    // TODO Hey Jordan, I was noticing that for all of the other commands the handling of flags happens before we get to this point.
    // TODO I am guessing that is because of flags like experimental that apply to all of the commands?
    // TODO We could modify this so that instead of grabbing the args right here, we could pass the already parsed args as a list.
    // TODO We can talk about validating those flags here or where we parse them. On the one hand I think it would be good to be consistent
    // TODO On the other hand I think it would be nice to make sure the index.ts file that handles the routing is as lite as possible
    // TODO For right now I will leave it like this because it is already like this
    // TODO Hey Jordan, on the topic of processing flags before hand. This approach does install things as we are processing flags. So if an invalid flag is in the middle of the list then it will fail after it has successfully installed some dependencies and not others. Maybe we do want to process before we get to this point anyways?
    const args = process.argv.slice(3);
    const installAll = args.length === 0;

    const versions = await getGlobalDependencies();

    if (installAll) {
        // Install everything if no specific flags are provided
        for (const flag in validFlags) {
            const { name, script } = validFlags[flag as ValidFlag];
            const version = versions[flag as ValidFlag];
            installDependency(name, script, version, ioType);
        }
    } else {
        // Install dependencies based on provided flags
        for (const arg of args) {
            const flag = arg.slice(2);
            const flagConfig = validFlags[flag as ValidFlag];

            if (flagConfig !== undefined) {
                const { name, script } = flagConfig;
                const version = versions[flag as ValidFlag];
                installDependency(name, script, version, ioType);
            } else {
                console.error(`Unrecognized option: ${arg}`);
                printUsage();
                process.exit(1);
            }
        }
    }
}

function installDependency(
    dependency: string,
    script: string,
    version: string,
    ioType: IOType
): void {
    console.info(`Installing ${dependency}...`);
    execSyncPretty(
        `${AZLE_PACKAGE_PATH}/src/build/stable/commands/install_global_dependencies/${script} ${version}`,
        ioType
    );
}

function printUsage(): void {
    // Find the longest flag for dynamic spacing
    const longestFlagLength = Math.max(
        ...Object.keys(validFlags).map((flag) => flag.length)
    );

    console.info(`
Usage: npx azle install-global-dependencies [options]

Options:
`);
    for (const flag in validFlags) {
        const padding = ' '.repeat(longestFlagLength - flag.length);
        console.info(
            `  --${flag}${padding}   Install ${
                validFlags[flag as ValidFlag].name
            } dependencies`
        );
    }
    console.info(`
If no options are provided, all dependencies will be installed.
`);
}

async function getGlobalDependencies(): Promise<Versions> {
    // Path to package.json
    const packageJsonPath = join(AZLE_PACKAGE_PATH, 'package.json');

    // Read the existing package.json file
    const packageJsonContent = await readFile(packageJsonPath, 'utf-8');
    const packageJson = JSON.parse(packageJsonContent);

    // Extract globalDependencies
    const globalDependencies = packageJson.globalDependencies;

    if (!globalDependencies) {
        throw new Error('No globalDependencies found in package.json.');
    }

    return globalDependencies;
}
