use rquickjs::{Ctx, Object, Result};

mod accept_message;
mod call_cycles_add;
mod call_cycles_add128;
mod call_data_append;
// mod call_new;
mod call_on_cleanup;
mod call_perform;
mod canister_cycle_balance;
mod canister_cycle_balance128;
mod canister_self_copy;
mod canister_self_size;
mod canister_status;
mod canister_version;
mod certified_data_set;
mod cycles_burn128;
mod data_certificate_copy;
mod data_certificate_present;
mod data_certificate_size;
mod debug_print;
mod global_timer_set;
mod in_replicated_execution;
mod is_controller;
mod msg_arg_data_copy;
mod msg_arg_data_size;
mod msg_caller_copy;
mod msg_caller_size;
mod msg_cycles_accept;
mod msg_cycles_accept128;
mod msg_cycles_available;
mod msg_cycles_available128;
mod msg_cycles_refunded;
mod msg_cycles_refunded128;
mod msg_method_name_copy;
mod msg_method_name_size;
mod msg_reject;
mod msg_reject_code;
mod msg_reject_msg_copy;
mod msg_reject_msg_size;
mod msg_reply;
mod msg_reply_data_append;
mod performance_counter;
mod stable64_grow;
mod stable64_read;
mod stable64_size;
mod stable64_write;
mod stable_grow;
mod stable_read;
mod stable_size;
mod stable_write;
mod time;
mod trap;

#[allow(unused)]
pub fn register(ctx: Ctx) -> Result<()> {
    let ic0 = Object::new(ctx.clone())?;

    ic0.set("accept_message", accept_message::get_function(ctx.clone()))?;
    ic0.set(
        "msg_arg_data_size",
        msg_arg_data_size::get_function(ctx.clone()),
    )?;
    ic0.set(
        "msg_arg_data_copy",
        msg_arg_data_copy::get_function(ctx.clone()),
    )?;
    ic0.set(
        "msg_caller_size",
        msg_caller_size::get_function(ctx.clone()),
    )?;
    ic0.set(
        "msg_caller_copy",
        msg_caller_copy::get_function(ctx.clone()),
    )?;
    ic0.set(
        "msg_reject_code",
        msg_reject_code::get_function(ctx.clone()),
    )?;
    ic0.set(
        "msg_reject_msg_size",
        msg_reject_msg_size::get_function(ctx.clone()),
    )?;
    ic0.set(
        "msg_reject_msg_copy",
        msg_reject_msg_copy::get_function(ctx.clone()),
    )?;
    ic0.set(
        "msg_reply_data_append",
        msg_reply_data_append::get_function(ctx.clone()),
    )?;
    ic0.set("msg_reply", msg_reply::get_function(ctx.clone()))?;
    ic0.set("msg_reject", msg_reject::get_function(ctx.clone()))?;
    ic0.set(
        "msg_cycles_available",
        msg_cycles_available::get_function(ctx.clone()),
    )?;
    ic0.set(
        "msg_cycles_available128",
        msg_cycles_available128::get_function(ctx.clone()),
    )?;
    ic0.set(
        "msg_cycles_refunded",
        msg_cycles_refunded::get_function(ctx.clone()),
    )?;
    ic0.set(
        "msg_cycles_refunded128",
        msg_cycles_refunded128::get_function(ctx.clone()),
    )?;
    ic0.set(
        "msg_cycles_accept",
        msg_cycles_accept::get_function(ctx.clone()),
    )?;
    ic0.set(
        "msg_cycles_accept128",
        msg_cycles_accept128::get_function(ctx.clone()),
    )?;
    ic0.set("cycles_burn128", cycles_burn128::get_function(ctx.clone()))?;
    ic0.set(
        "canister_self_size",
        canister_self_size::get_function(ctx.clone()),
    )?;
    ic0.set(
        "canister_self_copy",
        canister_self_copy::get_function(ctx.clone()),
    )?;
    ic0.set(
        "canister_cycle_balance",
        canister_cycle_balance::get_function(ctx.clone()),
    )?;
    ic0.set(
        "canister_cycle_balance128",
        canister_cycle_balance128::get_function(ctx.clone()),
    )?;
    ic0.set(
        "canister_status",
        canister_status::get_function(ctx.clone()),
    )?;
    ic0.set(
        "canister_version",
        canister_version::get_function(ctx.clone()),
    )?;
    ic0.set(
        "msg_method_name_size",
        msg_method_name_size::get_function(ctx.clone()),
    )?;
    ic0.set(
        "msg_method_name_copy",
        msg_method_name_copy::get_function(ctx.clone()),
    )?;
    // ic0.set("call_new", call_new::get_function(ctx.clone()))?;
    ic0.set(
        "call_on_cleanup",
        call_on_cleanup::get_function(ctx.clone()),
    )?;
    ic0.set(
        "call_data_append",
        call_data_append::get_function(ctx.clone()),
    )?;
    ic0.set(
        "call_cycles_add",
        call_cycles_add::get_function(ctx.clone()),
    )?;
    ic0.set(
        "call_cycles_add128",
        call_cycles_add128::get_function(ctx.clone()),
    )?;
    ic0.set("call_perform", call_perform::get_function(ctx.clone()))?;
    ic0.set("stable_size", stable_size::get_function(ctx.clone()))?;
    ic0.set("stable_grow", stable_grow::get_function(ctx.clone()))?;
    ic0.set("stable_write", stable_write::get_function(ctx.clone()))?;
    ic0.set("stable_read", stable_read::get_function(ctx.clone()))?;
    ic0.set("stable64_size", stable64_size::get_function(ctx.clone()))?;
    ic0.set("stable64_grow", stable64_grow::get_function(ctx.clone()))?;
    ic0.set("stable64_write", stable64_write::get_function(ctx.clone()))?;
    ic0.set("stable64_read", stable64_read::get_function(ctx.clone()))?;
    ic0.set(
        "certified_data_set",
        certified_data_set::get_function(ctx.clone()),
    )?;
    ic0.set(
        "data_certificate_present",
        data_certificate_present::get_function(ctx.clone()),
    )?;
    ic0.set(
        "data_certificate_size",
        data_certificate_size::get_function(ctx.clone()),
    )?;
    ic0.set(
        "data_certificate_copy",
        data_certificate_copy::get_function(ctx.clone()),
    )?;
    ic0.set("time", time::get_function(ctx.clone()))?;
    ic0.set(
        "global_timer_set",
        global_timer_set::get_function(ctx.clone()),
    )?;
    ic0.set(
        "performance_counter",
        performance_counter::get_function(ctx.clone()),
    )?;
    ic0.set("is_controller", is_controller::get_function(ctx.clone()))?;
    ic0.set(
        "in_replicated_execution",
        in_replicated_execution::get_function(ctx.clone()),
    )?;
    ic0.set("debug_print", debug_print::get_function(ctx.clone()))?;
    ic0.set("trap", trap::get_function(ctx.clone()))?;

    ctx.globals().set("_azleIc0", ic0)?;

    Ok(())
}
