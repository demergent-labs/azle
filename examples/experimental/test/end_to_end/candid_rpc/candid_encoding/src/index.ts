import { candidDecode, candidEncode } from 'azle';
import { blob, Canister, query, text } from 'azle/experimental';

export default Canister({
    // encodes a Candid string to Candid bytes
    candidEncode: query([text], blob, (candidString) => {
        return candidEncode(candidString);
    }),
    // decodes Candid bytes to a Candid string
    candidDecode: query([blob], text, (candidEncoded) => {
        return candidDecode(candidEncoded);
    })
});
