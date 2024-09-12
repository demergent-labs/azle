import { IDL, Principal, query, StableBTreeMap, update } from 'azle';

import { Callback, Reaction, User } from '../types';

export default class {
    stableMap10 = StableBTreeMap<number, [boolean] | []>(10);
    stableMap11 = StableBTreeMap<bigint, User>(11);
    stableMap12 = StableBTreeMap<Uint8Array, Reaction>(12);
    stableMap13 = StableBTreeMap<string, Principal>(13);
    stableMap14 = StableBTreeMap<string, Callback>(14);
    stableMap15 = StableBTreeMap<Callback, string>(15);
    stableMap16 = StableBTreeMap<string, object>(16);
    stableMap17 = StableBTreeMap<object, string>(17);

    @query([], IDL.Bool)
    getRedeployed(): boolean {
        return globalThis._azlePostUpgradeCalled;
    }

    // stableMap10 methods

    @query([IDL.Float32], IDL.Bool)
    stableMap10ContainsKey(key: number): boolean {
        return this.stableMap10.containsKey(key);
    }

    @query([IDL.Float32], IDL.Opt(IDL.Opt(IDL.Bool)))
    stableMap10Get(key: number): [[boolean] | []] | [] {
        const result = this.stableMap10.get(key);
        if (result === null) {
            return [];
        } else {
            return [result];
        }
    }

    @update([IDL.Float32, IDL.Opt(IDL.Bool)], IDL.Opt(IDL.Opt(IDL.Bool)))
    stableMap10Insert(
        key: number,
        value: [boolean] | []
    ): [[boolean] | []] | [] {
        const result = this.stableMap10.insert(key, value);
        if (result === null) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Bool)
    stableMap10IsEmpty(): boolean {
        return this.stableMap10.isEmpty();
    }

    @query([], IDL.Vec(IDL.Tuple(IDL.Float32, IDL.Opt(IDL.Bool))))
    stableMap10Items(): [number, [boolean] | []][] {
        return this.stableMap10.items();
    }

    @query([], IDL.Vec(IDL.Float32))
    stableMap10Keys(): number[] {
        return this.stableMap10.keys();
    }

    @query([], IDL.Nat64)
    stableMap10Len(): bigint {
        return this.stableMap10.len();
    }

    @update([IDL.Float32], IDL.Opt(IDL.Opt(IDL.Bool)))
    stableMap10Remove(key: number): [[boolean] | []] | [] {
        const result = this.stableMap10.remove(key);
        if (result === null) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Vec(IDL.Opt(IDL.Bool)))
    stableMap10Values(): ([boolean] | [])[] {
        return this.stableMap10.values();
    }

    // stableMap11 methods

    @query([IDL.Nat], IDL.Bool)
    stableMap11ContainsKey(key: bigint): boolean {
        return this.stableMap11.containsKey(key);
    }

    @query([IDL.Nat], IDL.Opt(User))
    stableMap11Get(key: bigint): [User] | [] {
        const result = this.stableMap11.get(key);
        if (result === null) {
            return [];
        } else {
            return [result];
        }
    }

