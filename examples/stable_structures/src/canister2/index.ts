import {
    bool,
    float64,
    nat64,
    Null,
    Opt,
    query,
    update,
    Service,
    StableBTreeMap,
    Vec,
    text,
    Tuple
} from 'azle';

export default class extends Service {
    stableMap5 = new StableBTreeMap<Opt<text>, float64>(
        Opt(text) as any,
        float64,
        5
    );

    @query([Opt(text)], bool)
    stableMap5ContainsKey(key: Opt<text>): boolean {
        return this.stableMap5.containsKey(key);
    }

    @query([Opt(text)], Opt(float64))
    stableMap5Get(key: Opt<text>): Opt<float64> {
        return this.stableMap5.get(key);
    }

    @update([Opt(text), float64], Opt(float64))
    stableMap5Insert(key: Opt<text>, value: float64): Opt<float64> {
        return this.stableMap5.insert(key, value);
    }

    @query([], bool)
    stableMap5IsEmpty(): bool {
        return this.stableMap5.isEmpty();
    }

    @query([], Vec(Tuple(Opt(text), float64)))
    stableMap5Items(): Vec<Tuple<[Opt<text>, float64]>> {
        return this.stableMap5.items();
    }

    @query([], Vec(Opt(text)))
    stableMap5Keys(): Vec<Opt<text>> {
        return this.stableMap5.keys();
    }

    @query([], nat64)
    stableMap5Len(): nat64 {
        return this.stableMap5.len();
    }

    @update([Opt(text)], Opt(float64))
    stableMap5Remove(key: Opt<string>): Opt<float64> {
        return this.stableMap5.remove(key);
    }

    @query([], Vec(float64))
    stableMap5Values(): Vec<float64> {
        return this.stableMap5.values();
    }

    stableMap6 = new StableBTreeMap<Vec<nat64>, bool>(
        Vec(nat64) as any,
        bool,
        6
    );

    @query([Vec(nat64)], bool)
    stableMap6ContainsKey(key: Vec<nat64>): bool {
        return this.stableMap6.containsKey(key);
    }

    @query([Vec(nat64)], Opt(bool))
    stableMap6Get(key: Vec<nat64>): Opt<bool> {
        return this.stableMap6.get(key);
    }

    @update([Vec(nat64), bool], Opt(bool))
    stableMap6Insert(key: Vec<nat64>, value: bool): Opt<bool> {
        return this.stableMap6.insert(key, value);
    }

    @query([], bool)
    stableMap6IsEmpty(): bool {
        return this.stableMap6.isEmpty();
    }

    @query([], Vec(Tuple(Vec(nat64), bool)))
    stableMap6Items(): Vec<Tuple<[Vec<nat64>, bool]>> {
        return this.stableMap6.items();
    }

    @query([], Vec(Vec(nat64)))
    stableMap6Keys(): Vec<Vec<nat64>> {
        return this.stableMap6.keys();
    }

    @query([], nat64)
    stableMap6Len(): nat64 {
        return this.stableMap6.len();
    }

    @update([Vec(nat64)], Opt(bool))
    stableMap6Remove(key: Vec<nat64>): Opt<bool> {
        return this.stableMap6.remove(key);
    }

    @query([], Vec(bool))
    stableMap6Values(): Vec<bool> {
        return this.stableMap6.values();
    }

    stableMap7 = new StableBTreeMap<Null, Null>(Null, Null, 7);

    @query([Null], bool)
    stableMap7ContainsKey(key: Null): bool {
        return this.stableMap7.containsKey(key);
    }

    @query([Null], Opt(Null))
    stableMap7Get(key: Null): Opt<Null> {
        return this.stableMap7.get(key);
    }

    @update([Null, Null], Opt(Null))
    stableMap7Insert(key: Null, value: Null): Opt<Null> {
        return this.stableMap7.insert(key, value);
    }

    @query([], bool)
    stableMap7IsEmpty(): bool {
        return this.stableMap7.isEmpty();
    }

    @query([], Vec(Tuple(Null, Null)))
    stableMap7Items(): Vec<Tuple<[null, null]>> {
        return this.stableMap7.items();
    }

    @query([], Vec(Null))
    stableMap7Keys(): Vec<Null> {
        return this.stableMap7.keys();
    }

    @query([], nat64)
    stableMap7Len(): nat64 {
        return this.stableMap7.len();
    }

    @update([Null], Opt(Null))
    stableMap7Remove(key: null): Opt<null> {
        return this.stableMap7.remove(key);
    }

    @query([], Vec(Null))
    stableMap7Values(): Vec<Null> {
        return this.stableMap7.values();
    }

    stableMap8 = new StableBTreeMap<bool, Null>(bool, Null, 8);

    @query([bool], bool)
    stableMap8ContainsKey(key: bool): bool {
        return this.stableMap8.containsKey(key);
    }

    @query([bool], Opt(Null))
    stableMap8Get(key: bool): Opt<Null> {
        return this.stableMap8.get(key);
    }

    @update([bool, Null], Opt(Null))
    stableMap8Insert(key: bool, value: Null): Opt<Null> {
        return this.stableMap8.insert(key, value);
    }

    @query([], bool)
    stableMap8IsEmpty(): bool {
        return this.stableMap8.isEmpty();
    }

    @query([], Vec(Tuple(bool, Null)))
    stableMap8Items(): Vec<Tuple<[bool, Null]>> {
        return this.stableMap8.items();
    }

    @query([], Vec(bool))
    stableMap8Keys(): Vec<bool> {
        return this.stableMap8.keys();
    }

    @query([], nat64)
    stableMap8Len(): nat64 {
        return this.stableMap8.len();
    }

    @update([bool], Opt(Null))
    stableMap8Remove(key: bool): Opt<Null> {
        return this.stableMap8.remove(key);
    }

    @query([], Vec(Null))
    stableMap8Values(): Vec<Null> {
        return this.stableMap8.values();
    }

    stableMap9 = new StableBTreeMap<float64, Vec<text>>(
        float64,
        Vec(text) as any,
        9
    );

    @query([float64], bool)
    stableMap9ContainsKey(key: float64): bool {
        return this.stableMap9.containsKey(key);
    }

    @query([float64], Opt(Vec(text)))
    stableMap9Get(key: float64): Opt<Vec<text>> {
        return this.stableMap9.get(key);
    }

    @update([float64, Vec(text)], Opt(Vec(text)))
    stableMap9Insert(key: float64, value: Vec<text>): Opt<Vec<text>> {
        return this.stableMap9.insert(key, value);
    }

    @query([], bool)
    stableMap9IsEmpty(): bool {
        return this.stableMap9.isEmpty();
    }

    @query([], Vec(Tuple(float64, Vec(text))))
    stableMap9Items(): Vec<Tuple<[float64, Vec<text>]>> {
        return this.stableMap9.items();
    }

    @query([], Vec(float64))
    stableMap9Keys(): Vec<float64> {
        return this.stableMap9.keys();
    }

    @query([], nat64)
    stableMap9Len(): nat64 {
        return this.stableMap9.len();
    }

    @update([float64], Opt(Vec(text)))
    stableMap9Remove(key: float64): Opt<Vec<string>> {
        return this.stableMap9.remove(key);
    }

    @query([], Vec(Vec(text)))
    stableMap9Values(): Vec<Vec<text>> {
        return this.stableMap9.values();
    }
}
