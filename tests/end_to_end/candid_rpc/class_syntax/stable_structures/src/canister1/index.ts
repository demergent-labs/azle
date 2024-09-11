import { IDL, query, StableBTreeMap, update } from 'azle';

import { Reaction, User } from '../types';

export default class {
    stableMap0 = StableBTreeMap<number, string>(0);
    stableMap1 = StableBTreeMap<number, Uint8Array>(1);
    stableMap2 = StableBTreeMap<number, bigint>(2);
    stableMap3 = StableBTreeMap<Reaction, bigint>(3);
    stableMap4 = StableBTreeMap<User, number>(4);

    @query([], IDL.Bool)
    getRedeployed(): boolean {
        return globalThis._azlePostUpgradeCalled;
    }

    // stableMap0 methods

    @query([IDL.Nat8], IDL.Bool)
    stableMap0ContainsKey(key: number): boolean {
        return this.stableMap0.containsKey(key);
    }

    @query([IDL.Nat8], IDL.Opt(IDL.Text))
    stableMap0Get(key: number): [string] | [] {
        const result = this.stableMap0.get(key);
        if (result === null) {
            return [];
        } else {
            return [result];
        }
    }

    @update([IDL.Nat8, IDL.Text], IDL.Opt(IDL.Text))
    stableMap0Insert(key: number, value: string): [string] | [] {
        const result = this.stableMap0.insert(key, value);
        if (result === null) {
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

    @query([], IDL.Nat64)
    stableMap0Len(): bigint {
        return this.stableMap0.len();
    }

    @update([IDL.Nat8], IDL.Opt(IDL.Text))
    stableMap0Remove(key: number): [string] | [] {
        const result = this.stableMap0.remove(key);
        if (result === null) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Vec(IDL.Text))
    stableMap0Values(): string[] {
        return this.stableMap0.values();
    }

    // stableMap1 methods

    @query([IDL.Nat16], IDL.Bool)
    stableMap1ContainsKey(key: number): boolean {
        return this.stableMap1.containsKey(key);
    }

    @query([IDL.Nat16], IDL.Opt(IDL.Vec(IDL.Nat8)))
    stableMap1Get(key: number): [Uint8Array] | [] {
        const result = this.stableMap1.get(key);
        if (result === null) {
            return [];
        } else {
            return [result];
        }
    }

    @update([IDL.Nat16, IDL.Vec(IDL.Nat8)], IDL.Opt(IDL.Vec(IDL.Nat8)))
    stableMap1Insert(key: number, value: Uint8Array): [Uint8Array] | [] {
        const result = this.stableMap1.insert(key, value);
        if (result === null) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Bool)
    stableMap1IsEmpty(): boolean {
        return this.stableMap1.isEmpty();
    }

    @query([], IDL.Vec(IDL.Tuple(IDL.Nat16, IDL.Vec(IDL.Nat8))))
    stableMap1Items(): [number, Uint8Array][] {
        return this.stableMap1.items();
    }

    @query([], IDL.Vec(IDL.Nat16))
    stableMap1Keys(): number[] {
        return this.stableMap1.keys();
    }

    @query([], IDL.Nat64)
    stableMap1Len(): bigint {
        return this.stableMap1.len();
    }

    @update([IDL.Nat16], IDL.Opt(IDL.Vec(IDL.Nat8)))
    stableMap1Remove(key: number): [Uint8Array] | [] {
        const result = this.stableMap1.remove(key);
        if (result === null) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Vec(IDL.Vec(IDL.Nat8)))
    stableMap1Values(): Uint8Array[] {
        return this.stableMap1.values();
    }

    // stableMap2 methods

    @query([IDL.Nat32], IDL.Bool)
    stableMap2ContainsKey(key: number): boolean {
        return this.stableMap2.containsKey(key);
    }

    @query([IDL.Nat32], IDL.Opt(IDL.Nat))
    stableMap2Get(key: number): [bigint] | [] {
        const result = this.stableMap2.get(key);
        if (result === null) {
            return [];
        } else {
            return [result];
        }
    }

    @update([IDL.Nat32, IDL.Nat], IDL.Opt(IDL.Nat))
    stableMap2Insert(key: number, value: bigint): [bigint] | [] {
        const result = this.stableMap2.insert(key, value);
        if (result === null) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Bool)
    stableMap2IsEmpty(): boolean {
        return this.stableMap2.isEmpty();
    }

    @query([], IDL.Vec(IDL.Tuple(IDL.Nat32, IDL.Nat)))
    stableMap2Items(): [number, bigint][] {
        return this.stableMap2.items();
    }

    @query([], IDL.Vec(IDL.Nat32))
    stableMap2Keys(): number[] {
        return this.stableMap2.keys();
    }

    @query([], IDL.Nat64)
    stableMap2Len(): bigint {
        return this.stableMap2.len();
    }

    @update([IDL.Nat32], IDL.Opt(IDL.Nat))
    stableMap2Remove(key: number): [bigint] | [] {
        const result = this.stableMap2.remove(key);
        if (result === null) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Vec(IDL.Nat))
    stableMap2Values(): bigint[] {
        return this.stableMap2.values();
    }

    // stableMap3 methods

    @query([Reaction], IDL.Bool)
    stableMap3ContainsKey(key: Reaction): boolean {
        return this.stableMap3.containsKey(key);
    }

    @query([Reaction], IDL.Opt(IDL.Int))
    stableMap3Get(key: Reaction): [bigint] | [] {
        const result = this.stableMap3.get(key);
        if (result === null) {
            return [];
        } else {
            return [result];
        }
    }

    @update([Reaction, IDL.Int], IDL.Opt(IDL.Int))
    stableMap3Insert(key: Reaction, value: bigint): [bigint] | [] {
        const result = this.stableMap3.insert(key, value);
        if (result === null) {
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

    @query([], IDL.Nat64)
    stableMap3Len(): bigint {
        return this.stableMap3.len();
    }

    @update([Reaction], IDL.Opt(IDL.Int))
    stableMap3Remove(key: Reaction): [bigint] | [] {
        const result = this.stableMap3.remove(key);
        if (result === null) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Vec(IDL.Int))
    stableMap3Values(): bigint[] {
        return this.stableMap3.values();
    }

    // stableMap4 methods

    @query([User], IDL.Bool)
    stableMap4ContainsKey(key: User): boolean {
        return this.stableMap4.containsKey(key);
    }

    @query([User], IDL.Opt(IDL.Float32))
    stableMap4Get(key: User): [number] | [] {
        const result = this.stableMap4.get(key);
        if (result === null) {
            return [];
        } else {
            return [result];
        }
    }

    @update([User, IDL.Float32], IDL.Opt(IDL.Float32))
    stableMap4Insert(key: User, value: number): [number] | [] {
        const result = this.stableMap4.insert(key, value);
        if (result === null) {
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

    @query([], IDL.Nat64)
    stableMap4Len(): bigint {
        return this.stableMap4.len();
    }

    @update([User], IDL.Opt(IDL.Float32))
    stableMap4Remove(key: User): [number] | [] {
        const result = this.stableMap4.remove(key);
        if (result === null) {
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
