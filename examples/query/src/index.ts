import {
    Canister,
    ic,
    Opt,
    query,
    Record,
    StableBTreeMap,
    text,
    update,
    Vec,
    Void
} from 'azle';

const Entry = Record({
    key: text,
    value: text
});

let db = StableBTreeMap<text, text>(0);

export default Canister({
    get: query([text], Opt(text), (key) => {
        return db.get(key);
    }),
    set: update([text, text], Void, (key, value) => {
        db.insert(key, value);
    }),
    setMany: update([Vec(Entry)], Void, (entries) => {
        entries.forEach((entry) => {
            if (entry.key === 'trap') {
                ic.trap('explicit trap');
            }

            db.insert(entry.key, entry.value);
        });
    })
});
