import { ic, match, Principal, RejectionCode, $update, Variant } from 'azle';

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

    return match(result, {
        ok: () => ({
            ok: true
        }),
        err: (err) => ({
            err
        })
    });
}
