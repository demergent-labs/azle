import { IDL, Principal, query, StableBTreeMap, update } from 'azle';

export class StableMap13 {
    stableMap13 = new StableBTreeMap<string, Principal>(13);

    @query([IDL.Text], IDL.Bool)
    stableMap13ContainsKey(key: string): boolean {
        return this.stableMap13.containsKey(key);
    }

    @query([IDL.Text], IDL.Opt(IDL.Principal))
    stableMap13Get(key: string): [Principal] | [] {
        const result = this.stableMap13.get(key);
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @update([IDL.Text, IDL.Principal], IDL.Opt(IDL.Principal))
    stableMap13Insert(key: string, value: Principal): [Principal] | [] {
        const result = this.stableMap13.insert(key, value);
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Bool)
    stableMap13IsEmpty(): boolean {
        return this.stableMap13.isEmpty();
    }

    @query([], IDL.Vec(IDL.Tuple(IDL.Text, IDL.Principal)))
    stableMap13Items(): [string, Principal][] {
        return this.stableMap13.items();
    }

    @query([], IDL.Vec(IDL.Text))
    stableMap13Keys(): string[] {
        return this.stableMap13.keys();
    }

    @query([], IDL.Nat32)
    stableMap13Len(): number {
        return this.stableMap13.len();
    }

    @update([IDL.Text], IDL.Opt(IDL.Principal))
    stableMap13Remove(key: string): [Principal] | [] {
        const result = this.stableMap13.remove(key);
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Vec(IDL.Principal))
    stableMap13Values(): Principal[] {
        return this.stableMap13.values();
    }
}
