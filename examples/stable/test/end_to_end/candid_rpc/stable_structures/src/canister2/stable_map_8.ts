import { IDL, query, StableBTreeMap, update } from 'azle';

export class StableMap8 {
    stableMap8 = new StableBTreeMap<boolean, null>(8);

    @query([IDL.Bool], IDL.Bool)
    stableMap8ContainsKey(key: boolean): boolean {
        return this.stableMap8.containsKey(key);
    }

    @query([IDL.Bool], IDL.Opt(IDL.Null))
    stableMap8Get(key: boolean): [null] | [] {
        const result = this.stableMap8.get(key);
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @update([IDL.Bool, IDL.Null], IDL.Opt(IDL.Null))
    stableMap8Insert(key: boolean, value: null): [null] | [] {
        const result = this.stableMap8.insert(key, value);
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Bool)
    stableMap8IsEmpty(): boolean {
        return this.stableMap8.isEmpty();
    }

    @query([], IDL.Vec(IDL.Tuple(IDL.Bool, IDL.Null)))
    stableMap8Items(): [boolean, null][] {
        return this.stableMap8.items();
    }

    @query([], IDL.Vec(IDL.Bool))
    stableMap8Keys(): boolean[] {
        return this.stableMap8.keys();
    }

    @query([], IDL.Nat32)
    stableMap8Len(): number {
        return this.stableMap8.len();
    }

    @update([IDL.Bool], IDL.Opt(IDL.Null))
    stableMap8Remove(key: boolean): [null] | [] {
        const result = this.stableMap8.remove(key);
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Vec(IDL.Null))
    stableMap8Values(): null[] {
        return this.stableMap8.values();
    }
}
