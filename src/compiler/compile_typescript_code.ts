import { buildSync } from 'esbuild';
import { JSCanisterConfig, JavaScript, TypeScript } from './utils/types';
import { Result } from './utils/result';
import { GLOBAL_AZLE_WASMEDGE_QUICKJS_DIR } from './utils/global_paths';

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
            import { toDidString } from 'azle/src/lib/candid/did_file/to_did_string';
            import { DidVisitor, getDefaultVisitorData } from 'azle/src/lib/candid/did_file/visitor';
            export { Principal } from '@dfinity/principal';
            export * from './${main}';
            import CanisterMethods from './${main}';

            export const canisterMethods = CanisterMethods();
            
            globalThis.candidInfoFunction = () => {
                const candidInfo = canisterMethods.getIdl([]).accept(new DidVisitor(), {
                    ...getDefaultVisitorData(),
                    isFirstService: true,
                    systemFuncs: canisterMethods.getSystemFunctionIdls()
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
    // const jsTranspiled: JavaScript = transpile(jsBundled);

    // TODO enabling strict mode is causing lots of issues
    // TODO it would be nice if I could remove strict mode code in esbuild or swc
    // TODO look into the implications of this, but since we are trying to transpile to es3 to cope with missing features in boa, I do not think we need strict mode
    // const jsStrictModeRemoved: JavaScript = jsTranspiled.replace(
    //     /"use strict";/g,
    //     ''
    // );

    return jsBundled;
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
        logLevel: 'silent',
        target: 'es2020',
        alias: {
            internal: `${GLOBAL_AZLE_WASMEDGE_QUICKJS_DIR}/modules/internal`,
            util: `${GLOBAL_AZLE_WASMEDGE_QUICKJS_DIR}/modules/util`,
            fs: `${GLOBAL_AZLE_WASMEDGE_QUICKJS_DIR}/modules/fs`,
            fmt: `${GLOBAL_AZLE_WASMEDGE_QUICKJS_DIR}/modules/fmt`,
            buffer: `${GLOBAL_AZLE_WASMEDGE_QUICKJS_DIR}/modules/buffer.js`,
            path: `${GLOBAL_AZLE_WASMEDGE_QUICKJS_DIR}/modules/path.js`,
            stream: `${GLOBAL_AZLE_WASMEDGE_QUICKJS_DIR}/modules/stream.js`,
            process: `${GLOBAL_AZLE_WASMEDGE_QUICKJS_DIR}/modules/process.js`,
            url: `${GLOBAL_AZLE_WASMEDGE_QUICKJS_DIR}/modules/url.js`,
            events: `${GLOBAL_AZLE_WASMEDGE_QUICKJS_DIR}/modules/events.js`,
            string_decoder: `${GLOBAL_AZLE_WASMEDGE_QUICKJS_DIR}/modules/string_decoder.js`,
            punycode: `${GLOBAL_AZLE_WASMEDGE_QUICKJS_DIR}/modules/punycode.js`,
            querystring: `${GLOBAL_AZLE_WASMEDGE_QUICKJS_DIR}/modules/querystring.js`,
            whatwg_url: `${GLOBAL_AZLE_WASMEDGE_QUICKJS_DIR}/modules/whatwg_url.js`,
            encoding: `${GLOBAL_AZLE_WASMEDGE_QUICKJS_DIR}/modules/encoding.js`
        },
        external: ['_node:fs', '_encoding']
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
// function transpile(js: JavaScript): JavaScript {
//     return swc.transformSync(js, {
//         module: {
//             type: 'commonjs'
//         },
//         jsc: {
//             parser: {
//                 syntax: 'ecmascript'
//             },
//             target: 'es2017', // TODO had to change this to get generator objects natively...not sure what else will break now
//             experimental: {
//                 cacheRoot: '/dev/null'
//             },
//             loose: true
//         },
//         minify: false // TODO keeping this off for now, enable once the project is more stable
//     }).code;
// }
