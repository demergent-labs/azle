import {
    convertOpt,
    IDL,
    Principal,
    query,
    StableBTreeMap,
    update
} from 'azle';

import { Callback, Reaction, User } from '../types';

let stableMap10 = StableBTreeMap<number, [boolean] | []>(10);
let stableMap11 = StableBTreeMap<bigint, User>(11);
let stableMap12 = StableBTreeMap<Uint8Array, Reaction>(12);
let stableMap13 = StableBTreeMap<string, Principal>(13);
let stableMap14 = StableBTreeMap<string, Callback>(14);
let stableMap15 = StableBTreeMap<Callback, string>(15);
let stableMap16 = StableBTreeMap<string, object>(16);
let stableMap17 = StableBTreeMap<object, string>(17);

export default class {
    @query([], IDL.Bool)
    getRedeployed(): boolean {
        return globalThis._azlePostUpgradeCalled;
    }

    // stableMap10 methods

    @query([IDL.Float32], IDL.Bool)
    stableMap10ContainsKey(key: number): boolean {
        return stableMap10.containsKey(key);
    }

    @query([IDL.Float32], IDL.Opt(IDL.Opt(IDL.Bool)))
    stableMap10Get(key: number): [[boolean] | []] | [] {
        return convertOpt(stableMap10.get(key));
    }

    @update([IDL.Float32, IDL.Opt(IDL.Bool)], IDL.Opt(IDL.Opt(IDL.Bool)))
    stableMap10Insert(
        key: number,
        value: [boolean] | []
    ): [[boolean] | []] | [] {
        return convertOpt(stableMap10.insert(key, value));
    }

    @query([], IDL.Bool)
    stableMap10IsEmpty(): boolean {
        return stableMap10.isEmpty();
    }

    @query([], IDL.Vec(IDL.Tuple(IDL.Float32, IDL.Opt(IDL.Bool))))
    stableMap10Items(): [number, [boolean] | []][] {
        return stableMap10.items();
    }

    @query([], IDL.Vec(IDL.Float32))
    stableMap10Keys(): number[] {
        return stableMap10.keys();
    }

    @query([], IDL.Nat64)
    stableMap10Len(): bigint {
        return stableMap10.len();
    }

    @update([IDL.Float32], IDL.Opt(IDL.Opt(IDL.Bool)))
    stableMap10Remove(key: number): [[boolean] | []] | [] {
        return convertOpt(stableMap10.remove(key));
    }

    @query([], IDL.Vec(IDL.Opt(IDL.Bool)))
    stableMap10Values(): ([boolean] | [])[] {
        return stableMap10.values();
    }

    // stableMap11 methods

    @query([IDL.Nat], IDL.Bool)
    stableMap11ContainsKey(key: bigint): boolean {
        return stableMap11.containsKey(key);
    }

    @query([IDL.Nat], IDL.Opt(User))
    stableMap11Get(key: bigint): [User] | [] {
        return convertOpt(stableMap11.get(key));
    }

    @update([IDL.Nat, User], IDL.Opt(User))
    stableMap11Insert(key: bigint, value: User): [User] | [] {
        return convertOpt(stableMap11.insert(key, value));
    }

    @query([], IDL.Bool)
    stableMap11IsEmpty(): boolean {
        return stableMap11.isEmpty();
    }

    @query([], IDL.Vec(IDL.Tuple(IDL.Nat, User)))
    stableMap11Items(): [bigint, User][] {
        return stableMap11.items();
    }

    @query([], IDL.Vec(IDL.Nat))
    stableMap11Keys(): bigint[] {
        return stableMap11.keys();
    }

    @query([], IDL.Nat64)
    stableMap11Len(): bigint {
        return stableMap11.len();
    }

    @update([IDL.Nat], IDL.Opt(User))
    stableMap11Remove(key: bigint): [User] | [] {
        return convertOpt(stableMap11.remove(key));
    }

    @query([], IDL.Vec(User))
    stableMap11Values(): User[] {
        return stableMap11.values();
    }

    // stableMap12 methods

    @query([IDL.Vec(IDL.Nat8)], IDL.Bool)
    stableMap12ContainsKey(key: Uint8Array): boolean {
        return stableMap12.containsKey(key);
    }

    @query([IDL.Vec(IDL.Nat8)], IDL.Opt(Reaction))
    stableMap12Get(key: Uint8Array): [Reaction] | [] {
        return convertOpt(stableMap12.get(key));
    }

