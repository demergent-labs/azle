use rquickjs::{Context, Ctx, Function, IntoJs, TypedArray};

pub fn get_function(context: Ctx) -> Function {
    Function::new(
        context.clone(),
        move || match ic_cdk::api::data_certificate() {
            Some(data_certificate_vec_u8) => {
                TypedArray::<u8>::new(context.clone(), data_certificate_vec_u8)
                    .unwrap()
                    .into_js(&context)
                    .unwrap()
            }
            None => rquickjs::Undefined.into_js(&context).unwrap(),
        },
    )
    .unwrap()
}
