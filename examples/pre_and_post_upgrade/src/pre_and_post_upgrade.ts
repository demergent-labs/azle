import {
    $init,
    nat64,
    $postUpgrade,
    $preUpgrade,
    $query,
    Record,
    StableBTreeMap,
    $update
} from 'azle';

type Entry = Record<{
    key: string;
    value: nat64;
}>;

let stableStorage = new StableBTreeMap<string, Entry[]>(0, 25, 1_000);

let entries: {
    [key: string]: nat64;
} = {};

$init;
export function init() {
    console.log('init');

    stableStorage.insert('entries', []);
}

$preUpgrade;
export function preUpgrade() {
    console.log('preUpgrade');

    stableStorage.insert(
        'entries',
        Object.entries(entries).map((entry) => {
            return {
                key: entry[0],
                value: entry[1]
            };
        })
    );
}

$postUpgrade;
export function postUpgrade() {
    console.log('postUpgrade');

    entries = (stableStorage.get('entries') ?? []).reduce((result, entry) => {
        return {
            ...result,
            [entry.key]: entry.value
        };
    }, {});
}

$update;
export function setEntry(entry: Entry): void {
    entries[entry.key] = entry.value;
}

$query;
export function getEntries(): Entry[] {
    return Object.entries(entries).map((entry) => {
        return {
            key: entry[0],
            value: entry[1]
        };
    });
}
