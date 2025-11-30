import binaryen from 'binaryen';
import { readFile } from 'fs/promises';

import { validateUnsignedInteger } from '#lib/error';
import { MethodMeta } from '#utils/types';

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

    const encodedJsByteLength = validateUnsignedInteger(
        'manipulateWasmBinary encodedJs.byteLength',
        32,
        encodedJs.byteLength
    );
    const encodedWasmDataByteLength = validateUnsignedInteger(
        'manipulateWasmBinary encodedWasmData.byteLength',
        32,
        encodedWasmData.byteLength
    );

    addPassiveSizeFunction(module, 'js_passive_data_size', encodedJsByteLength);
    addPassiveSizeFunction(
        module,
        'wasm_data_passive_data_size',
        encodedWasmDataByteLength
    );

    addInitPassiveDataFunction(
        module,
        'init_js_passive_data',
        memorySegmentInfos.length,
        encodedJsByteLength
    );
    addInitPassiveDataFunction(
        module,
        'init_wasm_data_passive_data',
        memorySegmentInfos.length + 1,
        encodedWasmDataByteLength
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
    // Toggle debug info based on AZLE_CANISTER_BACKTRACES environment variable
    // Backtraces are off by default to avoid exposing end developers to confusing Rust messages.
    // Azle's error messages are designed to provide relevant details to end developers.
    // Canister backtraces are usually for Azle core developers debugging internal issues.
    // When set to 'true', backtraces are enabled by keeping the name section
    // When not set or set to any other value, backtraces are disabled by removing the name section
    const enableBacktraces = process.env.AZLE_CANISTER_BACKTRACES === 'true';
    binaryen.setDebugInfo(enableBacktraces);
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
            index
        );
    });

    methodMeta?.updates?.forEach(({ name: functionName, index }) => {
        addCanisterMethod(
            module,
            `canister_update ${functionName}`,
            'execute_method_js',
            index
        );
    });

    addCanisterMethod(
        module,
        'canister_init',
        'init',
        methodMeta?.init?.index ?? -1
    );

    addCanisterMethod(
        module,
        'canister_post_upgrade',
        'post_upgrade',
        methodMeta?.post_upgrade?.index ?? -1
    );

    if (methodMeta?.pre_upgrade !== undefined) {
        addCanisterMethod(
            module,
            'canister_pre_upgrade',
            'execute_method_js',
            methodMeta.pre_upgrade.index
        );
    }

    if (methodMeta?.inspect_message !== undefined) {
        addCanisterMethod(
            module,
            'canister_inspect_message',
            'execute_method_js',
            methodMeta.inspect_message.index
        );
    }

    if (methodMeta?.heartbeat !== undefined) {
        addCanisterMethod(
            module,
            'canister_heartbeat',
            'execute_method_js',
            methodMeta.heartbeat.index
        );
    }

    if (methodMeta?.on_low_wasm_memory !== undefined) {
        addCanisterMethod(
            module,
            'canister_on_low_wasm_memory',
            'execute_method_js',
            methodMeta.on_low_wasm_memory.index
        );
    }
}

export function addCanisterMethod(
    module: binaryen.Module,
    exportName: string,
    functionToCall: string,
    index: number
): void {
    const funcBody = module.block(null, [
        module.call(functionToCall, [module.i32.const(index)], binaryen.none)
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
                // This must be wrapped in a Uint8Array or this error will be thrown during the build: Azle BuildError: RuntimeError: null function or function signature mismatch
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
    encodedByteLength: number
): void {
    module.removeFunction(name);
    module.addFunction(
        name,
        binaryen.none,
        binaryen.i32,
        [],
        module.i32.const(encodedByteLength)
    );
}

export function addInitPassiveDataFunction(
    module: binaryen.Module,
    name: string,
    segmentNumber: number,
    encodedByteLength: number
): void {
    module.removeFunction(name);
    module.addFunction(
        name,
        binaryen.createType([binaryen.i32]),
        binaryen.none,
        [],
        module.block(null, [
            module.memory.init(
                segmentNumber.toString() as unknown as number,
                module.local.get(0, binaryen.i32),
                module.i32.const(0),
                module.i32.const(encodedByteLength)
            ),
            module.data.drop(segmentNumber.toString() as unknown as number)
        ])
    );
}
