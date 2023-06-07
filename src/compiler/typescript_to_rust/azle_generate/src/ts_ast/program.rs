use std::ops::Deref;
use std::path::Path;
use swc_common::{sync::Lrc, SourceMap};
use swc_ecma_parser::{lexer::Lexer, Parser, StringInput, Syntax, TsConfig};

use crate::SymbolTables;
use crate::{
    errors::errors::{FileSyntaxError, UnableToLoadFile},
    internal_error, Error, SymbolTable,
};

pub struct Program {
    program: swc_ecma_ast::Program,
    pub source_map: SourceMap,
    pub filepath: String,
    pub symbol_table: SymbolTable,
}

impl Deref for Program {
    type Target = swc_ecma_ast::Program;

    fn deref(&self) -> &Self::Target {
        &self.program
    }
}

impl Program {
    pub fn from_file_name(
        ts_file_name: &str,
        symbol_tables: &SymbolTables,
    ) -> Result<Option<Self>, Error> {
        let filepath = Path::new(ts_file_name).to_path_buf();

        let cm: Lrc<SourceMap> = Default::default();

        let fm = cm
            .load_file(&filepath)
            .map_err(|error| UnableToLoadFile::from_error(error, ts_file_name))?;

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
                    match symbol_tables.get(ts_file_name) {
                        Some(symbol_table) => {
                            return Ok(Some(Program {
                                program,
                                source_map,
                                filepath: ts_file_name.to_string(),
                                symbol_table: symbol_table.clone(),
                            }));
                        }
                        None => internal_error!(), // If there is no symbol table for the program then we don't need to process it for candid types
                    }
                };
                internal_error!()
            }
            Err(_error) => return Err(FileSyntaxError::from_file_name(ts_file_name, _error).into()),
        }
    }
}
