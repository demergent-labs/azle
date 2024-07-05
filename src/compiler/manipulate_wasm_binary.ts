// import { func, indexLiteral, instr } from '@webassemblyjs/ast';
// import { addExport } from '@webassemblyjs/wasm-edit';
// import { decode, encode } from '@webassemblyjs/wasm-parser';
import binaryen from 'binaryen';
import { readFileSync, writeFileSync } from 'fs'; // TODO let's do async
import { join } from 'path';

import { AZLE_PACKAGE_PATH } from './utils/global_paths';

// TODO put the licenses in the binary? Or with Azle? Probably with Azle actually
// TODO it would be neat to be the licenses in all Azle binaries though
// TODO can we make the start function just load the passive segment into memory?

export async function manipulateWasmBinary(
    canisterName: string,
    methodInfos: string[], // TODO should this be canisterMethodInfos? How do we get that info though?
    js: string
) {
    const originalWasm = readFileSync(
        join(AZLE_PACKAGE_PATH, `static_canister_template.wasm`)
    );

    const module = binaryen.readBinary(originalWasm);

    // writeFileSync(
    //     `.azle/${canisterName}/${canisterName}_old.wat`,
    //     module.emitText()
    // );

    const executeJsIndex = module.getFunction('execute_js');

    // TODO is 0 the correct index to check for?
    if (executeJsIndex === 0) {
        throw new Error('execute_js function not found in the Wasm module');
    }

    methodInfos.forEach((functionName, index) => {
        const exportedName = `canister_query ${functionName}`;

        const funcBody = module.block(null, [
            module.call('execute_js', [module.i32.const(index)], binaryen.none)
        ]);

        module.addFunction(
            exportedName,
            binaryen.none,
            binaryen.none,
            [],
            funcBody
        );

        module.addFunctionExport(exportedName, exportedName);
    });

    const jsData = new Uint8Array();

    const memoryInfo = module.getMemoryInfo();

    const numMemorySegments = module.getNumMemorySegments();

    let segments = [];

    for (let i = 0; i < numMemorySegments; i++) {
        const segment = module.getMemorySegmentInfoByIndex(i);

        segments.push(segment);
    }

    // throw new Error(`typeof: ${segments[0].data instanceof Uint8Array}`);

    const normalizedSegments = segments.map((segment) => {
        return {
            offset: module.i32.const(segment.offset),
            data: new Uint8Array(segment.data),
            passive: segment.passive
        };
    });

    const lastActiveSegment = normalizedSegments[normalizedSegments.length - 1];

    const jsEncoded = new TextEncoder().encode(js);

    // TODO so calling this breaks the memory by adding an explicit maximum amount
    // module.setMemory(memoryInfo.initial, memoryInfo.max ?? -1, null, segments);
    module.setMemory(
        memoryInfo.initial,
        memoryInfo.max ?? -1,
        null,
        [
            ...normalizedSegments,
            {
                offset: 0,
                data: jsEncoded,
                passive: true
            }
        ],
        undefined,
        undefined,
        '0'
    );

    console.log('jsEncoded.byteLength', jsEncoded.byteLength);

    module.removeFunction('passive_data_size');
    module.removeFunction('init_js_passive_data');

    module.addFunction(
        'passive_data_size',
        binaryen.none,
        binaryen.i32,
        [],
        module.i32.const(jsEncoded.byteLength)
    );

    module.addFunction(
        'init_js_passive_data',
        binaryen.createType([binaryen.i32]),
        binaryen.i32, // TODO just to stop weird Rust optimizations
        [],
        module.block(null, [
            module.memory.init(
                '2' as unknown as number,
                module.local.get(0, binaryen.i32),
                module.i32.const(0),
                module.i32.const(jsEncoded.byteLength),
                '0'
            ),
            module.data.drop('2' as unknown as number),
            module.return(module.local.get(0, binaryen.i32))
        ])
    );

    module.validate();

    const newWasm = module.emitBinary();

    // const newWat = module.emitText();

    // console.log('writing binary to disk');

    // writeFileSync(`.azle/${canisterName}/${canisterName}.wat`, newWat);
    writeFileSync(`.azle/${canisterName}/${canisterName}.wasm`, newWasm);
}
