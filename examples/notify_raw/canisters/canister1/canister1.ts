import { ic, Principal, RejectionCode, $update, Variant } from 'azle';

$update;
export function send_notification(): Variant<{
    ok: boolean;
    err: RejectionCode;
}> {
    const result = ic.notify_raw(
        Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai'),
        'receive_notification',
        Uint8Array.from(ic.candid_encode('()')),
        0n
    );

    if ('err' in result) {
        return {
            err: result.err
        };
    }

    return {
        ok: true
    };
}
