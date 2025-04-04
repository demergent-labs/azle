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
        const exportedCanisterClassInstance = getExportedCanisterClassInstance();

        const visibleMethodIdlParamTypes = Object.fromEntries(
            Object.entries(exportedCanisterClassInstance._azleCanisterMethodIdlParamTypes)
                .filter(([methodName]) => isMethodVisible(methodName, exportedCanisterClassInstance._azleMethodMeta))
        );

        const canisterIdlType = IDL.Service(visibleMethodIdlParamTypes);
        const candid = idlToString(canisterIdlType, {
            ...getDefaultVisitorData(),
            isFirstService: true,
            initAndPostUpgradeParamIdlTypes: exportedCanisterClassInstance._azleInitAndPostUpgradeIdlTypes
        });

        globalThis._azleGetCandidAndMethodMeta = () => {
            return JSON.stringify({
                candid,
                methodMeta: exportedCanisterClassInstance._azleMethodMeta
            });
        };

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

        /**
         * @internal
         *
         * This function is designed with a very specific purpose.
         * We need to get the _azle properties off of this class instance to use in generating the candid
         * and method meta information. But we can't just set the result of instantiating the class to a local variable.
         * This is because exceptions might be thrown during the class's instantiation, in the constructor or
         * property initializers. If this happens, we would not be able to proceed to get those _azle properties out of the local variable.
         * The likelihood of this happening is very high, since to get the candid and method meta information we must
         * execute the Wasm module outside of the replica in our Node.js Wasm environment. Though the likelihood of this happening
         * is high, it is not an issue unless our decorators cannot complete the setting of the _azle properties.
         * We believe there is a very high likelihood of always being able to set the _azle properties, even if errors
         * are thrown after this process completes.
         * This environment is not the true canister environment and may not have certain globals or other APIs.
         * So we use a try/catch. If there is an exception we check if we're in the Node.js Wasm environment.
         * If we are, we do not throw an error unless the global _azleExportedCanisterClassInstance is undefined.
         * If it is not undefined, we assume that the decorators have executed during the context.addInitializer callback.
         * This callback occurs before the class's constructor or properties are initialized.
         * There may be some rare conditions where this scheme will not work, but we believe the likelihood is extremely low.
         */
        function getExportedCanisterClassInstance() {
            try {
                if (Canister.default === undefined) {
                    throw new Error(
                        'Your canister class must be the default export of ${main}'
                    );
                }
                Canister.default.prototype._azleShouldRegisterCanisterMethods = true;
                new Canister.default();
                Canister.default.prototype._azleShouldRegisterCanisterMethods = false;
            } catch (error) {
                if (globalThis._azleNodeWasmEnvironment === true) {
                    if (globalThis._azleExportedCanisterClassInstance === undefined) {
                        throw error;
                    }
                }
                else {
                    throw error;
                }
            }

            return globalThis._azleExportedCanisterClassInstance;
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
            const methodMeta = exportedCanisterClassInstance._azleMethodMeta;

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
