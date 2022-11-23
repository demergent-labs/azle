import { Query, Update, Init, PreUpgrade, PostUpgrade, ic, nat64 } from 'azle';

type StableStorage = {
    entries: Entry[];
};

type Entry = {
    key: string;
    value: nat64;
};

let stable_storage: StableStorage = ic.stable_storage();

let entries: {
    [key: string]: nat64;
} = {};

export function init(): Init {
    console.log('init');

    stable_storage.entries = [];
}

export function pre_upgrade(): PreUpgrade {
    console.log('pre_upgrade');

    stable_storage.entries = Object.entries(entries).map((entry) => {
        return {
            key: entry[0],
            value: entry[1]
        };
    });
}

export function post_upgrade(): PostUpgrade {
    console.log('post_upgrade');

    entries = stable_storage.entries.reduce((result, entry) => {
        return {
            ...result,
            [entry.key]: entry.value
        };
    }, {});
}

export function set_entry(entry: Entry): Update<void> {
    entries[entry.key] = entry.value;
}

export function get_entries(): Query<Entry[]> {
    return Object.entries(entries).map((entry) => {
        return {
            key: entry[0],
            value: entry[1]
        };
    });
}
