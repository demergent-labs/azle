use azle_generate::{generate_canister, plugin::Plugin};
use serde::{Deserialize, Serialize};
use std::fs::File;
use std::io::Write;

#[derive(Debug, Serialize, Deserialize)]
struct CompilerInfo {
    plugins: Vec<Plugin>,
    file_names: Vec<String>,
}

fn main() {
    let args: Vec<String> = std::env::args().collect();

    let compiler_info_path = &args[1];
    let compiler_info_string = std::fs::read_to_string(compiler_info_path).unwrap();
    let compiler_info: CompilerInfo = serde_json::from_str(&compiler_info_string).unwrap();

    let environment_variables = create_environment_variables(&args);

    let main_js = std::fs::read_to_string("src/main.js").unwrap();

    let lib_file = generate_canister(
        &compiler_info.file_names,
        main_js,
        &compiler_info.plugins,
        &environment_variables,
    )
    .to_string();

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
