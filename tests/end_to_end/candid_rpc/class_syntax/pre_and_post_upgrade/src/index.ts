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

export default class {
    stableStorage = StableBTreeMap<string, Entry[]>(0);

    entries: {
        [key: string]: bigint;
    } = {};

    @init([])
    init(): void {
        console.info('init');

        this.stableStorage.insert('entries', []);
    }

    @postUpgrade([])
    postUpgrade(): void {
        console.info('postUpgrade');

        const stableEntries = this.stableStorage.get('entries');

        if (stableEntries === null) {
            return;
        }

        this.entries = stableEntries.reduce((result, entry) => {
            return {
                ...result,
                [entry.key]: entry.value
            };
        }, {});
    }

    @preUpgrade
    preUpgrade(): void {
        console.info('preUpgrade');

        this.stableStorage.insert(
            'entries',
            Object.entries(this.entries).map((entry) => {
                return {
                    key: entry[0],
                    value: entry[1] + 1n
                };
            })
        );
    }

    @update([Entry])
    setEntry(entry: Entry): void {
        this.entries[entry.key] = entry.value;
    }

    @query([], IDL.Vec(Entry))
    getEntries(): Entry[] {
        return Object.entries(this.entries).map((entry) => {
            return {
                key: entry[0],
                value: entry[1]
            };
        });
    }
}
