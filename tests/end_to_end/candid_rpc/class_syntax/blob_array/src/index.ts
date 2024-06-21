import { blob, Canister, query, Vec } from 'azle/experimental';

export default Canister({
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
