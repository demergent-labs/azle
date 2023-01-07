import {
    Query,
    Update,
    Init,
    PreUpgrade,
    PostUpgrade,
    nat64,
    StableBTreeMap
} from 'azle';

type Entry = {
    key: string;
    value: nat64;
};

let stable_storage = new StableBTreeMap<string, Entry[]>(0, 25, 1_000);

let entries: {
    [key: string]: nat64;
} = {};

export function init(): Init {
    console.log('init');

    stable_storage.insert('entries', []);
}

export function pre_upgrade(): PreUpgrade {
    console.log('pre_upgrade');

    stable_storage.insert(
        'entries',
        Object.entries(entries).map((entry) => {
            return {
                key: entry[0],
                value: entry[1]
            };
        })
    );
}

export function post_upgrade(): PostUpgrade {
    console.log('post_upgrade');

    entries = (stable_storage.get('entries') ?? []).reduce((result, entry) => {
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
