use radix_trie::Trie;
use std::cell::RefCell;

type SuperheroId = u32;

#[derive(candid::CandidType, Debug, serde::Deserialize, Clone)]
struct Superhero {
    name: String,
    superpowers: Option<List>,
}

#[derive(candid::CandidType, Debug, serde::Deserialize, Clone)]
struct List(String, Option<Box<List>>);

thread_local! {
    // The superhero data store
    static DB: RefCell<Trie<SuperheroId, Superhero>> = RefCell::new(Trie::new());
    // The next available superhero identifier
    static NEXT: RefCell<SuperheroId> = RefCell::new(0);
}

#[ic_cdk_macros::query]
fn read(id: SuperheroId) -> Option<Superhero> {
    DB.with(|db| db.borrow().get(&id).cloned())
}

#[ic_cdk_macros::update]
fn create(superhero: Superhero) -> SuperheroId {
    let superhero_id = NEXT.with(|next| {
        let index = next.borrow();
        *index
    });
    NEXT.with(|next| {
        *next.borrow_mut() += 1;
    });
    DB.with(|db| {
        db.borrow_mut().insert(superhero_id, superhero);
    });
    superhero_id
}

#[ic_cdk_macros::update]
fn update(superhero_id: SuperheroId, superhero: Superhero) -> bool {
    let result = DB.with(|db| db.borrow().get(&superhero_id).cloned());
    let exists = result.is_some();
    if exists {
        DB.with(|db| {
            db.borrow_mut().insert(superhero_id, superhero);
        });
    }
    exists
}

#[ic_cdk_macros::update]
fn delete(superhero_id: SuperheroId) -> bool {
    DB.with(|db| db.borrow_mut().remove(&superhero_id).is_some())
}
