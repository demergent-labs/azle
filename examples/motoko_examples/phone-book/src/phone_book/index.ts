import {
    candid,
    None,
    Opt,
    query,
    record,
    Record,
    Some,
    text,
    update,
    Void
} from 'azle';

@record
export class Entry extends Record {
    @candid(text)
    desc: text;

    @candid(text)
    phone: text;
}

let phoneBook = new Map<string, Entry>();

export default class {
    @update([text, Entry], Void)
    insert(name: text, entry: Entry): void {
        phoneBook.set(name, entry);
    }

    @query([text], Opt(Entry))
    lookup(name: text): Opt<Entry> {
        const entryOrUndefined = phoneBook.get(name);

        return entryOrUndefined ? Some(entryOrUndefined) : None;
    }
}
