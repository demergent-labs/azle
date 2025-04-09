import { IDL, query, StableBTreeMap, update } from 'azle';

export class StableMap10 {
    stableMap10 = new StableBTreeMap<number, [boolean] | []>(10);

    @query([IDL.Float32], IDL.Bool)
    stableMap10ContainsKey(key: number): boolean {
        return this.stableMap10.containsKey(key);
    }

    @query([IDL.Float32], IDL.Opt(IDL.Opt(IDL.Bool)))
    stableMap10Get(key: number): [[boolean] | []] | [] {
        const result = this.stableMap10.get(key);
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @update([IDL.Float32, IDL.Opt(IDL.Bool)], IDL.Opt(IDL.Opt(IDL.Bool)))
    stableMap10Insert(
        key: number,
        value: [boolean] | []
    ): [[boolean] | []] | [] {
        const result = this.stableMap10.insert(key, value);
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Bool)
    stableMap10IsEmpty(): boolean {
        return this.stableMap10.isEmpty();
    }

    @query([], IDL.Vec(IDL.Tuple(IDL.Float32, IDL.Opt(IDL.Bool))))
    stableMap10Items(): [number, [boolean] | []][] {
        return this.stableMap10.items();
    }

    @query([], IDL.Vec(IDL.Float32))
    stableMap10Keys(): number[] {
        return this.stableMap10.keys();
    }

    @query([], IDL.Nat32)
    stableMap10Len(): number {
        return this.stableMap10.len();
    }

    @update([IDL.Float32], IDL.Opt(IDL.Opt(IDL.Bool)))
    stableMap10Remove(key: number): [[boolean] | []] | [] {
        const result = this.stableMap10.remove(key);
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Vec(IDL.Opt(IDL.Bool)))
    stableMap10Values(): ([boolean] | [])[] {
        return this.stableMap10.values();
    }
}
