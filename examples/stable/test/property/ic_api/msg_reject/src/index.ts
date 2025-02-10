import { IDL, msgArgData, msgReject, msgReply, query, update } from 'azle';

export default class {
    @query([IDL.Text], undefined, { manual: true })
    alwaysRejectQuery(): void {
        const message = IDL.decode(
            [IDL.Text],
            new Uint8Array(msgArgData()).buffer
        )[0] as string;

        msgReject(`reject proptest message: ${message}`);
    }

    @update([IDL.Text], undefined, { manual: true })
    alwaysRejectUpdate(): void {
        const message = IDL.decode(
            [IDL.Text],
            new Uint8Array(msgArgData()).buffer
        )[0] as string;

        msgReject(`reject proptest message: ${message}`);
    }

    @query([IDL.Int], IDL.Int, { manual: true })
    evenOrRejectQuery(): void {
        const number = IDL.decode(
            [IDL.Int],
            new Uint8Array(msgArgData()).buffer
        )[0] as unknown as bigint;

        if (number % 2n === 0n) {
            const encoded = new Uint8Array(IDL.encode([IDL.Int], [number]));

            msgReply(encoded);
        } else {
            msgReject('Odd numbers are rejected');
        }
    }

    @update([IDL.Int], IDL.Int, { manual: true })
    evenOrRejectUpdate(): void {
        const number = IDL.decode(
            [IDL.Int],
            new Uint8Array(msgArgData()).buffer
        )[0] as unknown as bigint;

        if (number % 2n === 0n) {
            const encoded = new Uint8Array(IDL.encode([IDL.Int], [number]));

            msgReply(encoded);
        } else {
            msgReject('Odd numbers are rejected');
        }
    }
}
