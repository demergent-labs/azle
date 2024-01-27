import { buildSync } from 'esbuild';
import { JavaScript, TypeScript } from './utils/types';
import { Result } from './utils/result';
import { GLOBAL_AZLE_WASMEDGE_QUICKJS_DIR } from './utils/global_paths';

export function compileTypeScriptToJavaScript(
    main: string
): Result<JavaScript, unknown> {
    try {
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

        const bundledJavaScript = bundleFromString(`
            ${imports}
`);

        return {
            ok: bundledJavaScript
        };
    } catch (err) {
        return { err };
    }
}

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
            assert: `${GLOBAL_AZLE_WASMEDGE_QUICKJS_DIR}/modules/assert.js`,
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
            encoding: `${GLOBAL_AZLE_WASMEDGE_QUICKJS_DIR}/modules/encoding.js`,
            http: `${GLOBAL_AZLE_WASMEDGE_QUICKJS_DIR}/modules/http.js`,
            os: `${GLOBAL_AZLE_WASMEDGE_QUICKJS_DIR}/modules/os.js`,
            // crypto: `${GLOBAL_AZLE_WASMEDGE_QUICKJS_DIR}/modules/crypto.js`,
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
