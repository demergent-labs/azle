import { IDL, query, update } from 'azle';

export const Entry = IDL.Record({
    desc: IDL.Text,
    phone: IDL.Text
});
export type Entry = {
    desc: string;
    phone: string;
};

export default class {
    phoneBook = new Map<string, Entry>();

    @update([IDL.Text, Entry])
    insert(name: string, entry: Entry): void {
        this.phoneBook.set(name, entry);
    }

    @query([IDL.Text], IDL.Opt(Entry))
    lookup(name: string): [Entry] | [] {
        const entryOrUndefined = this.phoneBook.get(name);

        return entryOrUndefined ? [entryOrUndefined] : [];
    }
}
