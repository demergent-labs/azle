import {
    blob,
    bool,
    float32,
    nat,
    nat64,
    Opt,
    principal,
    Principal,
    query,
    Service,
    StableBTreeMap,
    text,
    Tuple,
    update,
    Vec
} from 'azle';
import { Reaction, User } from '../types';

export default class extends Service {
    stableMap10 = new StableBTreeMap<float32, Opt<bool>>(
        float32,
        Opt(bool) as any,
        10
    );

    @query([float32], bool)
    stableMap10ContainsKey(key: float32): bool {
        return this.stableMap10.containsKey(key);
    }

    @query([float32], Opt(Opt(bool)))
    stableMap10Get(key: float32): Opt<Opt<bool>> {
        return this.stableMap10.get(key);
    }

    @update([float32, Opt(bool)], Opt(Opt(bool)))
    stableMap10Insert(key: float32, value: Opt<bool>): Opt<Opt<bool>> {
        return this.stableMap10.insert(key, value);
    }

    @query([], bool)
    stableMap10IsEmpty(): bool {
        return this.stableMap10.isEmpty();
    }

    @query([], Vec(Tuple(float32, Opt(bool))))
    stableMap10Items(): Vec<Tuple<[float32, Opt<boolean>]>> {
        return this.stableMap10.items();
    }

    @query([], Vec(float32))
    stableMap10Keys(): Vec<float32> {
        return this.stableMap10.keys();
    }

    @query([], nat64)
    stableMap10Len(): nat64 {
        return this.stableMap10.len();
    }

    @update([float32], Opt(Opt(bool)))
    stableMap10Remove(key: float32): Opt<Opt<bool>> {
        return this.stableMap10.remove(key);
    }

    @query([], Vec(Opt(bool)))
    stableMap10Values(): Vec<Opt<bool>> {
        return this.stableMap10.values();
    }

    stableMap11 = new StableBTreeMap<nat, User>(nat, User as any, 11);

    @query([nat], bool)
    stableMap11ContainsKey(key: nat): bool {
        return this.stableMap11.containsKey(key);
    }

    @query([nat], Opt(User))
    stableMap11Get(key: nat): Opt<User> {
        return this.stableMap11.get(key);
    }

    @update([nat, User], Opt(User))
    stableMap11Insert(key: nat, value: User): Opt<User> {
        return this.stableMap11.insert(key, value);
    }

    @query([], bool)
    stableMap11IsEmpty(): bool {
        return this.stableMap11.isEmpty();
    }

    @query([], Vec(Tuple(nat, User)))
    stableMap11Items(): Vec<Tuple<[nat, User]>> {
        return this.stableMap11.items();
    }

    @query([], Vec(nat))
    stableMap11Keys(): Vec<nat> {
        return this.stableMap11.keys();
    }

    @query([], nat64)
    stableMap11Len(): nat64 {
        return this.stableMap11.len();
    }

    @update([nat], Opt(User))
    stableMap11Remove(key: nat): Opt<User> {
        return this.stableMap11.remove(key);
    }

    @query([], Vec(User))
    stableMap11Values(): Vec<User> {
        return this.stableMap11.values();
    }

    stableMap12 = new StableBTreeMap<blob, Reaction>(blob, Reaction as any, 12);

    @query([blob], bool)
    stableMap12ContainsKey(key: blob): bool {
        return this.stableMap12.containsKey(key);
    }

    @query([blob], Opt(Reaction))
    stableMap12Get(key: blob): Opt<Reaction> {
        return this.stableMap12.get(key);
    }

    @update([blob, Reaction], Opt(Reaction))
    stableMap12Insert(key: blob, value: Reaction): Opt<Reaction> {
        return this.stableMap12.insert(key, value);
    }

    @query([], bool)
    stableMap12IsEmpty(): bool {
        return this.stableMap12.isEmpty();
    }

    @query([], Vec(Tuple(blob, Reaction)))
    stableMap12Items(): Vec<Tuple<[blob, Reaction]>> {
        return this.stableMap12.items();
    }

    @query([], Vec(blob))
    stableMap12Keys(): Vec<blob> {
        return this.stableMap12.keys();
    }

    @query([], nat64)
    stableMap12Len(): nat64 {
        return this.stableMap12.len();
    }

    @update([blob], Opt(Reaction))
    stableMap12Remove(key: blob): Opt<Reaction> {
        return this.stableMap12.remove(key);
    }

    @query([], Vec(Reaction))
    stableMap12Values(): Vec<Reaction> {
        return this.stableMap12.values();
    }

    stableMap13 = new StableBTreeMap<text, Principal>(text, principal, 13);

    @query([text], bool)
    stableMap13ContainsKey(key: text): bool {
        return this.stableMap13.containsKey(key);
    }

    @query([text], Opt(principal))
    stableMap13Get(key: text): Opt<Principal> {
        return this.stableMap13.get(key);
    }

    @update([text, principal], Opt(principal))
    stableMap13Insert(key: text, value: Principal): Opt<Principal> {
        return this.stableMap13.insert(key, value);
    }

    @query([], bool)
    stableMap13IsEmpty(): bool {
        return this.stableMap13.isEmpty();
    }

    @query([], Vec(Tuple(text, principal)))
    stableMap13Items(): Vec<Tuple<[text, Principal]>> {
        return this.stableMap13.items();
    }

    @query([], Vec(text))
    stableMap13Keys(): Vec<text> {
        return this.stableMap13.keys();
    }

    @query([], nat64)
    stableMap13Len(): nat64 {
        return this.stableMap13.len();
    }

    @update([text], Opt(principal))
    stableMap13Remove(key: text): Opt<Principal> {
        return this.stableMap13.remove(key);
    }

    @query([], Vec(principal))
    stableMap13Values(): Vec<Principal> {
        return this.stableMap13.values();
    }
}
