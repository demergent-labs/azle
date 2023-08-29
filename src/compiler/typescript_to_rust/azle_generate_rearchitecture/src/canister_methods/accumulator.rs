use proc_macro2::TokenStream;

pub struct Accumulator {
    pub token_streams: Vec<TokenStream>,
    pub errors: Vec<String>,
}

impl Accumulator {
    pub fn new() -> Self {
        Self::default()
    }

    pub fn add_error(self, error: String) -> Self {
        Self {
            token_streams: self.token_streams,
            errors: vec![self.errors, vec![error]].concat(),
        }
    }

    pub fn add_token_stream(self, token_stream: TokenStream) -> Self {
        Self {
            token_streams: vec![self.token_streams, vec![token_stream]].concat(),
            errors: self.errors,
        }
    }
}

impl Default for Accumulator {
    fn default() -> Self {
        Self {
            token_streams: Default::default(),
            errors: Default::default(),
        }
    }
}
