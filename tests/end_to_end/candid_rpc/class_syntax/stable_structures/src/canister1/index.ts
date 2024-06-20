import { convertOpt, IDL, query, StableBTreeMap, update } from 'azle';

import { Reaction, User } from '../types';

let stableMap0 = StableBTreeMap<number, string>(0);
let stableMap1 = StableBTreeMap<number, Uint8Array>(1);
let stableMap2 = StableBTreeMap<number, bigint>(2);
let stableMap3 = StableBTreeMap<Reaction, bigint>(3);
let stableMap4 = StableBTreeMap<User, number>(4);

export default class {
    @query([], IDL.Bool)
    getRedeployed(): boolean {
        return globalThis._azlePostUpgradeCalled;
    }

    // stableMap0 methods

    @query([IDL.Nat8], IDL.Bool)
    stableMap0ContainsKey(key: number): boolean {
        return stableMap0.containsKey(key);
    }

    @query([IDL.Nat8], IDL.Opt(IDL.Text))
    stableMap0Get(key: number): [string] | [] {
        return convertOpt(stableMap0.get(key));
    }

    @update([IDL.Nat8, IDL.Text], IDL.Opt(IDL.Text))
    stableMap0Insert(key: number, value: string): [string] | [] {
        return convertOpt(stableMap0.insert(key, value));
    }

    @query([], IDL.Bool)
    stableMap0IsEmpty(): boolean {
        return stableMap0.isEmpty();
    }

    @query([], IDL.Vec(IDL.Tuple(IDL.Nat8, IDL.Text)))
    stableMap0Items(): [number, string][] {
        return stableMap0.items();
    }

    @query([], IDL.Vec(IDL.Nat8))
    stableMap0Keys(): Uint8Array {
        return Uint8Array.from(stableMap0.keys());
    }

    @query([], IDL.Nat64)
    stableMap0Len(): bigint {
        return stableMap0.len();
    }

    @update([IDL.Nat8], IDL.Opt(IDL.Text))
    stableMap0Remove(key: number): [string] | [] {
        return convertOpt(stableMap0.remove(key));
    }

    @query([], IDL.Vec(IDL.Text))
    stableMap0Values(): string[] {
        return stableMap0.values();
    }

    // stableMap1 methods

    @query([IDL.Nat16], IDL.Bool)
    stableMap1ContainsKey(key: number): boolean {
        return stableMap1.containsKey(key);
    }

    @query([IDL.Nat16], IDL.Opt(IDL.Vec(IDL.Nat8)))
    stableMap1Get(key: number): [Uint8Array] | [] {
        return convertOpt(stableMap1.get(key));
    }

    @update([IDL.Nat16, IDL.Vec(IDL.Nat8)], IDL.Opt(IDL.Vec(IDL.Nat8)))
    stableMap1Insert(key: number, value: Uint8Array): [Uint8Array] | [] {
        return convertOpt(stableMap1.insert(key, value));
    }

    @query([], IDL.Bool)
    stableMap1IsEmpty(): boolean {
        return stableMap1.isEmpty();
    }

    @query([], IDL.Vec(IDL.Tuple(IDL.Nat16, IDL.Vec(IDL.Nat8))))
    stableMap1Items(): [number, Uint8Array][] {
        return stableMap1.items();
    }

    @query([], IDL.Vec(IDL.Nat16))
    stableMap1Keys(): number[] {
        return stableMap1.keys();
    }

    @query([], IDL.Nat64)
    stableMap1Len(): bigint {
        return stableMap1.len();
    }

    @update([IDL.Nat16], IDL.Opt(IDL.Vec(IDL.Nat8)))
    stableMap1Remove(key: number): [Uint8Array] | [] {
        return convertOpt(stableMap1.remove(key));
    }

    @query([], IDL.Vec(IDL.Vec(IDL.Nat8)))
    stableMap1Values(): Uint8Array[] {
        return stableMap1.values();
    }

    // stableMap2 methods

    @query([IDL.Nat32], IDL.Bool)
    stableMap2ContainsKey(key: number): boolean {
        return stableMap2.containsKey(key);
    }

