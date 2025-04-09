import { IDL, query, StableBTreeMap, update } from 'azle';

import { Reaction } from '../types';

export class StableMap12 {
    stableMap12 = new StableBTreeMap<Uint8Array, Reaction>(12);

    @query([IDL.Vec(IDL.Nat8)], IDL.Bool)
    stableMap12ContainsKey(key: Uint8Array): boolean {
        return this.stableMap12.containsKey(key);
    }

    @query([IDL.Vec(IDL.Nat8)], IDL.Opt(Reaction))
    stableMap12Get(key: Uint8Array): [Reaction] | [] {
        const result = this.stableMap12.get(key);
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @update([IDL.Vec(IDL.Nat8), Reaction], IDL.Opt(Reaction))
    stableMap12Insert(key: Uint8Array, value: Reaction): [Reaction] | [] {
        const result = this.stableMap12.insert(key, value);
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Bool)
    stableMap12IsEmpty(): boolean {
        return this.stableMap12.isEmpty();
    }

    @query([], IDL.Vec(IDL.Tuple(IDL.Vec(IDL.Nat8), Reaction)))
    stableMap12Items(): [Uint8Array, Reaction][] {
        return this.stableMap12.items();
    }

    @query([], IDL.Vec(IDL.Vec(IDL.Nat8)))
    stableMap12Keys(): Uint8Array[] {
        return this.stableMap12.keys();
    }

    @query([], IDL.Nat32)
    stableMap12Len(): number {
        return this.stableMap12.len();
    }

    @update([IDL.Vec(IDL.Nat8)], IDL.Opt(Reaction))
    stableMap12Remove(key: Uint8Array): [Reaction] | [] {
        const result = this.stableMap12.remove(key);
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Vec(Reaction))
    stableMap12Values(): Reaction[] {
        return this.stableMap12.values();
    }
}
