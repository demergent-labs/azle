use std::cell::RefCell;
use std::collections::HashMap;
use ic_cdk::export::candid::Nat;

thread_local! {
    static TODO_LIST_REF_CELL: RefCell<ToDoList> = RefCell::default();
    static NEXT_ID_REF_CELL: RefCell<Nat> = RefCell::new(Nat::from(0));
}

//#region Performance
#[derive(candid::CandidType, Clone)]
pub struct PerfResult {
    wasm_body_only: u64,
    wasm_including_prelude: u64
}

thread_local! {
    static PERF_RESULT_REF_CELL: RefCell<Option<PerfResult>> = RefCell::default();
}

#[ic_cdk_macros::query]
pub fn get_perf_result() -> Option<PerfResult> {
    PERF_RESULT_REF_CELL.with(|perf_result_ref_cell| perf_result_ref_cell.borrow().as_ref().cloned())
}

fn record_performance(start: u64, end: u64) {
    PERF_RESULT_REF_CELL.with(|perf_result_ref_cell| {
        let mut perf_result = perf_result_ref_cell.borrow_mut();

        *perf_result = Some(PerfResult {
            wasm_body_only: end - start,
            wasm_including_prelude: ic_cdk::api::call::performance_counter(0)
        })
    });
}
//#endregion

#[derive(candid::CandidType, Clone)]
pub struct ToDo {
    description: String,
    completed: bool,
}

type ToDoList = HashMap<Nat, ToDo>;

#[ic_cdk_macros::query]
pub fn get_todos() -> Vec<ToDo> {
    TODO_LIST_REF_CELL.with(|list_ref_cell| {
        let list = list_ref_cell.borrow();
        list.to_owned().into_values().collect()
    })
}

// Returns the ID that was given to the ToDo item
#[ic_cdk_macros::update]
pub fn add_todo(description: String) -> Nat {
    let perf_start = ic_cdk::api::call::performance_counter(0);

    let id = TODO_LIST_REF_CELL.with(|todo_list_ref_cell| {
        NEXT_ID_REF_CELL.with(|next_id| {
            let id = next_id.borrow().clone();
            let mut todo_list = todo_list_ref_cell.borrow_mut();
            todo_list.insert(id.clone(), ToDo { description, completed: false });
            *next_id.borrow_mut() += 1;
            id
        })
    });

    let perf_end = ic_cdk::api::call::performance_counter(0);

    record_performance(perf_start, perf_end);

    id
}

#[ic_cdk_macros::update]
pub fn complete_todo(id: Nat) -> () {
    let perf_start = ic_cdk::api::call::performance_counter(0);

    TODO_LIST_REF_CELL.with(|todo_list_ref_cell| {
        let mut todo_list = todo_list_ref_cell.borrow_mut();
        let todo = todo_list.get(&id);
        match todo {
            Some(item) => {
                let updated = ToDo{description: item.description.clone(), completed: item.completed};
                todo_list.insert(id, updated);
            },
            None => {},
        }
    });

    let perf_end = ic_cdk::api::call::performance_counter(0);

    record_performance(perf_start, perf_end);
}

#[ic_cdk_macros::query]
pub fn show_todos() -> String {
    TODO_LIST_REF_CELL.with(|todo_list_ref_cell| {
        let mut output = "\n___TO-DOs___".to_string();
        let list = todo_list_ref_cell.borrow();
        for todo in list.values() {
            output.push_str(&todo.description);
            if todo.completed {
                output.push_str(" ✔");
            }
        }
        output
    })
}

#[ic_cdk_macros::update]
pub fn clear_completed() -> () {
    let perf_start = ic_cdk::api::call::performance_counter(0);

    TODO_LIST_REF_CELL.with(|todo_list_ref_cell| {
        let mut updated: ToDoList = ToDoList::default();
        for (i, item) in todo_list_ref_cell.borrow().values().enumerate() {
            if !item.completed {
                updated.insert(Nat::from(i), ToDo { description: item.description.clone(), completed: item.completed });
            }
        }
        *todo_list_ref_cell.borrow_mut() = updated;
    });

    let perf_end = ic_cdk::api::call::performance_counter(0);

    record_performance(perf_start, perf_end);

}
