import { ic, ok, Principal, Update, Variant } from 'azle';

type SendNotificationResult = Variant<{
    ok: boolean;
    err: string;
}>;

export function send_notification(): Update<SendNotificationResult> {
    const result = ic.notify_raw(
        Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai'),
        'receive_notification',
        Uint8Array.from([68, 73, 68, 76, 0, 0]), // TODO once we have encode use encode('()') in place of the hard-coded array
        0n
    );

    if (!ok(result)) {
        return {
            err: result.err
        };
    }

    return {
        ok: true
    };
}
