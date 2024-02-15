// TODO handle saving many different files within the same timeframe
// TODO always go with the latest file saved...so use timestamps probably
// TODO and if you are in the middle of an older file, get rid of it
// TODO and start with the new file
// TODO I Think we are going to need to lock this down
// TODO otherwise you could save many files and have them all start overwriting
// TODO each other

import { Actor, HttpAgent } from '@dfinity/agent';
import { watch } from 'chokidar';
import { readFileSync, writeFileSync } from 'fs';

import { getCanisterJavaScript } from '../get_canister_javascript';
import { ok } from '../utils/result';

const reloadedJsPath = process.argv[2];
const canisterId = process.argv[3];
const mainPath = process.argv[4];
const wasmedgeQuickJsPath = process.argv[5];
const replicaWebServerPort = process.argv[6];

watch(process.cwd(), {
    ignored: ['**/.dfx/**', '**/.azle/**', '**/node_modules/**']
}).on('all', async (event, path) => {
    if (process.env.AZLE_VERBOSE === 'true') {
        console.log('event', event);
        console.log('path', path);
    }

    if (event === 'change' && (path.endsWith('.ts') || path.endsWith('.js'))) {
        try {
            await reloadJs(
                reloadedJsPath,
                canisterId,
                mainPath,
                wasmedgeQuickJsPath,
                replicaWebServerPort
            );
        } catch (error) {
            console.log(error);
        }
    }
});

async function reloadJs(
    reloadedJsPath: string,
    canisterId: string,
    mainPath: string,
    wasmedgeQuickJsPath: string,
    replicaWebServerPort: string
) {
    const canisterJavaScriptResult = getCanisterJavaScript(
        mainPath,
        wasmedgeQuickJsPath
    );

    if (!ok(canisterJavaScriptResult)) {
        if (process.env.AZLE_VERBOSE === 'true') {
            console.error(canisterJavaScriptResult.err!.error);
            console.error(canisterJavaScriptResult.err!.suggestion);
            console.error(canisterJavaScriptResult.err!.exitCode);
        }

        throw new Error(`TypeScript compilation failed`);
    }

    writeFileSync(reloadedJsPath, canisterJavaScriptResult.ok);

    const agent = new HttpAgent({
        host: `http://127.0.0.1:${replicaWebServerPort}`
    });

    if (process.env.DFX_NETWORK !== 'ic') {
        try {
            await agent.fetchRootKey();
        } catch (error) {
            console.log(error);
        }
    }

    const actor = Actor.createActor(
        ({ IDL }) => {
            return IDL.Service({
                reload_js: IDL.Func([IDL.Vec(IDL.Nat8), IDL.Bool], [], [])
            });
        },
        {
            agent,
            canisterId
        }
    );

    const reloadedJs = readFileSync(reloadedJsPath);

    const chunkSize = 2_000_000; // The current message limit is about 2 MiB

    for (let i = 0; i < reloadedJs.length; i += chunkSize) {
        const chunk = reloadedJs.slice(i, i + chunkSize);

        if (process.env.AZLE_VERBOSE === 'true') {
            console.info(`Uploading chunk of length ${chunk.length}...`);
        }

        actor.reload_js(chunk, false);
        // TODO if we give each chunk an id, a time, then it should not matter the order
        // TODO and we can do it faster hopefully
        await new Promise((resolve) => setTimeout(resolve, 500)); // TODO dubious timing
    }

    if (process.env.AZLE_VERBOSE === 'true') {
        console.info(`Finishing chunk uploads...`);
    }

    await actor.reload_js(Buffer.from([]), true);

    if (process.env.AZLE_VERBOSE === 'true') {
        console.info(`Finished chunk uploads`);
    }
}
