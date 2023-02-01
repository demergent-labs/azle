import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';

export function generate_new_azle_project(
    azle_version: string,
    dfx_version: string
) {
    if (process.argv[3] === undefined) {
        console.error('You must provide a name for your Azle project');
        return;
    }

    const project_name = process.argv[3];

    const tsconfig = generate_tsconfig();
    const package_json = generate_package_json(
        azle_version,
        dfx_version,
        project_name
    );
    const dfx_json = generate_dfx_json(project_name);
    const gitignore = generate_gitignore();
    const index_ts = generate_index_ts();
    const readme_md = generate_readme_md(project_name);

    if (!existsSync(`${project_name}/src`)) {
        mkdirSync(`${project_name}/src`, {
            recursive: true
        });
    }

    writeFileSync(`${project_name}/tsconfig.json`, tsconfig);
    writeFileSync(`${project_name}/package.json`, package_json);
    writeFileSync(`${project_name}/dfx.json`, dfx_json);
    writeFileSync(`${project_name}/.gitignore`, gitignore);
    writeFileSync(`${project_name}/src/index.ts`, index_ts);
    writeFileSync(`${project_name}/README.md`, readme_md);

    execSync(`git init`);
}

function generate_tsconfig(): string {
    return `{
    "compilerOptions": {
        "strict": true,
        "target": "ES2020",
        "experimentalDecorators": true,
        "strictPropertyInitialization": false,
        "moduleResolution": "node",
        "allowJs": true,
        "outDir": "HACK_BECAUSE_OF_ALLOW_JS"
    }
}

`;
}

function generate_package_json(
    azle_version: string,
    dfx_version: string,
    project_name: string
): string {
    return `{
    "scripts": {
        "dfx_install": "DFX_VERSION=${dfx_version} sh -ci \\\"$(curl -fsSL https://sdk.dfinity.org/install.sh)\\\"",
        "replica_start": "dfx start --background",
        "replica_stop": "dfx stop",
        "canister_deploy_local": "dfx deploy ${project_name}",
        "canister_deploy_mainnet": "dfx deploy --network ic ${project_name}",
        "canister_uninstall": "dfx canister uninstall-code ${project_name}",
        "canister_call_get_message": "dfx canister call ${project_name} get_message",
        "canister_call_set_message": "dfx canister call ${project_name} set_message '(\\\"Hello world!\\\")'"
    },
    "dependencies": {
        "azle": "${azle_version}"
    }
}


`;
}

function generate_dfx_json(project_name: string): string {
    return `{
    "canisters": {
        "${project_name}": {
            "type": "custom",
            "build": "npx azle ${project_name}",
            "root": "src",
            "ts": "src/index.ts",
            "candid": "src/index.did",
            "wasm": ".azle/${project_name}/${project_name}.wasm.gz"
        }
    }
}

`;
}

function generate_gitignore(): string {
    return `.azle
.dfx
dfx_generated
node_modules

`;
}

function generate_index_ts(): string {
    return `import { $query, $update } from 'azle';

// This is a global variable that is stored on the heap
let message: string = '';

// Query calls complete quickly because they do not go through consensus
$query;
export function get_message(): string {
    return message;
}

// Update calls take a few seconds to complete
// This is because they persist state changes and go through consensus
$update;
export function set_message(new_message: string) {
    message = new_message; // This change will be persisted
}

`;
}

function generate_readme_md(project_name: string): string {
    return `# ${project_name}

Welcome to your first Azle project! This example project will help you to deploy your first canister (application) to the Internet Computer (IC) decentralized cloud. It is a simple getter/setter canister.

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
