import { blob, Canister, query, Vec } from 'azle/experimental';

export default class {
    @query([], blob)
    getBlob() {
        return stringToBlob('hello');
    }
    @query([], Vec(blob))
    getBlobs() {
        return [stringToBlob('hello'), stringToBlob('world')];
    }
}

function stringToBlob(string: string): blob {
    return Buffer.from(string);
}
