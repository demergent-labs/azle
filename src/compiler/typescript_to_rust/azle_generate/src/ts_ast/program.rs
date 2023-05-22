use std::ops::Deref;
use std::path::Path;
use swc_common::{sync::Lrc, SourceMap};
use swc_ecma_parser::{lexer::Lexer, Parser, StringInput, Syntax, TsConfig};

use crate::{internal_error, Error};

pub struct Program {
    program: swc_ecma_ast::Program,
    pub source_map: SourceMap,
}

impl Deref for Program {
    type Target = swc_ecma_ast::Program;

    fn deref(&self) -> &Self::Target {
        &self.program
    }
}

impl Program {
    pub fn from_file_name(ts_file_name: &str) -> Result<Self, Error> {
        let filepath = Path::new(ts_file_name).to_path_buf();

        let cm: Lrc<SourceMap> = Default::default();

        let fm = cm
            .load_file(&filepath)
            .map_err(|_| Error::UnableToLoadFile)?;

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
                    return Ok(Program {
                        program,
                        source_map,
                    });
                };
                internal_error!()
            }
            Err(_error) => return Err(Error::FileSyntaxError),
        }
    }
}
