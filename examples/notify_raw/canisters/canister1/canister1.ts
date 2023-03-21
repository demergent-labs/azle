import { ic, match, Principal, RejectionCode, $update, Variant } from 'azle';

$update;
export function send_notification(): Variant<{
    Ok: boolean;
    Err: RejectionCode;
}> {
    const result = ic.notifyRaw(
        Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai'),
        'receive_notification',
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
