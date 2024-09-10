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
        `;
}

export function handleClassApiCanister(): string {
    return /*TS*/ `
        if (globalThis._azleNodeWasmEnvironment === false) {
            const canisterClassInstance = new Canister.default();
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

export async function bundle(buildOptions: BuildOptions): Promise<string> {
    const buildResult = await build(buildOptions);

    if (buildResult.outputFiles === undefined) {
        throw new Error(
            `Azle: Build process failed to produce JavaScript output files`
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
                            throw new Error(experimentalMessage(args.path));
                        }
                    );
                }
            },
            esbuildPluginTsc()
        ]
    };
}

function experimentalMessage(importName: string): string {
    return `Azle: experimental mode must be enabled to import from ${importName}. You can enable experimental mode in your dfx.json file like this:
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
