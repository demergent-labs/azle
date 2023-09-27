mod accept_message;
mod arg_data_raw;
mod arg_data_raw_size;
mod call_raw;
mod call_raw128;
mod caller;
mod candid_decode;
mod candid_encode;
mod canister_balance;
mod canister_balance128;
mod canister_version;
mod clear_timer;
mod data_certificate;
mod id;
mod instruction_counter;
mod is_controller;
mod method_name;
mod msg_cycles_accept;
mod msg_cycles_accept128;
mod msg_cycles_available;
mod msg_cycles_available128;
mod msg_cycles_refunded;
mod msg_cycles_refunded128;
mod notify_raw;
mod performance_counter;
mod print;
mod reject;
mod reject_code;
mod reject_message;
mod reply_raw;
mod set_certified_data;
mod set_timer;
mod set_timer_interval;
mod stable64_grow;
mod stable64_read;
mod stable64_size;
mod stable64_write;
mod stable_b_tree_map_contains_key;
mod stable_b_tree_map_get;
mod stable_b_tree_map_init;
mod stable_b_tree_map_insert;
mod stable_b_tree_map_is_empty;
mod stable_b_tree_map_items;
mod stable_b_tree_map_keys;
mod stable_b_tree_map_len;
mod stable_b_tree_map_remove;
mod stable_b_tree_map_values;
mod stable_bytes;
mod stable_grow;
mod stable_read;
mod stable_size;
mod stable_write;
mod time;
mod trap;

use quickjs_wasm_rs::JSContextRef;

