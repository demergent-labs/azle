import { ic, Principal, RejectionCode, Result, $update } from 'azle';

$update;
export function sendNotification(): Result<null, RejectionCode> {
    return ic.notifyRaw(
        Principal.fromText(
            process.env.CANISTER2_PRINCIPAL ??
                ic.trap('process.env.CANISTER2_PRINCIPAL is undefined')
        ),
        'receiveNotification',
        Uint8Array.from(ic.candidEncode('()')),
        0n
    );
}
