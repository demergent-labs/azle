impl cdk_framework::ToTokenStream<&Vec<String>> for crate::ts_ast::AzleBindingIdent<'_> {
    fn to_token_stream(&self, keywords: &Vec<String>) -> proc_macro2::TokenStream {
        let name = self.name_as_ident();
        let data_type = self.data_type().to_token_stream(keywords);

        quote::quote! { #name: #data_type }
    }
}
