import { readFileSync } from 'fs';
import { CanisterMethods } from './utils/types';

export function generateCandidAndCanisterMethods(wasmFilePath: string): {
    candid: string;
    canisterMethods: CanisterMethods;
} {
    const wasmBuffer = readFileSync(wasmFilePath);

    const wasmModule = new WebAssembly.Module(wasmBuffer);
    const wasmInstance = new WebAssembly.Instance(wasmModule, {
        ic0: {
            accept_message: () => {},
            call_cycles_add: () => {},
            call_cycles_add128: () => {},
            call_data_append: () => {},
            call_new: () => {},
            call_on_cleanup: () => {},
            call_perform: () => {},
            canister_cycle_balance: () => {},
            canister_cycle_balance128: () => {},
            canister_self_copy: () => {},
            canister_self_size: () => {},
            canister_version: () => {},
            certified_data_set: () => {},
            data_certificate_copy: () => {},
            data_certificate_present: () => {},
            data_certificate_size: () => {},
            debug_print: () => {},
            global_timer_set: () => {},
            instruction_counter: () => {},
            is_controller: () => {},
            msg_arg_data_copy: () => {},
            msg_arg_data_size: () => {},
            msg_caller_copy: () => {},
            msg_caller_size: () => {},
            msg_cycles_accept: () => {},
            msg_cycles_accept128: () => {},
            msg_cycles_available: () => {},
            msg_cycles_available128: () => {},
            msg_cycles_refunded: () => {},
            msg_cycles_refunded128: () => {},
            msg_method_name_copy: () => {},
            msg_method_name_size: () => {},
            msg_reject_code: () => {},
            msg_reject_msg_copy: () => {},
            msg_reject_msg_size: () => {},
            msg_reject: () => {},
            msg_reply_data_append: () => {},
            msg_reply: () => {},
            performance_counter: () => {},
            stable_grow: () => {},
            stable_read: () => {},
            stable_size: () => {},
            stable_write: () => {},
            stable64_grow: () => {},
            stable64_read: () => {},
            stable64_size: () => {},
            stable64_write: () => {},
            time: () => 0n,
            trap: () => {}
        }
    });

    const candidPointer = (wasmInstance.exports as any).get_candid_pointer();

    const memory = new Uint8Array((wasmInstance.exports.memory as any).buffer);

    let candidBytes = [];
    let i = candidPointer;
    while (memory[i] !== 0) {
        candidBytes.push(memory[i]);
        i += 1;
    }

    const resultString = Buffer.from(candidBytes).toString();

    return JSON.parse(resultString);
}
