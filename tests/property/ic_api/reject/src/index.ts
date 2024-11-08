import { IDL, query, reject, reply } from 'azle';

export default class {
    @query([IDL.Text], IDL.Text, { manual: true })
    alwaysRejectQuery(message: string): void {
        reject(message);
    }

    @query([IDL.Int], IDL.Int, { manual: true })
    evenOrRejectQuery(number: bigint): void {
        if (number % 2n === 0n) {
            reply({ data: number, idlType: IDL.Int });
        } else {
            reject('Odd numbers are rejected');
        }
    }
}
