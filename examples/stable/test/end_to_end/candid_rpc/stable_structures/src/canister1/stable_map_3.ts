import { IDL, query, StableBTreeMap, update } from 'azle';

import { Reaction } from '../types';

export class StableMap3 {
    stableMap3 = new StableBTreeMap<Reaction, bigint>(3);

    @query([Reaction], IDL.Bool)
    stableMap3ContainsKey(key: Reaction): boolean {
        return this.stableMap3.containsKey(key);
    }

    @query([Reaction], IDL.Opt(IDL.Int))
    stableMap3Get(key: Reaction): [bigint] | [] {
        const result = this.stableMap3.get(key);
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @update([Reaction, IDL.Int], IDL.Opt(IDL.Int))
    stableMap3Insert(key: Reaction, value: bigint): [bigint] | [] {
        const result = this.stableMap3.insert(key, value);
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Bool)
    stableMap3IsEmpty(): boolean {
        return this.stableMap3.isEmpty();
    }

    @query([], IDL.Vec(IDL.Tuple(Reaction, IDL.Int)))
    stableMap3Items(): [Reaction, bigint][] {
        return this.stableMap3.items();
    }

    @query([], IDL.Vec(Reaction))
    stableMap3Keys(): Reaction[] {
        return this.stableMap3.keys();
    }

    @query([], IDL.Nat32)
    stableMap3Len(): number {
        return this.stableMap3.len();
    }

    @update([Reaction], IDL.Opt(IDL.Int))
    stableMap3Remove(key: Reaction): [bigint] | [] {
        const result = this.stableMap3.remove(key);
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Vec(IDL.Int))
    stableMap3Values(): bigint[] {
        return this.stableMap3.values();
    }
}
