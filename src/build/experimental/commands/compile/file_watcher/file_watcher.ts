import { Actor, ActorMethod, ActorSubclass } from '@dfinity/agent';
import { watch } from 'chokidar';
import { outputFile } from 'fs-extra';

import { createAuthenticatedAgent } from '../../../../../../dfx';
import { generateUploaderIdentity } from '../../upload_assets/uploader_identity';
import { compile as compileJavaScript } from '../javascript';

type ActorReloadJs = ActorSubclass<_SERVICE>;
interface _SERVICE {
    _azle_reload_js: ActorMethod<
        [bigint, bigint, Uint8Array, bigint, number],
        void
    >;
}

// We have made this mutable to help with speed
// We don't want to have to create the agent on each file change
let actor: ActorReloadJs | undefined;

const reloadedJsPath = process.argv[2];
const canisterId = process.argv[3];
const mainPath = process.argv[4];
const esmAliases = JSON.parse(process.argv[5]);
const esmExternals = JSON.parse(process.argv[6]);
const canisterName = process.argv[7];
const postUpgradeIndex = Number(process.argv[8]);

// TODO https://github.com/demergent-labs/azle/issues/1664
const watcher = watch([`**/*.ts`, `**/*.js`], {
    ignored: ['**/.dfx/**', '**/.azle/**', '**/node_modules/**', '**/target/**']
});

watcher.on('all', async (event, path) => {
    if (actor === undefined) {
        actor = await createActorReloadJs(canisterName);
    }

    if (process.env.AZLE_VERBOSE === 'true') {
        console.info('event', event);
        console.info('path', path);
    }

    if (event === 'change') {
        try {
            await reloadJs(actor, reloadedJsPath, mainPath);
        } catch (error) {
            console.error(error);
        }
    }
});

async function reloadJs(
    actor: ActorReloadJs,
    reloadedJsPath: string,
    mainPath: string
): Promise<void> {
    const javaScript = await compileJavaScript(
        mainPath,
        esmAliases,
        esmExternals
    );

    const reloadedJs = Buffer.from(javaScript);

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
            ._azle_reload_js(
                timestamp,
                chunkNumber,
                chunk,
                BigInt(reloadedJs.length),
                postUpgradeIndex
            )
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

    await outputFile(reloadedJsPath, reloadedJs);
}

async function createActorReloadJs(
    canisterName: string
): Promise<ActorReloadJs> {
    const identityName = generateUploaderIdentity(canisterName);
    const agent = await createAuthenticatedAgent(identityName);

    return Actor.createActor(
        ({ IDL }) => {
            return IDL.Service({
                _azle_reload_js: IDL.Func(
                    [
                        IDL.Nat64,
                        IDL.Nat64,
                        IDL.Vec(IDL.Nat8),
                        IDL.Nat64,
                        IDL.Int32
                    ],
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
