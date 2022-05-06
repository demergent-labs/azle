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
    ic.print('init');

    ic.stableStorage<StableStorage>().entries = [];
}

export function preUpgrade(): PreUpgrade {
    ic.print('preUpgrade');

    ic.stableStorage<StableStorage>().entries = Object.entries(entries).map((entry) => {
        return {
            key: entry[0],
            value: entry[1]
        };
    });
}

export function postUpgrade(): PostUpgrade {
    ic.print('preUpgrade');

    entries = ic.stableStorage<StableStorage>().entries.reduce((result, entry) => {
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
