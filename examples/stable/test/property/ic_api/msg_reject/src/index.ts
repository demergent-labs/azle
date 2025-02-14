import { IDL, msgArgData, msgReject, msgReply, query, update } from 'azle';

export default class {
    @query([IDL.Text], undefined, { manual: true })
    alwaysRejectQuery(): void {
        const argData = msgArgData();

        const message = IDL.decode(
            [IDL.Text],
            argData.buffer instanceof ArrayBuffer
                ? argData.buffer
                : new Uint8Array(argData).buffer
        )[0] as string;

        msgReject(`reject proptest message: ${message}`);
    }

    @update([IDL.Text], undefined, { manual: true })
    alwaysRejectUpdate(): void {
        const argData = msgArgData();

        const message = IDL.decode(
            [IDL.Text],
            argData.buffer instanceof ArrayBuffer
                ? argData.buffer
                : new Uint8Array(argData).buffer
        )[0] as string;

        msgReject(`reject proptest message: ${message}`);
    }

    @query([IDL.Int], IDL.Int, { manual: true })
    evenOrRejectQuery(): void {
        const argData = msgArgData();

        const number = IDL.decode(
            [IDL.Int],
            argData.buffer instanceof ArrayBuffer
                ? argData.buffer
                : new Uint8Array(argData).buffer
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
        const argData = msgArgData();

        const number = IDL.decode(
            [IDL.Int],
            argData.buffer instanceof ArrayBuffer
                ? argData.buffer
                : new Uint8Array(argData).buffer
        )[0] as unknown as bigint;

        if (number % 2n === 0n) {
            const encoded = new Uint8Array(IDL.encode([IDL.Int], [number]));

            msgReply(encoded);
        } else {
            msgReject('Odd numbers are rejected');
        }
    }
}
