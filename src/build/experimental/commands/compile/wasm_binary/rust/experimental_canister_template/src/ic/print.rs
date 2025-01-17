use ic_cdk::print;
use rquickjs::{Ctx, Function};

pub struct NativeFunction;

impl rquickjs::function::Func<NativeFunction> for NativeFunction {
    const NAME: &'static str = "print\0";
    const LENGTH: u8 = 1;
    type Output = ();

    fn call(ctx: Ctx, args: &[rquickjs::Value]) -> Result<Self::Output, rquickjs::Error> {
        let first_arg = args.first().unwrap();
        let string_to_print = first_arg.clone().to_string().unwrap().to_string();
        print(string_to_print);

        if args.len() == 0 {
            print("");
        }

        Ok(())
    }
}
