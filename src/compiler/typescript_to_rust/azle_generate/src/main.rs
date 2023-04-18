use azle_generate::{generate_canister, plugin::Plugin};
use serde::{Deserialize, Serialize};

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

    let main_js = std::fs::read_to_string("src/main.js").unwrap();

    let result = generate_canister(&compiler_info.file_names, main_js, &compiler_info.plugins);

    // TODO let's fix this now too
    // TODO let's really do this
    println!("{}", result);
}
