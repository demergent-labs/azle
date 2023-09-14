import {
    blob,
    bool,
    float32,
    int,
    nat,
    nat8,
    nat16,
    nat32,
    nat64,
    Opt,
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
    stableMap0 = new StableBTreeMap<nat8, text>(nat8, text, 0);

    @query([nat8], bool)
    stableMap0ContainsKey(key: nat8): bool {
        return this.stableMap0.containsKey(key);
    }

    @query([nat8], Opt(text))
    stableMap0Get(key: nat8): Opt<text> {
        return this.stableMap0.get(key);
    }

    @update([nat8, text], Opt(text))
    stableMap0Insert(key: nat8, value: text): Opt<text> {
        return this.stableMap0.insert(key, value);
    }

    @query([], bool)
    stableMap0IsEmpty(): bool {
        return this.stableMap0.isEmpty();
    }

    @query([], Vec(Tuple(nat8, text)))
    stableMap0Items(): Vec<Tuple<[nat8, text]>> {
        return this.stableMap0.items();
    }

    @query([], Vec(nat8))
    stableMap0Keys(): Vec<nat8> {
        return this.stableMap0.keys();
    }

    @query([], nat64)
    stableMap0Len(): nat64 {
        return this.stableMap0.len();
    }

    @update([nat8], Opt(text))
    stableMap0Remove(key: nat8): Opt<string> {
        return this.stableMap0.remove(key);
    }

    @query([], Vec(text))
    stableMap0Values(): Vec<string> {
        return this.stableMap0.values();
    }

    stableMap1 = new StableBTreeMap<nat16, blob>(nat16, blob, 1);

    @query([nat16], bool)
    stableMap1ContainsKey(key: nat16): bool {
        return this.stableMap1.containsKey(key);
    }

    @query([nat16], Opt(blob))
    stableMap1Get(key: nat16): Opt<blob> {
        return this.stableMap1.get(key);
    }

    @update([nat16, blob], Opt(blob))
    stableMap1Insert(key: nat16, value: blob): Opt<blob> {
        return this.stableMap1.insert(key, value);
    }

    @query([], bool)
    stableMap1IsEmpty(): bool {
        return this.stableMap1.isEmpty();
    }

    @query([], Vec(Tuple(nat16, blob)))
    stableMap1Items(): Vec<Tuple<[nat16, blob]>> {
        return this.stableMap1.items();
    }

    @query([], Vec(nat16))
    stableMap1Keys(): Vec<nat16> {
        return this.stableMap1.keys();
    }

    @query([], nat64)
    stableMap1Len(): nat64 {
        return this.stableMap1.len();
    }

    @update([nat16], Opt(blob))
    stableMap1Remove(key: nat16): Opt<blob> {
        return this.stableMap1.remove(key);
    }

    @query([], Vec(blob))
    stableMap1Values(): Vec<blob> {
        return this.stableMap1.values();
    }

    stableMap2 = new StableBTreeMap<nat32, nat>(nat32, nat, 2);

    @query([nat32], bool)
    stableMap2ContainsKey(key: nat32): bool {
        return this.stableMap2.containsKey(key);
    }

    @query([nat32], Opt(nat))
    stableMap2Get(key: nat32): Opt<nat> {
        return this.stableMap2.get(key);
    }

    @update([nat32, nat], Opt(nat))
    stableMap2Insert(key: nat32, value: nat): Opt<nat> {
        return this.stableMap2.insert(key, value);
    }

    @query([], bool)
    stableMap2IsEmpty(): bool {
        return this.stableMap2.isEmpty();
    }

    @query([], Vec(Tuple(nat32, nat)))
    stableMap2Items(): Vec<Tuple<[nat32, nat]>> {
        return this.stableMap2.items();
    }

    @query([], Vec(nat32))
    stableMap2Keys(): Vec<nat32> {
        return this.stableMap2.keys();
    }

    @query([], nat64)
    stableMap2Len(): nat64 {
        return this.stableMap2.len();
    }

    @update([nat32], Opt(nat))
    stableMap2Remove(key: nat32): Opt<nat> {
        return this.stableMap2.remove(key);
    }

    @query([], Vec(nat))
    stableMap2Values(): Vec<nat> {
        return this.stableMap2.values();
    }

    stableMap3 = new StableBTreeMap<Reaction, int>(Reaction as any, int, 3);

    @query([Reaction], bool)
    stableMap3ContainsKey(key: Reaction): bool {
        return this.stableMap3.containsKey(key);
    }

    @query([Reaction], Opt(int))
    stableMap3Get(key: Reaction): Opt<int> {
        return this.stableMap3.get(key);
    }

    @update([Reaction, int], Opt(int))
    stableMap3Insert(key: Reaction, value: int): Opt<int> {
        return this.stableMap3.insert(key, value);
    }

    @query([], bool)
    stableMap3IsEmpty(): bool {
        return this.stableMap3.isEmpty();
    }

    @query([], Vec(Tuple(Reaction, int)))
    stableMap3Items(): Vec<Tuple<[Reaction, int]>> {
        return this.stableMap3.items();
    }

    @query([], Vec(Reaction))
    stableMap3Keys(): Vec<Reaction> {
        return this.stableMap3.keys();
    }

    @query([], nat64)
    stableMap3Len(): nat64 {
        return this.stableMap3.len();
    }

    @update([Reaction], Opt(int))
    stableMap3Remove(key: Reaction): Opt<int> {
        return this.stableMap3.remove(key);
    }

    @query([], Vec(int))
    stableMap3Values(): Vec<int> {
        return this.stableMap3.values();
    }

    stableMap4 = new StableBTreeMap<User, float32>(User as any, float32, 4);

    @query([User], bool)
    stableMap4ContainsKey(key: User): bool {
        return this.stableMap4.containsKey(key);
    }

    @query([User], Opt(float32))
    stableMap4Get(key: User): Opt<float32> {
        return this.stableMap4.get(key);
    }

    @update([User, float32], Opt(float32))
    stableMap4Insert(key: User, value: float32): Opt<float32> {
        return this.stableMap4.insert(key, value);
    }

    @query([], bool)
    stableMap4IsEmpty(): bool {
        return this.stableMap4.isEmpty();
    }

    @query([], Vec(Tuple(User, float32)))
    stableMap4Items(): Vec<Tuple<[User, float32]>> {
        return this.stableMap4.items();
    }

    @query([], Vec(User))
    stableMap4Keys(): Vec<User> {
        return this.stableMap4.keys();
    }

    @query([], nat64)
    stableMap4Len(): nat64 {
        return this.stableMap4.len();
    }

    @update([User], Opt(float32))
    stableMap4Remove(key: User): Opt<float32> {
        return this.stableMap4.remove(key);
    }

    @query([], Vec(float32))
    stableMap4Values(): Vec<float32> {
        return this.stableMap4.values();
    }
}
