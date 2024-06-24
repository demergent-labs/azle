import { convertOpt, IDL, query, StableBTreeMap, update } from 'azle';

let stableMap5 = StableBTreeMap<[string] | [], number>(5);
let stableMap6 = StableBTreeMap<bigint[], boolean>(6);
let stableMap7 = StableBTreeMap<null, null>(7);
let stableMap8 = StableBTreeMap<boolean, null>(8);
let stableMap9 = StableBTreeMap<number, string[]>(9);

export default class {
    @query([], IDL.Bool)
    getRedeployed(): boolean {
        return globalThis._azlePostUpgradeCalled;
    }

    // stableMap5 methods

    @query([IDL.Opt(IDL.Text)], IDL.Bool)
    stableMap5ContainsKey(key: [string] | []): boolean {
        return stableMap5.containsKey(key);
    }

    @query([IDL.Opt(IDL.Text)], IDL.Opt(IDL.Float64))
    stableMap5Get(key: [string] | []): [number] | [] {
        return convertOpt(stableMap5.get(key));
    }

    @update([IDL.Opt(IDL.Text), IDL.Float64], IDL.Opt(IDL.Float64))
    stableMap5Insert(key: [string] | [], value: number): [number] | [] {
        return convertOpt(stableMap5.insert(key, value));
    }

    @query([], IDL.Bool)
    stableMap5IsEmpty(): boolean {
        return stableMap5.isEmpty();
    }

    @query([], IDL.Vec(IDL.Tuple(IDL.Opt(IDL.Text), IDL.Float64)))
    stableMap5Items(): [[string] | [], number][] {
        return stableMap5.items();
    }

    @query([], IDL.Vec(IDL.Opt(IDL.Text)))
    stableMap5Keys(): ([string] | [])[] {
        return stableMap5.keys();
    }

    @query([], IDL.Nat64)
    stableMap5Len(): bigint {
        return stableMap5.len();
    }

    @update([IDL.Opt(IDL.Text)], IDL.Opt(IDL.Float64))
    stableMap5Remove(key: [string] | []): [number] | [] {
        return convertOpt(stableMap5.remove(key));
    }

    @query([], IDL.Vec(IDL.Float64))
    stableMap5Values(): number[] {
        return stableMap5.values();
    }

    // stableMap6 methods

    @query([IDL.Vec(IDL.Nat64)], IDL.Bool)
    stableMap6ContainsKey(key: bigint[]): boolean {
        return stableMap6.containsKey(key);
    }

    @query([IDL.Vec(IDL.Nat64)], IDL.Opt(IDL.Bool))
    stableMap6Get(key: bigint[]): [boolean] | [] {
        return convertOpt(stableMap6.get(key));
    }

    @update([IDL.Vec(IDL.Nat64), IDL.Bool], IDL.Opt(IDL.Bool))
    stableMap6Insert(key: bigint[], value: boolean): [boolean] | [] {
        return convertOpt(stableMap6.insert(key, value));
    }

    @query([], IDL.Bool)
    stableMap6IsEmpty(): boolean {
        return stableMap6.isEmpty();
    }

    @query([], IDL.Vec(IDL.Tuple(IDL.Vec(IDL.Nat64), IDL.Bool)))
    stableMap6Items(): [bigint[], boolean][] {
        return stableMap6.items();
    }

    @query([], IDL.Vec(IDL.Vec(IDL.Nat64)))
    stableMap6Keys(): bigint[][] {
        return stableMap6.keys();
    }

    @query([], IDL.Nat64)
    stableMap6Len(): bigint {
        return stableMap6.len();
    }

    @update([IDL.Vec(IDL.Nat64)], IDL.Opt(IDL.Bool))
    stableMap6Remove(key: bigint[]): [boolean] | [] {
        return convertOpt(stableMap6.remove(key));
    }

    @query([], IDL.Vec(IDL.Bool))
    stableMap6Values(): boolean[] {
        return stableMap6.values();
    }

    // stableMap7 methods

    @query([IDL.Null], IDL.Bool)
    stableMap7ContainsKey(key: null): boolean {
        return stableMap7.containsKey(key);
    }

    @query([IDL.Null], IDL.Opt(IDL.Null))
    stableMap7Get(key: null): [null] | [] {
        return convertOpt(stableMap7.get(key));
    }

