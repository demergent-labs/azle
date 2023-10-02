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
} from 'azle';

const Entry = Record({
    key: text,
    value: nat64
});

let stableStorage = StableBTreeMap(text, Vec(Entry), 0);

let entries: {
    [key: string]: nat64;
} = {};

export default Canister({
    init: init([], () => {
        console.log('init');

        stableStorage.insert('entries', []);
    }),
    postUpgrade: postUpgrade([], () => {
        console.log('postUpgrade');

        const stableEntriesOpt = stableStorage.get('entries');

        const stableEntries =
            'None' in stableEntriesOpt ? [] : stableEntriesOpt.Some;

        entries = stableEntries.reduce((result, entry) => {
            return {
                ...result,
                [entry.key]: entry.value
            };
        }, {});
    }),
    preUpgrade: preUpgrade(() => {
        console.log('preUpgrade');

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
