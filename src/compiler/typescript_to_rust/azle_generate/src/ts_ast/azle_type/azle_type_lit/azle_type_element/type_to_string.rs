use super::AzleTypeElement;
use crate::ts_ast::ast_traits::TypeToString;

impl TypeToString for AzleTypeElement<'_> {
    fn type_to_string(&self) -> String {
        match self {
            AzleTypeElement::AzlePropertySignature(_) => "property signature".to_string(),
            AzleTypeElement::AzleMethodSignature(_) => "method signature".to_string(),
        }
    }
}
