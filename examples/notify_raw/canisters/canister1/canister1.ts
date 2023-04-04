import { ic, match, Principal, RejectionCode, Result, $update } from 'azle';

$update;
export function sendNotification(): Result<boolean, RejectionCode> {
    const result = ic.notifyRaw(
        Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai'),
        'receiveNotification',
        Uint8Array.from(ic.candidEncode('()')),
        0n
    );

    return match(result, {
        Ok: () => ({
            Ok: true
        }),
        Err: (err) => ({
            Err: err
        })
    });
}
