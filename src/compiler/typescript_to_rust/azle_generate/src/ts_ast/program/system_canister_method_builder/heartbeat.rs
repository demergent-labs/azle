use annotate_snippets::{
    display_list::{DisplayList, FormatOptions},
    snippet::{Annotation, AnnotationType, Slice, Snippet, SourceAnnotation},
};
use swc_common::source_map::Pos;

use crate::{
    cdk_act::{nodes::ActHeartbeatMethod, CanisterMethodType},
    generators::canister_methods::method_body,
    ts_ast::{
        program::{azle_program::AzleProgramVecHelperMethods, AzleProgram},
        source_map::GetSourceFileInfo,
        AzleFnDecl,
    },
};

pub fn build_canister_method_system_heartbeat(
    programs: &Vec<AzleProgram>,
) -> Option<ActHeartbeatMethod> {
    let heartbeat_fn_decls = programs.get_azle_fn_decls_of_type(&CanisterMethodType::Heartbeat);

    if heartbeat_fn_decls.len() > 1 {
        let error_message = create_error_message(heartbeat_fn_decls);

        panic!("{}", error_message);
    }

    let heartbeat_fn_decl_option = heartbeat_fn_decls.get(0);

    if let Some(heartbeat_fn_decl) = heartbeat_fn_decl_option {
        let call_to_heartbeat_js_function =
            method_body::generate_call_to_js_function(heartbeat_fn_decl);
        let body = quote::quote! {
                unsafe {
                    ic_cdk::spawn(async {
                        let mut _azle_boa_context = BOA_CONTEXT_OPTION.as_mut().unwrap();

                        #call_to_heartbeat_js_function

                        _azle_async_result_handler(
                            &mut _azle_boa_context,
                            &_azle_boa_return_value
                        ).await;
                    });
                }
        };
        Some(ActHeartbeatMethod { body })
    } else {
        None
    }
}

fn create_error_message(heartbeat_fn_decls: Vec<AzleFnDecl>) -> String {
    let source_map = heartbeat_fn_decls[0].source_map;
    let first_heartbeat = &heartbeat_fn_decls[0];
    let second_heartbeat = &heartbeat_fn_decls[1];

    let return_type_span = first_heartbeat
        .fn_decl
        .function
        .return_type
        .as_ref()
        .unwrap() // TODO
        .type_ann
        .as_ts_type_ref()
        .unwrap() // TODO
        .span;

    let second_return_type_span = second_heartbeat
        .fn_decl
        .function
        .return_type
        .as_ref()
        .unwrap() // TODO
        .type_ann
        .as_ts_type_ref()
        .unwrap() // TODO
        .span;

    let total_range = (return_type_span.lo, second_return_type_span.hi);

    let source = source_map.get_source_from_range(total_range);

    let line_number = source_map.get_line_number(return_type_span);
    let line_range = source_map.get_range(return_type_span);
    // let modified_range = (range.0 - total_range.0, range.1 - total_range.0);
    let origin = source_map.get_origin(second_return_type_span);

    let char_diff = total_range.0.to_usize() - line_range.0;
    let range2 = source_map.get_multi_line_range(second_return_type_span, char_diff);

    let error_snippet = Snippet {
        title: Some(Annotation {
            label: Some("cannot expose more than one heartbeat method"),
            id: None,
            annotation_type: AnnotationType::Error,
        }),
        footer: vec![],
        slices: vec![
            Slice {
                source: &source,
                line_start: line_number,
                origin: Some(&origin),
                fold: true,
                annotations: vec![SourceAnnotation {
                    label: "heartbeat first defined here",
                    annotation_type: AnnotationType::Error,
                    range: line_range,
                    // range: modified_range,
                }],
            },
            Slice {
                source: &source,
                line_start: line_number,
                origin: None,
                fold: true,
                annotations: vec![SourceAnnotation {
                    label: "and later defined here",
                    annotation_type: AnnotationType::Error,
                    range: range2,
                }],
            },
        ],
        opt: FormatOptions {
            color: true,
            ..Default::default()
        },
    };

    format!("{}", DisplayList::from(error_snippet))
}
