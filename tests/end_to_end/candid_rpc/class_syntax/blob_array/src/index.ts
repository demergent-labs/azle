import { IDL, query, update } from 'azle';

export default class {
    @query([], IDL.Vec(IDL.Nat8))
    getBlob() {
        return stringToBlob('hello');
    }
    @query([], Vec(IDL.Vec(IDL.Nat8)))
    getBlobs() {
        return [stringToBlob('hello'), stringToBlob('world')];
    }
}

function stringToBlob(string: string): Uint8Array {
    return Buffer.from(string);
}
