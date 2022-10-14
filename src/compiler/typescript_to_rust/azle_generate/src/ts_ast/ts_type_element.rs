use swc_ecma_ast::{TsType, TsTypeElement};

use crate::cdk_act::{
    nodes::data_type_nodes::{ActRecordMember, ActVariantMember},
    ToActDataType,
};

use super::{ast_traits::GetTsType, GetName};

pub trait TsTypeElementHelperMethods {
    fn to_record_member(&self) -> ActRecordMember;
    fn to_variant_member(&self) -> ActVariantMember;
}

impl GetName for TsTypeElement {
    fn get_name(&self) -> &str {
        match self {
            TsTypeElement::TsCallSignatureDecl(_) => todo!(),
            TsTypeElement::TsConstructSignatureDecl(_) => todo!(),
            TsTypeElement::TsPropertySignature(prop_sig) => prop_sig.get_name(),
            TsTypeElement::TsGetterSignature(getter_sig) => getter_sig.get_name(),
            TsTypeElement::TsSetterSignature(setter_sig) => setter_sig.get_name(),
            TsTypeElement::TsMethodSignature(method_sig) => method_sig.get_name(),
            TsTypeElement::TsIndexSignature(index_sig) => index_sig.get_name(),
        }
    }
}

impl GetTsType for TsTypeElement {
    fn get_ts_type(&self) -> TsType {
        match self {
            TsTypeElement::TsCallSignatureDecl(_) => todo!(),
            TsTypeElement::TsConstructSignatureDecl(_) => todo!(),
            TsTypeElement::TsPropertySignature(prop_sig) => prop_sig.get_ts_type(),
            TsTypeElement::TsGetterSignature(_) => todo!(),
            TsTypeElement::TsSetterSignature(_) => todo!(),
            TsTypeElement::TsMethodSignature(_) => todo!(),
            TsTypeElement::TsIndexSignature(_) => todo!(),
        }
    }
}

impl TsTypeElementHelperMethods for TsTypeElement {
    fn to_record_member(&self) -> ActRecordMember {
        ActRecordMember {
            member_name: self.get_name().to_string(),
            member_type: self.get_ts_type().to_act_data_type(&None),
        }
    }

    fn to_variant_member(&self) -> ActVariantMember {
        ActVariantMember {
            member_name: self.get_name().to_string(),
            member_type: self.get_ts_type().to_act_data_type(&None),
        }
    }
}
