import { ic, NotifyResult, Principal, $update } from 'azle';

$update;
export function sendNotification(): NotifyResult {
    return ic.notifyRaw(
        Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai'),
        'receiveNotification',
        Uint8Array.from(ic.candidEncode('()')),
        0n
    );
}
