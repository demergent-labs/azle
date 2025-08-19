use std::fmt::Display;

use rquickjs::{Ctx, Error, Object, Result, String};

pub use call_raw::drain_inter_canister_call_futures;
pub use drain_microtasks::drain_microtasks;
pub use rand_seed::rand_seed;

mod accept_message;
mod call_raw;
mod candid_decode;
mod candid_encode;
mod canister_cycle_balance;
mod canister_self;
mod canister_version;
mod certified_data_set;
mod clear_timer;
mod cycles_burn;
mod data_certificate;
mod debug_print;
mod drain_microtasks;
mod in_replicated_execution;
mod is_controller;
mod msg_arg_data;
mod msg_caller;
mod msg_cycles_accept;
mod msg_cycles_available;
mod msg_cycles_refunded;
mod msg_method_name;
mod msg_reject;
mod msg_reject_code;
mod msg_reject_msg;
mod msg_reply;
mod notify_raw;
mod performance_counter;
mod rand_bytes;
mod rand_seed;
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
mod uuid;

#[allow(unused)]
pub fn register(ctx: Ctx) -> Result<()> {
    let ic = Object::new(ctx.clone())?;

    ic.set("acceptMessage", accept_message::get_function(ctx.clone()))?;

    ic.set("callRaw", call_raw::get_function(ctx.clone()))?;

    ic.set("candidDecode", candid_decode::get_function(ctx.clone()))?;

    ic.set("candidEncode", candid_encode::get_function(ctx.clone()))?;

    ic.set(
        "canisterCycleBalance",
        canister_cycle_balance::get_function(ctx.clone()),
    )?;

    ic.set("canisterSelf", canister_self::get_function(ctx.clone()))?;

    ic.set(
        "canisterVersion",
        canister_version::get_function(ctx.clone()),
    )?;

    ic.set(
        "certifiedDataSet",
        certified_data_set::get_function(ctx.clone()),
    )?;

    ic.set("clearTimer", clear_timer::get_function(ctx.clone()))?;

    ic.set("cyclesBurn", cycles_burn::get_function(ctx.clone()))?;

    ic.set(
        "dataCertificate",
        data_certificate::get_function(ctx.clone()),
    )?;

    ic.set("debugPrint", debug_print::get_function(ctx.clone()))?;

    ic.set(
        "drainMicrotasks",
        drain_microtasks::get_function(ctx.clone()),
    )?;

    ic.set(
        "inReplicatedExecution",
        in_replicated_execution::get_function(ctx.clone()),
    )?;

    ic.set("isController", is_controller::get_function(ctx.clone()))?;

    ic.set("msgArgData", msg_arg_data::get_function(ctx.clone()))?;

    ic.set("msgCaller", msg_caller::get_function(ctx.clone()))?;

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

    ic.set("msgMethodName", msg_method_name::get_function(ctx.clone()))?;

    ic.set("msgRejectCode", msg_reject_code::get_function(ctx.clone()))?;

    ic.set("msgRejectMsg", msg_reject_msg::get_function(ctx.clone()))?;

    ic.set("msgReject", msg_reject::get_function(ctx.clone()))?;

    ic.set("msgReply", msg_reply::get_function(ctx.clone()))?;

    ic.set("notifyRaw", notify_raw::get_function(ctx.clone()))?;

    ic.set(
        "performanceCounter",
        performance_counter::get_function(ctx.clone()),
    )?;

    ic.set("randBytes", rand_bytes::get_function(ctx.clone()))?;

    ic.set("randSeed", rand_seed::get_function(ctx.clone()))?;

    ic.set(
        "setTimerInterval",
        set_timer_interval::get_function(ctx.clone()),
    )?;

    ic.set("setTimer", set_timer::get_function(ctx.clone()))?;

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

    ic.set("uuid", uuid::get_function(ctx.clone()))?;

    ctx.globals().set("_azleIc", ic)?;

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
