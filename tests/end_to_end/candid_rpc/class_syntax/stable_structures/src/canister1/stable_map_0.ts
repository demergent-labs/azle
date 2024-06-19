import { IDL, query, StableBTreeMap } from 'azle';

let stableMap0 = StableBTreeMap<number, string>(0);

export class StableMap0Methods {
    @query([IDL.Nat8], IDL.Bool)
    stableMap0ContainsKey(key: number) {
        return stableMap0.containsKey(key);
    }

    // stableMap0Get: query([nat8], Opt(text), (key) => {
    //     return stableMap0.get(key);
    // }),
    // stableMap0Insert: update([nat8, text], Opt(text), (key, value) => {
    //     return stableMap0.insert(key, value);
    // }),
    // stableMap0IsEmpty: query([], bool, () => {
    //     return stableMap0.isEmpty();
    // }),
    // stableMap0Items: query([], Vec(Tuple(nat8, text)), () => {
    //     return stableMap0.items();
    // }),
    // stableMap0Keys: query([], Vec(nat8), () => {
    //     return Uint8Array.from(stableMap0.keys());
    // }),
    // stableMap0Len: query([], nat64, () => {
    //     return stableMap0.len();
    // }),
    // stableMap0Remove: update([nat8], Opt(text), (key) => {
    //     return stableMap0.remove(key);
    // }),
    // stableMap0Values: query([], Vec(text), () => {
    //     return stableMap0.values();
    // })
}
