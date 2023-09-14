import {
    candid,
    init,
    nat64,
    postUpgrade,
    preUpgrade,
    query,
    Record,
    Service,
    StableBTreeMap,
    text,
    update,
    Vec,
    Void
} from 'azle';

class Entry extends Record {
    @candid(text)
    key: text;

    @candid(nat64)
    value: nat64;
}

export default class extends Service {
    stableStorage = new StableBTreeMap<text, Vec<Entry>>(
        text,
        Vec(Entry) as any,
        0
    );
    entries: {
        [key: string]: nat64;
    } = {};

    @init([])
    init() {
        console.log('init');

        this.stableStorage.insert('entries', []);
    }

    @postUpgrade([])
    postUpgrade() {
        console.log('postUpgrade');

        const stableEntriesOpt = this.stableStorage.get('entries');

        const stableEntries =
            stableEntriesOpt.length === 0
                ? stableEntriesOpt
                : stableEntriesOpt[0];

        this.entries = stableEntries.reduce((result, entry) => {
            return {
                ...result,
                [entry.key]: entry.value
            };
        }, {});
    }

    @preUpgrade
    preUpgrade() {
        console.log('preUpgrade');

        this.stableStorage.insert(
            'entries',
            Object.entries(this.entries).map((entry) => {
                return {
                    key: entry[0],
                    value: entry[1]
                };
            })
        );
    }

    @update([Entry], Void)
    setEntry(entry: Entry): Void {
        this.entries[entry.key] = entry.value;
    }

    @query([], Vec(Entry))
    getEntries(): Vec<Entry> {
        return Object.entries(this.entries).map((entry) => {
            return {
                key: entry[0],
                value: entry[1]
            };
        });
    }
}