    @update([IDL.Vec(IDL.Nat8), Reaction], IDL.Opt(Reaction))
    stableMap12Insert(key: Uint8Array, value: Reaction): [Reaction] | [] {
        return convertOpt(stableMap12.insert(key, value));
    }

    @query([], IDL.Bool)
    stableMap12IsEmpty(): boolean {
        return stableMap12.isEmpty();
    }

    @query([], IDL.Vec(IDL.Tuple(IDL.Vec(IDL.Nat8), Reaction)))
    stableMap12Items(): [Uint8Array, Reaction][] {
        return stableMap12.items();
    }

    @query([], IDL.Vec(IDL.Vec(IDL.Nat8)))
    stableMap12Keys(): Uint8Array[] {
        return stableMap12.keys();
    }

    @query([], IDL.Nat64)
    stableMap12Len(): bigint {
        return stableMap12.len();
    }

    @update([IDL.Vec(IDL.Nat8)], IDL.Opt(Reaction))
    stableMap12Remove(key: Uint8Array): [Reaction] | [] {
        return convertOpt(stableMap12.remove(key));
    }

    @query([], IDL.Vec(Reaction))
    stableMap12Values(): Reaction[] {
        return stableMap12.values();
    }

    // stableMap13 methods

    @query([IDL.Text], IDL.Bool)
    stableMap13ContainsKey(key: string): boolean {
        return stableMap13.containsKey(key);
    }

    @query([IDL.Text], IDL.Opt(IDL.Principal))
    stableMap13Get(key: string): [Principal] | [] {
        return convertOpt(stableMap13.get(key));
    }

    @update([IDL.Text, IDL.Principal], IDL.Opt(IDL.Principal))
    stableMap13Insert(key: string, value: Principal): [Principal] | [] {
        return convertOpt(stableMap13.insert(key, value));
    }

    @query([], IDL.Bool)
    stableMap13IsEmpty(): boolean {
        return stableMap13.isEmpty();
    }

    @query([], IDL.Vec(IDL.Tuple(IDL.Text, IDL.Principal)))
    stableMap13Items(): [string, Principal][] {
        return stableMap13.items();
    }

    @query([], IDL.Vec(IDL.Text))
    stableMap13Keys(): string[] {
        return stableMap13.keys();
    }

    @query([], IDL.Nat64)
    stableMap13Len(): bigint {
        return stableMap13.len();
    }

    @update([IDL.Text], IDL.Opt(IDL.Principal))
    stableMap13Remove(key: string): [Principal] | [] {
        return convertOpt(stableMap13.remove(key));
    }

    @query([], IDL.Vec(IDL.Principal))
    stableMap13Values(): Principal[] {
        return stableMap13.values();
    }

    // stableMap14 methods

    @query([IDL.Text], IDL.Bool)
    stableMap14ContainsKey(key: string): boolean {
        return stableMap14.containsKey(key);
    }

    @query([IDL.Text], IDL.Opt(Callback))
    stableMap14Get(key: string): [Callback] | [] {
        return convertOpt(stableMap14.get(key));
    }

    @update([IDL.Text, Callback], IDL.Opt(Callback))
    stableMap14Insert(key: string, value: Callback): [Callback] | [] {
        return convertOpt(stableMap14.insert(key, value));
    }

    @query([], IDL.Bool)
    stableMap14IsEmpty(): boolean {
        return stableMap14.isEmpty();
    }

    @query([], IDL.Vec(IDL.Tuple(IDL.Text, Callback)))
    stableMap14Items(): [string, Callback][] {
        return stableMap14.items();
    }

    @query([], IDL.Vec(IDL.Text))
    stableMap14Keys(): string[] {
        return stableMap14.keys();
    }

    @query([], IDL.Nat64)
    stableMap14Len(): bigint {
        return stableMap14.len();
    }

    @update([IDL.Text], IDL.Opt(Callback))
    stableMap14Remove(key: string): [Callback] | [] {
        return convertOpt(stableMap14.remove(key));
    }

    @query([], IDL.Vec(Callback))
    stableMap14Values(): Callback[] {
        return stableMap14.values();
    }

    // stableMap15 methods

    @query([Callback], IDL.Bool)
    stableMap15ContainsKey(key: Callback): boolean {
        return stableMap15.containsKey(key);
    }

    @query([Callback], IDL.Opt(IDL.Text))
    stableMap15Get(key: Callback): [string] | [] {
        return convertOpt(stableMap15.get(key));
    }

