import { blob, query, Vec } from 'azle';

export default class {
    @query([], blob)
    getBlob(): blob {
        return stringToBlob('hello');
    }

    @query([], Vec(blob))
    getBlobs(): Vec<blob> {
        return [stringToBlob('hello'), stringToBlob('world')];
    }
}

function stringToBlob(string: string): blob {
    return Buffer.from(string);
}
