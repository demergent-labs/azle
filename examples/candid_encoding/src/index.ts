import { blob, ic, query, Service, text } from 'azle';

export default Service({
    // encodes a Candid string to Candid bytes
    candidEncode: query([text], blob, (candidString) => {
        return ic.candidEncode(candidString);
    }),
    // decodes Candid bytes to a Candid string
    candidDecode: query([blob], text, (candidEncoded) => {
        return ic.candidDecode(candidEncoded);
    })
});
