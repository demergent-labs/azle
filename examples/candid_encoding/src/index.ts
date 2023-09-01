import { blob, ic, query, text } from 'azle';

export default class {
    // encodes a Candid string to Candid bytes
    @query([text], blob)
    candidEncode(candidString: text): blob {
        return ic.candidEncode(candidString);
    }

    // decodes Candid bytes to a Candid string
    @query([blob], text)
    candidDecode(candidEncoded: blob): text {
        return ic.candidDecode(candidEncoded);
    }
}
