use serde::{Deserialize, Serialize};
use std::{
    env,
    fs::{self, File},
    io::Write,
    process,
};

use azle_generate::{generate_canister, plugin::Plugin};

const USAGE_ERROR: i32 = 1;
const FILE_READ_ERROR: i32 = 2;
const CANISTER_COMPILATION_ERROR: i32 = 3;

#[derive(Debug, Serialize, Deserialize)]
struct CompilerInfo {
    plugins: Vec<Plugin>,
    file_names: Vec<String>,
}

fn main() {
    eprintln!("#AZLE_GENERATE_START");
    let args: Vec<String> = env::args().collect();

    if args.len() < 2 {
        let executable_name = &args[0];
        eprintln!("Usage: {} <ts_file_names>", executable_name);
        process::exit(USAGE_ERROR);
    }

    let compiler_info_path = &args[1];
    let compiler_info_string = std::fs::read_to_string(compiler_info_path).unwrap();
    let compiler_info: CompilerInfo = serde_json::from_str(&compiler_info_string).unwrap();

    let environment_variables = create_environment_variables(&args);

    let main_js = match fs::read_to_string("src/main.js") {
        Ok(content) => content,
        Err(e) => {
            eprintln!("Error reading src/main.js: {}", e);
            process::exit(FILE_READ_ERROR);
        }
    };

    let lib_file = match generate_canister(
        &compiler_info.file_names,
        main_js,
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

    let syntax_tree = syn::parse_file(&lib_file).unwrap();
    let formatted = prettyplease::unparse(&syntax_tree);

    let mut f = File::create("../src/lib.rs").expect("Unable to create file");
    f.write_all(formatted.as_bytes())
        .expect("Unable to write data");
}

// TODO consider writing the environment variables to disk instead of sending them over the command line
fn create_environment_variables(args: &Vec<String>) -> Vec<(String, String)> {
    if let Some(envs) = args.get(2) {
        envs.split(',')
            .filter(|env_var_name| env_var_name != &"")
            .map(|env_var_name| {
                (
                    env_var_name.to_string(),
                    std::env::var(env_var_name).unwrap(),
                )
            })
            .collect()
    } else {
        vec![]
    }
}
