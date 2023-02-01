import {
    $init,
    nat64,
    $post_upgrade,
    $pre_upgrade,
    $query,
    StableBTreeMap,
    $update
} from 'azle';

type Entry = {
    key: string;
    value: nat64;
};

let stable_storage = new StableBTreeMap<string, Entry[]>(0, 25, 1_000);

let entries: {
    [key: string]: nat64;
} = {};

$init;
export function init() {
    console.log('init');

    stable_storage.insert('entries', []);
}

$pre_upgrade;
export function pre_upgrade() {
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

$post_upgrade;
export function post_upgrade() {
    console.log('post_upgrade');

    entries = (stable_storage.get('entries') ?? []).reduce((result, entry) => {
        return {
            ...result,
            [entry.key]: entry.value
        };
    }, {});
}

$update;
export function set_entry(entry: Entry): void {
    entries[entry.key] = entry.value;
}

$query;
export function get_entries(): Entry[] {
    return Object.entries(entries).map((entry) => {
        return {
            key: entry[0],
            value: entry[1]
        };
    });
}
