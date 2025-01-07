use std::fmt::Display;

use rquickjs::{Ctx, Error, Object, Result, String};

mod accept_message;
mod arg_data_raw;
mod call_raw;
mod caller;
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

#[allow(unused)]
pub fn register(ctx: Ctx) -> Result<()> {
    let ic = Object::new(ctx.clone())?;

    ic.set("acceptMessage", accept_message::get_function(ctx.clone()))?;

    ic.set("argDataRaw", arg_data_raw::get_function(ctx.clone()))?;

    ic.set("callRaw", call_raw::get_function(ctx.clone()))?;

    ic.set("caller", caller::get_function(ctx.clone()))?;

    ic.set("candidDecode", candid_decode::get_function(ctx.clone()))?;

    ic.set("candidEncode", candid_encode::get_function(ctx.clone()))?;

    ic.set(
        "canisterBalance",
        canister_balance::get_function(ctx.clone()),
    )?;

    ic.set(
        "canisterVersion",
        canister_version::get_function(ctx.clone()),
    )?;

    ic.set("clearTimer", clear_timer::get_function(ctx.clone()))?;

    ic.set("cyclesBurn", cycles_burn::get_function(ctx.clone()))?;

    ic.set(
        "dataCertificate",
        data_certificate::get_function(ctx.clone()),
    )?;

    ic.set("id", id::get_function(ctx.clone()))?;

    ic.set("isController", is_controller::get_function(ctx.clone()))?;

    ic.set("methodName", method_name::get_function(ctx.clone()))?;

    ic.set(
        "msgCyclesAccept",
        msg_cycles_accept::get_function(ctx.clone()),
    )?;

    ic.set(
        "msgCyclesAvailable",
        msg_cycles_available::get_function(ctx.clone()),
    )?;

    ic.set(
        "msgCyclesRefunded",
        msg_cycles_refunded::get_function(ctx.clone()),
    )?;

    ic.set("notifyRaw", notify_raw::get_function(ctx.clone()))?;

    ic.set(
        "performanceCounter",
        performance_counter::get_function(ctx.clone()),
    )?;

    ic.set("print", print::get_function(ctx.clone()))?;

    ic.set("reject", reject::get_function(ctx.clone()))?;

    ic.set("rejectCode", reject_code::get_function(ctx.clone()))?;

    ic.set("rejectMessage", reject_message::get_function(ctx.clone()))?;

    ic.set("replyRaw", reply_raw::get_function(ctx.clone()))?;

    ic.set(
        "setCertifiedData",
        set_certified_data::get_function(ctx.clone()),
    )?;

    ic.set("setTimer", set_timer::get_function(ctx.clone()))?;

    ic.set(
        "setTimerInterval",
        set_timer_interval::get_function(ctx.clone()),
    )?;

    ic.set(
        "stableBTreeMapContainsKey",
        stable_b_tree_map_contains_key::get_function(ctx.clone()),
    )?;

    ic.set(
        "stableBTreeMapGet",
        stable_b_tree_map_get::get_function(ctx.clone()),
    )?;

    ic.set(
        "stableBTreeMapInit",
        stable_b_tree_map_init::get_function(ctx.clone()),
    )?;

    ic.set(
        "stableBTreeMapInsert",
        stable_b_tree_map_insert::get_function(ctx.clone()),
    )?;

    ic.set(
        "stableBTreeMapIsEmpty",
        stable_b_tree_map_is_empty::get_function(ctx.clone()),
    )?;

    ic.set(
        "stableBTreeMapItems",
        stable_b_tree_map_items::get_function(ctx.clone()),
    )?;

    ic.set(
        "stableBTreeMapKeys",
        stable_b_tree_map_keys::get_function(ctx.clone()),
    )?;

    ic.set(
        "stableBTreeMapLen",
        stable_b_tree_map_len::get_function(ctx.clone()),
    )?;

    ic.set(
        "stableBTreeMapRemove",
        stable_b_tree_map_remove::get_function(ctx.clone()),
    )?;

    ic.set(
        "stableBTreeMapValues",
        stable_b_tree_map_values::get_function(ctx.clone()),
    )?;

    ic.set("time", time::get_function(ctx.clone()))?;

    ic.set("trap", trap::get_function(ctx.clone()))?;

    ctx.globals().set("_azleIcStable", ic)?;

    Ok(())
}

pub fn throw_error<E: Display>(ctx: Ctx, error: E) -> Error {
    match String::from_str(ctx.clone(), &error.to_string()) {
        Ok(error_string) => {
            let error_value = error_string.into();
            ctx.clone().throw(error_value)
        }
        Err(e) => e,
    }
}
