import { BuildOptions } from 'esbuild';
import { join } from 'path';

import {
    bundle,
    getBuildOptions as getStableBuildOptions
} from '../../../stable/commands/compile/javascript';
import { AZLE_PACKAGE_PATH } from '../../../stable/utils/global_paths';

export async function compile(
    main: string,
    wasmedgeQuickJsPath: string,
    esmAliases: Record<string, string>,
    esmExternals: string[]
): Promise<string> {
    const prelude = getPrelude(main);
    const buildOptions = getBuildOptions(
        prelude,
        wasmedgeQuickJsPath,
        esmAliases,
        esmExternals
    );
    const bundled = await bundle(buildOptions);

    return bundled;
}

export function getPrelude(main: string): string {
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

export function getBuildOptions(
    ts: string,
    wasmedgeQuickJsPath: string,
    esmAliases: Record<string, string>,
    esmExternals: string[]
): BuildOptions {
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

    const customJsModulesPath = join(
        AZLE_PACKAGE_PATH,
        'src',
        'compiler',
        'custom_js_modules'
    );

    const stableBuildOptions = getStableBuildOptions(ts);

    return {
        ...stableBuildOptions,
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
            'internal/deps/acorn/acorn/dist/acorn': join(
                customJsModulesPath,
                'acorn',
                'acorn.ts'
            ), // TODO acorn stuff is a bug, wasmedge-quickjs should probably add these files
            'internal/deps/acorn/acorn-walk/dist/walk': join(
                customJsModulesPath,
                'acorn',
                'walk.ts'
            ), // TODO acorn stuff is a bug, wasmedge-quickjs should probably add these files
            perf_hooks: join(customJsModulesPath, 'perf_hooks.ts'),
            async_hooks: join(customJsModulesPath, 'async_hooks.ts'),
            https: join(customJsModulesPath, 'https.ts'),
            ...esmAliases
        },
        external: [...externalImplemented, ...externalNotImplemented]
    };
}
