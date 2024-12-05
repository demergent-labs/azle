import {
    dataCertificate,
    IDL,
    init,
    postUpgrade,
    preUpgrade,
    query,
    setCertifiedData,
    StableBTreeMap,
    update
} from 'azle';

let afterFirstPostUpgrade = false;
const PRE_UPGRADE_DATA = new Uint8Array([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
]);

export default class {
    data: Uint8Array = new Uint8Array();
    stableStorage = StableBTreeMap<string, boolean>(0);

    @init([IDL.Bool, IDL.Vec(IDL.Nat8)])
    init(setData: boolean, data: Uint8Array): void {
        if (setData) {
            this.data = data;
            setCertifiedData(data);
        }
    }

    @preUpgrade
    preUpgrade(): void {
        // The idea is that the third deploy will always have certified data set from preUpgrade so to test it we need to deploy 3 times
        // We could make it arbitrary but that seems like a lot of work just to test this one case
        if (afterFirstPostUpgrade) {
            setCertifiedData(PRE_UPGRADE_DATA);
            this.stableStorage.insert('certifiedDataSetInPreUpgrade', true);
        }
    }

    @postUpgrade([IDL.Bool, IDL.Vec(IDL.Nat8)])
    postUpgrade(setData: boolean, data: Uint8Array): void {
        const wasSetInPreUpgrade = this.stableStorage.get(
            'certifiedDataSetInPreUpgrade'
        );
        if (wasSetInPreUpgrade) {
            this.data = PRE_UPGRADE_DATA;
        }

        if (setData) {
            this.data = data;
            setCertifiedData(data);
        }
        afterFirstPostUpgrade = true;
    }

    @update([IDL.Vec(IDL.Nat8)])
    setData(data: Uint8Array): void {
        this.data = data;
        setCertifiedData(data);
    }

    @query(
        [],
        IDL.Record({
            value: IDL.Vec(IDL.Nat8),
            certificate: IDL.Opt(IDL.Vec(IDL.Nat8))
        })
    )
    async getData(): Promise<{
        value: Uint8Array;
        certificate: [Uint8Array] | [];
    }> {
        const certificate = dataCertificate();
        return {
            value: this.data,
            certificate: certificate ? [certificate] : []
        };
    }

    @update([], IDL.Opt(IDL.Vec(IDL.Nat8)))
    getDataCertificateInUpdate(): [Uint8Array] | [] {
        const certificate = dataCertificate();
        return certificate ? [certificate] : [];
    }

    @query([])
    setDataCertificateInQuery(): void {
        try {
            setCertifiedData(new Uint8Array([3]));
        } catch (error) {
            // Expected to throw an error
            return;
        }
        throw new Error(
            'setCertifiedData should have thrown an error in query method'
        );
    }
}
