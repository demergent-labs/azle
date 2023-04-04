pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        macro_rules! stable_b_tree_map_type_impls {
            ($struct_name:ident, $max_size:expr) => {
                impl vm_value_conversion::CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue>
                    for $struct_name
                {
                    fn try_into_vm_value(
                        self,
                        context: &mut boa_engine::Context,
                    ) -> Result<boa_engine::JsValue, vm_value_conversion::CdkActTryIntoVmValueError> {
                        Ok(self.0.try_into_vm_value(context).unwrap())
                    }
                }
                impl ic_stable_structures::Storable for $struct_name {
                    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
                        std::borrow::Cow::Owned(candid::Encode!(self).unwrap())
                    }
                    fn from_bytes(bytes: Vec<u8>) -> Self {
                        candid::Decode!(&bytes, Self).unwrap()
                    }
                }
                impl ic_stable_structures::BoundedStorable for $struct_name {
                    fn max_size() -> u32 {
                        $max_size
                    }
                }
            };
        }
    }
}
