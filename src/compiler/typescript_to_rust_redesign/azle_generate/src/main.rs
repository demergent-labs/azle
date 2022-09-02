use azle_generate::azle_generate;

fn main() {
    let result = azle_generate(&vec!["./src/playground/index.ts"]);

    println!("{}", result);
}
