// mod accept_message;
mod arg_data_raw;
mod arg_data_raw_size;
// mod call_raw;
// mod call_raw128;
mod caller;
mod candid_decode;
mod candid_encode;
mod canister_balance;
mod canister_balance128;
mod canister_version;
// mod clear_timer;
mod data_certificate;
mod id;
mod instruction_counter;
mod is_controller;
// mod method_name;
// mod msg_cycles_accept;
// mod msg_cycles_accept128;
// mod msg_cycles_available;
// mod msg_cycles_available128;
// mod msg_cycles_refunded;
// mod msg_cycles_refunded128;
// mod notify_raw;
mod performance_counter;
mod print;
mod reject;
// mod reject_code;
// mod reject_message;
mod reply_raw;
mod set_certified_data;
// mod set_timer;
// mod set_timer_interval;
// mod stable64_grow;
// mod stable64_read;
// mod stable64_size;
// mod stable64_write;
// mod stable_b_tree_map_contains_key;
// mod stable_b_tree_map_get;
// mod stable_b_tree_map_init;
// mod stable_b_tree_map_insert;
// mod stable_b_tree_map_is_empty;
// mod stable_b_tree_map_items;
// mod stable_b_tree_map_keys;
// mod stable_b_tree_map_len;
// mod stable_b_tree_map_remove;
// mod stable_b_tree_map_values;
// mod stable_bytes;
// mod stable_grow;
// mod stable_read;
// mod stable_size;
// mod stable_write;
mod time;
mod trap;

use wasmedge_quickjs::AsObject;

