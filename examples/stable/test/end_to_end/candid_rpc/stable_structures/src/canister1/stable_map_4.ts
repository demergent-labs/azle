import { IDL, query, StableBTreeMap, update } from 'azle';

import { User } from '../types';

export class StableMap4 {
    stableMap4 = new StableBTreeMap<User, number>(4);

    @query([User], IDL.Bool)
    stableMap4ContainsKey(key: User): boolean {
        return this.stableMap4.containsKey(key);
    }

    @query([User], IDL.Opt(IDL.Float32))
    stableMap4Get(key: User): [number] | [] {
        const result = this.stableMap4.get(key);
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @update([User, IDL.Float32], IDL.Opt(IDL.Float32))
    stableMap4Insert(key: User, value: number): [number] | [] {
        const result = this.stableMap4.insert(key, value);
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Bool)
    stableMap4IsEmpty(): boolean {
        return this.stableMap4.isEmpty();
    }

    @query([], IDL.Vec(IDL.Tuple(User, IDL.Float32)))
    stableMap4Items(): [User, number][] {
        return this.stableMap4.items();
    }

    @query([], IDL.Vec(User))
    stableMap4Keys(): User[] {
        return this.stableMap4.keys();
    }

    @query([], IDL.Nat32)
    stableMap4Len(): number {
        return this.stableMap4.len();
    }

    @update([User], IDL.Opt(IDL.Float32))
    stableMap4Remove(key: User): [number] | [] {
        const result = this.stableMap4.remove(key);
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Vec(IDL.Float32))
    stableMap4Values(): number[] {
        return this.stableMap4.values();
    }
}
