pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        enum Color {
            Black,
            Red,
            Green,
            Yellow,
            Blue,
            Magenta,
            Cyan,
            White,
        }

        trait Colored {
            fn color(&self, color: Color) -> String;
            fn black(&self) -> String;
            fn red(&self) -> String;
            fn green(&self) -> String;
            fn yellow(&self) -> String;
            fn blue(&self) -> String;
            fn magenta(&self) -> String;
            fn cyan(&self) -> String;
            fn white(&self) -> String;
            fn bold(&self) -> String;
            fn dim(&self) -> String;
        }

        impl Colored for String {
            fn color(&self, color: Color) -> String {
                self.as_str().color(color)
            }
            fn black(&self) -> String {
                self.as_str().black()
            }
            fn red(&self) -> String {
                self.as_str().red()
            }
            fn green(&self) -> String {
                self.as_str().green()
            }
            fn yellow(&self) -> String {
                self.as_str().yellow()
            }
            fn blue(&self) -> String {
                self.as_str().blue()
            }
            fn magenta(&self) -> String {
                self.as_str().magenta()
            }
            fn cyan(&self) -> String {
                self.as_str().cyan()
            }
            fn white(&self) -> String {
                self.as_str().white()
            }
            fn bold(&self) -> String {
                self.as_str().bold()
            }
            fn dim(&self) -> String {
                self.as_str().dim()
            }
        }

        impl Colored for &str {
            fn color(&self, color: Color) -> String {
                let color_code = match color {
                    Color::Black => "30",
                    Color::Red => "31",
                    Color::Green => "32",
                    Color::Yellow => "33",
                    Color::Blue => "34",
                    Color::Magenta => "35",
                    Color::Cyan => "36",
                    Color::White => "37",
                };

                format!("\x1B[{color_code}m{self}\x1B[0m")
            }
            fn black(&self) -> String {
                self.color(Color::Black)
            }
            fn red(&self) -> String {
                self.color(Color::Red)
            }
            fn green(&self) -> String {
                self.color(Color::Green)
            }
            fn yellow(&self) -> String {
                self.color(Color::Yellow)
            }
            fn blue(&self) -> String {
                self.color(Color::Blue)
            }
            fn cyan(&self) -> String {
                self.color(Color::Cyan)
            }
            fn magenta(&self) -> String {
                self.color(Color::Magenta)
            }
            fn white(&self) -> String {
                self.color(Color::White)
            }
            fn bold(&self) -> String {
                format!("\x1B[1m{self}\x1B[22m")
            }
            fn dim(&self) -> String {
                format!("\x1B[2m{self}\x1B[22m")
            }
        }
    }
}
