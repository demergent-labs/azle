import {
    IDL,
    init,
    postUpgrade,
    preUpgrade,
    query,
    StableBTreeMap,
    update
} from 'azle';

const Entry = IDL.Record({
    key: IDL.Text,
    value: IDL.Nat64
});
type Entry = {
    key: string;
    value: bigint;
};

let stableStorage = StableBTreeMap<string, Entry[]>(0);

let entries: {
    [key: string]: bigint;
} = {};

export default class {
    @init([])
    init(): void {
        console.info('init');

        stableStorage.insert('entries', []);
    }

    @postUpgrade([])
    postUpgrade(): void {
        console.info('postUpgrade');

        const stableEntriesOpt = stableStorage.get('entries');

        const stableEntries =
            'None' in stableEntriesOpt ? [] : stableEntriesOpt.Some;

        entries = stableEntries.reduce((result, entry) => {
            return {
                ...result,
                [entry.key]: entry.value
            };
        }, {});
    }

    @preUpgrade
    preUpgrade(): void {
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
    }

    @update([Entry])
    setEntry(entry: Entry): void {
        entries[entry.key] = entry.value;
    }

    @query([], IDL.Vec(Entry))
    getEntries(): Entry[] {
        return Object.entries(entries).map((entry) => {
            return {
                key: entry[0],
                value: entry[1]
            };
        });
    }
}
