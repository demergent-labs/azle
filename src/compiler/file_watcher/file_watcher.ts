import { Actor } from '@dfinity/agent';
import { watch } from 'chokidar';
import { readFileSync, writeFileSync } from 'fs';

import { getCanisterJavaScript } from '../get_canister_javascript';
import { ok } from '../utils/result';
import { createAuthenticatedAgent, whoami } from '../../../dfx';

const reloadedJsPath = process.argv[2];
const canisterId = process.argv[3];
const mainPath = process.argv[4];
const wasmedgeQuickJsPath = process.argv[5];

// TODO https://github.com/demergent-labs/azle/issues/1664
watch(process.cwd(), {
    ignored: ['**/.dfx/**', '**/.azle/**', '**/node_modules/**']
}).on('all', async (event, path) => {
    if (process.env.AZLE_VERBOSE === 'true') {
        console.info('event', event);
        console.info('path', path);
    }

    if (event === 'change' && (path.endsWith('.ts') || path.endsWith('.js'))) {
        try {
            await reloadJs(
                reloadedJsPath,
                canisterId,
                mainPath,
                wasmedgeQuickJsPath
            );
        } catch (error) {
            console.error(error);
        }
    }
});

async function reloadJs(
    reloadedJsPath: string,
    canisterId: string,
    mainPath: string,
    wasmedgeQuickJsPath: string
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

    const agent = await createAuthenticatedAgent(whoami());

    const actor = Actor.createActor(
        ({ IDL }) => {
            return IDL.Service({
                reload_js: IDL.Func(
                    [IDL.Nat64, IDL.Nat64, IDL.Vec(IDL.Nat8), IDL.Nat64],
                    [],
                    []
                )
            });
        },
        {
            agent,
            canisterId
        }
    );

    const reloadedJs = readFileSync(reloadedJsPath);

    const chunkSize = 2_000_000; // The current message limit is about 2 MiB

    const timestamp = process.hrtime.bigint();

    let chunkNumber = 0;

    for (let i = 0; i < reloadedJs.length; i += chunkSize) {
        const chunk = reloadedJs.slice(i, i + chunkSize);

        if (process.env.AZLE_VERBOSE === 'true') {
            console.info(
                `Uploading chunk: ${timestamp}, ${chunkNumber}, ${chunk.length}, ${reloadedJs.length}`
            );
        }

        actor
            .reload_js(timestamp, chunkNumber, chunk, reloadedJs.length)
            .catch((error) => {
                if (process.env.AZLE_VERBOSE === 'true') {
                    console.error(error);
                }
            });

        chunkNumber += 1;
    }

    if (process.env.AZLE_VERBOSE === 'true') {
        console.info(`Finished uploading chunks`);
    }
}
