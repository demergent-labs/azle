import { IDL, query, StableBTreeMap, update } from 'azle';

export class StableMap17 {
    stableMap17 = new StableBTreeMap<object, string>(17);

    @query([IDL.Text], IDL.Bool)
    stableMap17ContainsKey(key: string): boolean {
        return this.stableMap17.containsKey(JSON.parse(key));
    }

    @query([IDL.Text], IDL.Opt(IDL.Text))
    stableMap17Get(key: string): [string] | [] {
        const result = this.stableMap17.get(JSON.parse(key));
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @update([IDL.Text, IDL.Text], IDL.Opt(IDL.Text))
    stableMap17Insert(key: string, value: string): [string] | [] {
        const result = this.stableMap17.insert(JSON.parse(key), value);
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Bool)
    stableMap17IsEmpty(): boolean {
        return this.stableMap17.isEmpty();
    }

    @query([], IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text)))
    stableMap17Items(): [string, string][] {
        return this.stableMap17.items().map(([key, value]) => {
            return [JSON.stringify(key), value];
        });
    }

    @query([], IDL.Vec(IDL.Text))
    stableMap17Keys(): string[] {
        return this.stableMap17.keys().map((key) => JSON.stringify(key));
    }

    @query([], IDL.Nat32)
    stableMap17Len(): number {
        return this.stableMap17.len();
    }

    @update([IDL.Text], IDL.Opt(IDL.Text))
    stableMap17Remove(key: string): [string] | [] {
        const result = this.stableMap17.remove(JSON.parse(key));
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Vec(IDL.Text))
    stableMap17Values(): string[] {
        return this.stableMap17.values();
    }
}
