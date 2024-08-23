import { build } from 'esbuild';
import esbuildPluginTsc from 'esbuild-plugin-tsc';

import { experimentalMessage } from '../../../../lib/experimental/experimental';

export async function compile(main: string): Promise<string> {
    const imports = getPrelude(main);
    const bundled = await bundle(imports);

    return bundled;
}

function getPrelude(main: string): string {
    return /*TS*/ `
            import 'azle/src/lib/stable/globals';

            import { DidVisitor, getDefaultVisitorData, IDL, toDidString } from 'azle';

            import CanisterClass from './${main}';

            // TODO _azleWasmtimeCandidEnvironment we run in a node wasm environment not wasmtime
            if (globalThis._azleWasmtimeCandidEnvironment === false) {
                const canisterClassInstance = new CanisterClass();
                globalThis._azleCanisterClassInstance = canisterClassInstance;
            }

            const canisterIdlType = IDL.Service(globalThis._azleCanisterMethodIdlTypes);
            const candid = canisterIdlType.accept(new DidVisitor(), {
                ...getDefaultVisitorData(),
                isFirstService: true,
                systemFuncs: globalThis._azleInitAndPostUpgradeIdlTypes
            });

            globalThis._azleGetCandidAndMethodMeta = () => {
                return JSON.stringify({
                    candid: toDidString(candid),
                    methodMeta: globalThis._azleMethodMeta
                });
            };
        `;
}

export async function bundle(ts: string): Promise<string> {
    // TODO tree-shaking does not seem to work with stdin. I have learned this from sad experience
    const buildResult = await build({
        stdin: {
            contents: ts,
            resolveDir: process.cwd()
        },
        format: 'esm',
        bundle: true,
        treeShaking: true,
        write: false,
        logLevel: 'silent',
        target: 'es2020',
        preserveSymlinks: true,
        plugins: [
            {
                name: 'Azle experimental check',
                setup(build): void {
                    build.onResolve(
                        {
                            filter: /^internal$|^util$|^fs$|^fmt$|^assert$|^buffer$|^path$|^stream$|^process$|^url$|^events$|^string_decoder$|^punycode$|^querystring$|^whatwg_url$|^encoding$|^http$|^os$|^crypto$|^zlib$|^internal\/deps\/acorn\/acorn\/dist\/acorn$|^internal\/deps\/acorn\/acorn-walk\/dist\/walk$|^perf_hooks$|^async_hooks$|^https$|^_node:fs$|^_node:os$|^_node:crypto$|^qjs:os$|^_encoding$|^wasi_net$|^wasi_http$/
                        },
                        (args) => {
                            throw new Error(experimentalMessage(args.path));
                        }
                    );
                }
            },
            esbuildPluginTsc()
        ]
    });

    const bundleArray = buildResult.outputFiles[0].contents;
    const bundleString = Buffer.from(bundleArray).toString('utf-8');

    return bundleString;
}