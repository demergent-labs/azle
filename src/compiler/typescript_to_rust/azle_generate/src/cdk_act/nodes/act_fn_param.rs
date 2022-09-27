use proc_macro2::TokenStream;
use quote::format_ident;

use crate::cdk_act::{ActDataType, ToTokenStream};

// TODO Consider having access to both strings and idents as necessary

#[derive(Debug, Clone)]
pub struct ActFnParam {
    pub name: String,
    pub data_type: ActDataType,
}

impl ToTokenStream for ActFnParam {
    fn to_token_stream(&self) -> TokenStream {
        let name = format_ident!("{}", &self.name);
        let data_type = &self.data_type.to_token_stream();
        quote::quote! {
            #name: #data_type
        }
    }
}
