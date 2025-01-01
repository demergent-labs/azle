import { build, BuildOptions } from 'esbuild';
import esbuildPluginTsc from 'esbuild-plugin-tsc';

export async function compile(main: string): Promise<string> {
    const prelude = getPrelude(main);
    const buildOptions = getBuildOptions(prelude);
    const bundled = await bundle(buildOptions);

    return bundled;
}

function getPrelude(main: string): string {
    return /*TS*/ `
            import 'azle/src/lib/stable/globals';

            import { DidVisitor, getDefaultVisitorData, IDL, toDidString } from 'azle';

            import * as Canister from './${main}';

            ${handleClassApiCanister()}

            ${handleBenchmarking()}
        `;
}

// TODO check if the global variables are already set
// TODO if they are not, then get them off of the class
// TODO we want this to be extensible
// TODO but we should use our own method as well right?
// TODO how can we create the class instance in an extensible and non-priviledged way?
export function handleClassApiCanister(): string {
    return /*TS*/ `
        // if (globalThis._azleNodeWasmEnvironment === false) {
            const canisterClassInstance = new Canister.default();
            // TODO this can just be an object that has the correct properties
            // TODO and then anyone can set it...but we do we make it so that we
            // TODO aren't setting it in a priviledged way?
            // TODO I feel like we need to register this when azle is imported or something
            // TODO do we even need to worry about this right now?
            // TODO this shouldn't affect the public API and we don't even know if anyone
            // TODO wants to extend Azle right now
            globalThis._azleCanisterClassInstance = canisterClassInstance;
        // }

        const canisterIdlType = IDL.Service(canisterClassInstance._azleCanisterMethodIdlTypes);
        const candid = canisterIdlType.accept(new DidVisitor(), {
            ...getDefaultVisitorData(),
            isFirstService: true,
            systemFuncs: canisterClassInstance._azleInitAndPostUpgradeIdlTypes
        });

        globalThis._azleGetCandidAndMethodMeta = () => {
            return JSON.stringify({
                candid: toDidString(candid),
                methodMeta: canisterClassInstance._azleMethodMeta
            });
        };
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
export function getBuildOptions(ts: string): BuildOptions {
    return {
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
                            filter: /^internal$|^util$|^fs$|^fs\/promises$|^fmt$|^assert$|^buffer$|^path$|^stream$|^process$|^url$|^events$|^string_decoder$|^punycode$|^querystring$|^whatwg_url$|^encoding$|^http$|^os$|^crypto$|^zlib$|^internal\/deps\/acorn\/acorn\/dist\/acorn$|^internal\/deps\/acorn\/acorn-walk\/dist\/walk$|^perf_hooks$|^async_hooks$|^https$|^_node:fs$|^_node:os$|^_node:crypto$|^qjs:os$|^_encoding$|^wasi_net$|^wasi_http$/
                        },
                        (args) => {
                            throw experimentalMessage(args.path);
                        }
                    );
                }
            },
            esbuildPluginTsc()
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
        if (globalThis._azleRecordBenchmarks === true) {
            const methodMeta = globalThis._azleMethodMeta;

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
    `;
}
