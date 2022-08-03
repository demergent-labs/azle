use radix_trie::Trie;
use std::cell::RefCell;

thread_local! {
    // The superhero data store
    static DB_REF_CELL: RefCell<Trie<SuperheroId, Superhero>> = RefCell::new(Trie::new());
    // The next available superhero identifier
    static NEXT_REF_CELL: RefCell<SuperheroId> = RefCell::new(0);
}

//#region Performance
#[derive(candid::CandidType, Clone)]
pub struct PerfResult {
    wasm_body_only: u64,
    wasm_including_prelude: u64,
}

thread_local! {
    static PERF_RESULT_REF_CELL: RefCell<Option<PerfResult>> = RefCell::default();
}

#[ic_cdk_macros::query]
pub fn get_perf_result() -> Option<PerfResult> {
    PERF_RESULT_REF_CELL
        .with(|perf_result_ref_cell| perf_result_ref_cell.borrow().as_ref().cloned())
}

fn record_performance(start: u64, end: u64) -> () {
    PERF_RESULT_REF_CELL.with(|perf_result_ref_cell| {
        let mut perf_result = perf_result_ref_cell.borrow_mut();

        *perf_result = Some(PerfResult {
            wasm_body_only: end - start,
            wasm_including_prelude: ic_cdk::api::call::performance_counter(0),
        })
    });
}
//#endregion

type SuperheroId = u32;

#[derive(candid::CandidType, Debug, serde::Deserialize, Clone)]
struct Superhero {
    name: String,
    superpowers: Option<List>,
}

#[derive(candid::CandidType, Debug, serde::Deserialize, Clone)]
struct List(String, Option<Box<List>>);

#[ic_cdk_macros::query]
fn read(id: SuperheroId) -> Option<Superhero> {
    DB_REF_CELL.with(|db_ref_cell| db_ref_cell.borrow().get(&id).cloned())
}

#[ic_cdk_macros::update]
fn create(superhero: Superhero) -> SuperheroId {
    let perf_start = ic_cdk::api::call::performance_counter(0);

    let superhero_id = NEXT_REF_CELL.with(|next_ref_cell| {
        let index = next_ref_cell.borrow();
        *index
    });
    NEXT_REF_CELL.with(|next_ref_cell| {
        *next_ref_cell.borrow_mut() += 1;
    });
    DB_REF_CELL.with(|db_ref_cell| {
        db_ref_cell.borrow_mut().insert(superhero_id, superhero);
    });

    let perf_end = ic_cdk::api::call::performance_counter(0);
    record_performance(perf_start, perf_end);

    superhero_id
}

#[ic_cdk_macros::update]
fn update(superhero_id: SuperheroId, superhero: Superhero) -> bool {
    let perf_start = ic_cdk::api::call::performance_counter(0);

    let result = DB_REF_CELL.with(|db_ref_cell| db_ref_cell.borrow().get(&superhero_id).cloned());
    let exists = result.is_some();
    if exists {
        DB_REF_CELL.with(|db_ref_cell| {
            db_ref_cell.borrow_mut().insert(superhero_id, superhero);
        });
    }

    let perf_end = ic_cdk::api::call::performance_counter(0);
    record_performance(perf_start, perf_end);

    exists
}

#[ic_cdk_macros::update]
fn delete_hero(superhero_id: SuperheroId) -> bool {
    let perf_start = ic_cdk::api::call::performance_counter(0);

    let removed = DB_REF_CELL.with(|db_ref_cell| db_ref_cell.borrow_mut().remove(&superhero_id));

    let perf_end = ic_cdk::api::call::performance_counter(0);
    record_performance(perf_start, perf_end);
    removed.is_some()
}
