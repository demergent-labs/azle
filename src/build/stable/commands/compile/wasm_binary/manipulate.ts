// import { func, indexLiteral, instr } from '@webassemblyjs/ast';
// import { addExport } from '@webassemblyjs/wasm-edit';
// import { decode, encode } from '@webassemblyjs/wasm-parser';
import binaryen from 'binaryen';
import { readFile } from 'fs/promises';
import { join } from 'path';

import {
    AZLE_PACKAGE_PATH,
    STABLE_STATIC_CANISTER_TEMPLATE_PATH
} from '../../../utils/global_paths';
import { EnvVars, MethodMeta } from '../../../utils/types';

// TODO put the licenses in the binary? Or with Azle? Probably with Azle actually
// TODO it would be neat to be the licenses in all Azle binaries though
// TODO can we make the start function just load the passive segment into memory?

export async function manipulateWasmBinary(
    js: string,
    envVars: EnvVars,
    methodMeta?: MethodMeta
): Promise<Uint8Array> {
    const originalWasm = await readFile(STABLE_STATIC_CANISTER_TEMPLATE_PATH);

    const module = binaryen.readBinary(originalWasm);

    methodMeta?.queries?.forEach(({ name: functionName, index, composite }) => {
        addCanisterMethod(
            module,
            `${
                composite === true
                    ? 'canister_composite_query'
                    : 'canister_query'
            } ${functionName}`,
            'execute_method_js',
            index,
            true
        );
    });

    methodMeta?.updates?.forEach(({ name: functionName, index }) => {
        addCanisterMethod(
            module,
            `canister_update ${functionName}`,
            'execute_method_js',
            index,
            true
        );
    });

    addCanisterMethod(
        module,
        'canister_init',
        'init',
        methodMeta?.init?.index ?? -1,
        true
    );

    addCanisterMethod(
        module,
        'canister_post_upgrade',
        'post_upgrade',
        methodMeta?.post_upgrade?.index ?? -1,
        true
    );

    if (methodMeta?.pre_upgrade !== undefined) {
        addCanisterMethod(
            module,
            'canister_pre_upgrade',
            'execute_method_js',
            methodMeta.pre_upgrade.index,
            false
        );
    }

    if (methodMeta?.inspect_message !== undefined) {
        addCanisterMethod(
            module,
            'canister_inspect_message',
            'execute_method_js',
            methodMeta.inspect_message.index,
            false
        );
    }

    if (methodMeta?.heartbeat !== undefined) {
        addCanisterMethod(
            module,
            'canister_heartbeat',
            'execute_method_js',
            methodMeta.heartbeat.index,
            false
        );
    }

    const memoryInfo = module.getMemoryInfo();

    const numMemorySegments = module.getNumMemorySegments();

    let segments = [];

    for (let i = 0; i < numMemorySegments; i++) {
        const segment = module.getMemorySegmentInfoByIndex(i);

        segments.push(segment);
    }

    const normalizedSegments = segments.map((segment) => {
        return {
            offset: module.i32.const(segment.offset),
            data: new Uint8Array(segment.data),
            passive: segment.passive
        };
    });

    const jsEncoded = new TextEncoder().encode(js);
    const wasmDataEncoded = new TextEncoder().encode(
        JSON.stringify({
            env_vars: envVars,
            management_did: (
                await readFile(
                    join(AZLE_PACKAGE_PATH, 'canisters', 'management', 'ic.did')
                )
            ).toString()
        })
    );

    module.setMemory(memoryInfo.initial, memoryInfo.max ?? -1, null, [
        ...normalizedSegments,
        {
            offset: 0,
            data: jsEncoded,
            passive: true
        },
        {
            offset: 0,
            data: wasmDataEncoded,
            passive: true
        }
    ]);

    module.removeFunction('js_passive_data_size');
    module.removeFunction('init_js_passive_data');

    module.addFunction(
        'js_passive_data_size',
        binaryen.none,
        binaryen.i32,
        [],
        module.i32.const(jsEncoded.byteLength)
    );

    const jsPassiveDataSegmentNumber = normalizedSegments.length;

    module.addFunction(
        'init_js_passive_data',
        binaryen.createType([binaryen.i32]),
        binaryen.i32, // TODO just to stop weird Rust optimizations
        [],
        module.block(null, [
            module.memory.init(
                jsPassiveDataSegmentNumber.toString() as unknown as number,
                module.local.get(0, binaryen.i32),
                module.i32.const(0),
                module.i32.const(jsEncoded.byteLength)
            ),
            module.data.drop(
                jsPassiveDataSegmentNumber.toString() as unknown as number
            ),
            module.return(module.local.get(0, binaryen.i32))
        ])
    );

    module.removeFunction('wasm_data_passive_data_size');
    module.removeFunction('init_wasm_data_passive_data');

    module.addFunction(
        'wasm_data_passive_data_size',
        binaryen.none,
        binaryen.i32,
        [],
        module.i32.const(wasmDataEncoded.byteLength)
    );

    const wasmDataPassiveDataSegmentNumber = normalizedSegments.length + 1;

    module.addFunction(
        'init_wasm_data_passive_data',
        binaryen.createType([binaryen.i32]),
        binaryen.i32, // TODO just to stop weird Rust optimizations
        [],
        module.block(null, [
            module.memory.init(
                wasmDataPassiveDataSegmentNumber.toString() as unknown as number,
                module.local.get(0, binaryen.i32),
                module.i32.const(0),
                module.i32.const(wasmDataEncoded.byteLength)
            ),
            module.data.drop(
                wasmDataPassiveDataSegmentNumber.toString() as unknown as number
            ),
            module.return(module.local.get(0, binaryen.i32))
        ])
    );

    // TODO do we need to validate? It takes some extra time
    // module.validate();

    return module.emitBinary();
}

function addCanisterMethod(
    module: binaryen.Module,
    exportName: string,
    functionToCall: string,
    index: number,
    passArgData: boolean
): void {
    const funcBody = module.block(null, [
        module.call(
            functionToCall,
            [
                module.i32.const(index),
                module.i32.const(passArgData === true ? 1 : 0)
            ],
            binaryen.none
        )
    ]);

    module.addFunction(exportName, binaryen.none, binaryen.none, [], funcBody);

    module.addFunctionExport(exportName, exportName);
}
