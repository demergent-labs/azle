import { IDL, query, StableBTreeMap, update } from 'azle';

export class StableMap16 {
    stableMap16 = new StableBTreeMap<string, object>(16);

    @query([IDL.Text], IDL.Bool)
    stableMap16ContainsKey(key: string): boolean {
        return this.stableMap16.containsKey(key);
    }

    @query([IDL.Text], IDL.Opt(IDL.Text))
    stableMap16Get(key: string): [string] | [] {
        const result = this.stableMap16.get(key);
        if (result === undefined) {
            return [];
        } else {
            return [JSON.stringify(result)];
        }
    }

    @update([IDL.Text, IDL.Text], IDL.Opt(IDL.Text))
    stableMap16Insert(key: string, value: string): [string] | [] {
        const result = this.stableMap16.insert(key, JSON.parse(value));
        if (result === undefined) {
            return [];
        } else {
            return [JSON.stringify(result)];
        }
    }

    @query([], IDL.Bool)
    stableMap16IsEmpty(): boolean {
        return this.stableMap16.isEmpty();
    }

    @query([], IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text)))
    stableMap16Items(): [string, string][] {
        return this.stableMap16.items().map(([key, value]) => {
            return [key, JSON.stringify(value)];
        });
    }

    @query([], IDL.Vec(IDL.Text))
    stableMap16Keys(): string[] {
        return this.stableMap16.keys();
    }

    @query([], IDL.Nat32)
    stableMap16Len(): number {
        return this.stableMap16.len();
    }

    @update([IDL.Text], IDL.Opt(IDL.Text))
    stableMap16Remove(key: string): [string] | [] {
        const result = this.stableMap16.remove(key);
        if (result === undefined) {
            return [];
        } else {
            return [JSON.stringify(result)];
        }
    }

    @query([], IDL.Vec(IDL.Text))
    stableMap16Values(): string[] {
        return this.stableMap16.values().map((value) => JSON.stringify(value));
    }
}
