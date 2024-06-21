import { IDL, query, update } from 'azle';

export const Entry = Record({
    desc: text,
    phone: text
});
export type Entry = typeof Entry.tsType;

let phoneBook = new Map<string, Entry>();

export default class {
    @update([text, Entry], Void)
    insert(name, entry) {
        phoneBook.set(name, entry);
    }
    @query([text], Opt(Entry))
    lookup(name) {
        const entryOrUndefined = phoneBook.get(name);

        return entryOrUndefined ? Some(entryOrUndefined) : None;
    }
}
