use ic_cdk::api::trap;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, |message: String| cast_trap(message))
}

/// This function is needed to handle the never type (!) return from trap() in a Function::new closure.
/// The trap() function has a never return type (!), but we need to return () to satisfy the Function::new
/// closure requirements. Without explicitly returning (), we would get compiler warnings about
/// depending on never type fallback being (), which is being phased out in Rust.
///
/// This avoids warnings like:
/// - "this function depends on never type fallback being ()"
/// - "in edition 2024, the requirement !: rquickjs::IntoJs<'_> will fail"
pub fn cast_trap(message: String) -> () {
    trap(&message);
    #[allow(unreachable_code)]
    ()
}
