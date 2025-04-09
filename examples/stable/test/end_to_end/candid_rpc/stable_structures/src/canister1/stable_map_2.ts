import { IDL, query, StableBTreeMap, update } from 'azle';

export class StableMap2 {
    stableMap2 = new StableBTreeMap<number, bigint>(2);

    @query([IDL.Nat32], IDL.Bool)
    stableMap2ContainsKey(key: number): boolean {
        return this.stableMap2.containsKey(key);
    }

    @query([IDL.Nat32], IDL.Opt(IDL.Nat))
    stableMap2Get(key: number): [bigint] | [] {
        const result = this.stableMap2.get(key);
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @update([IDL.Nat32, IDL.Nat], IDL.Opt(IDL.Nat))
    stableMap2Insert(key: number, value: bigint): [bigint] | [] {
        const result = this.stableMap2.insert(key, value);
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Bool)
    stableMap2IsEmpty(): boolean {
        return this.stableMap2.isEmpty();
    }

    @query([], IDL.Vec(IDL.Tuple(IDL.Nat32, IDL.Nat)))
    stableMap2Items(): [number, bigint][] {
        return this.stableMap2.items();
    }

    @query([], IDL.Vec(IDL.Nat32))
    stableMap2Keys(): number[] {
        return this.stableMap2.keys();
    }

    @query([], IDL.Nat32)
    stableMap2Len(): number {
        return this.stableMap2.len();
    }

    @update([IDL.Nat32], IDL.Opt(IDL.Nat))
    stableMap2Remove(key: number): [bigint] | [] {
        const result = this.stableMap2.remove(key);
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Vec(IDL.Nat))
    stableMap2Values(): bigint[] {
        return this.stableMap2.values();
    }
}
