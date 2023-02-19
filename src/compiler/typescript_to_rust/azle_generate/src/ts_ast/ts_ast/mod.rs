use std::path::Path;
use swc_common::{sync::Lrc, SourceMap};
use swc_ecma_parser::{lexer::Lexer, Parser, StringInput, Syntax, TsConfig};

use super::AzleProgram;

mod build_datatype_nodes;
mod cross_canister_calls;
mod errors;
mod stable_b_tree_map;
mod system_canister_method_builder;
mod to_act;

pub struct TsAst {
    pub azle_programs: Vec<AzleProgram>,
    pub main_js: String,
}

impl TsAst {
    pub fn new(ts_file_names: &Vec<&str>, main_js: String) -> Self {
        let azle_programs = ts_file_names
            .iter()
            .map(|ts_file_name| {
                let filepath = Path::new(ts_file_name).to_path_buf();

                let cm: Lrc<SourceMap> = Default::default();

                let fm = match cm.load_file(&filepath) {
                    Ok(rc_source_file) => rc_source_file,
                    Err(err) => panic!("Error: Unable to load file {}\n{}", ts_file_name, err),
                };

                let lexer = Lexer::new(
                    Syntax::Typescript(TsConfig {
                        decorators: true,
                        ..TsConfig::default()
                    }),
                    Default::default(),
                    StringInput::from(&*fm),
                    None,
                );

                let mut parser = Parser::new_from(lexer);

                let parse_result = parser.parse_program();
                match parse_result {
                    Ok(program) => {
                        if let Ok(source_map) = std::rc::Rc::try_unwrap(cm) {
                            return AzleProgram {
                                program,
                                source_map,
                            };
                        };
                        panic!("Unreachable");
                    }
                    Err(error) => panic!("{}: Syntax Error: {}", ts_file_name, error.kind().msg()),
                }
            })
            .collect();
        Self {
            azle_programs,
            main_js,
        }
    }
}
