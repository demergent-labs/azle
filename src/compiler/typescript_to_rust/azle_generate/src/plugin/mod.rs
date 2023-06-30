use std::path::PathBuf;

use proc_macro2::TokenStream;
use serde::{Deserialize, Serialize};

use crate::{
    errors::errors::{UnableToLoadPlugin, UnableToParsePlugin},
    Error,
};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Plugin {
    pub path: String,
    pub register_function: String,
}

impl Plugin {
    pub fn to_code(&self) -> Result<TokenStream, Vec<Error>> {
        let plugin_file_name = PathBuf::from(&self.path).join("src").join("lib.rs");
        let plugin_code = match std::fs::read_to_string(plugin_file_name.clone()) {
            Ok(plugin_code) => plugin_code,
            Err(err) => {
                return Err(vec![
                    UnableToLoadPlugin::from_error(err, &plugin_file_name).into()
                ])
            }
        };

        match syn::parse_str::<TokenStream>(&plugin_code) {
            Ok(token_stream) => Ok(token_stream),
            Err(err) => Err(vec![UnableToParsePlugin::from_error(
                err,
                &plugin_file_name,
            )
            .into()]),
        }
    }
}
