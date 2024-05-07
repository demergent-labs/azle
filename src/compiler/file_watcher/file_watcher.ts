import { Actor, ActorMethod, ActorSubclass } from '@dfinity/agent';
import { watch } from 'chokidar';
import { writeFileSync } from 'fs';

import { createAuthenticatedAgent } from '../../../dfx';
import { getCanisterJavaScript } from '../get_canister_javascript';
import { generateUploaderIdentity } from '../uploader_identity';
import { ok } from '../utils/result';

type ActorReloadJs = ActorSubclass<_SERVICE>;
interface _SERVICE {
    reload_js: ActorMethod<[bigint, bigint, Uint8Array, bigint], void>;
}

// We have made this mutable to help with speed
// We don't want to have to create the agent on each file change
let actor: ActorReloadJs | undefined;

const reloadedJsPath = process.argv[2];
const canisterId = process.argv[3];
const mainPath = process.argv[4];
const wasmedgeQuickJsPath = process.argv[5];
const esmAliases = JSON.parse(process.argv[6]);
const esmExternals = JSON.parse(process.argv[7]);
const canisterName = process.argv[8];

// TODO https://github.com/demergent-labs/azle/issues/1664
watch(process.cwd(), {
    ignored: ['**/.dfx/**', '**/.azle/**', '**/node_modules/**']
}).on('all', async (event, path) => {
    if (actor === undefined) {
        actor = await createActorReloadJs(canisterName);
    }

    if (process.env.AZLE_VERBOSE === 'true') {
        console.info('event', event);
        console.info('path', path);
    }

    if (event === 'change' && (path.endsWith('.ts') || path.endsWith('.js'))) {
        try {
            await reloadJs(
                actor,
                reloadedJsPath,
                mainPath,
                wasmedgeQuickJsPath
            );
        } catch (error) {
            console.error(error);
        }
    }
});

async function reloadJs(
    actor: ActorReloadJs,
    reloadedJsPath: string,
    mainPath: string,
    wasmedgeQuickJsPath: string
) {
    const canisterJavaScriptResult = await getCanisterJavaScript(
        mainPath,
        wasmedgeQuickJsPath,
        esmAliases,
        esmExternals
    );

    if (!ok(canisterJavaScriptResult)) {
        if (process.env.AZLE_VERBOSE === 'true') {
            console.error(canisterJavaScriptResult.err!.error);
            console.error(canisterJavaScriptResult.err!.suggestion);
            console.error(canisterJavaScriptResult.err!.exitCode);
        }

        throw new Error(`TypeScript compilation failed`);
    }

    const reloadedJs = Buffer.from(canisterJavaScriptResult.ok);

    const chunkSize = 2_000_000; // The current message limit is about 2 MiB
    const timestamp = process.hrtime.bigint();
    let chunkNumber = 0n;

    for (let i = 0; i < reloadedJs.length; i += chunkSize) {
        const chunk = reloadedJs.slice(i, i + chunkSize);

        if (process.env.AZLE_VERBOSE === 'true') {
            console.info(
                `Uploading chunk: ${timestamp}, ${chunkNumber}, ${chunk.length}, ${reloadedJs.length}`
            );
        }

        actor
            .reload_js(timestamp, chunkNumber, chunk, BigInt(reloadedJs.length))
            .catch((error) => {
                if (process.env.AZLE_VERBOSE === 'true') {
                    console.error(error);
                }
            });

        chunkNumber += 1n;
    }

    if (process.env.AZLE_VERBOSE === 'true') {
        console.info(`Finished uploading chunks`);
    }

    writeFileSync(reloadedJsPath, reloadedJs);
}

async function createActorReloadJs(
    canisterName: string
): Promise<ActorReloadJs> {
    const identityName = generateUploaderIdentity(canisterName);
    const agent = await createAuthenticatedAgent(identityName);

    return Actor.createActor(
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
}
