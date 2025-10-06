import { CandidAndMethodMeta } from '#utils/types';

export async function execute(
    wasmBinary: Uint8Array
): Promise<CandidAndMethodMeta> {
    const wasmModule = new WebAssembly.Module(
        wasmBinary.buffer instanceof ArrayBuffer
            ? wasmBinary.buffer
            : new Uint8Array(wasmBinary)
    );
    const wasmInstance = new WebAssembly.Instance(wasmModule, {
        ic0: {
            accept_message: (): void => {},
            call_cycles_add: (): void => {},
            call_cycles_add128: (): void => {},
            call_data_append: (): void => {},
            call_new: (): void => {},
            call_on_cleanup: (): void => {},
            call_perform: (): void => {},
            call_with_best_effort_response: (): void => {},
            canister_cycle_balance: (): void => {},
            canister_cycle_balance128: (): void => {},
            canister_liquid_cycle_balance128: (): void => {},
            canister_self_copy: (): void => {},
            canister_self_size: (): void => {},
            canister_version: (): void => {},
            cost_call: (): void => {},
            cost_create_canister: (): void => {},
            cost_http_request: (): void => {},
            cost_sign_with_ecdsa: (): void => {},
            cost_sign_with_schnorr: (): void => {},
            cost_vetkd_derive_encrypted_key: (): void => {},
            cycles_burn128: (): void => {},
            certified_data_set: (): void => {},
            data_certificate_copy: (): void => {},
            data_certificate_present: (): void => {},
            data_certificate_size: (): void => {},
            debug_print: (ptr: number, len: number): void => {
                const memory = new Uint8Array(
                    (wasmInstance.exports.memory as any).buffer,
                    ptr,
                    len
                );
                const message = new TextDecoder('utf8').decode(memory);

                console.info(message);
            },
            global_timer_set: (): void => {},
            in_replicated_execution: (): void => {},
            instruction_counter: (): void => {},
            is_controller: (): void => {},
            msg_arg_data_copy: (): void => {},
            msg_arg_data_size: (): void => {},
            msg_caller_copy: (): void => {},
            msg_caller_size: (): void => {},
            msg_cycles_accept: (): void => {},
            msg_cycles_accept128: (): void => {},
            msg_cycles_available: (): void => {},
            msg_cycles_available128: (): void => {},
            msg_cycles_refunded: (): void => {},
            msg_cycles_refunded128: (): void => {},
            msg_method_name_copy: (): void => {},
            msg_method_name_size: (): void => {},
            msg_reject_code: (): void => {},
            msg_reject_msg_copy: (): void => {},
            msg_reject_msg_size: (): void => {},
            msg_reject: (): void => {},
            msg_reply_data_append: (): void => {},
            msg_reply: (): void => {},
            performance_counter: (): void => {},
            stable_grow: (): void => {},
            stable_read: (): void => {},
            stable_size: (): void => {},
            stable_write: (): void => {},
            stable64_grow: (): void => {},
            stable64_read: (): void => {},
            stable64_size: (): void => {},
            stable64_write: (): void => {},
            time: (): bigint => 0n,
            trap: (ptr: number, len: number): void => {
                const memory = new Uint8Array(
                    (wasmInstance.exports.memory as any).buffer,
                    ptr,
                    len
                );
                const message = new TextDecoder('utf8').decode(memory);

                throw new Error(message);
            }
        }
        // env: {
        //     azle_log(ptr: number, len: number) {
        //         const memory = new Uint8Array(
        //             (wasmInstance.exports.memory as any).buffer,
        //             ptr,
        //             len
        //         );
        //         const message = new TextDecoder('utf8').decode(memory);
        //         console.info(message);
        //     }
        // }
    });

    // TODO When moving to Wasm64 this whole process will not to be updated to be 64-bit compatible
    try {
        const pointerAddress = (
            wasmInstance.exports as any
        ).get_candid_and_method_meta_pointer() as number;

        const memoryBuffer = (wasmInstance.exports.memory as WebAssembly.Memory)
            .buffer;

        const { pointer, length } = readPointerAndLength(
            memoryBuffer,
            pointerAddress
        );

        const candidBytes = new Uint8Array(memoryBuffer, pointer, length);

        const resultString = new TextDecoder('utf8').decode(candidBytes);

        return JSON.parse(resultString);
    } catch (error: any) {
        if (process.env.AZLE_CANISTER_BACKTRACES === 'true') {
            throw error;
        } else {
            // This will strip the Wasm (canister) backtrace from the error
            // The Node.js backtrace will still be available
            // The Node.js backtrace is toggled by the AZLE_VERBOSE environment variable
            throw new Error(error.message);
        }
    }
}

function readPointerAndLength(
    memoryBuffer: ArrayBuffer,
    baseAddress: number
): { pointer: number; length: number } {
    const pointerAndLengthStructSize = 8;

    const view = new DataView(
        memoryBuffer,
        baseAddress,
        pointerAndLengthStructSize
    );

    const u32Size = 4;

    const pointerIndex = 0;
    const lengthIndex = pointerIndex + u32Size;

    return {
        pointer: view.getUint32(pointerIndex, true),
        length: view.getUint32(lengthIndex, true)
    };
}
