import binaryen from 'binaryen';
import { readFile } from 'fs/promises';

import { MethodMeta } from '../../../utils/types';

// TODO can we make the start function just load the passive segment into memory?
export async function manipulateWasmBinary<T extends Record<string, unknown>>(
    js: string,
    canisterTemplatePath: string,
    wasmData: T,
    validate: boolean,
    methodMeta?: MethodMeta
): Promise<Uint8Array> {
    const module = await getModule(canisterTemplatePath);

    addCanisterMethodProxies(module, methodMeta);

    const { memoryInfo, memorySegmentInfos } = getMemoryInformation(module);

    const encodedJs = encode(js);
    const encodedWasmData = encode(JSON.stringify(wasmData));

    addPassiveDataSegmentsToMemory(
        module,
        memoryInfo,
        memorySegmentInfos,
        encodedJs,
        encodedWasmData
    );

    addPassiveSizeFunction(module, 'js_passive_data_size', encodedJs);
    addPassiveSizeFunction(
        module,
        'wasm_data_passive_data_size',
        encodedWasmData
    );

    addInitPassiveDataFunction(
        module,
        'init_js_passive_data',
        memorySegmentInfos.length,
        encodedJs
    );
    addInitPassiveDataFunction(
        module,
        'init_wasm_data_passive_data',
        memorySegmentInfos.length + 1,
        encodedWasmData
    );

    if (validate === true) {
        module.validate();
    }

    return module.emitBinary();
}

export async function getModule(
    wasmBinaryPath: string
): Promise<binaryen.Module> {
    const originalWasm = await readFile(wasmBinaryPath);
    const module = binaryen.readBinary(originalWasm);

    return module;
}

export function addCanisterMethodProxies(
    module: binaryen.Module,
    methodMeta: MethodMeta | undefined
): void {
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
}

export function addCanisterMethod(
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

export function getMemoryInformation(module: binaryen.Module): {
    memoryInfo: binaryen.MemoryInfo;
    memorySegmentInfos: binaryen.MemorySegmentInfo[];
} {
    const memoryInfo = module.getMemoryInfo();

    const numMemorySegments = module.getNumMemorySegments();

    let memorySegmentInfos: binaryen.MemorySegmentInfo[] = [];

    for (let i = 0; i < numMemorySegments; i++) {
        const segment = module.getMemorySegmentInfoByIndex(i);

        memorySegmentInfos.push(segment);
    }

    // Normalization is necessary for some reason
    // the TypeScript types work out fine without normalization
    // but not the actual values during manipulation
    const normalizedMemorySegmentInfos = memorySegmentInfos.map(
        (memorySegmentInfo) => {
            return {
                offset: module.i32.const(memorySegmentInfo.offset),
                data: new Uint8Array(memorySegmentInfo.data),
                passive: memorySegmentInfo.passive
            };
        }
    );

    return {
        memoryInfo,
        memorySegmentInfos: normalizedMemorySegmentInfos
    };
}

export function encode(text: string): Uint8Array {
    return new TextEncoder().encode(text);
}

export function addPassiveDataSegmentsToMemory(
    module: binaryen.Module,
    memoryInfo: binaryen.MemoryInfo,
    memorySegmentInfos: binaryen.MemorySegmentInfo[],
    encodedJs: Uint8Array,
    encodedWasmData: Uint8Array
): void {
    module.setMemory(memoryInfo.initial, memoryInfo.max ?? -1, null, [
        ...memorySegmentInfos,
        {
            offset: 0,
            data: encodedJs,
            passive: true
        },
        {
            offset: 0,
            data: encodedWasmData,
            passive: true
        }
    ]);
}

export function addPassiveSizeFunction(
    module: binaryen.Module,
    name: string,
    encoded: Uint8Array
): void {
    module.removeFunction(name);

    module.addFunction(
        name,
        binaryen.none,
        binaryen.i32,
        [],
        module.i32.const(encoded.byteLength)
    );
}

export function addInitPassiveDataFunction(
    module: binaryen.Module,
    name: string,
    segmentNumber: number,
    encoded: Uint8Array
): void {
    module.removeFunction(name);

    module.addFunction(
        name,
        binaryen.createType([binaryen.i32]),
        binaryen.i32, // TODO just to stop weird Rust optimizations
        [],
        module.block(null, [
            module.memory.init(
                segmentNumber.toString() as unknown as number,
                module.local.get(0, binaryen.i32),
                module.i32.const(0),
                module.i32.const(encoded.byteLength)
            ),
            module.data.drop(segmentNumber.toString() as unknown as number),
            module.return(module.local.get(0, binaryen.i32))
        ])
    );
}
