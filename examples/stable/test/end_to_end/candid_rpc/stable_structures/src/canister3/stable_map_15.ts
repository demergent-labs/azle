import { IDL, query, StableBTreeMap, update } from 'azle';

import { Callback } from '../types';

export class StableMap15 {
    stableMap15 = new StableBTreeMap<Callback, string>(15);

    @query([Callback], IDL.Bool)
    stableMap15ContainsKey(key: Callback): boolean {
        return this.stableMap15.containsKey(key);
    }

    @query([Callback], IDL.Opt(IDL.Text))
    stableMap15Get(key: Callback): [string] | [] {
        const result = this.stableMap15.get(key);
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @update([Callback, IDL.Text], IDL.Opt(IDL.Text))
    stableMap15Insert(key: Callback, value: string): [string] | [] {
        const result = this.stableMap15.insert(key, value);
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Bool)
    stableMap15IsEmpty(): boolean {
        return this.stableMap15.isEmpty();
    }

    @query([], IDL.Vec(IDL.Tuple(Callback, IDL.Text)))
    stableMap15Items(): [Callback, string][] {
        return this.stableMap15.items();
    }

    @query([], IDL.Vec(Callback))
    stableMap15Keys(): Callback[] {
        return this.stableMap15.keys();
    }

    @query([], IDL.Nat32)
    stableMap15Len(): number {
        return this.stableMap15.len();
    }

    @update([Callback], IDL.Opt(IDL.Text))
    stableMap15Remove(key: Callback): [string] | [] {
        const result = this.stableMap15.remove(key);
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Vec(IDL.Text))
    stableMap15Values(): string[] {
        return this.stableMap15.values();
    }
}
