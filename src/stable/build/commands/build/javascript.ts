import { build, BuildOptions } from 'esbuild';
import { dirname, join } from 'path';

import { getDfxRoot } from '#utils/dfx_root';

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

        if (globalThis._azleDispatch === undefined) {
            throw new Error('globalThis._azleDispatch is undefined');
        }

        globalThis._azleDispatch({
            type: 'SET_AZLE_CANISTER_CLASS_META',
            payload: canisterClassMeta,
            location: {
                filepath: 'azle/src/stable/build/commands/build/javascript.ts',
                functionName: 'handleClassApiCanister'
            }
        });

        const visibleMethodIdlParamTypes = Object.fromEntries(
            Object.entries(canisterClassMeta.canisterMethodIdlParamTypes)
                .filter(([methodName]) => isMethodVisible(methodName, canisterClassMeta.methodMeta))
        );

        const canisterIdlType = IDL.Service(visibleMethodIdlParamTypes);
        const candid = idlToString(canisterIdlType, {
            ...getDefaultVisitorData(),
            isFirstService: true,
            initAndPostUpgradeParamIdlTypes: canisterClassMeta.initAndPostUpgradeIdlTypes
        });

        globalThis._azleGetCandidAndMethodMeta = () => {
            return JSON.stringify({
                candid,
                methodMeta: canisterClassMeta.methodMeta
            });
        };

        /**
         * @internal
         *
         * This function is used to get the CanisterClassMeta object
         * that contains all of the information required for Candid file generation,
         * Wasm binary export manipulation, canister method callback invocation, etc.
         * Unfortunately for now we must execute the canister in a Node Wasm environment
         * in order to get some of the CanisterClassMeta information needed to manipulate
         * the Wasm binary and generate the Candid file before final canister deployment.
         * It would be ideal to avoid this extra Node Wasm environment execution,
         * but we currently don't know how to do this. Possible ideas:
         * - ICP protocol improvement to allow for dynamic canister method registration
         * - ICP replica improvement to automatically run Wasm binaries through a similar process as our Node.js Wasm environment
         */
        function getCanisterClassMeta() {
            const defaultExportNotDefined = Canister.default === undefined || Canister.default === null;
            const defaultExportNotAnArrayOrClass = Array.isArray(Canister.default) === false && isClass(Canister.default) === false;
            const defaultExportAnArrayWithNonClasses = Array.isArray(Canister.default) === true && Canister.default.every((canisterClass) => isClass(canisterClass) === true) === false;

            if (
                defaultExportNotDefined === true ||
                defaultExportNotAnArrayOrClass === true ||
                defaultExportAnArrayWithNonClasses === true

            ) {
                throw new Error('A class or an array of classes must be the default export from ${main}');
            }

            const canisterClasses = Array.isArray(Canister.default) ? Canister.default : [Canister.default];

            // This object WILL BE MUTATED.
            // This is the original CanisterClassMeta object that we will
            // pass as a property of the constructor of each exported canister class just before
            // instantiating it. Each instantiation of an exported canister class
            // will mutate this same object, as the same reference will be passed along.
            // After all instantiations are complete, this will be the final CanisterClassMeta object
            // that we set on globalThis._azleCanisterClassMeta that contains all of the information
            // required for Candid file generation, Wasm binary export manipulation, and canister method callback invocation.
            // We may wish to revisit these mutations later on, but it is working very well for now.
            // We would have to do a large refactor of the decorators to get rid of these mutations.
            let canisterClassMeta = {
                callbacks: {},
                canisterMethodIdlParamTypes: {},
                canisterMethodsIndex: 0,
                initAndPostUpgradeIdlTypes: [],
                methodMeta: {
                    queries: [],
                    updates: []
                }
            };

            canisterClasses.forEach((canisterClass) => {
                canisterClass._azleCanisterClassMeta = canisterClassMeta;
                // canisterClassMeta WILL BE MUTATED inside of this instantiation
                new canisterClass();
            });

            return canisterClassMeta;
        }

        /**
         * @internal
         *
         * Uses a heuristic to determine if a value is a class or not
         */
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
            const methodMeta = canisterClassMeta.methodMeta;

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

            if (globalThis._azleDispatch === undefined) {
                throw new Error('globalThis._azleDispatch is undefined');
            }

            globalThis._azleDispatch({
                type: 'SET_AZLE_CANISTER_METHOD_NAMES',
                payload: canisterMethodNames,
                location: {
                    filepath: 'azle/src/stable/build/commands/build/javascript.ts',
                    functionName: 'handleBenchmarking'
                }
            });
        }
    `;
}
