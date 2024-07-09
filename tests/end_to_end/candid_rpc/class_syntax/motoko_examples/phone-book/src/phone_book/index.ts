import { IDL, query, update } from 'azle';

export const Entry = IDL.Record({
    desc: IDL.Text,
    phone: IDL.Text
});
export type Entry = {
    desc: string;
    phone: string;
};

let phoneBook = new Map<string, Entry>();

export default class {
    @update([IDL.Text, Entry])
    insert(name: string, entry: Entry): void {
        phoneBook.set(name, entry);
    }

    @query([IDL.Text], IDL.Opt(Entry))
    lookup(name: string): [Entry] | [] {
        const entryOrUndefined = phoneBook.get(name);

        return entryOrUndefined ? [entryOrUndefined] : [];
    }
}
