import {
    dataCertificate,
    IDL,
    init,
    postUpgrade,
    preUpgrade,
    query,
    setCertifiedData,
    update
} from 'azle';

// TODO set can be called from reply and reject callbacks

let afterFirstPostUpgrade = false;

export default class {
    @init([IDL.Bool])
    init(setData: boolean): void {
        if (setData) {
            setCertifiedData(new Uint8Array([0])); // Set initial data
        }
    }

    @preUpgrade
    preUpgrade(): void {
        // The idea is that the third deploy will always have certified data set from preUpgrade so to test it we need to deploy 3 times
        if (afterFirstPostUpgrade) {
            setCertifiedData(new Uint8Array([1]));
        }
    }

    @postUpgrade([IDL.Bool])
    postUpgrade(setData: boolean): void {
        if (setData) {
            setCertifiedData(new Uint8Array([2])); // Set post-upgrade data
        }
        afterFirstPostUpgrade = true;
    }

    @update([IDL.Vec(IDL.Nat8)])
    setData(data: Uint8Array): void {
        setCertifiedData(data);
    }

    @query([], IDL.Opt(IDL.Vec(IDL.Nat8)))
    getCertificate(): [Uint8Array] | [] {
        const certificate = dataCertificate();
        if (certificate === undefined) {
            return [];
        }
        return [certificate];
    }

    @update([], IDL.Opt(IDL.Vec(IDL.Nat8)))
    getDataCertificateInUpdate(): void {
        const certificate = dataCertificate();
        if (certificate === undefined) {
            return;
        }
        throw new Error(
            'dataCertificate should have been undefined in update method'
        );
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
