import {
    candid,
    None,
    Opt,
    query,
    record,
    Record,
    Service,
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

export default class extends Service {
    phoneBook = new Map<string, Entry>();

    @update([text, Entry], Void)
    insert(name: text, entry: Entry): void {
        this.phoneBook.set(name, entry);
    }

    @query([text], Opt(Entry))
    lookup(name: text): Opt<Entry> {
        const entryOrUndefined = this.phoneBook.get(name);

        return entryOrUndefined ? Some(entryOrUndefined) : None;
    }
}
