import {
    argDataRaw,
    candidEncode,
    IDL,
    init,
    postUpgrade,
    query,
    update
} from 'azle';

export default class {
    initArgDataRaw: Uint8Array | null = null;
    postUpgradeArgDataRaw: Uint8Array | null = null;

    @init([IDL.Text])
    init(arg: string): void {
        console.log('init', arg);
        this.initArgDataRaw = argDataRaw();
    }

    @query([], IDL.Opt(IDL.Vec(IDL.Nat8)))
    getInitArgDataRaw(): [Uint8Array] | [] {
        if (this.initArgDataRaw === null) {
            return [];
        } else {
            return [this.initArgDataRaw];
        }
    }

    @postUpgrade([IDL.Text])
    postUpgrade(arg: string): void {
        console.log('postUpgrade', arg);
        this.postUpgradeArgDataRaw = argDataRaw();
    }

    @query([], IDL.Opt(IDL.Vec(IDL.Nat8)))
    getPostUpgradeArgDataRaw(): [Uint8Array] | [] {
        if (this.postUpgradeArgDataRaw === null) {
            return [];
        } else {
            return [this.postUpgradeArgDataRaw];
        }
    }

    @query([IDL.Text], IDL.Vec(IDL.Nat8))
    getQueryArgDataRaw(arg: string): Uint8Array {
        console.log('query', arg);
        return argDataRaw();
    }

    @update([IDL.Text], IDL.Vec(IDL.Nat8))
    getUpdateArgDataRaw(arg: string): Uint8Array {
        console.log('update', arg);
        return argDataRaw();
    }

    @query([IDL.Text], IDL.Vec(IDL.Nat8))
    candidEncode(arg: string): Uint8Array {
        return candidEncode(arg);
    }
}
