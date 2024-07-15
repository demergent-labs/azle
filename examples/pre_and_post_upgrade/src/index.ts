import {
    Canister,
    init,
    nat64,
    postUpgrade,
    preUpgrade,
    query,
    Record,
    StableBTreeMap,
    text,
    update,
    Vec,
    Void
} from 'azle/experimental';

const Entry = Record({
    key: text,
    value: nat64
});
type Entry = typeof Entry;

let stableStorage = StableBTreeMap<text, Vec<Entry>>(0);

let entries: {
    [key: string]: nat64;
} = {};

export default Canister({
    init: init([], () => {
        console.info('init');

        stableStorage.insert('entries', []);
    }),
    postUpgrade: postUpgrade([], () => {
        console.info('postUpgrade');

        const stableEntriesOpt = stableStorage.get('entries');

        const stableEntries = stableEntriesOpt === null ? [] : stableEntriesOpt;

        entries = stableEntries.reduce((result, entry) => {
            return {
                ...result,
                [entry.key]: entry.value
            };
        }, {});
    }),
    preUpgrade: preUpgrade(() => {
        console.info('preUpgrade');

        stableStorage.insert(
            'entries',
            Object.entries(entries).map((entry) => {
                return {
                    key: entry[0],
                    value: entry[1] + 1n
                };
            })
        );
    }),
    setEntry: update([Entry], Void, (entry) => {
        entries[entry.key] = entry.value;
    }),
    getEntries: query([], Vec(Entry), () => {
        return Object.entries(entries).map((entry) => {
            return {
                key: entry[0],
                value: entry[1]
            };
        });
    })
});
