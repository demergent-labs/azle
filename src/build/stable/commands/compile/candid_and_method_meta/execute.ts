import { CandidAndMethodMeta } from '../../../utils/types';

export async function execute(
    wasmBinary: Uint8Array
): Promise<CandidAndMethodMeta> {
    const wasmModule = new WebAssembly.Module(wasmBinary);
    const wasmInstance = new WebAssembly.Instance(wasmModule, {
        ic0: {
            accept_message: (): void => {},
            call_cycles_add: (): void => {},
            call_cycles_add128: (): void => {},
            call_data_append: (): void => {},
            call_new: (): void => {},
            call_on_cleanup: (): void => {},
            call_perform: (): void => {},
            canister_cycle_balance: (): void => {},
            canister_cycle_balance128: (): void => {},
            canister_self_copy: (): void => {},
            canister_self_size: (): void => {},
            canister_version: (): void => {},
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
            trap: (): void => {}
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

    // TODO can we simplify this to be more like azle_log above?
    const candidAndMethodMetaPointer = (
        wasmInstance.exports as any
    ).get_candid_and_method_meta_pointer();

    const memory = new Uint8Array((wasmInstance.exports.memory as any).buffer);

    let candidBytes: number[] = [];
    let i = candidAndMethodMetaPointer;
    while (memory[i] !== 0) {
        candidBytes.push(memory[i]);
        i += 1;
    }

    const resultString = Buffer.from(candidBytes).toString();

    return JSON.parse(resultString);
}
