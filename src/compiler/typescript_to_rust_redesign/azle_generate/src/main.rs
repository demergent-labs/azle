use azle_generate::azle_generate;

fn main() {
    let args: Vec<String> = std::env::args().collect();

    let ts_file_names_string = &args[1];
    let ts_file_names: Vec<&str> = ts_file_names_string.split(",").collect();

    let result = azle_generate(&ts_file_names);

    println!("{}", result);
}
