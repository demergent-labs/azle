import { IDL, query, StableBTreeMap, update } from 'azle';

export class StableMap1 {
    stableMap1 = new StableBTreeMap<number, Uint8Array>(1);

    @query([IDL.Nat16], IDL.Bool)
    stableMap1ContainsKey(key: number): boolean {
        return this.stableMap1.containsKey(key);
    }

    @query([IDL.Nat16], IDL.Opt(IDL.Vec(IDL.Nat8)))
    stableMap1Get(key: number): [Uint8Array] | [] {
        const result = this.stableMap1.get(key);
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @update([IDL.Nat16, IDL.Vec(IDL.Nat8)], IDL.Opt(IDL.Vec(IDL.Nat8)))
    stableMap1Insert(key: number, value: Uint8Array): [Uint8Array] | [] {
        const result = this.stableMap1.insert(key, value);
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Bool)
    stableMap1IsEmpty(): boolean {
        return this.stableMap1.isEmpty();
    }

    @query([], IDL.Vec(IDL.Tuple(IDL.Nat16, IDL.Vec(IDL.Nat8))))
    stableMap1Items(): [number, Uint8Array][] {
        return this.stableMap1.items();
    }

    @query([], IDL.Vec(IDL.Nat16))
    stableMap1Keys(): number[] {
        return this.stableMap1.keys();
    }

    @query([], IDL.Nat32)
    stableMap1Len(): number {
        return this.stableMap1.len();
    }

    @update([IDL.Nat16], IDL.Opt(IDL.Vec(IDL.Nat8)))
    stableMap1Remove(key: number): [Uint8Array] | [] {
        const result = this.stableMap1.remove(key);
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Vec(IDL.Vec(IDL.Nat8)))
    stableMap1Values(): Uint8Array[] {
        return this.stableMap1.values();
    }
}
