import {
    Query,
    Update,
    Stable,
    Init,
    PreUpgrade,
    PostUpgrade,
    ic,
    nat64
} from 'azle';

type StableStorage = Stable<{
    entries: Entry[];
}>;

type Entry = {
    key: string;
    value: nat64;
};

let entries: {
    [key: string]: nat64;
} = {};

export function init(): Init {
    console.log('init');

    ic.stable_storage<StableStorage>().entries = [];
}

export function preUpgrade(): PreUpgrade {
    console.log('preUpgrade');

    ic.stable_storage<StableStorage>().entries = Object.entries(entries).map(
        (entry) => {
            return {
                key: entry[0],
                value: entry[1]
            };
        }
    );
}

export function postUpgrade(): PostUpgrade {
    console.log('preUpgrade');

    entries = ic
        .stable_storage<StableStorage>()
        .entries.reduce((result, entry) => {
            return {
                ...result,
                [entry.key]: entry.value
            };
        }, {});
}

export function setEntry(entry: Entry): Update<void> {
    entries[entry.key] = entry.value;
}

export function getEntries(): Query<Entry[]> {
    return Object.entries(entries).map((entry) => {
        return {
            key: entry[0],
            value: entry[1]
        };
    });
}
