import {
    Canister,
    None,
    Opt,
    query,
    Record,
    Some,
    text,
    update,
    Void
} from 'azle';

export const Entry = Record({
    desc: text,
    phone: text
});

let phoneBook = new Map<string, typeof Entry>();

export default Canister({
    insert: update([text, Entry], Void, (name, entry) => {
        phoneBook.set(name, entry);
    }),
    lookup: query([text], Opt(Entry), (name) => {
        const entryOrUndefined = phoneBook.get(name);

        return entryOrUndefined ? Some(entryOrUndefined) : None;
    })
});
