use std::ops::Deref;
use std::path::Path;
use swc_common::{sync::Lrc, SourceMap};
use swc_ecma_parser::{lexer::Lexer, Parser, StringInput, Syntax, TsConfig};

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
    pub fn from_file_name(ts_file_name: &str) -> Self {
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
                    return Program {
                        program,
                        source_map,
                    };
                };
                panic!("Unreachable");
            }
            Err(error) => panic!("{}: Syntax Error: {}", ts_file_name, error.kind().msg()),
        }
    }
}
