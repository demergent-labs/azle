import { IDL, query, StableBTreeMap, update } from 'azle';

export class StableMap5 {
    stableMap5 = new StableBTreeMap<[string] | [], number>(5);

    @query([IDL.Opt(IDL.Text)], IDL.Bool)
    stableMap5ContainsKey(key: [string] | []): boolean {
        return this.stableMap5.containsKey(key);
    }

    @query([IDL.Opt(IDL.Text)], IDL.Opt(IDL.Float64))
    stableMap5Get(key: [string] | []): [number] | [] {
        const result = this.stableMap5.get(key);
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @update([IDL.Opt(IDL.Text), IDL.Float64], IDL.Opt(IDL.Float64))
    stableMap5Insert(key: [string] | [], value: number): [number] | [] {
        const result = this.stableMap5.insert(key, value);
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Bool)
    stableMap5IsEmpty(): boolean {
        return this.stableMap5.isEmpty();
    }

    @query([], IDL.Vec(IDL.Tuple(IDL.Opt(IDL.Text), IDL.Float64)))
    stableMap5Items(): [[string] | [], number][] {
        return this.stableMap5.items();
    }

    @query([], IDL.Vec(IDL.Opt(IDL.Text)))
    stableMap5Keys(): ([string] | [])[] {
        return this.stableMap5.keys();
    }

    @query([], IDL.Nat32)
    stableMap5Len(): number {
        return this.stableMap5.len();
    }

    @update([IDL.Opt(IDL.Text)], IDL.Opt(IDL.Float64))
    stableMap5Remove(key: [string] | []): [number] | [] {
        const result = this.stableMap5.remove(key);
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Vec(IDL.Float64))
    stableMap5Values(): number[] {
        return this.stableMap5.values();
    }
}
