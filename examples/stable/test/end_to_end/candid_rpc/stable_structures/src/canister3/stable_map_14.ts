import { IDL, query, StableBTreeMap, update } from 'azle';

import { Callback } from '../types';

export class StableMap14 {
    stableMap14 = new StableBTreeMap<string, Callback>(14);

    @query([IDL.Text], IDL.Bool)
    stableMap14ContainsKey(key: string): boolean {
        return this.stableMap14.containsKey(key);
    }

    @query([IDL.Text], IDL.Opt(Callback))
    stableMap14Get(key: string): [Callback] | [] {
        const result = this.stableMap14.get(key);
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @update([IDL.Text, Callback], IDL.Opt(Callback))
    stableMap14Insert(key: string, value: Callback): [Callback] | [] {
        const result = this.stableMap14.insert(key, value);
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Bool)
    stableMap14IsEmpty(): boolean {
        return this.stableMap14.isEmpty();
    }

    @query([], IDL.Vec(IDL.Tuple(IDL.Text, Callback)))
    stableMap14Items(): [string, Callback][] {
        return this.stableMap14.items();
    }

    @query([], IDL.Vec(IDL.Text))
    stableMap14Keys(): string[] {
        return this.stableMap14.keys();
    }

    @query([], IDL.Nat32)
    stableMap14Len(): number {
        return this.stableMap14.len();
    }

    @update([IDL.Text], IDL.Opt(Callback))
    stableMap14Remove(key: string): [Callback] | [] {
        const result = this.stableMap14.remove(key);
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Vec(Callback))
    stableMap14Values(): Callback[] {
        return this.stableMap14.values();
    }
}
