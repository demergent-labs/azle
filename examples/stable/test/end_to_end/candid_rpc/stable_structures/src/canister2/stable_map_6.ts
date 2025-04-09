import { IDL, query, StableBTreeMap, update } from 'azle';

export class StableMap6 {
    stableMap6 = new StableBTreeMap<bigint[], boolean>(6);

    @query([IDL.Vec(IDL.Nat64)], IDL.Bool)
    stableMap6ContainsKey(key: bigint[]): boolean {
        return this.stableMap6.containsKey(key);
    }

    @query([IDL.Vec(IDL.Nat64)], IDL.Opt(IDL.Bool))
    stableMap6Get(key: bigint[]): [boolean] | [] {
        const result = this.stableMap6.get(key);
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @update([IDL.Vec(IDL.Nat64), IDL.Bool], IDL.Opt(IDL.Bool))
    stableMap6Insert(key: bigint[], value: boolean): [boolean] | [] {
        const result = this.stableMap6.insert(key, value);
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Bool)
    stableMap6IsEmpty(): boolean {
        return this.stableMap6.isEmpty();
    }

    @query([], IDL.Vec(IDL.Tuple(IDL.Vec(IDL.Nat64), IDL.Bool)))
    stableMap6Items(): [bigint[], boolean][] {
        return this.stableMap6.items();
    }

    @query([], IDL.Vec(IDL.Vec(IDL.Nat64)))
    stableMap6Keys(): bigint[][] {
        return this.stableMap6.keys();
    }

    @query([], IDL.Nat32)
    stableMap6Len(): number {
        return this.stableMap6.len();
    }

    @update([IDL.Vec(IDL.Nat64)], IDL.Opt(IDL.Bool))
    stableMap6Remove(key: bigint[]): [boolean] | [] {
        const result = this.stableMap6.remove(key);
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Vec(IDL.Bool))
    stableMap6Values(): boolean[] {
        return this.stableMap6.values();
    }
}
