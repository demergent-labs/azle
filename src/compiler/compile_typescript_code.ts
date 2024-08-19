import { build } from 'esbuild';
import esbuildPluginTsc from 'esbuild-plugin-tsc';
import * as path from 'path';

import { experimentalMessage } from '../lib/experimental/experimental';
import { AZLE_PACKAGE_PATH } from './utils/global_paths';
import { Result } from './utils/result';
import { JavaScript, TypeScript } from './utils/types';

export async function compileTypeScriptToJavaScript(
    main: string,
    wasmedgeQuickJsPath: string,
    esmAliases: Record<string, string>,
    esmExternals: string[],
    experimental: boolean
): Promise<Result<JavaScript, unknown>> {
    const imports = getImports(main, experimental);

    const bundledJavaScript = await bundleFromString(
        imports,
        wasmedgeQuickJsPath,
        esmAliases,
        esmExternals,
        experimental
    );

    return {
        ok: bundledJavaScript
    };
}

function getImports(main: string, experimental: boolean): string {
    if (experimental === false) {
        return /*TS*/ `
            import 'azle/src/lib/stable/globals';

            import { DidVisitor, getDefaultVisitorData, IDL, toDidString } from 'azle';

            export * from './${main}';
            import * as CanisterMethods from './${main}';

            if (globalThis._azleWasmtimeCandidEnvironment === false) {
                const canister = new CanisterMethods.default();
                globalThis._azleCanisterClassInstance = canister;
            }

            const canisterIdlType = IDL.Service(globalThis._azleCanisterMethodIdlTypes);
            const candid = canisterIdlType.accept(new DidVisitor(), {
                ...getDefaultVisitorData(),
                isFirstService: true,
                systemFuncs: globalThis._azleInitAndPostUpgradeIdlTypes
            });


            globalThis.candidInfoFunction = () => {
                return JSON.stringify({
                    candid: toDidString(candid),
                    canisterMethods: globalThis._azleCanisterMethods
                });
            };

            globalThis.exports.canisterMethods = globalThis._azleCanisterMethods;
        `;
    } else {
        return /*TS*/ `
            import 'azle/src/lib/stable/globals';
            import 'azle/src/lib/experimental/globals';

            import 'reflect-metadata';  

            // TODO remove the ethersGetUrl registration once we implement lower-level http for ethers
            import { ethersGetUrl, Server } from 'azle/src/lib/experimental';
            import { ethers } from 'ethers';
            ethers.FetchRequest.registerGetUrl(ethersGetUrl);

            import { DidVisitor, getDefaultVisitorData, IDL, toDidString } from 'azle';
            export { Principal } from '@dfinity/principal';
            export * from './${main}';
            import * as CanisterMethods from './${main}';

            if (isClassSyntaxExport(CanisterMethods)) {
                if (globalThis._azleWasmtimeCandidEnvironment === false) {
                    const canister = new CanisterMethods.default();
                    globalThis._azleCanisterClassInstance = canister;
                }

                const canisterIdlType = IDL.Service(globalThis._azleCanisterMethodIdlTypes);
                const candid = canisterIdlType.accept(new DidVisitor(), {
                    ...getDefaultVisitorData(),
                    isFirstService: true,
                    systemFuncs: globalThis._azleInitAndPostUpgradeIdlTypes
                });

                globalThis.candidInfoFunction = () => {
                    return JSON.stringify({
                        candid: toDidString(candid),
                        canisterMethods: globalThis._azleCanisterMethods
                    });
                };

                globalThis.exports.canisterMethods = globalThis._azleCanisterMethods;
            }
            else {
                // TODO This setTimeout is here to allow asynchronous operations during canister initialization
                // for Server canisters that have chosen not to use export default Server
                // This seems to work no matter how many async tasks are awaited, but I am still unsure about how it will
                // behave in all async situations
                setTimeout(() => {
                    const canisterMethods = CanisterMethods.default !== undefined ? CanisterMethods.default() : Server(() => globalThis._azleNodeServer)();

                    globalThis.candidInfoFunction = () => {
                        const candidInfo = canisterMethods.getIdlType([]).accept(new DidVisitor(), {
                            ...getDefaultVisitorData(),
                            isFirstService: true,
                            systemFuncs: canisterMethods.getSystemFunctionIdlTypes()
                        });

                        return JSON.stringify({
                            candid: toDidString(candidInfo),
                            canisterMethods: {
                                // TODO The spread is because canisterMethods is a function with properties
                                // TODO we should probably just grab the props out that we need
                                ...canisterMethods
                            }
                        });
                    };

                    // TODO I do not know how to get the module exports yet with wasmedge_quickjs
                    globalThis.exports.canisterMethods = canisterMethods;
                });
            }

            function isClassSyntaxExport(module) {
                const isNothing = module === undefined || module.default === undefined;
                const isFunctionalSyntaxExport =
                    module?.default?.isCanister === true ||
                    module?.default?.isRecursive === true;
                return !isNothing && !isFunctionalSyntaxExport;
            }
        `;
    }
}

