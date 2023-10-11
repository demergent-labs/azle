import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

export function generateNewAzleProject(
    azleVersion: string,
    dfxVersion: string
) {
    if (process.argv[3] === undefined) {
        console.error('You must provide a name for your Azle project');
        return;
    }

    const projectName = process.argv[3];

    const tsconfig = generateTsconfig();
    const packageJson = generatePackageJson(
        azleVersion,
        dfxVersion,
        projectName
    );
    const dfxJson = generateDfxJson(projectName);
    const gitignore = generateGitignore();
    const indexTs = generateIndexTs();
    const readmeMd = generateReadmeMd(projectName);

    const projectPath = join(projectName, 'src');

    if (!existsSync(projectPath)) {
        mkdirSync(projectPath, {
            recursive: true
        });
    }

    writeFileSync(join(projectName, 'tsconfig.json'), tsconfig);
    writeFileSync(join(projectName, 'package.json'), packageJson);
    writeFileSync(join(projectName, 'dfx.json'), dfxJson);
    writeFileSync(join(projectName, '.gitignore'), gitignore);
    writeFileSync(join(projectName, 'src', 'index.ts'), indexTs);
    writeFileSync(join(projectName, 'README.md'), readmeMd);
}

function generateTsconfig(): string {
    return `{
    "compilerOptions": {
        "strict": true,
        "target": "ES2020",
        "moduleResolution": "node",
        "allowJs": true,
        "outDir": "HACK_BECAUSE_OF_ALLOW_JS"
    }
}

`;
}

function generatePackageJson(
    azleVersion: string,
    dfxVersion: string,
    projectName: string
): string {
    return `{
    "scripts": {
        "dfx_install": "DFX_VERSION=${dfxVersion} sh -ci \\\"$(curl -fsSL https://sdk.dfinity.org/install.sh)\\\"",
        "replica_start": "dfx start --background",
        "replica_stop": "dfx stop",
        "canister_deploy_local": "dfx deploy ${projectName}",
        "canister_deploy_mainnet": "dfx deploy --network ic ${projectName}",
        "canister_uninstall": "dfx canister uninstall-code ${projectName}",
        "canister_call_get_message": "dfx canister call ${projectName} getMessage",
        "canister_call_set_message": "dfx canister call ${projectName} setMessage '(\\\"Hello world!\\\")'"
    },
    "dependencies": {
        "azle": "${azleVersion}"
    }
}

`;
}

function generateDfxJson(projectName: string): string {
    return `{
    "canisters": {
        "${projectName}": {
            "type": "custom",
            "main": "src/index.ts",
            "candid": "src/index.did",
            "build": "npx azle ${projectName}",
            "wasm": ".azle/${projectName}/${projectName}.wasm",
            "gzip": true
        }
    }
}

`;
}

function generateGitignore(): string {
    return `.azle
.dfx
dfx_generated
node_modules

`;
}

function generateIndexTs(): string {
    return `import { Canister, query, text, update, Void } from 'azle';

// This is a global variable that is stored on the heap
let message = '';

export default Canister({
    // Query calls complete quickly because they do not go through consensus
    getMessage: query([], text, () => {
        return message;
    }),
    // Update calls take a few seconds to complete
    // This is because they persist state changes and go through consensus
    setMessage: update([text], Void, (newMessage) => {
        message = newMessage; // This change will be persisted
    })
});

`;
}

function generateReadmeMd(projectName: string): string {
    return `# ${projectName}

Welcome to your first Azle project! This example project will help you to deploy your first canister (application) to the Internet Computer (IC) decentralized cloud. It is a simple getter/setter canister. You can always refer to [The Azle Book](https://demergent-labs.github.io/azle/) for more in-depth documentation.

\`dfx\` is the tool you will use to interact with the IC locally and on mainnet. If you don't already have it installed:

\`\`\`bash
npm run dfx_install
\`\`\`

Next you will want to start a replica, which is a local instance of the IC that you can deploy your canisters to:

\`\`\`bash
npm run replica_start
\`\`\`

If you ever want to stop the replica:

\`\`\`bash
npm run replica_stop
\`\`\`

Now you can deploy your canister locally:

\`\`\`bash
npm install
npm run canister_deploy_local
\`\`\`

To call the methods on your canister:

\`\`\`bash
npm run canister_call_get_message
npm run canister_call_set_message
\`\`\`

If you run the above commands and then call \`npm run canister_call_get_message\` you should see:

\`\`\`bash
("Hello world!")
\`\`\`

Assuming you have [created a cycles wallet](https://internetcomputer.org/docs/current/developer-docs/quickstart/network-quickstart) and funded it with cycles, you can deploy to mainnet like this:

\`\`\`bash
npm run canister_deploy_mainnet
\`\`\`
`;
}
