import { blob, Canister, ic, query, text } from 'azle';

export default Canister({
    // encodes a Candid string to Candid bytes
    candidEncode: query([text], blob, (candidString) => {
        return ic.candidEncode(candidString);
    }),
    // decodes Candid bytes to a Candid string
    candidDecode: query([blob], text, (candidEncoded) => {
        return ic.candidDecode(candidEncoded);
    })
});