export async function bundleFromString(
    ts: TypeScript,
    wasmedgeQuickJsPath: string,
    esmAliases: Record<string, string>,
    esmExternals: string[],
    experimental: boolean
): Promise<JavaScript> {
    const finalWasmedgeQuickJsPath =
        process.env.AZLE_WASMEDGE_QUICKJS_DIR ?? wasmedgeQuickJsPath;

    const externalImplemented = [
        '_node:fs',
        '_node:os',
        '_node:crypto',
        'qjs:os',
        '_encoding',
        'wasi_net',
        'wasi_http'
    ];

    // These are modules that should not be included in the build from the Azle side (our side)
    const externalNotImplementedAzle: string[] = [];

    // These are modules that should not be included in the build from the developer side
    // These are specified in the dfx.json canister object esm_externals property
    const externalNotImplementedDev = esmExternals;

    // These will cause runtime errors if their functionality is dependend upon
    const externalNotImplemented = [
        ...externalNotImplementedAzle,
        ...externalNotImplementedDev
    ];

    const customJsModulesPath = path.join(
        AZLE_PACKAGE_PATH,
        'src',
        'compiler',
        'custom_js_modules'
    );

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
        alias: {
            internal: `${finalWasmedgeQuickJsPath}/modules/internal`,
            util: `${finalWasmedgeQuickJsPath}/modules/util`,
            fs: `${finalWasmedgeQuickJsPath}/modules/fs`,
            fmt: `${finalWasmedgeQuickJsPath}/modules/fmt`,
            assert: `${finalWasmedgeQuickJsPath}/modules/assert.js`,
            buffer: `${finalWasmedgeQuickJsPath}/modules/buffer.js`,
            path: `${finalWasmedgeQuickJsPath}/modules/path.js`,
            stream: `${finalWasmedgeQuickJsPath}/modules/stream.js`,
            process: `${finalWasmedgeQuickJsPath}/modules/process.js`,
            url: `${finalWasmedgeQuickJsPath}/modules/url.js`,
            events: `${finalWasmedgeQuickJsPath}/modules/events.js`,
            string_decoder: `${finalWasmedgeQuickJsPath}/modules/string_decoder.js`,
            punycode: `${finalWasmedgeQuickJsPath}/modules/punycode.js`,
            querystring: `${finalWasmedgeQuickJsPath}/modules/querystring.js`,
            whatwg_url: `${finalWasmedgeQuickJsPath}/modules/whatwg_url.js`,
            encoding: `${finalWasmedgeQuickJsPath}/modules/encoding.js`,
            http: `${finalWasmedgeQuickJsPath}/modules/http.js`,
            os: `${finalWasmedgeQuickJsPath}/modules/os.js`,
            // crypto: `${finalWasmedgeQuickJsPath}/modules/crypto.js`, // TODO waiting on wasi-crypto
            crypto: 'crypto-browserify', // TODO we really want the wasmedge-quickjs version once wasi-crypto is working
            zlib: 'pako',
            'internal/deps/acorn/acorn/dist/acorn': path.join(
                customJsModulesPath,
                'acorn',
                'acorn.ts'
            ), // TODO acorn stuff is a bug, wasmedge-quickjs should probably add these files
            'internal/deps/acorn/acorn-walk/dist/walk': path.join(
                customJsModulesPath,
                'acorn',
                'walk.ts'
            ), // TODO acorn stuff is a bug, wasmedge-quickjs should probably add these files
            perf_hooks: path.join(customJsModulesPath, 'perf_hooks.ts'),
            async_hooks: path.join(customJsModulesPath, 'async_hooks.ts'),
            https: path.join(customJsModulesPath, 'https.ts'),
            ...esmAliases
        },
        external: [...externalImplemented, ...externalNotImplemented],
        plugins: [
            {
                name: 'Azle experimental check',
                setup(build): void {
                    if (experimental === false) {
                        build.onResolve(
                            {
                                filter: /^internal$|^util$|^fs$|^fmt$|^assert$|^buffer$|^path$|^stream$|^process$|^url$|^events$|^string_decoder$|^punycode$|^querystring$|^whatwg_url$|^encoding$|^http$|^os$|^crypto$|^zlib$|^internal\/deps\/acorn\/acorn\/dist\/acorn$|^internal\/deps\/acorn\/acorn-walk\/dist\/walk$|^perf_hooks$|^async_hooks$|^https$|^_node:fs$|^_node:os$|^_node:crypto$|^qjs:os$|^_encoding$|^wasi_net$|^wasi_http$/
                            },
                            (args) => {
                                throw new Error(experimentalMessage(args.path));
                            }
                        );
                    }
                }
            },
            esbuildPluginTsc()
        ]
    });

    const bundleArray = buildResult.outputFiles[0].contents;
    const bundleString = Buffer.from(bundleArray).toString('utf-8');

    // TODO consuming code tries to require assert.js which is now an ES module
    // TODO in wasmedge-quickjs, so the expected output is now on the .default property
    // TODO this has only come up with assert for now
    return bundleString
        .replace(
            /__toCommonJS\(assert_exports\)\);/g,
            `__toCommonJS(assert_exports)).default;`
        )
        .replace(
            /__toCommonJS\(stream_exports\)\);/g,
            `__toCommonJS(stream_exports)).default;`
        )
        .replace(
            /__toCommonJS\(http_exports\)\);/g,
            `__toCommonJS(http_exports)).default;`
        );
}
