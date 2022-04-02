import { Query, Update, Opt } from 'azle';

export type Entry = {
  desc: string;
  phone: string;
};

let phonebook = new Map<string, Entry>();

export function insert(name: string, entry: Entry): Update<void> {
  phonebook.set(name, entry);
}

export function lookup(name: string): Query<Opt<Entry>> {
  return phonebook.get(name) ?? null;
}
