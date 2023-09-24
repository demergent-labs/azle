import { blob, query, Service, Vec } from 'azle';

export default Service({
    getBlob: query([], blob, () => {
        return stringToBlob('hello');
    }),
    getBlobs: query([], Vec(blob), () => {
        return [stringToBlob('hello'), stringToBlob('world')];
    })
});

function stringToBlob(string: string): blob {
    return Buffer.from(string);
}
