import '#experimental/build/assert_experimental';

import { BuildOptions } from 'esbuild';
import esbuildPluginTsc from 'esbuild-plugin-tsc';
import { existsSync } from 'fs';
import { join } from 'path';

import {
    bundle,
    getBuildOptions as getStableBuildOptions,
    handleClassApiCanister
} from '#commands/build/javascript';
import { findProjectRoot } from '#experimental/build/utils/find_project_root';
import { WASMEDGE_QUICKJS_PATH } from '#experimental/utils/global_paths';
import { getDfxRoot } from '#utils/dfx_root';
import { AZLE_ROOT } from '#utils/global_paths';

export async function compile(
    main: string,
    esmAliases: Record<string, string>,
    esmExternals: string[]
): Promise<string> {
    const prelude = getPrelude(main);
    const buildOptions = await getBuildOptions(
        prelude,
        main,
        esmAliases,
        esmExternals
    );
    const bundled = await bundle(buildOptions);

    return bundled
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

export function getPrelude(main: string): string {
    const absoluteMainPath = join(getDfxRoot(), main);
    return /*TS*/ `
        import 'azle/_internal/globals';
        import 'azle/experimental/_internal/globals';

        import 'reflect-metadata';

        // TODO remove the ethersGetUrl registration once we implement lower-level http for ethers
        import { ethersGetUrl, Server } from 'azle/experimental';
        import { ethers } from 'ethers';
        ethers.FetchRequest.registerGetUrl(ethersGetUrl);

        import { getDefaultVisitorData, IDL, idlToString } from 'azle';
        export { Principal } from '@dfinity/principal';
        import * as Canister from '${absoluteMainPath}';

        if (isClassSyntaxExport(Canister)) {
            ${handleClassApiCanister(main)}
        }
        else {
            // TODO This setTimeout is here to allow asynchronous operations during canister initialization
            // for Server canisters that have chosen not to use export default Server
            // This seems to work no matter how many async tasks are awaited, but I am still unsure about how it will
            // behave in all async situations
            setTimeout(() => {
                const canister = Canister.default !== undefined ? Canister.default() : Server(() => globalThis._azleNodeServer)();
                if (globalThis.process !== undefined && globalThis.process.env.AZLE_RECORD_BENCHMARKS === 'true') {
                    const methodMeta = canister.methodMeta;

                    globalThis._azleCanisterMethodNames = Object.entries(methodMeta).reduce((acc, [key, value]) => {
                        if (value === undefined) {
                            return acc;
                        }

                        if (key === 'queries' || key === 'updates') {
                            const queriesOrUpdates = value.reduce((innerAcc, method) => {
                                const indexString = method.index.toString();
                                return { ...innerAcc, [indexString]: method.name };
                            }, {});
                            return { ...acc, ...queriesOrUpdates };
                        } else {
                            const indexString = value.index.toString();
                            return { ...acc, [indexString]: value.name };
                        }
                    }, {});
                }

                const candid = idlToString(canister.getIdlType([]), {
                    ...getDefaultVisitorData(),
                    isFirstService: true,
                    initAndPostUpgradeParamIdlTypes: canister.getInitAndPostUpgradeParamIdlTypes()
                });

                globalThis._azleCallbacks = canister.callbacks;

                globalThis._azleGetCandidAndMethodMeta = () => {
                    return JSON.stringify({
                        candid,
                        methodMeta: canister.methodMeta
                    });
                };
            });
        }

        function isClassSyntaxExport(canister) {
            const isNothing = canister === undefined || canister.default === undefined;
            const isFunctionalSyntaxExport =
                canister?.default?.isCanister === true ||
                canister?.default?.isRecursive === true;
            return !isNothing && !isFunctionalSyntaxExport;
        }
    `;
}

export async function getBuildOptions(
    ts: string,
    main: string,
    esmAliases: Record<string, string>,
    esmExternals: string[]
): Promise<BuildOptions> {
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
        AZLE_ROOT,
        'src',
        'experimental',
        'build',
        'commands',
        'build',
        'custom_js_modules'
    );

    const stableBuildOptions = getStableBuildOptions(ts, main);

    return {
        ...stableBuildOptions,
        alias: {
            internal: `${WASMEDGE_QUICKJS_PATH}/modules/internal`,
            util: `${WASMEDGE_QUICKJS_PATH}/modules/util`,
            fs: `${WASMEDGE_QUICKJS_PATH}/modules/fs`,
            fmt: `${WASMEDGE_QUICKJS_PATH}/modules/fmt`,
            assert: `${WASMEDGE_QUICKJS_PATH}/modules/assert.js`,
            buffer: `${WASMEDGE_QUICKJS_PATH}/modules/buffer.js`,
            path: `${WASMEDGE_QUICKJS_PATH}/modules/path.js`,
            stream: `${WASMEDGE_QUICKJS_PATH}/modules/stream.js`,
            process: `${WASMEDGE_QUICKJS_PATH}/modules/process.js`,
            url: `${WASMEDGE_QUICKJS_PATH}/modules/url.js`,
            events: `${WASMEDGE_QUICKJS_PATH}/modules/events.js`,
            string_decoder: `${WASMEDGE_QUICKJS_PATH}/modules/string_decoder.js`,
            punycode: `${WASMEDGE_QUICKJS_PATH}/modules/punycode.js`,
            querystring: `${WASMEDGE_QUICKJS_PATH}/modules/querystring.js`,
            whatwg_url: `${WASMEDGE_QUICKJS_PATH}/modules/whatwg_url.js`,
            encoding: `${WASMEDGE_QUICKJS_PATH}/modules/encoding.js`,
            http: `${WASMEDGE_QUICKJS_PATH}/modules/http.js`,
            os: `${WASMEDGE_QUICKJS_PATH}/modules/os.js`,
            // crypto: `${WASMEDGE_QUICKJS_PATH}/modules/crypto.js`, // TODO waiting on wasi-crypto
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
        external: [...externalImplemented, ...externalNotImplemented],
        plugins: [esbuildPluginTsc({ tsconfigPath: await getTsConfigPath() })]
    };
}
export async function getTsConfigPath(): Promise<string> {
    const projectRoot = await findProjectRoot();
    const tsConfigPath = join(projectRoot, 'tsconfig.json');

    if (existsSync(tsConfigPath)) {
        return tsConfigPath;
    }
    return join(AZLE_ROOT, 'tsconfig.dev.json');
}
