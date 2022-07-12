use std::cell::RefCell;

thread_local! {
    static CURRENT_MESSAGE: RefCell<String> = RefCell::new(String::from(""));
}

#[ic_cdk_macros::query]
fn query() -> String {
    CURRENT_MESSAGE.with(|current_message| current_message.borrow().clone())
}

#[ic_cdk_macros::update]
fn update(message: String) -> () {
    CURRENT_MESSAGE.with(|current_message| {
        *current_message.borrow_mut() = message;
    })
}
