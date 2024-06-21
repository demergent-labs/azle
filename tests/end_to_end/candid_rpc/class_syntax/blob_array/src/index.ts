import { IDL, query } from 'azle';

export default class {
    @query([], IDL.Vec(IDL.Nat8))
    getBlob(): Uint8Array {
        return stringToBlob('hello');
    }
    @query([], IDL.Vec(IDL.Vec(IDL.Nat8)))
    getBlobs(): Uint8Array[] {
        return [stringToBlob('hello'), stringToBlob('world')];
    }
}

function stringToBlob(string: string): Uint8Array {
    return Buffer.from(string);
}