    @update([IDL.Nat, User], IDL.Opt(User))
    stableMap11Insert(key: bigint, value: User): [User] | [] {
        const result = this.stableMap11.insert(key, value);
        if (result === null) {
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

    @query([], IDL.Nat64)
    stableMap11Len(): bigint {
        return this.stableMap11.len();
    }

    @update([IDL.Nat], IDL.Opt(User))
    stableMap11Remove(key: bigint): [User] | [] {
        const result = this.stableMap11.remove(key);
        if (result === null) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Vec(User))
    stableMap11Values(): User[] {
        return this.stableMap11.values();
    }

    // stableMap12 methods

    @query([IDL.Vec(IDL.Nat8)], IDL.Bool)
    stableMap12ContainsKey(key: Uint8Array): boolean {
        return this.stableMap12.containsKey(key);
    }

    @query([IDL.Vec(IDL.Nat8)], IDL.Opt(Reaction))
    stableMap12Get(key: Uint8Array): [Reaction] | [] {
        const result = this.stableMap12.get(key);
        if (result === null) {
            return [];
        } else {
            return [result];
        }
    }

    @update([IDL.Vec(IDL.Nat8), Reaction], IDL.Opt(Reaction))
    stableMap12Insert(key: Uint8Array, value: Reaction): [Reaction] | [] {
        const result = this.stableMap12.insert(key, value);
        if (result === null) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Bool)
    stableMap12IsEmpty(): boolean {
        return this.stableMap12.isEmpty();
    }

    @query([], IDL.Vec(IDL.Tuple(IDL.Vec(IDL.Nat8), Reaction)))
    stableMap12Items(): [Uint8Array, Reaction][] {
        return this.stableMap12.items();
    }

    @query([], IDL.Vec(IDL.Vec(IDL.Nat8)))
    stableMap12Keys(): Uint8Array[] {
        return this.stableMap12.keys();
    }

    @query([], IDL.Nat64)
    stableMap12Len(): bigint {
        return this.stableMap12.len();
    }

    @update([IDL.Vec(IDL.Nat8)], IDL.Opt(Reaction))
    stableMap12Remove(key: Uint8Array): [Reaction] | [] {
        const result = this.stableMap12.remove(key);
        if (result === null) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Vec(Reaction))
    stableMap12Values(): Reaction[] {
        return this.stableMap12.values();
    }

    // stableMap13 methods

    @query([IDL.Text], IDL.Bool)
    stableMap13ContainsKey(key: string): boolean {
        return this.stableMap13.containsKey(key);
    }

    @query([IDL.Text], IDL.Opt(IDL.Principal))
    stableMap13Get(key: string): [Principal] | [] {
        const result = this.stableMap13.get(key);
        if (result === null) {
            return [];
        } else {
            return [result];
        }
    }

    @update([IDL.Text, IDL.Principal], IDL.Opt(IDL.Principal))
    stableMap13Insert(key: string, value: Principal): [Principal] | [] {
        const result = this.stableMap13.insert(key, value);
        if (result === null) {
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

    @query([], IDL.Nat64)
    stableMap13Len(): bigint {
        return this.stableMap13.len();
    }

    @update([IDL.Text], IDL.Opt(IDL.Principal))
    stableMap13Remove(key: string): [Principal] | [] {
        const result = this.stableMap13.remove(key);
        if (result === null) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Vec(IDL.Principal))
    stableMap13Values(): Principal[] {
        return this.stableMap13.values();
    }

    // stableMap14 methods

    @query([IDL.Text], IDL.Bool)
    stableMap14ContainsKey(key: string): boolean {
        return this.stableMap14.containsKey(key);
    }

    @query([IDL.Text], IDL.Opt(Callback))
    stableMap14Get(key: string): [Callback] | [] {
        const result = this.stableMap14.get(key);
        if (result === null) {
            return [];
        } else {
            return [result];
        }
    }

    @update([IDL.Text, Callback], IDL.Opt(Callback))
    stableMap14Insert(key: string, value: Callback): [Callback] | [] {
        const result = this.stableMap14.insert(key, value);
        if (result === null) {
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

    @query([], IDL.Nat64)
    stableMap14Len(): bigint {
        return this.stableMap14.len();
    }

    @update([IDL.Text], IDL.Opt(Callback))
    stableMap14Remove(key: string): [Callback] | [] {
        const result = this.stableMap14.remove(key);
        if (result === null) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Vec(Callback))
    stableMap14Values(): Callback[] {
        return this.stableMap14.values();
    }

    // stableMap15 methods

    @query([Callback], IDL.Bool)
    stableMap15ContainsKey(key: Callback): boolean {
        return this.stableMap15.containsKey(key);
    }

    @query([Callback], IDL.Opt(IDL.Text))
    stableMap15Get(key: Callback): [string] | [] {
        const result = this.stableMap15.get(key);
        if (result === null) {
            return [];
        } else {
            return [result];
        }
    }

    @update([Callback, IDL.Text], IDL.Opt(IDL.Text))
    stableMap15Insert(key: Callback, value: string): [string] | [] {
        const result = this.stableMap15.insert(key, value);
        if (result === null) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Bool)
    stableMap15IsEmpty(): boolean {
        return this.stableMap15.isEmpty();
    }

    @query([], IDL.Vec(IDL.Tuple(Callback, IDL.Text)))
    stableMap15Items(): [Callback, string][] {
        return this.stableMap15.items();
    }

    @query([], IDL.Vec(Callback))
    stableMap15Keys(): Callback[] {
        return this.stableMap15.keys();
    }

    @query([], IDL.Nat64)
    stableMap15Len(): bigint {
        return this.stableMap15.len();
    }

    @update([Callback], IDL.Opt(IDL.Text))
    stableMap15Remove(key: Callback): [string] | [] {
        const result = this.stableMap15.remove(key);
        if (result === null) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Vec(IDL.Text))
    stableMap15Values(): string[] {
        return this.stableMap15.values();
    }

    // stableMap16 methods

    @query([IDL.Text], IDL.Bool)
    stableMap16ContainsKey(key: string): boolean {
        return this.stableMap16.containsKey(key);
    }

    @query([IDL.Text], IDL.Opt(IDL.Text))
    stableMap16Get(key: string): [string] | [] {
        const result = this.stableMap16.get(key);
        if (result === null) {
            return [];
        } else {
            return [JSON.stringify(result)];
        }
    }

    @update([IDL.Text, IDL.Text], IDL.Opt(IDL.Text))
    stableMap16Insert(key: string, value: string): [string] | [] {
        const result = this.stableMap16.insert(key, JSON.parse(value));
        if (result === null) {
            return [];
        } else {
            return [JSON.stringify(result)];
        }
    }

    @query([], IDL.Bool)
    stableMap16IsEmpty(): boolean {
        return this.stableMap16.isEmpty();
    }

    @query([], IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text)))
    stableMap16Items(): [string, string][] {
        return this.stableMap16.items().map(([key, value]) => {
            return [key, JSON.stringify(value)];
        });
    }

    @query([], IDL.Vec(IDL.Text))
    stableMap16Keys(): string[] {
        return this.stableMap16.keys();
    }

    @query([], IDL.Nat64)
    stableMap16Len(): bigint {
        return this.stableMap16.len();
    }

    @update([IDL.Text], IDL.Opt(IDL.Text))
    stableMap16Remove(key: string): [string] | [] {
        const result = this.stableMap16.remove(key);
        if (result === null) {
            return [];
        } else {
            return [JSON.stringify(result)];
        }
    }

    @query([], IDL.Vec(IDL.Text))
    stableMap16Values(): string[] {
        return this.stableMap16.values().map((value) => JSON.stringify(value));
    }

    // stableMap17 methods

    @query([IDL.Text], IDL.Bool)
    stableMap17ContainsKey(key: string): boolean {
        return this.stableMap17.containsKey(JSON.parse(key));
    }

    @query([IDL.Text], IDL.Opt(IDL.Text))
    stableMap17Get(key: string): [string] | [] {
        const result = this.stableMap17.get(JSON.parse(key));
        if (result === null) {
            return [];
        } else {
            return [result];
        }
    }

    @update([IDL.Text, IDL.Text], IDL.Opt(IDL.Text))
    stableMap17Insert(key: string, value: string): [string] | [] {
        const result = this.stableMap17.insert(JSON.parse(key), value);
        if (result === null) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Bool)
    stableMap17IsEmpty(): boolean {
        return this.stableMap17.isEmpty();
    }

    @query([], IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text)))
    stableMap17Items(): [string, string][] {
        return this.stableMap17.items().map(([key, value]) => {
            return [JSON.stringify(key), value];
        });
    }

    @query([], IDL.Vec(IDL.Text))
    stableMap17Keys(): string[] {
        return this.stableMap17.keys().map((key) => JSON.stringify(key));
    }

    @query([], IDL.Nat64)
    stableMap17Len(): bigint {
        return this.stableMap17.len();
    }

    @update([IDL.Text], IDL.Opt(IDL.Text))
    stableMap17Remove(key: string): [string] | [] {
        const result = this.stableMap17.remove(JSON.parse(key));
        if (result === null) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Vec(IDL.Text))
    stableMap17Values(): string[] {
        return this.stableMap17.values();
    }
}