#[allow(unused)]
pub fn register(context: &mut wasmedge_quickjs::Context) {
    let mut ic = context.new_object();

    // ic.set_property(
    //     "acceptMessage",
    //     context
    //         .wrap_callback2(accept_message::native_function)
    //         .unwrap(),
    // )
    // .unwrap();

    ic.set(
        "argDataRaw",
        context
            .new_function::<arg_data_raw::NativeFunction>("")
            .into(),
    );

    ic.set(
        "argDataRawSize",
        context
            .new_function::<arg_data_raw_size::NativeFunction>("")
            .into(),
    );

    // ic.set_property(
    //     "callRaw",
    //     context.wrap_callback2(call_raw::native_function).unwrap(),
    // )
    // .unwrap();
    // ic.set_property(
    //     "callRaw128",
    //     context
    //         .wrap_callback2(call_raw128::native_function)
    //         .unwrap(),
    // )
    // .unwrap();

    ic.set(
        "caller",
        context.new_function::<caller::NativeFunction>("").into(),
    );

    ic.set(
        "candidDecode",
        context
            .new_function::<candid_decode::NativeFunction>("")
            .into(),
    );

    ic.set(
        "candidEncode",
        context
            .new_function::<candid_encode::NativeFunction>("")
            .into(),
    );

    ic.set(
        "canisterBalance",
        context
            .new_function::<canister_balance::NativeFunction>("")
            .into(),
    );

    ic.set(
        "canisterBalance128",
        context
            .new_function::<canister_balance128::NativeFunction>("")
            .into(),
    );

    ic.set(
        "canisterVersion",
        context
            .new_function::<canister_version::NativeFunction>("")
            .into(),
    );

    // ic.set_property(
    //     "clearTimer",
    //     context
    //         .wrap_callback2(clear_timer::native_function)
    //         .unwrap(),
    // )
    // .unwrap();

    ic.set(
        "dataCertificate",
        context
            .new_function::<data_certificate::NativeFunction>("")
            .into(),
    );

    ic.set("id", context.new_function::<id::NativeFunction>("").into());

    ic.set(
        "instructionCounter",
        context
            .new_function::<instruction_counter::NativeFunction>("")
            .into(),
    );

    ic.set(
        "isController",
        context
            .new_function::<is_controller::NativeFunction>("")
            .into(),
    );

    // ic.set_property(
    //     "methodName",
    //     context
    //         .wrap_callback2(method_name::native_function)
    //         .unwrap(),
    // )
    // .unwrap();
    // ic.set_property(
    //     "msgCyclesAccept",
    //     context
    //         .wrap_callback2(msg_cycles_accept::native_function)
    //         .unwrap(),
    // )
    // .unwrap();
    // ic.set_property(
    //     "msgCyclesAccept128",
    //     context
    //         .wrap_callback2(msg_cycles_accept128::native_function)
    //         .unwrap(),
    // )
    // .unwrap();
    // ic.set_property(
    //     "msgCyclesAvailable",
    //     context
    //         .wrap_callback2(msg_cycles_available::native_function)
    //         .unwrap(),
    // )
    // .unwrap();
    // ic.set_property(
    //     "msgCyclesAvailable128",
    //     context
    //         .wrap_callback2(msg_cycles_available128::native_function)
    //         .unwrap(),
    // )
    // .unwrap();
    // ic.set_property(
    //     "msgCyclesRefunded",
    //     context
    //         .wrap_callback2(msg_cycles_refunded::native_function)
    //         .unwrap(),
    // )
    // .unwrap();
    // ic.set_property(
    //     "msgCyclesRefunded128",
    //     context
    //         .wrap_callback2(msg_cycles_refunded128::native_function)
    //         .unwrap(),
    // )
    // .unwrap();
    // ic.set_property(
    //     "notifyRaw",
    //     context.wrap_callback2(notify_raw::native_function).unwrap(),
    // )
    // .unwrap();

    ic.set(
        "performanceCounter",
        context
            .new_function::<performance_counter::NativeFunction>("")
            .into(),
    );

    ic.set(
        "print",
        context.new_function::<print::NativeFunction>("").into(),
    );

    ic.set(
        "reject",
        context.new_function::<reject::NativeFunction>("").into(),
    );

    // ic.set_property(
    //     "rejectCode",
    //     context
    //         .wrap_callback2(reject_code::native_function)
    //         .unwrap(),
    // )
    // .unwrap();
    // ic.set_property(
    //     "rejectMessage",
    //     context
    //         .wrap_callback2(reject_message::native_function)
    //         .unwrap(),
    // )
    // .unwrap();

    ic.set(
        "replyRaw",
        context.new_function::<reply_raw::NativeFunction>("").into(),
    );

    ic.set(
        "setCertifiedData",
        context
            .new_function::<set_certified_data::NativeFunction>("")
            .into(),
    );

    // ic.set_property(
    //     "setTimer",
    //     context.wrap_callback2(set_timer::native_function).unwrap(),
    // )
    // .unwrap();
    // ic.set_property(
    //     "setTimerInterval",
    //     context
    //         .wrap_callback2(set_timer_interval::native_function)
    //         .unwrap(),
    // )
    // .unwrap();
    // ic.set_property(
    //     "stable64Grow",
    //     context
    //         .wrap_callback2(stable64_grow::native_function)
    //         .unwrap(),
    // )
    // .unwrap();
    // ic.set_property(
    //     "stable64Read",
    //     context
    //         .wrap_callback2(stable64_read::native_function)
    //         .unwrap(),
    // )
    // .unwrap();
    // ic.set_property(
    //     "stable64Size",
    //     context
    //         .wrap_callback2(stable64_size::native_function)
    //         .unwrap(),
    // )
    // .unwrap();
    // ic.set_property(
    //     "stable64Write",
    //     context
    //         .wrap_callback2(stable64_write::native_function)
    //         .unwrap(),
    // )
    // .unwrap();
    // ic.set_property(
    //     "stableBytes",
    //     context
    //         .wrap_callback2(stable_bytes::native_function)
    //         .unwrap(),
    // )
    // .unwrap();
    // ic.set_property(
    //     "stableGrow",
    //     context
    //         .wrap_callback2(stable_grow::native_function)
    //         .unwrap(),
    // )
    // .unwrap();
    // ic.set_property(
    //     "stableRead",
    //     context
    //         .wrap_callback2(stable_read::native_function)
    //         .unwrap(),
    // )
    // .unwrap();
    // ic.set_property(
    //     "stableSize",
    //     context
    //         .wrap_callback2(stable_size::native_function)
    //         .unwrap(),
    // )
    // .unwrap();
    // ic.set_property(
    //     "stableWrite",
    //     context
    //         .wrap_callback2(stable_write::native_function)
    //         .unwrap(),
    // )
    // .unwrap();
    // ic.set_property(
    //     "stableBTreeMapContainsKey",
    //     context
    //         .wrap_callback2(stable_b_tree_map_contains_key::native_function)
    //         .unwrap(),
    // )
    // .unwrap();
    // ic.set_property(
    //     "stableBTreeMapGet",
    //     context
    //         .wrap_callback2(stable_b_tree_map_get::native_function)
    //         .unwrap(),
    // )
    // .unwrap();
    // ic.set_property(
    //     "stableBTreeMapInit",
    //     context
    //         .wrap_callback2(stable_b_tree_map_init::native_function)
    //         .unwrap(),
    // )
    // .unwrap();
    // ic.set_property(
    //     "stableBTreeMapInsert",
    //     context
    //         .wrap_callback2(stable_b_tree_map_insert::native_function)
    //         .unwrap(),
    // )
    // .unwrap();
    // ic.set_property(
    //     "stableBTreeMapIsEmpty",
    //     context
    //         .wrap_callback2(stable_b_tree_map_is_empty::native_function)
    //         .unwrap(),
    // )
    // .unwrap();
    // ic.set_property(
    //     "stableBTreeMapItems",
    //     context
    //         .wrap_callback2(stable_b_tree_map_items::native_function)
    //         .unwrap(),
    // )
    // .unwrap();
    // ic.set_property(
    //     "stableBTreeMapKeys",
    //     context
    //         .wrap_callback2(stable_b_tree_map_keys::native_function)
    //         .unwrap(),
    // )
    // .unwrap();
    // ic.set_property(
    //     "stableBTreeMapLen",
    //     context
    //         .wrap_callback2(stable_b_tree_map_len::native_function)
    //         .unwrap(),
    // )
    // .unwrap();
    // ic.set_property(
    //     "stableBTreeMapRemove",
    //     context
    //         .wrap_callback2(stable_b_tree_map_remove::native_function)
    //         .unwrap(),
    // )
    // .unwrap();
    // ic.set_property(
    //     "stableBTreeMapValues",
    //     context
    //         .wrap_callback2(stable_b_tree_map_values::native_function)
    //         .unwrap(),
    // )
    // .unwrap();

    ic.set(
        "time",
        context.new_function::<time::NativeFunction>("").into(),
    );

    ic.set(
        "trap",
        context.new_function::<trap::NativeFunction>("").into(),
    );

    context.get_global().set("_azleIc", ic.into());
}