    @update([IDL.Null, IDL.Null], IDL.Opt(IDL.Null))
    stableMap7Insert(key: null, value: null): [null] | [] {
        return convertOpt(stableMap7.insert(key, value));
    }

    @query([], IDL.Bool)
    stableMap7IsEmpty(): boolean {
        return stableMap7.isEmpty();
    }

    @query([], IDL.Vec(IDL.Tuple(IDL.Null, IDL.Null)))
    stableMap7Items(): [null, null][] {
        return stableMap7.items();
    }

    @query([], IDL.Vec(IDL.Null))
    stableMap7Keys(): null[] {
        return stableMap7.keys();
    }

    @query([], IDL.Nat64)
    stableMap7Len(): bigint {
        return stableMap7.len();
    }

    @update([IDL.Null], IDL.Opt(IDL.Null))
    stableMap7Remove(key: null): [null] | [] {
        return convertOpt(stableMap7.remove(key));
    }

    @query([], IDL.Vec(IDL.Null))
    stableMap7Values(): null[] {
        return stableMap7.values();
    }

    // stableMap8 methods

    @query([IDL.Bool], IDL.Bool)
    stableMap8ContainsKey(key: boolean): boolean {
        return stableMap8.containsKey(key);
    }

    @query([IDL.Bool], IDL.Opt(IDL.Null))
    stableMap8Get(key: boolean): [null] | [] {
        return convertOpt(stableMap8.get(key));
    }

    @update([IDL.Bool, IDL.Null], IDL.Opt(IDL.Null))
    stableMap8Insert(key: boolean, value: null): [null] | [] {
        return convertOpt(stableMap8.insert(key, value));
    }

    @query([], IDL.Bool)
    stableMap8IsEmpty(): boolean {
        return stableMap8.isEmpty();
    }

    @query([], IDL.Vec(IDL.Tuple(IDL.Bool, IDL.Null)))
    stableMap8Items(): [boolean, null][] {
        return stableMap8.items();
    }

    @query([], IDL.Vec(IDL.Bool))
    stableMap8Keys(): boolean[] {
        return stableMap8.keys();
    }

    @query([], IDL.Nat64)
    stableMap8Len(): bigint {
        return stableMap8.len();
    }

    @update([IDL.Bool], IDL.Opt(IDL.Null))
    stableMap8Remove(key: boolean): [null] | [] {
        return convertOpt(stableMap8.remove(key));
    }

    @query([], IDL.Vec(IDL.Null))
    stableMap8Values(): null[] {
        return stableMap8.values();
    }

    // stableMap9 methods

    @query([IDL.Float64], IDL.Bool)
    stableMap9ContainsKey(key: number): boolean {
        return stableMap9.containsKey(key);
    }

    @query([IDL.Float64], IDL.Opt(IDL.Vec(IDL.Text)))
    stableMap9Get(key: number): [string[]] | [] {
        return convertOpt(stableMap9.get(key));
    }

    @update([IDL.Float64, IDL.Vec(IDL.Text)], IDL.Opt(IDL.Vec(IDL.Text)))
    stableMap9Insert(key: number, value: string[]): [string[]] | [] {
        return convertOpt(stableMap9.insert(key, value));
    }

    @query([], IDL.Bool)
    stableMap9IsEmpty(): boolean {
        return stableMap9.isEmpty();
    }

    @query([], IDL.Vec(IDL.Tuple(IDL.Float64, IDL.Vec(IDL.Text))))
    stableMap9Items(): [number, string[]][] {
        return stableMap9.items();
    }

    @query([], IDL.Vec(IDL.Float64))
    stableMap9Keys(): number[] {
        return stableMap9.keys();
    }

    @query([], IDL.Nat64)
    stableMap9Len(): bigint {
        return stableMap9.len();
    }

    @update([IDL.Float64], IDL.Opt(IDL.Vec(IDL.Text)))
    stableMap9Remove(key: number): [string[]] | [] {
        return convertOpt(stableMap9.remove(key));
    }

    @query([], IDL.Vec(IDL.Vec(IDL.Text)))
    stableMap9Values(): string[][] {
        return stableMap9.values();
    }
}
