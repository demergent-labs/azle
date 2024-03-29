import { buildSync } from 'esbuild';
import { JavaScript, TypeScript } from './utils/types';
import { Result } from './utils/result';

export function compileTypeScriptToJavaScript(
    main: string,
    wasmedgeQuickJsPath: string
): Result<JavaScript, unknown> {
    try {
        const imports = `
            // Trying to make sure that all globalThis dependencies are defined
            // Before the developer imports azle on their own
            import 'azle';

            // TODO remove the ethersGetUrl registration once we implement lower-level http for ethers
            import { ethersGetUrl, ic, Server } from 'azle';
            import { ethers } from 'ethers';
            ethers.FetchRequest.registerGetUrl(ethersGetUrl);

            import { toDidString } from 'azle/src/lib/candid/did_file/to_did_string';
            import { DidVisitor, getDefaultVisitorData } from 'azle/src/lib/candid/did_file/visitor';
            export { Principal } from '@dfinity/principal';
            export * from './${main}';
            import * as CanisterMethods from './${main}';

            // TODO This setTimeout is here to allow asynchronous operations during canister initialization
            // for Server canisters that have chosen not to use export default Server
            // This seems to work no matter how many async tasks are awaited, but I am still unsure about how it will
            // behave in all async situations
            setTimeout(() => {
                const canisterMethods = CanisterMethods.default !== undefined ? CanisterMethods.default() : Server(() => globalThis._azleNodeServer)();
                
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
            });
        `;

        const bundledJavaScript = bundleFromString(
            `
            ${imports}
`,
            wasmedgeQuickJsPath
        );

        return {
            ok: bundledJavaScript
        };
    } catch (err) {
        return { err };
    }
}

export function bundleFromString(
    ts: TypeScript,
    wasmedgeQuickJsPath: string
): JavaScript {
    const finalWasmedgeQuickJsPath =
        process.env.AZLE_WASMEDGE_QUICKJS_DIR ?? wasmedgeQuickJsPath;

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
            // crypto: `${finalWasmedgeQuickJsPath}/modules/crypto.js`,
            crypto: 'crypto-browserify',
            zlib: 'crypto-browserify', // TODO wrong of course
            'internal/deps/acorn/acorn/dist/acorn': `crypto-browserify`, // TODO this is a bug, wasmedge-quickjs should probably add these files
            'internal/deps/acorn/acorn-walk/dist/walk': `crypto-browserify` // TODO this is a bug, wasmedge-quickjs should probably add these files
        },
        external: [
            '_node:fs',
            '_node:os',
            '_node:crypto',
            'qjs:os',
            '_encoding',
            'wasi_net',
            'wasi_http'
        ]
        // TODO tsconfig was here to attempt to set importsNotUsedAsValues to true to force Principal to always be bundled
        // TODO now we always bundle Principal for all code, but I am keeping this here in case we run into the problem elsewhere
        // tsconfig: path.join( __dirname, './esbuild-tsconfig.json') // TODO this path resolution may cause problems on non-Linux systems, beware...might not be necessary now that we are using stdin
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
