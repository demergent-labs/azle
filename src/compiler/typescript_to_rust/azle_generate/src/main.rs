use azle_generate::generate_canister;

// TODO I think we can just base64 encode our arguments and then decode them here as necessary
// TODO the ts_file_names can be decoded appropriately

// TODO Will we run into too many problems trying to send a large amount of data as a parameter on the commandline?
// TODO maybe we should save the ts_file_names to file
fn main() {
    eprintln!("#AZLE_GENERATE_START");
    let args: Vec<String> = std::env::args().collect();

    // TODO base64 might be better here?
    let ts_file_names_string = &args[1];
    let ts_file_names: Vec<&str> = ts_file_names_string.split(",").collect();

    let main_js = std::fs::read_to_string("src/main.js").unwrap();

    let result = generate_canister(&ts_file_names, main_js);

    println!("{}", result);
}
