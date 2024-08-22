import { IDL, query } from 'azle';

export default class {
    textEncoder: TextEncoder = new TextEncoder();

    @query([], IDL.Vec(IDL.Nat8))
    getBlob(): Uint8Array {
        return this.textEncoder.encode('hello');
    }

    @query([], IDL.Vec(IDL.Vec(IDL.Nat8)))
    getBlobs(): Uint8Array[] {
        return [
            this.textEncoder.encode('hello'),
            this.textEncoder.encode('world')
        ];
    }
}
