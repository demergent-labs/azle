import { IDL, query, StableBTreeMap, update } from 'azle';

export default class {
    stableMap5 = StableBTreeMap<[string] | [], number>(5);
    stableMap6 = StableBTreeMap<bigint[], boolean>(6);
    stableMap7 = StableBTreeMap<null, null>(7);
    stableMap8 = StableBTreeMap<boolean, null>(8);
    stableMap9 = StableBTreeMap<number, string[]>(9);

    @query([], IDL.Bool)
    getRedeployed(): boolean {
        return globalThis._azlePostUpgradeCalled;
    }

    // stableMap5 methods

    @query([IDL.Opt(IDL.Text)], IDL.Bool)
    stableMap5ContainsKey(key: [string] | []): boolean {
        return this.stableMap5.containsKey(key);
    }

    @query([IDL.Opt(IDL.Text)], IDL.Opt(IDL.Float64))
    stableMap5Get(key: [string] | []): [number] | [] {
        const result = this.stableMap5.get(key);
        if (result === null) {
            return [];
        } else {
            return [result];
        }
    }

    @update([IDL.Opt(IDL.Text), IDL.Float64], IDL.Opt(IDL.Float64))
    stableMap5Insert(key: [string] | [], value: number): [number] | [] {
        const result = this.stableMap5.insert(key, value);
        if (result === null) {
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

    @query([], IDL.Nat64)
    stableMap5Len(): bigint {
        return this.stableMap5.len();
    }

    @update([IDL.Opt(IDL.Text)], IDL.Opt(IDL.Float64))
    stableMap5Remove(key: [string] | []): [number] | [] {
        const result = this.stableMap5.remove(key);
        if (result === null) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Vec(IDL.Float64))
    stableMap5Values(): number[] {
        return this.stableMap5.values();
    }

    // stableMap6 methods

    @query([IDL.Vec(IDL.Nat64)], IDL.Bool)
    stableMap6ContainsKey(key: bigint[]): boolean {
        return this.stableMap6.containsKey(key);
    }

    @query([IDL.Vec(IDL.Nat64)], IDL.Opt(IDL.Bool))
    stableMap6Get(key: bigint[]): [boolean] | [] {
        const result = this.stableMap6.get(key);
        if (result === null) {
            return [];
        } else {
            return [result];
        }
    }

    @update([IDL.Vec(IDL.Nat64), IDL.Bool], IDL.Opt(IDL.Bool))
    stableMap6Insert(key: bigint[], value: boolean): [boolean] | [] {
        const result = this.stableMap6.insert(key, value);
        if (result === null) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Bool)
    stableMap6IsEmpty(): boolean {
        return this.stableMap6.isEmpty();
    }

    @query([], IDL.Vec(IDL.Tuple(IDL.Vec(IDL.Nat64), IDL.Bool)))
    stableMap6Items(): [bigint[], boolean][] {
        return this.stableMap6.items();
    }

    @query([], IDL.Vec(IDL.Vec(IDL.Nat64)))
    stableMap6Keys(): bigint[][] {
        return this.stableMap6.keys();
    }

    @query([], IDL.Nat64)
    stableMap6Len(): bigint {
        return this.stableMap6.len();
    }

    @update([IDL.Vec(IDL.Nat64)], IDL.Opt(IDL.Bool))
    stableMap6Remove(key: bigint[]): [boolean] | [] {
        const result = this.stableMap6.remove(key);
        if (result === null) {
            return [];
        } else {
            return [result];
        }
    }

    @query([], IDL.Vec(IDL.Bool))
    stableMap6Values(): boolean[] {
        return this.stableMap6.values();
    }

    // stableMap7 methods

    @query([IDL.Null], IDL.Bool)
    stableMap7ContainsKey(key: null): boolean {
        return this.stableMap7.containsKey(key);
    }

    @query([IDL.Null], IDL.Opt(IDL.Null))
    stableMap7Get(key: null): [null] | [] {
        const result = this.stableMap7.get(key);
        if (this.stableMap7.containsKey(key)) {
            return [result];
        } else {
            return [];
        }
    }

    @update([IDL.Null, IDL.Null], IDL.Opt(IDL.Null))
    stableMap7Insert(key: null, value: null): [null] | [] {
        const hasOldValue = this.stableMap7.containsKey(key);
        const result = this.stableMap7.insert(key, value);
        if (hasOldValue) {
            return [result];
        } else {
            return [];
        }
    }

    @query([], IDL.Bool)
    stableMap7IsEmpty(): boolean {
        return this.stableMap7.isEmpty();
    }

    @query([], IDL.Vec(IDL.Tuple(IDL.Null, IDL.Null)))
    stableMap7Items(): [null, null][] {
        return this.stableMap7.items();
    }

    @query([], IDL.Vec(IDL.Null))
    stableMap7Keys(): null[] {
        return this.stableMap7.keys();
    }

    @query([], IDL.Nat64)
    stableMap7Len(): bigint {
        return this.stableMap7.len();
    }

    @update([IDL.Null], IDL.Opt(IDL.Null))
    stableMap7Remove(key: null): [null] | [] {
        const hasOldValue = this.stableMap7.containsKey(key);
        const result = this.stableMap7.remove(key);
        if (hasOldValue) {
            return [result];
        } else {
            return [];
        }
    }

    @query([], IDL.Vec(IDL.Null))
    stableMap7Values(): null[] {
        return this.stableMap7.values();
    }

    // stableMap8 methods

    @query([IDL.Bool], IDL.Bool)
    stableMap8ContainsKey(key: boolean): boolean {
        return this.stableMap8.containsKey(key);
    }

    @query([IDL.Bool], IDL.Opt(IDL.Null))
    stableMap8Get(key: boolean): [null] | [] {
        const result = this.stableMap8.get(key);
        if (this.stableMap8.containsKey(key)) {
            return [result];
        } else {
            return [];
        }
    }

    @update([IDL.Bool, IDL.Null], IDL.Opt(IDL.Null))
    stableMap8Insert(key: boolean, value: null): [null] | [] {
        const hasOldValue = this.stableMap8.containsKey(key);
        const result = this.stableMap8.insert(key, value);
        if (hasOldValue) {
            return [result];
        } else {
            return [];
        }
    }

    @query([], IDL.Bool)
    stableMap8IsEmpty(): boolean {
        return this.stableMap8.isEmpty();
    }

    @query([], IDL.Vec(IDL.Tuple(IDL.Bool, IDL.Null)))
    stableMap8Items(): [boolean, null][] {
        return this.stableMap8.items();
    }

    @query([], IDL.Vec(IDL.Bool))
    stableMap8Keys(): boolean[] {
        return this.stableMap8.keys();
    }

    @query([], IDL.Nat64)
    stableMap8Len(): bigint {
        return this.stableMap8.len();
    }

    @update([IDL.Bool], IDL.Opt(IDL.Null))
    stableMap8Remove(key: boolean): [null] | [] {
        const hasOldValue = this.stableMap8.containsKey(key);
        const result = this.stableMap8.remove(key);
        if (hasOldValue) {
            return [result];
        } else {
            return [];
        }
    }

    @query([], IDL.Vec(IDL.Null))
    stableMap8Values(): null[] {
        return this.stableMap8.values();
    }

    // stableMap9 methods

    @query([IDL.Float64], IDL.Bool)
    stableMap9ContainsKey(key: number): boolean {
        return this.stableMap9.containsKey(key);
    }

    @query([IDL.Float64], IDL.Opt(IDL.Vec(IDL.Text)))
    stableMap9Get(key: number): [string[]] | [] {
        const result = this.stableMap9.get(key);
        if (result === null) {
            return [];
        } else {
            return [result];
        }
    }

    @update([IDL.Float64, IDL.Vec(IDL.Text)], IDL.Opt(IDL.Vec(IDL.Text)))
    stableMap9Insert(key: number, value: string[]): [string[]] | [] {
        const result = this.stableMap9.insert(key, value);
        if (result === null) {
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

    @query([], IDL.Nat64)
    stableMap9Len(): bigint {
        return this.stableMap9.len();
    }

    @update([IDL.Float64], IDL.Opt(IDL.Vec(IDL.Text)))
    stableMap9Remove(key: number): [string[]] | [] {
        const result = this.stableMap9.remove(key);
        if (result === null) {
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
