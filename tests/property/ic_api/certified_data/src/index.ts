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
import { AssertType, NotAnyAndExact } from 'azle/type_tests/assert_type';

const CertifiedData = IDL.Record({
    data: IDL.Vec(IDL.Nat8),
    certificate: IDL.Opt(IDL.Vec(IDL.Nat8))
});

type CertifiedData = {
    data: Uint8Array;
    certificate: [Uint8Array] | [];
};

const PRE_UPGRADE_DATA = new Uint8Array([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
]);

export default class {
    data: Uint8Array = new Uint8Array();
    stableStorage = StableBTreeMap<string, boolean>(0);
    afterFirstPostUpgrade = false;

    @init([IDL.Bool, IDL.Vec(IDL.Nat8)])
    init(setData: boolean, data: Uint8Array): void {
        if (setData === true) {
            this.data = data;
            setCertifiedData(data);
        }
    }

    @preUpgrade
    preUpgrade(): void {
        // The idea is that the third deploy will always have certified data set from preUpgrade so to test it we need to deploy 3 times
        // We could make it arbitrary but that seems like a lot of work just to test this one case
        if (this.afterFirstPostUpgrade === true) {
            setCertifiedData(PRE_UPGRADE_DATA);
            this.stableStorage.insert('certifiedDataSetInPreUpgrade', true);
        }
    }

    @postUpgrade([IDL.Bool, IDL.Vec(IDL.Nat8)])
    postUpgrade(setData: boolean, data: Uint8Array): void {
        const certifiedDataSetInPreUpgrade = this.stableStorage.get(
            'certifiedDataSetInPreUpgrade'
        );

        this.afterFirstPostUpgrade = true;

        if (certifiedDataSetInPreUpgrade === true) {
            this.data = PRE_UPGRADE_DATA;
            return;
        }

        if (setData === true) {
            this.data = data;
            setCertifiedData(data);
            return;
        }
    }

    @update([IDL.Vec(IDL.Nat8)])
    setData(data: Uint8Array): void {
        this.data = data;
        setCertifiedData(data);
    }

    @query([], CertifiedData)
    async getData(): Promise<CertifiedData> {
        const certificate = dataCertificate();
        return {
            data: this.data,
            certificate: certificate !== undefined ? [certificate] : []
        };
    }

    @update([], IDL.Opt(IDL.Vec(IDL.Nat8)))
    getDataCertificateInUpdate(): [Uint8Array] | [] {
        const certificate = dataCertificate();
        return certificate !== undefined ? [certificate] : [];
    }

    @query([])
    setDataCertificateInQuery(): void {
        setCertifiedData(new Uint8Array([3]));
    }

    @query([], IDL.Bool)
    assertGetDataCertificateTypesInQuery(): boolean {
        type _AssertReturnType = AssertType<
            NotAnyAndExact<
                ReturnType<typeof dataCertificate>,
                Uint8Array | undefined
            >
        >;
        return dataCertificate() instanceof Uint8Array;
    }

    @update([], IDL.Bool)
    assertGetDataCertificateTypesInUpdate(): boolean {
        type _AssertReturnType = AssertType<
            NotAnyAndExact<
                ReturnType<typeof dataCertificate>,
                Uint8Array | undefined
            >
        >;
        return dataCertificate() === undefined;
    }

    @update([IDL.Vec(IDL.Nat8)], IDL.Bool)
    assertSetCertifiedDataTypes(data: Uint8Array): boolean {
        type _AssertParamType = AssertType<
            NotAnyAndExact<Parameters<typeof setCertifiedData>[0], Uint8Array>
        >;
        type _AssertReturnType = AssertType<
            NotAnyAndExact<ReturnType<typeof setCertifiedData>, void>
        >;
        return (
            data instanceof Uint8Array && setCertifiedData(data) === undefined
        );
    }
}
