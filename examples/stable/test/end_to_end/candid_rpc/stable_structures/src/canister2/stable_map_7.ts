import { IDL, query, StableBTreeMap, update } from 'azle';

export class StableMap7 {
    stableMap7 = new StableBTreeMap<null, null>(7);

    @query([IDL.Null], IDL.Bool)
    stableMap7ContainsKey(key: null): boolean {
        return this.stableMap7.containsKey(key);
    }

    @query([IDL.Null], IDL.Opt(IDL.Null))
    stableMap7Get(key: null): [null] | [] {
        const result = this.stableMap7.get(key);
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @update([IDL.Null, IDL.Null], IDL.Opt(IDL.Null))
    stableMap7Insert(key: null, value: null): [null] | [] {
        const result = this.stableMap7.insert(key, value);
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Bool)
    stableMap7IsEmpty(): boolean {
        return this.stableMap7.isEmpty();
    }

    @query([], IDL.Vec(IDL.Tuple(IDL.Null, IDL.Null)))
    stableMap7Items(): [null, null][] {
        return this.stableMap7.items();
    }

    @query([], IDL.Vec(IDL.Null))
    stableMap7Keys(): null[] {
        return this.stableMap7.keys();
    }

    @query([], IDL.Nat32)
    stableMap7Len(): number {
        return this.stableMap7.len();
    }

    @update([IDL.Null], IDL.Opt(IDL.Null))
    stableMap7Remove(key: null): [null] | [] {
        const result = this.stableMap7.remove(key);
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Vec(IDL.Null))
    stableMap7Values(): null[] {
        return this.stableMap7.values();
    }
}
