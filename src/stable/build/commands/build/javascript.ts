import { build, BuildOptions } from 'esbuild';
import { dirname, join } from 'path';

import { getDfxRoot } from '#utils/global_paths';

export async function compile(main: string): Promise<string> {
    const prelude = getPrelude(main);
    const buildOptions = getBuildOptions(prelude, main);
    const bundled = await bundle(buildOptions);

    return bundled;
}

function getPrelude(main: string): string {
    const absoluteMainPath = join(getDfxRoot(), main);
    return /*TS*/ `
            import 'azle/_internal/globals';

            import { getDefaultVisitorData, IDL, idlToString } from 'azle';

            import * as Canister from '${absoluteMainPath}';

            ${handleClassApiCanister(main)}

            ${handleBenchmarking()}
        `;
}

export function handleClassApiCanister(main: string): string {
    return /*TS*/ `
        const canisterClassMeta = getCanisterClassMeta();

        globalThis._azleDispatch({
            type: 'SET_AZLE_CANISTER_CLASS_META',
            payload: canisterClassMeta,
            location: {
                filepath: 'azle/src/stable/build/commands/build/javascript.ts',
                functionName: 'handleClassApiCanister'
            }
        });

        const visibleMethodIdlParamTypes = Object.fromEntries(
            Object.entries(canisterClassMeta._azleCanisterMethodIdlParamTypes)
                .filter(([methodName]) => isMethodVisible(methodName, canisterClassMeta._azleMethodMeta))
        );

        const canisterIdlType = IDL.Service(visibleMethodIdlParamTypes);
        const candid = idlToString(canisterIdlType, {
            ...getDefaultVisitorData(),
            isFirstService: true,
            initAndPostUpgradeParamIdlTypes: canisterClassMeta._azleInitAndPostUpgradeIdlTypes
        });

        globalThis._azleGetCandidAndMethodMeta = () => {
            return JSON.stringify({
                candid,
                methodMeta: canisterClassMeta._azleMethodMeta
            });
        };

        function getCanisterClassMeta() {
            if (
                Canister.default === undefined ||
                Canister.default === null || (
                    Array.isArray(Canister.default) === false &&
                    isClass(Canister.default) === false
                ) || (
                    Array.isArray(Canister.default) === true &&
                    Canister.default.every((canisterClass) => isClass(canisterClass) === true) === false
                )
            ) {
                throw new Error('A class or an array of classes must be the default export from ${main}');
            }

            const canisterClasses = Array.isArray(Canister.default) ? Canister.default : [Canister.default];

            // TODO this is terribly mutative...can we do this in a more functional way?
            let canisterClassMeta = {
                callbacks: {},
                canisterMethodIdlParamTypes: {},
                canisterMethodsIndex: 0,
                initAndPostUpgradeIdlTypes: [],
                definedSystemMethods: {
                    init: false,
                    postUpgrade: false,
                    preUpgrade: false,
                    heartbeat: false,
                    inspectMessage: false,
                    onLowWasmMemory: false
                },
                methodMeta: {
                    queries: [],
                    updates: []
                }
            };

            canisterClasses.forEach((canisterClass) => {
                canisterClass._azleCanisterClassMeta = canisterClassMeta;
                new canisterClass();
            });

            return canisterClassMeta;
        }

        function isClass(value) {
            return value !== undefined && value !== null && typeof value === 'function' && value.toString().startsWith('class');
        }

        /**
         * @internal
         *
         * Determines if a method should be visible in Candid based on its hidden status
         */
        function isMethodVisible(methodName, methodMeta) {
            const { queries = [], updates = [] } = methodMeta;
            const allMethods = [...queries, ...updates];
            const method = allMethods.find(m => m.name === methodName);
            return method?.hidden === false;
        }
    `;
}

export async function bundle(buildOptions: BuildOptions): Promise<string> {
    const buildResult = await build(buildOptions);

    if (buildResult.outputFiles === undefined) {
        throw new Error(
            `Build process failed to produce JavaScript output files`
        );
    }

    const bundleArray = buildResult.outputFiles[0].contents;
    const bundleString = Buffer.from(bundleArray).toString('utf-8');

    return bundleString;
}

// TODO tree-shaking does not seem to work with stdin. I have learned this from sad experience
export function getBuildOptions(ts: string, main: string): BuildOptions {
    return {
        stdin: {
            contents: ts,
            resolveDir: dirname(join(getDfxRoot(), main))
        },
        format: 'esm',
        bundle: true,
        treeShaking: true,
        write: false,
        logLevel: 'silent',
        target: 'es2024',
        preserveSymlinks: true,
        plugins: [
            {
                name: 'Azle experimental check',
                setup(build): void {
                    build.onResolve(
                        {
                            filter: /^internal$|^util$|^fs$|^fs\/promises$|^fmt$|^assert$|^buffer$|^path$|^stream$|^process$|^url$|^events$|^string_decoder$|^punycode$|^querystring$|^whatwg_url$|^encoding$|^http$|^os$|^crypto$|^zlib$|^internal\/deps\/acorn\/acorn\/dist\/acorn$|^internal\/deps\/acorn\/acorn-walk\/dist\/walk$|^perf_hooks$|^async_hooks$|^https$|^_node:fs$|^_node:os$|^_node:crypto$|^qjs:os$|^_encoding$|^wasi_net$|^wasi_http$/
                        },
                        (args) => {
                            throw experimentalMessage(args.path);
                        }
                    );
                }
            }
        ]
    };
}

function experimentalMessage(importName: string): string {
    return `Experimental mode must be enabled to import from ${importName}. You can enable experimental mode in your dfx.json file like this:
{
    "canisters": {
        "canisterName": {
            "type": "azle",
            "main": "index.ts",
            "custom": {
                "experimental": true
            }
        }
    }
}
`;
}

function handleBenchmarking(): string {
    return /*TS*/ `
        if (globalThis.process !== undefined && globalThis.process.env.AZLE_RECORD_BENCHMARKS === 'true') {
            const methodMeta = canisterClassMeta._azleMethodMeta;

            const canisterMethodNames = Object.entries(methodMeta).reduce((acc, [key, value]) => {
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

            globalThis._azleDispatch({
                type: 'SET_AZLE_CANISTER_METHOD_NAMES',
                payload: canisterMethodNames,
                location: {
                    filepath: 'azle/src/stable/build/commands/compile/javascript.ts',
                    functionName: 'handleBenchmarking'
                }
            });
        }
    `;
}
