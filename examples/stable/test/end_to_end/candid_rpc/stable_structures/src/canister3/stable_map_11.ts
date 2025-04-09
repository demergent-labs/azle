import { IDL, query, StableBTreeMap, update } from 'azle';

import { User } from '../types';

export class StableMap11 {
    stableMap11 = new StableBTreeMap<bigint, User>(11);

    @query([IDL.Nat], IDL.Bool)
    stableMap11ContainsKey(key: bigint): boolean {
        return this.stableMap11.containsKey(key);
    }

    @query([IDL.Nat], IDL.Opt(User))
    stableMap11Get(key: bigint): [User] | [] {
        const result = this.stableMap11.get(key);
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @update([IDL.Nat, User], IDL.Opt(User))
    stableMap11Insert(key: bigint, value: User): [User] | [] {
        const result = this.stableMap11.insert(key, value);
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Bool)
    stableMap11IsEmpty(): boolean {
        return this.stableMap11.isEmpty();
    }

    @query([], IDL.Vec(IDL.Tuple(IDL.Nat, User)))
    stableMap11Items(): [bigint, User][] {
        return this.stableMap11.items();
    }

    @query([], IDL.Vec(IDL.Nat))
    stableMap11Keys(): bigint[] {
        return this.stableMap11.keys();
    }

    @query([], IDL.Nat32)
    stableMap11Len(): number {
        return this.stableMap11.len();
    }

    @update([IDL.Nat], IDL.Opt(User))
    stableMap11Remove(key: bigint): [User] | [] {
        const result = this.stableMap11.remove(key);
        if (result === undefined) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Vec(User))
    stableMap11Values(): User[] {
        return this.stableMap11.values();
    }
}
