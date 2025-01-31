import { IDL, msgReject, msgReply, query, update } from 'azle';

export default class {
    @query([IDL.Text], undefined, { manual: true })
    alwaysRejectQuery(message: string): void {
        msgReject(`reject proptest message: ${message}`);
    }

    @update([IDL.Text], undefined, { manual: true })
    alwaysRejectUpdate(message: string): void {
        msgReject(`reject proptest message: ${message}`);
    }

    @query([IDL.Int], IDL.Int, { manual: true })
    evenOrRejectQuery(number: bigint): void {
        if (number % 2n === 0n) {
            const encoded = new Uint8Array(IDL.encode([IDL.Int], [number]));

            msgReply(encoded);
        } else {
            msgReject('Odd numbers are rejected');
        }
    }

    @update([IDL.Int], IDL.Int, { manual: true })
    evenOrRejectUpdate(number: bigint): void {
        if (number % 2n === 0n) {
            const encoded = new Uint8Array(IDL.encode([IDL.Int], [number]));

            msgReply(encoded);
        } else {
            msgReject('Odd numbers are rejected');
        }
    }
}