#[allow(unused)]
pub fn register(context: &JSContextRef) {
    let ic = context.object_value().unwrap();

    ic.set_property(
        "acceptMessage",
        context
            .wrap_callback2(accept_message::native_function)
            .unwrap(),
    )
    .unwrap();
    ic.set_property(
        "argDataRawSize",
        context
            .wrap_callback2(arg_data_raw_size::native_function)
            .unwrap(),
    )
    .unwrap();
    ic.set_property(
        "argDataRaw",
        context
            .wrap_callback2(arg_data_raw::native_function)
            .unwrap(),
    )
    .unwrap();
    ic.set_property(
        "callRaw",
        context.wrap_callback2(call_raw::native_function).unwrap(),
    )
    .unwrap();
    ic.set_property(
        "callRaw128",
        context
            .wrap_callback2(call_raw128::native_function)
            .unwrap(),
    )
    .unwrap();
    ic.set_property(
        "caller",
        context.wrap_callback2(caller::native_function).unwrap(),
    )
    .unwrap();
    ic.set_property(
        "candidDecode",
        context
            .wrap_callback2(candid_decode::native_function)
            .unwrap(),
    )
    .unwrap();
    ic.set_property(
        "candidEncode",
        context
            .wrap_callback2(candid_encode::native_function)
            .unwrap(),
    )
    .unwrap();
    ic.set_property(
        "canisterBalance",
        context
            .wrap_callback2(canister_balance::native_function)
            .unwrap(),
    )
    .unwrap();
    ic.set_property(
        "canisterBalance128",
        context
            .wrap_callback2(canister_balance128::native_function)
            .unwrap(),
    )
    .unwrap();
    ic.set_property(
        "canisterVersion",
        context
            .wrap_callback2(canister_version::native_function)
            .unwrap(),
    )
    .unwrap();
    ic.set_property(
        "clearTimer",
        context
            .wrap_callback2(clear_timer::native_function)
            .unwrap(),
    )
    .unwrap();
    ic.set_property(
        "dataCertificate",
        context
            .wrap_callback2(data_certificate::native_function)
            .unwrap(),
    )
    .unwrap();
    ic.set_property("id", context.wrap_callback2(id::native_function).unwrap())
        .unwrap();
    ic.set_property(
        "instructionCounter",
        context
            .wrap_callback2(instruction_counter::native_function)
            .unwrap(),
    )
    .unwrap();
    ic.set_property(
        "isController",
        context
            .wrap_callback2(is_controller::native_function)
            .unwrap(),
    )
    .unwrap();
    ic.set_property(
        "methodName",
        context
            .wrap_callback2(method_name::native_function)
            .unwrap(),
    )
    .unwrap();
    ic.set_property(
        "msgCyclesAccept",
        context
            .wrap_callback2(msg_cycles_accept::native_function)
            .unwrap(),
    )
    .unwrap();
    ic.set_property(
        "msgCyclesAccept128",
        context
            .wrap_callback2(msg_cycles_accept128::native_function)
            .unwrap(),
    )
    .unwrap();
    ic.set_property(
        "msgCyclesAvailable",
        context
            .wrap_callback2(msg_cycles_available::native_function)
            .unwrap(),
    )
    .unwrap();
    ic.set_property(
        "msgCyclesAvailable128",
        context
            .wrap_callback2(msg_cycles_available128::native_function)
            .unwrap(),
    )
    .unwrap();
    ic.set_property(
        "msgCyclesRefunded",
        context
            .wrap_callback2(msg_cycles_refunded::native_function)
            .unwrap(),
    )
    .unwrap();
    ic.set_property(
        "msgCyclesRefunded128",
        context
            .wrap_callback2(msg_cycles_refunded128::native_function)
            .unwrap(),
    )
    .unwrap();
    ic.set_property(
        "notifyRaw",
        context.wrap_callback2(notify_raw::native_function).unwrap(),
    )
    .unwrap();
    ic.set_property(
        "performanceCounter",
        context
            .wrap_callback2(performance_counter::native_function)
            .unwrap(),
    )
    .unwrap();
    ic.set_property(
        "print",
        context.wrap_callback2(print::native_function).unwrap(),
    )
    .unwrap();
    ic.set_property(
        "reject",
        context.wrap_callback2(reject::native_function).unwrap(),
    )
    .unwrap();
    ic.set_property(
        "rejectCode",
        context
            .wrap_callback2(reject_code::native_function)
            .unwrap(),
    )
    .unwrap();
    ic.set_property(
        "rejectMessage",
        context
            .wrap_callback2(reject_message::native_function)
            .unwrap(),
    )
    .unwrap();
    ic.set_property(
        "replyRaw",
        context.wrap_callback2(reply_raw::native_function).unwrap(),
    )
    .unwrap();
    ic.set_property(
        "setCertifiedData",
        context
            .wrap_callback2(set_certified_data::native_function)
            .unwrap(),
    )
    .unwrap();
    ic.set_property(
        "setTimer",
        context.wrap_callback2(set_timer::native_function).unwrap(),
    )
    .unwrap();
    ic.set_property(
        "setTimerInterval",
        context
            .wrap_callback2(set_timer_interval::native_function)
            .unwrap(),
    )
    .unwrap();
    ic.set_property(
        "stable64Grow",
        context
            .wrap_callback2(stable64_grow::native_function)
            .unwrap(),
    )
    .unwrap();
    ic.set_property(
        "stable64Read",
        context
            .wrap_callback2(stable64_read::native_function)
            .unwrap(),
    )
    .unwrap();
    ic.set_property(
        "stable64Size",
        context
            .wrap_callback2(stable64_size::native_function)
            .unwrap(),
    )
    .unwrap();
    ic.set_property(
        "stable64Write",
        context
            .wrap_callback2(stable64_write::native_function)
            .unwrap(),
    )
    .unwrap();
    ic.set_property(
        "stableBytes",
        context
            .wrap_callback2(stable_bytes::native_function)
            .unwrap(),
    )
    .unwrap();
    ic.set_property(
        "stableGrow",
        context
            .wrap_callback2(stable_grow::native_function)
            .unwrap(),
    )
    .unwrap();
    ic.set_property(
        "stableRead",
        context
            .wrap_callback2(stable_read::native_function)
            .unwrap(),
    )
    .unwrap();
    ic.set_property(
        "stableSize",
        context
            .wrap_callback2(stable_size::native_function)
            .unwrap(),
    )
    .unwrap();
    ic.set_property(
        "stableWrite",
        context
            .wrap_callback2(stable_write::native_function)
            .unwrap(),
    )
    .unwrap();
    ic.set_property(
        "stableBTreeMapContainsKey",
        context
            .wrap_callback2(stable_b_tree_map_contains_key::native_function)
            .unwrap(),
    )
    .unwrap();
    ic.set_property(
        "stableBTreeMapGet",
        context
            .wrap_callback2(stable_b_tree_map_get::native_function)
            .unwrap(),
    )
    .unwrap();
    ic.set_property(
        "stableBTreeMapInit",
        context
            .wrap_callback2(stable_b_tree_map_init::native_function)
            .unwrap(),
    )
    .unwrap();
    ic.set_property(
        "stableBTreeMapInsert",
        context
            .wrap_callback2(stable_b_tree_map_insert::native_function)
            .unwrap(),
    )
    .unwrap();
    ic.set_property(
        "stableBTreeMapIsEmpty",
        context
            .wrap_callback2(stable_b_tree_map_is_empty::native_function)
            .unwrap(),
    )
    .unwrap();
    ic.set_property(
        "stableBTreeMapItems",
        context
            .wrap_callback2(stable_b_tree_map_items::native_function)
            .unwrap(),
    )
    .unwrap();
    ic.set_property(
        "stableBTreeMapKeys",
        context
            .wrap_callback2(stable_b_tree_map_keys::native_function)
            .unwrap(),
    )
    .unwrap();
    ic.set_property(
        "stableBTreeMapLen",
        context
            .wrap_callback2(stable_b_tree_map_len::native_function)
            .unwrap(),
    )
    .unwrap();
    ic.set_property(
        "stableBTreeMapRemove",
        context
            .wrap_callback2(stable_b_tree_map_remove::native_function)
            .unwrap(),
    )
    .unwrap();
    ic.set_property(
        "stableBTreeMapValues",
        context
            .wrap_callback2(stable_b_tree_map_values::native_function)
            .unwrap(),
    )
    .unwrap();
    ic.set_property(
        "time",
        context.wrap_callback2(time::native_function).unwrap(),
    )
    .unwrap();
    ic.set_property(
        "trap",
        context.wrap_callback2(trap::native_function).unwrap(),
    )
    .unwrap();

    let global = context.global_object().unwrap();
    global.set_property("_azleIc", ic).unwrap();
}
