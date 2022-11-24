impl cdk_framework::ToTokenStream for crate::ts_ast::AzleBindingIdent<'_> {
    fn to_token_stream(&self) -> proc_macro2::TokenStream {
        let name = self.name_as_ident();
        let data_type = self.data_type().to_token_stream();

        quote::quote! { #name: #data_type }
    }
}
