import { readFileSync, writeFileSync } from 'fs';

export function generateCandidFile(candidPath: string, wasmFilePath: string) {
    const wasmBuffer = readFileSync(wasmFilePath);

    const wasmModule = new WebAssembly.Module(wasmBuffer);
    const wasmInstance = new WebAssembly.Instance(wasmModule, {
        ic0: {
            msg_reply: () => {},
            stable_size: () => {},
            stable64_size: () => {},
            stable_write: () => {},
            stable_read: () => {},
            debug_print: () => {},
            trap: () => {},
            time: () => {},
            msg_caller_size: () => {},
            msg_caller_copy: () => {},
            canister_self_size: () => {},
            canister_self_copy: () => {},
            canister_cycle_balance: () => {},
            canister_cycle_balance128: () => {},
            certified_data_set: () => {},
            data_certificate_present: () => {},
            data_certificate_size: () => {},
            data_certificate_copy: () => {},
            msg_reply_data_append: () => {},
            call_cycles_add128: () => {},
            call_new: () => {},
            call_data_append: () => {},
            call_perform: () => {},
            call_cycles_add: () => {},
            call_on_cleanup: () => {},
            msg_reject_code: () => {},
            msg_reject_msg_size: () => {},
            msg_reject_msg_copy: () => {},
            msg_reject: () => {},
            msg_cycles_available: () => {},
            msg_cycles_refunded: () => {},
            msg_cycles_refunded128: () => {},
            msg_cycles_accept: () => {},
            msg_cycles_accept128: () => {},
            msg_arg_data_size: () => {},
            msg_arg_data_copy: () => {},
            accept_message: () => {},
            msg_method_name_size: () => {},
            msg_method_name_copy: () => {},
            performance_counter: () => {},
            stable_grow: () => {},
            stable64_grow: () => {},
            stable64_write: () => {},
            stable64_read: () => {},
            global_timer_set: () => {}
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

    writeFileSync(candidPath, Buffer.from(candidBytes));
}
