import { IDL, query, StableBTreeMap, update } from 'azle';

export class StableMap9 {
    stableMap9 = new StableBTreeMap<number, string[]>(9);

    @query([IDL.Float64], IDL.Bool)
    stableMap9ContainsKey(key: number): boolean {
        return this.stableMap9.containsKey(key);
    }

    @query([IDL.Float64], IDL.Opt(IDL.Vec(IDL.Text)))
    stableMap9Get(key: number): [string[]] | [] {
        const result = this.stableMap9.get(key);
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @update([IDL.Float64, IDL.Vec(IDL.Text)], IDL.Opt(IDL.Vec(IDL.Text)))
    stableMap9Insert(key: number, value: string[]): [string[]] | [] {
        const result = this.stableMap9.insert(key, value);
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Bool)
    stableMap9IsEmpty(): boolean {
        return this.stableMap9.isEmpty();
    }

    @query([], IDL.Vec(IDL.Tuple(IDL.Float64, IDL.Vec(IDL.Text))))
    stableMap9Items(): [number, string[]][] {
        return this.stableMap9.items();
    }

    @query([], IDL.Vec(IDL.Float64))
    stableMap9Keys(): number[] {
        return this.stableMap9.keys();
    }

    @query([], IDL.Nat32)
    stableMap9Len(): number {
        return this.stableMap9.len();
    }

    @update([IDL.Float64], IDL.Opt(IDL.Vec(IDL.Text)))
    stableMap9Remove(key: number): [string[]] | [] {
        const result = this.stableMap9.remove(key);
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Vec(IDL.Vec(IDL.Text)))
    stableMap9Values(): string[][] {
        return this.stableMap9.values();
    }
}
