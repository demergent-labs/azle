import * as swc from '@swc/core';
import { buildSync } from 'esbuild';
import { JSCanisterConfig, JavaScript, TypeScript } from './utils/types';
import { Result } from './utils/result';

export function compileTypeScriptToJavaScript(
    main: string,
    canisterConfig: JSCanisterConfig
): Result<JavaScript, unknown> {
    try {
        const globalThisProcess = `
            globalThis.process = {
                env: {
                    ${(canisterConfig.env ?? [])
                        .map((envVarName) => {
                            return `'${envVarName}': '${process.env[envVarName]}'`;
                        })
                        .join(',')}
                }
            };
        `;

        const imports = `
            // Trying to make sure that all globalThis dependencies are defined
            // Before the developer imports azle on their own
            import 'azle';
            import { ic } from 'azle';
            export { Principal } from '@dfinity/principal';
            export * from './${main}';
            import CanisterMethods from './${main}';

            export const canisterMethods = CanisterMethods();

        `;

        const bundledJavaScript = bundleAndTranspileJs(`
            ${globalThisProcess}
            ${imports}
`);

        return {
            ok: bundledJavaScript
        };
    } catch (err) {
        return { err };
    }
}

export function bundleAndTranspileJs(ts: TypeScript): JavaScript {
    const jsBundled: JavaScript = bundleFromString(ts);
    const jsTranspiled: JavaScript = transpile(jsBundled);

    // TODO enabling strict mode is causing lots of issues
    // TODO it would be nice if I could remove strict mode code in esbuild or swc
    // TODO look into the implications of this, but since we are trying to transpile to es3 to cope with missing features in boa, I do not think we need strict mode
    const jsStrictModeRemoved: JavaScript = jsTranspiled.replace(
        /"use strict";/g,
        ''
    );

    return jsStrictModeRemoved;
}

// TODO there is a lot of minification/transpiling etc we could do with esbuild or with swc
// TODO we need to decide which to use for what
export function bundleFromString(ts: TypeScript): JavaScript {
    // TODO tree-shaking does not seem to work with stdin. I have learned this from sad experience
    const buildResult = buildSync({
        stdin: {
            contents: ts,
            resolveDir: process.cwd()
        },
        format: 'esm',
        bundle: true,
        treeShaking: true,
        write: false,
        logLevel: 'silent'
        // TODO tsconfig was here to attempt to set importsNotUsedAsValues to true to force Principal to always be bundled
        // TODO now we always bundle Principal for all code, but I am keeping this here in case we run into the problem elsewhere
        // tsconfig: path.join( __dirname, './esbuild-tsconfig.json') // TODO this path resolution may cause problems on non-Linux systems, beware...might not be necessary now that we are using stdin
    });

    const bundleArray = buildResult.outputFiles[0].contents;
    const bundleString = Buffer.from(bundleArray).toString('utf-8');

    return bundleString;
}

// TODO I have left the code for bundleFromPath
// TODO We might run into the situation again where we need to use bundleFromPath
// TODO there are some issues with tree-shaking and possibly some others in bundleFromString, so I will just leave the code here for now until the project is more mature
// function bundleFromPath(tsPath: string): JavaScript {
//     const buildResult = buildSync({
//         entryPoints: [tsPath],
//         format: 'esm',
//         bundle: true,
//         treeShaking: true,
//         write: false,
//         logLevel: 'silent',
//         // TODO tsconfig was here to attempt to set importsNotUsedAsValues to true to force Principal to always be bundled
//         // TODO now we always bundle Principal for all code, but I am keeping this here in case we run into the problem elsewhere
//         // tsconfig: path.join( __dirname, './esbuild-tsconfig.json') // TODO this path resolution may cause problems on non-Linux systems, beware...might not be necessary now that we are using stdin
//     });

//     const bundleArray = buildResult.outputFiles[0].contents;
//     const bundleString = Buffer.from(bundleArray).toString('utf-8');

//     return bundleString;
// }

// TODO there is a lot of minification/transpiling etc we could do with esbuild or with swc
// TODO we need to decide which to use for what
function transpile(js: JavaScript): JavaScript {
    return swc.transformSync(js, {
        module: {
            type: 'commonjs'
        },
        jsc: {
            parser: {
                syntax: 'ecmascript'
            },
            target: 'es2017', // TODO had to change this to get generator objects natively...not sure what else will break now
            experimental: {
                cacheRoot: '/dev/null'
            },
            loose: true
        },
        minify: false // TODO keeping this off for now, enable once the project is more stable
    }).code;
}
