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
mod instruction_counter;
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

#[allow(unused)]
pub fn register(context: rquickjs::Ctx) -> rquickjs::Result<()> {
    let ic = rquickjs::Object::new(context.clone())?;

    ic.set(
        "acceptMessage",
        accept_message::get_function(context.clone()),
    )?;

    ic.set("argDataRaw", arg_data_raw::get_function(context.clone()))?;

    ic.set("callRaw", call_raw::get_function(context.clone()))?;

    ic.set("caller", caller::get_function(context.clone()))?;

    ic.set(
        "candidCompiler",
        candid_compiler::get_function(context.clone()),
    )?;

    ic.set("candidDecode", candid_decode::get_function(context.clone()))?;

    ic.set("candidEncode", candid_encode::get_function(context.clone()))?;

    ic.set(
        "canisterBalance",
        canister_balance::get_function(context.clone()),
    )?;

    ic.set(
        "canisterVersion",
        canister_version::get_function(context.clone()),
    )?;

    ic.set("clearTimer", clear_timer::get_function(context.clone()))?;

    ic.set("cyclesBurn", cycles_burn::get_function(context.clone()))?;

    ic.set(
        "dataCertificate",
        data_certificate::get_function(context.clone()),
    )?;

    ic.set("id", id::get_function(context.clone()))?;

    ic.set(
        "instructionCounter",
        instruction_counter::get_function(context.clone()),
    )?;

    ic.set("isController", is_controller::get_function(context.clone()))?;

    ic.set("methodName", method_name::get_function(context.clone()))?;

    ic.set(
        "msgCyclesAccept",
        msg_cycles_accept::get_function(context.clone()),
    )?;

    ic.set(
        "msgCyclesAvailable",
        msg_cycles_available::get_function(context.clone()),
    )?;

    ic.set(
        "msgCyclesRefunded",
        msg_cycles_refunded::get_function(context.clone()),
    )?;

    ic.set("notifyRaw", notify_raw::get_function(context.clone()))?;

    ic.set(
        "performanceCounter",
        performance_counter::get_function(context.clone()),
    )?;

    ic.set("print", print::get_function(context.clone()))?;

    ic.set("reject", reject::get_function(context.clone()))?;

    ic.set("rejectCode", reject_code::get_function(context.clone()))?;

    ic.set(
        "rejectMessage",
        reject_message::get_function(context.clone()),
    )?;

    ic.set("replyRaw", reply_raw::get_function(context.clone()))?;

    ic.set(
        "setCertifiedData",
        set_certified_data::get_function(context.clone()),
    )?;

    ic.set("setTimer", set_timer::get_function(context.clone()))?;

    ic.set(
        "setTimerInterval",
        set_timer_interval::get_function(context.clone()),
    )?;

    ic.set(
        "stableBTreeMapContainsKey",
        stable_b_tree_map_contains_key::get_function(context.clone()),
    )?;

    ic.set(
        "stableBTreeMapGet",
        stable_b_tree_map_get::get_function(context.clone()),
    )?;

    ic.set(
        "stableBTreeMapInit",
        stable_b_tree_map_init::get_function(context.clone()),
    )?;

    ic.set(
        "stableBTreeMapInsert",
        stable_b_tree_map_insert::get_function(context.clone()),
    )?;

    ic.set(
        "stableBTreeMapIsEmpty",
        stable_b_tree_map_is_empty::get_function(context.clone()),
    )?;

    ic.set(
        "stableBTreeMapItems",
        stable_b_tree_map_items::get_function(context.clone()),
    )?;

    ic.set(
        "stableBTreeMapKeys",
        stable_b_tree_map_keys::get_function(context.clone()),
    )?;

    ic.set(
        "stableBTreeMapLen",
        stable_b_tree_map_len::get_function(context.clone()),
    )?;

    ic.set(
        "stableBTreeMapRemove",
        stable_b_tree_map_remove::get_function(context.clone()),
    )?;

    ic.set(
        "stableBTreeMapValues",
        stable_b_tree_map_values::get_function(context.clone()),
    )?;

    ic.set("time", time::get_function(context.clone()))?;

    ic.set("trap", trap::get_function(context.clone()))?;

    context.clone().globals().set("_azleIcStable", ic)?;

    Ok(())
}
