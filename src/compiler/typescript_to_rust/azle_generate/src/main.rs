use azle_generate::azle_generate;

// TODO I think we can just base64 encode our arguments and then decode them here as necessary
// TODO the ts_file_names can be decoded appropriately

// TODO Will we run into too many problems trying to send a large amount of data as a parameter on the commandline?
// TODO maybe we should save the ts_file_names to file
fn main() {
    let args: Vec<String> = std::env::args().collect();

    // TODO base64 might be better here?
    let ts_file_names_string = &args[1];
    let ts_file_names: Vec<&str> = ts_file_names_string.split(",").collect();

    let main_js = std::fs::read_to_string("src/main.js").unwrap();
    let stable_storage_js = std::fs::read_to_string("src/stable_storage.js").unwrap();

    let result = azle_generate(&ts_file_names, &main_js, &stable_storage_js);

    println!("{}", result);
}
