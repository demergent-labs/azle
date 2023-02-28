use cdk_framework::act::{node::data_type::Func, DataTypes};

use super::TsAst;

impl TsAst {
    pub fn build_data_types(&self) -> DataTypes {
        // let funcs: Vec<Func> = self
        //     .module_items()
        //     .iter()
        //     .map(|_source_mapped_module_item| Func {
        //         name: todo!(),
        //         params: todo!(),
        //         return_type: todo!(),
        //         mode: todo!(),
        //         to_vm_value: todo!(),
        //         list_to_vm_value: todo!(),
        //         from_vm_value: todo!(),
        //         list_from_vm_value: todo!(),
        //     })
        //     .collect();

        // let ast_type_alias_decls = &self.azle_programs.get_azle_type_alias_decls();
        // let all_types = ast_type_alias_decls.build_type_alias_acts();

        // let func_data_types = filter_by_variant(&all_types, "Func");
        // let funcs: Vec<_> = func_data_types
        //     .iter()
        //     .map(|t| t.as_func().unwrap().clone())
        //     .collect();

        // let record_data_types = filter_by_variant(&all_types, "Record");
        // let records: Vec<_> = record_data_types
        //     .iter()
        //     .map(|t| t.as_record().unwrap().clone())
        //     .collect();
        // let tuple_data_types = filter_by_variant(&all_types, "Tuple");
        // let tuples: Vec<_> = tuple_data_types
        //     .iter()
        //     .map(|t| t.as_tuple().unwrap().clone())
        //     .collect();
        // let variant_data_types = filter_by_variant(&all_types, "Variant");
        // let variants: Vec<_> = variant_data_types
        //     .iter()
        //     .map(|t| t.as_variant().unwrap().clone())
        //     .collect();

        // DataTypes {
        //     funcs,
        //     records,
        //     tuples,
        //     type_aliases: todo!(),
        //     variants,
        // }

        // TODO: Flesh this out
        DataTypes {
            funcs: vec![],
            records: vec![],
            tuples: vec![],
            type_aliases: vec![],
            variants: vec![],
        }
    }
}

// fn filter_by_variant(types: &Vec<DataType>, variant: &str) -> Vec<DataType> {
//     types
//         .iter()
//         .filter(|data_type| match data_type {
//             DataType::Array(_) => variant == "Array",
//             DataType::Func(_) => variant == "Func",
//             DataType::Opt(_) => variant == "Option",
//             DataType::Primitive(_) => variant == "Primitive",
//             DataType::Record(_) => variant == "Record",
//             DataType::Tuple(_) => variant == "Tuple",
//             DataType::TypeRef(_) => variant == "TypeRef",
//             DataType::Variant(_) => variant == "Variant",
//             DataType::TypeAlias(_) => variant == "TypeAlias",
//         })
//         .cloned()
//         .collect()
// }
