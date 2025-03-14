export type AzleIc0 = {
    accept_message: () => void;
    call_cycles_add: (cycles: number) => void;
    call_cycles_add128: (cycles_high: number, cycles_low: number) => void;
    call_data_append: (src: number, size: number) => void;
    call_new: (
        callee_id: number,
        callee_id_size: number,
        name: string,
        name_size: number
    ) => void;
    call_on_cleanup: (function_idx: number) => void;
    call_perform: () => number;
    canister_cycle_balance: () => number;
    canister_cycle_balance128: () => number;
    canister_self_copy: (dst: number) => void;
    canister_self_size: () => number;
    canister_status: () => number;
    canister_version: () => number;
    certified_data_set: (data: number, size: number) => void;
    cycles_burn128: (amount_high: number, amount_low: number) => void;
    data_certificate_copy: (dst: number) => void;
    data_certificate_present: () => number;
    data_certificate_size: () => number;
    debug_print: (message: string) => void;
    global_timer_set: (timestamp: number) => number;
    in_replicated_execution: () => number;
    is_controller: (principal: number, principal_size: number) => number;
    msg_arg_data_copy: (dst: number, offset: number, size: number) => void;
    msg_arg_data_size: () => number;
    msg_caller_copy: (dst: number) => void;
    msg_caller_size: () => number;
    msg_cycles_accept: (amount: number) => number;
    msg_cycles_accept128: (amount_high: number, amount_low: number) => number;
    msg_cycles_available: () => number;
    msg_cycles_available128: () => number;
    msg_cycles_refunded: () => number;
    msg_cycles_refunded128: () => number;
    msg_method_name_copy: (dst: number) => void;
    msg_method_name_size: () => number;
    msg_reject: (message: string) => void;
    msg_reject_code: () => number;
    msg_reject_msg_copy: (dst: number) => void;
    msg_reject_msg_size: () => number;
    msg_reply: () => void;
    msg_reply_data_append: (src: number, size: number) => void;
    performance_counter: (counter_type: number) => number;
    stable_grow: (new_pages: number) => number;
    stable_read: (offset: number, dst: number, size: number) => void;
    stable_size: () => number;
    stable_write: (offset: number, src: number, size: number) => void;
    time: () => number;
    trap: (message: string) => void;
};
