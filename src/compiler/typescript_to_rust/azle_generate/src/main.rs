use serde::{Deserialize, Serialize};
use std::{
    env,
    fs::{self, File},
    io::Write,
    process,
};

use azle_generate::{alias_table::AliasLists, generate_canister, AliasTables, Plugin};

const USAGE_ERROR: i32 = 1;
const COMPILER_INFO_READ_ERROR: i32 = 2;
const JSON_PARSE_ERROR: i32 = 3;
const ENV_READ_ERROR: i32 = 4;
const MAIN_JS_READ_ERROR: i32 = 5;
const CANISTER_COMPILATION_ERROR: i32 = 6;
const LIB_PARSE_ERROR: i32 = 7;
const GENERATED_LIB_GENERATION_ERR: i32 = 8;
const GENERATED_LIB_WRITE_ERR: i32 = 9;

#[derive(Debug, Serialize, Deserialize)]
struct CompilerInfo {
    plugins: Vec<Plugin>,
    file_names: Vec<String>,
    alias_tables: AliasTables,
    alias_lists: AliasLists,
}

fn main() {
    let args: Vec<String> = env::args().collect();

    if args.len() < 2 {
        let executable_name = &args[0];
        eprintln!("Usage: {executable_name} <path/to/compiler_info.json> [env_vars_csv]");
        process::exit(USAGE_ERROR);
    }

    let compiler_info_path = &args[1];
    let compiler_info_string = match fs::read_to_string(compiler_info_path) {
        Ok(compiler_info_string) => compiler_info_string,
        Err(err) => {
            eprintln!("Error reading {compiler_info_path}: {err}");
            process::exit(COMPILER_INFO_READ_ERROR);
        }
    };
    let compiler_info: CompilerInfo = match serde_json::from_str(&compiler_info_string) {
        Ok(compiler_info) => compiler_info,
        Err(err) => {
            eprintln!("Error parsing {compiler_info_path}: {err}");
            process::exit(JSON_PARSE_ERROR);
        }
    };

    let environment_variables = create_environment_variables(&args);

    let main_js = match fs::read_to_string("src/main.js") {
        Ok(content) => content,
        Err(err) => {
            eprintln!("Error reading src/main.js: {err}");
            process::exit(MAIN_JS_READ_ERROR);
        }
    };

    let lib_file = match generate_canister(
        &compiler_info.file_names,
        main_js,
        compiler_info.alias_tables,
        compiler_info.alias_lists,
        &compiler_info.plugins,
        &environment_variables,
    ) {
        Ok(lib_file) => lib_file.to_string(),
        Err(errors) => {
            eprintln!("Canister compilation failed:");
            for error in errors {
                eprintln!("{}", error);
            }
            process::exit(CANISTER_COMPILATION_ERROR);
        }
    };

    let syntax_tree = match syn::parse_file(&lib_file) {
        Ok(syntax_tree) => syntax_tree,
        Err(_) => {
            eprintln!("{}", azle_generate::errors::InternalError::new());
            process::exit(LIB_PARSE_ERROR);
        }
    };
    let formatted = prettyplease::unparse(&syntax_tree);

    let mut f = match File::create("../src/lib.rs") {
        Ok(f) => f,
        Err(_) => {
            println!("Unable to create lib file");
            process::exit(GENERATED_LIB_GENERATION_ERR)
        }
    };
    match f.write_all(formatted.as_bytes()) {
        Ok(_) => (),
        Err(_) => {
            println!("Unable to write data");
            process::exit(GENERATED_LIB_WRITE_ERR)
        }
    }
}

// TODO consider writing the environment variables to disk instead of sending them over the command line
fn create_environment_variables(args: &Vec<String>) -> Vec<(String, String)> {
    if let Some(envs) = args.get(2) {
        envs.split(',')
            .filter(|env_var_name| env_var_name != &"")
            .map(|env_var_name| {
                (
                    env_var_name.to_string(),
                    match std::env::var(env_var_name) {
                        Ok(env_var_value) => env_var_value,
                        Err(err) => {
                            eprintln!("Error reading env var {env_var_name}: {err}");
                            process::exit(ENV_READ_ERROR)
                        }
                    },
                )
            })
            .collect()
    } else {
        vec![]
    }
}
