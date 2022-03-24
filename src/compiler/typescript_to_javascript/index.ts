import * as swc from '@swc/core';
import { buildSync } from 'esbuild';
import { JavaScript } from '../../types';

// TODO it would be nice if the bundle and transform steps could be combined into one
export async function compileTypeScriptToJavaScript(tsPath: string): Promise<JavaScript> {
    const bundledJS = bundle(tsPath);
    const transpiledJS = transpile(bundledJS);
    // TODO enabling strict mode is causing lots of issues
    // TODO it would be nice if I could remove strict mode code in esbuild or swc
    // TODO look into the implications of this, but since we are trying to transpile to es3 to cope with missing features in boa, I do not think we need strict mode
    const strictModeRemovedJS = transpiledJS.replace(/"use strict";/g, '');

    return strictModeRemovedJS;
}

// TODO there is a lot of minification/transpiling etc we could do with esbuild or with swc
// TODO we need to decide which to use for what
function bundle(tsPath: string): JavaScript {
    const buildResult = buildSync({
        entryPoints: [tsPath],
        format: 'esm',
        bundle: true,
        write: false
    });

    const bundleArray = buildResult.outputFiles[0].contents;
    const bundleString = Buffer.from(bundleArray).toString('utf-8');

    return bundleString;
}

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
            target: 'es2015', // TODO had to change this to get generator objects natively...not sure what else will break now
            experimental: {
                cacheRoot: '/dev/null'
            },
            loose: true
        },
        minify: false // TODO keeping this off for now, enable once the project is more stable
    }).code;
}