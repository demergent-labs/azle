pub mod functions;

pub fn generate_ic_object() -> proc_macro2::TokenStream {
    quote::quote! {
        let ic = boa_engine::object::ObjectInitializer::new(&mut boa_context)
            .function(
                _azle_ic_performance_counter,
                "performance_counter",
                0
            )
            .function(
                _azle_ic_print,
                "print",
                0
            )
            .build();
    }
}