    @update([Callback, IDL.Text], IDL.Opt(IDL.Text))
    stableMap15Insert(key: Callback, value: string): [string] | [] {
        return convertOpt(stableMap15.insert(key, value));
    }

    @query([], IDL.Bool)
    stableMap15IsEmpty(): boolean {
        return stableMap15.isEmpty();
    }

    @query([], IDL.Vec(IDL.Tuple(Callback, IDL.Text)))
    stableMap15Items(): [Callback, string][] {
        return stableMap15.items();
    }

    @query([], IDL.Vec(Callback))
    stableMap15Keys(): Callback[] {
        return stableMap15.keys();
    }

    @query([], IDL.Nat64)
    stableMap15Len(): bigint {
        return stableMap15.len();
    }

    @update([Callback], IDL.Opt(IDL.Text))
    stableMap15Remove(key: Callback): [string] | [] {
        return convertOpt(stableMap15.remove(key));
    }

    @query([], IDL.Vec(IDL.Text))
    stableMap15Values(): string[] {
        return stableMap15.values();
    }

    // stableMap16 methods

    @query([IDL.Text], IDL.Bool)
    stableMap16ContainsKey(key: string): boolean {
        return stableMap16.containsKey(key);
    }

    @query([IDL.Text], IDL.Opt(IDL.Text))
    stableMap16Get(key: string): [string] | [] {
        const result = stableMap16.get(key);
        if ('None' in result) {
            return [];
        }
        return [JSON.stringify(result.Some)];
    }

    @update([IDL.Text, IDL.Text], IDL.Opt(IDL.Text))
    stableMap16Insert(key: string, value: string): [string] | [] {
        const result = stableMap16.insert(key, JSON.parse(value));
        if ('None' in result) {
            return [];
        }
        return [JSON.stringify(result.Some)];
    }

    @query([], IDL.Bool)
    stableMap16IsEmpty(): boolean {
        return stableMap16.isEmpty();
    }

    @query([], IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text)))
    stableMap16Items(): [string, string][] {
        return stableMap16.items().map(([key, value]) => {
            return [key, JSON.stringify(value)];
        });
    }

    @query([], IDL.Vec(IDL.Text))
    stableMap16Keys(): string[] {
        return stableMap16.keys();
    }

    @query([], IDL.Nat64)
    stableMap16Len(): bigint {
        return stableMap16.len();
    }

    @update([IDL.Text], IDL.Opt(IDL.Text))
    stableMap16Remove(key: string): [string] | [] {
        const result = stableMap16.remove(key);
        if ('None' in result) {
            return [];
        }
        return [JSON.stringify(result.Some)];
    }

    @query([], IDL.Vec(IDL.Text))
    stableMap16Values(): string[] {
        return stableMap16.values().map((value) => JSON.stringify(value));
    }

    // stableMap17 methods

    @query([IDL.Text], IDL.Bool)
    stableMap17ContainsKey(key: string): boolean {
        return stableMap17.containsKey(JSON.parse(key));
    }

    @query([IDL.Text], IDL.Opt(IDL.Text))
    stableMap17Get(key: string): [string] | [] {
        return convertOpt(stableMap17.get(JSON.parse(key)));
    }

    @update([IDL.Text, IDL.Text], IDL.Opt(IDL.Text))
    stableMap17Insert(key: string, value: string): [string] | [] {
        return convertOpt(stableMap17.insert(JSON.parse(key), value));
    }

    @query([], IDL.Bool)
    stableMap17IsEmpty(): boolean {
        return stableMap17.isEmpty();
    }

    @query([], IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text)))
    stableMap17Items(): [string, string][] {
        return stableMap17.items().map(([key, value]) => {
            return [JSON.stringify(key), value];
        });
    }

    @query([], IDL.Vec(IDL.Text))
    stableMap17Keys(): string[] {
        return stableMap17.keys().map((key) => JSON.stringify(key));
    }

    @query([], IDL.Nat64)
    stableMap17Len(): bigint {
        return stableMap17.len();
    }

    @update([IDL.Text], IDL.Opt(IDL.Text))
    stableMap17Remove(key: string): [string] | [] {
        return convertOpt(stableMap17.remove(JSON.parse(key)));
    }

    @query([], IDL.Vec(IDL.Text))
    stableMap17Values(): string[] {
        return stableMap17.values();
    }
}
