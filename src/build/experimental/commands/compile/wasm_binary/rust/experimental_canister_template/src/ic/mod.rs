mod accept_message;
mod arg_data_raw;
mod call_raw;
mod caller;
mod candid_compiler;
mod candid_decode;
mod candid_encode;
mod canister_balance;
mod canister_version;
mod clear_timer;
mod cycles_burn;
mod data_certificate;
mod id;
mod is_controller;
mod method_name;
mod msg_cycles_accept;
mod msg_cycles_available;
mod msg_cycles_refunded;
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
mod time;
mod trap;

use wasmedge_quickjs::AsObject;

#[allow(unused)]
pub fn register(context: &mut wasmedge_quickjs::Context) {
    let mut ic = context.new_object();

    ic.set(
        "acceptMessage",
        context
            .new_function::<accept_message::NativeFunction>("")
            .into(),
    );

    ic.set(
        "argDataRaw",
        context
            .new_function::<arg_data_raw::NativeFunction>("")
            .into(),
    );

    ic.set(
        "callRaw",
        context.new_function::<call_raw::NativeFunction>("").into(),
    );

    ic.set(
        "caller",
        context.new_function::<caller::NativeFunction>("").into(),
    );

    ic.set(
        "candidCompiler",
        context
            .new_function::<candid_compiler::NativeFunction>("")
            .into(),
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
        "canisterVersion",
        context
            .new_function::<canister_version::NativeFunction>("")
            .into(),
    );

    ic.set(
        "clearTimer",
        context
            .new_function::<clear_timer::NativeFunction>("")
            .into(),
    );

    ic.set(
        "cyclesBurn",
        context
            .new_function::<cycles_burn::NativeFunction>("")
            .into(),
    );

    ic.set(
        "dataCertificate",
        context
            .new_function::<data_certificate::NativeFunction>("")
            .into(),
    );

    ic.set("id", context.new_function::<id::NativeFunction>("").into());

    ic.set(
        "isController",
        context
            .new_function::<is_controller::NativeFunction>("")
            .into(),
    );

    ic.set(
        "methodName",
        context
            .new_function::<method_name::NativeFunction>("")
            .into(),
    );

    ic.set(
        "msgCyclesAccept",
        context
            .new_function::<msg_cycles_accept::NativeFunction>("")
            .into(),
    );

    ic.set(
        "msgCyclesAvailable",
        context
            .new_function::<msg_cycles_available::NativeFunction>("")
            .into(),
    );

    ic.set(
        "msgCyclesRefunded",
        context
            .new_function::<msg_cycles_refunded::NativeFunction>("")
            .into(),
    );

    ic.set(
        "notifyRaw",
        context
            .new_function::<notify_raw::NativeFunction>("")
            .into(),
    );

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

    ic.set(
        "rejectCode",
        context
            .new_function::<reject_code::NativeFunction>("")
            .into(),
    );

    ic.set(
        "rejectMessage",
        context
            .new_function::<reject_message::NativeFunction>("")
            .into(),
    );

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

    ic.set(
        "setTimer",
        context.new_function::<set_timer::NativeFunction>("").into(),
    );

    ic.set(
        "setTimerInterval",
        context
            .new_function::<set_timer_interval::NativeFunction>("")
            .into(),
    );

    ic.set(
        "stableBTreeMapContainsKey",
        context
            .new_function::<stable_b_tree_map_contains_key::NativeFunction>("")
            .into(),
    );

    ic.set(
        "stableBTreeMapGet",
        context
            .new_function::<stable_b_tree_map_get::NativeFunction>("")
            .into(),
    );

    ic.set(
        "stableBTreeMapInit",
        context
            .new_function::<stable_b_tree_map_init::NativeFunction>("")
            .into(),
    );

    ic.set(
        "stableBTreeMapInsert",
        context
            .new_function::<stable_b_tree_map_insert::NativeFunction>("")
            .into(),
    );

    ic.set(
        "stableBTreeMapIsEmpty",
        context
            .new_function::<stable_b_tree_map_is_empty::NativeFunction>("")
            .into(),
    );

    ic.set(
        "stableBTreeMapItems",
        context
            .new_function::<stable_b_tree_map_items::NativeFunction>("")
            .into(),
    );

    ic.set(
        "stableBTreeMapKeys",
        context
            .new_function::<stable_b_tree_map_keys::NativeFunction>("")
            .into(),
    );

    ic.set(
        "stableBTreeMapLen",
        context
            .new_function::<stable_b_tree_map_len::NativeFunction>("")
            .into(),
    );

    ic.set(
        "stableBTreeMapRemove",
        context
            .new_function::<stable_b_tree_map_remove::NativeFunction>("")
            .into(),
    );

    ic.set(
        "stableBTreeMapValues",
        context
            .new_function::<stable_b_tree_map_values::NativeFunction>("")
            .into(),
    );

    ic.set(
        "time",
        context.new_function::<time::NativeFunction>("").into(),
    );

    ic.set(
        "trap",
        context.new_function::<trap::NativeFunction>("").into(),
    );

    context.get_global().set("_azleIcExperimental", ic.into());
}
