use std::error::Error;

use rquickjs::{Ctx, Object, Value};

use crate::error::quickjs_call_with_error_handling;

/// Dispatches an action to the Azle JavaScript runtime.
///
/// This function creates a JavaScript action object with the provided type and payload,
/// along with location information (filepath and function name), and dispatches it to
/// the Azle runtime by calling the global `_azleDispatch` function. Actions are used
/// for important global state changes in Azle.
///
/// # Arguments
///
/// * `ctx` - The QuickJS context in which the action will be created and dispatched
/// * `action_type` - The type of the action to be dispatched
/// * `payload` - The payload of the action as a QuickJS Value
/// * `filepath` - The filepath where the action is being dispatched from
/// * `function_name` - The name of the function dispatching the action
///
/// # Returns
///
/// * `Ok(())` if the action was successfully dispatched
/// * `Err` containing the error if any operation fails
///
/// # Errors
///
/// This function may return an error if:
/// - Creating JavaScript objects fails
/// - Setting properties on JavaScript objects fails
/// - Calling the `_azleDispatch` function fails
pub fn dispatch_action<'a>(
    ctx: Ctx<'a>,
    action_type: &str,
    payload: Value<'a>,
    filepath: &str,
    function_name: &str,
) -> Result<(), Box<dyn Error>> {
    let action = Object::new(ctx.clone())?;

    action.set("type", action_type)?;
    action.set("payload", payload)?;

    let location = Object::new(ctx.clone())?;

    location.set("filepath", filepath)?;
    location.set("functionName", function_name)?;

    action.set("location", location)?;

    quickjs_call_with_error_handling(
        ctx.clone(),
        ctx.globals().get("_azleDispatch").unwrap(),
        (action,),
    )?;

    Ok(())
}
