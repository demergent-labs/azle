import { IDL, query, StableBTreeMap, update } from 'azle';

export class StableMap0 {
    stableMap0 = new StableBTreeMap<number, string>(0);

    @query([IDL.Nat8], IDL.Bool)
    stableMap0ContainsKey(key: number): boolean {
        return this.stableMap0.containsKey(key);
    }

    @query([IDL.Nat8], IDL.Opt(IDL.Text))
    stableMap0Get(key: number): [string] | [] {
        const result = this.stableMap0.get(key);
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @update([IDL.Nat8, IDL.Text], IDL.Opt(IDL.Text))
    stableMap0Insert(key: number, value: string): [string] | [] {
        const result = this.stableMap0.insert(key, value);
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Bool)
    stableMap0IsEmpty(): boolean {
        return this.stableMap0.isEmpty();
    }

    @query([], IDL.Vec(IDL.Tuple(IDL.Nat8, IDL.Text)))
    stableMap0Items(): [number, string][] {
        return this.stableMap0.items();
    }

    @query([], IDL.Vec(IDL.Nat8))
    stableMap0Keys(): Uint8Array {
        return Uint8Array.from(this.stableMap0.keys());
    }

    @query([], IDL.Nat32)
    stableMap0Len(): number {
        return this.stableMap0.len();
    }

    @update([IDL.Nat8], IDL.Opt(IDL.Text))
    stableMap0Remove(key: number): [string] | [] {
        const result = this.stableMap0.remove(key);
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Vec(IDL.Text))
    stableMap0Values(): string[] {
        return this.stableMap0.values();
    }
}