    @query([IDL.Nat32], IDL.Opt(IDL.Nat))
    stableMap2Get(key: number): [bigint] | [] {
        return convertOpt(stableMap2.get(key));
    }

    @update([IDL.Nat32, IDL.Nat], IDL.Opt(IDL.Nat))
    stableMap2Insert(key: number, value: bigint): [bigint] | [] {
        return convertOpt(stableMap2.insert(key, value));
    }

    @query([], IDL.Bool)
    stableMap2IsEmpty(): boolean {
        return stableMap2.isEmpty();
    }

    @query([], IDL.Vec(IDL.Tuple(IDL.Nat32, IDL.Nat)))
    stableMap2Items(): [number, bigint][] {
        return stableMap2.items();
    }

    @query([], IDL.Vec(IDL.Nat32))
    stableMap2Keys(): number[] {
        return stableMap2.keys();
    }

    @query([], IDL.Nat64)
    stableMap2Len(): bigint {
        return stableMap2.len();
    }

    @update([IDL.Nat32], IDL.Opt(IDL.Nat))
    stableMap2Remove(key: number): [bigint] | [] {
        return convertOpt(stableMap2.remove(key));
    }

    @query([], IDL.Vec(IDL.Nat))
    stableMap2Values(): bigint[] {
        return stableMap2.values();
    }

    // stableMap3 methods

    @query([Reaction], IDL.Bool)
    stableMap3ContainsKey(key: Reaction): boolean {
        return stableMap3.containsKey(key);
    }

    @query([Reaction], IDL.Opt(IDL.Int))
    stableMap3Get(key: Reaction): [bigint] | [] {
        return convertOpt(stableMap3.get(key));
    }

    @update([Reaction, IDL.Int], IDL.Opt(IDL.Int))
    stableMap3Insert(key: Reaction, value: bigint): [bigint] | [] {
        return convertOpt(stableMap3.insert(key, value));
    }

    @query([], IDL.Bool)
    stableMap3IsEmpty(): boolean {
        return stableMap3.isEmpty();
    }

    @query([], IDL.Vec(IDL.Tuple(Reaction, IDL.Int)))
    stableMap3Items(): [Reaction, bigint][] {
        return stableMap3.items();
    }

    @query([], IDL.Vec(Reaction))
    stableMap3Keys(): Reaction[] {
        return stableMap3.keys();
    }

    @query([], IDL.Nat64)
    stableMap3Len(): bigint {
        return stableMap3.len();
    }

    @update([Reaction], IDL.Opt(IDL.Int))
    stableMap3Remove(key: Reaction): [bigint] | [] {
        return convertOpt(stableMap3.remove(key));
    }

    @query([], IDL.Vec(IDL.Int))
    stableMap3Values(): bigint[] {
        return stableMap3.values();
    }

    // stableMap4 methods

    @query([User], IDL.Bool)
    stableMap4ContainsKey(key: User): boolean {
        return stableMap4.containsKey(key);
    }

    @query([User], IDL.Opt(IDL.Float32))
    stableMap4Get(key: User): [number] | [] {
        return convertOpt(stableMap4.get(key));
    }

    @update([User, IDL.Float32], IDL.Opt(IDL.Float32))
    stableMap4Insert(key: User, value: number): [number] | [] {
        return convertOpt(stableMap4.insert(key, value));
    }

    @query([], IDL.Bool)
    stableMap4IsEmpty(): boolean {
        return stableMap4.isEmpty();
    }

    @query([], IDL.Vec(IDL.Tuple(User, IDL.Float32)))
    stableMap4Items(): [User, number][] {
        return stableMap4.items();
    }

    @query([], IDL.Vec(User))
    stableMap4Keys(): User[] {
        return stableMap4.keys();
    }

    @query([], IDL.Nat64)
    stableMap4Len(): bigint {
        return stableMap4.len();
    }

    @update([User], IDL.Opt(IDL.Float32))
    stableMap4Remove(key: User): [number] | [] {
        return convertOpt(stableMap4.remove(key));
    }

    @query([], IDL.Vec(IDL.Float32))
    stableMap4Values(): number[] {
        return stableMap4.values();
    }
}
