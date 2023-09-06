import { blob, query, Service, Vec } from 'azle';

export default class extends Service {
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
