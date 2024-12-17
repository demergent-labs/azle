import { IDL, query, reject, reply, update } from 'azle';

export default class {
    @query([IDL.Text], undefined, { manual: true })
    alwaysRejectQuery(message: string): void {
        reject(`reject proptest message: ${message}`);
    }

    @update([IDL.Text], undefined, { manual: true })
    alwaysRejectUpdate(message: string): void {
        reject(`reject proptest message: ${message}`);
    }

    @query([IDL.Int], IDL.Int, { manual: true })
    evenOrRejectQuery(number: bigint): void {
        if (number % 2n === 0n) {
            reply({ data: number, idlType: IDL.Int });
        } else {
            reject('Odd numbers are rejected');
        }
    }

    @update([IDL.Int], IDL.Int, { manual: true })
    evenOrRejectUpdate(number: bigint): void {
        if (number % 2n === 0n) {
            reply({ data: number, idlType: IDL.Int });
        } else {
            reject('Odd numbers are rejected');
        }
    }
}
