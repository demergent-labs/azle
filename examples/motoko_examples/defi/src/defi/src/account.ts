import { nat, nat8, Principal } from 'azle';

import { sha224 } from 'hash.js';
import { getCrc32 } from './utils/crc32';
import { decode } from './utils/decode';

export type Address = string;

// 32-byte array.
export type AccountIdentifier = number[];
// 32-byte array.
export type Subaccount = number[];

export const principalToSubAccount = (principal: string): Uint8Array => {
    const bytes = decodePrincipalFromText(principal);
    const subAccount = new Uint8Array(32);
    subAccount[0] = bytes.length;
    subAccount.set(bytes, 1);
    return subAccount;
};

export function accountIdentifier(
    principal: Principal,
    subaccount: number
): Address {
    const prefixBytes = new Uint8Array([
        10, 97, 99, 99, 111, 117, 110, 116, 45, 105, 100
    ]); // \0xAaccount-id
    const principalBytes = decodePrincipalFromText(principal);
    const subaccountBytes = getSubAccountArray(subaccount);
    const hash = new Uint8Array(
        sha224()
            .update([...prefixBytes, ...principalBytes, ...subaccountBytes])
            .digest()
    );
    const checksum = to32Bits(getCrc32(hash));
    return toHexString(new Uint8Array([...checksum, ...hash]));
}

function getSubAccountArray(subaccount?: number): number[] {
    return Array(28)
        .fill(0)
        .concat(to32Bits(subaccount ? subaccount : 0));
}

export function defaultSubaccount(): Subaccount {
    return Array(28).fill(0).concat(to32Bits(0));
}

export function validateAccountIdentifier(
    accountIdentifier: AccountIdentifier
): boolean {
    if (accountIdentifier.length !== 32) {
        return false;
    }

    return true;
    // @TODO implemnt rest of the logic
    //   let accIdPart = Array(28)
    //     .fill(0)
    //     .map((i) => accountIdentifier[i + 4]);
    //   let checksumPart = Array(4)
    //     .fill(0)
    //     .map((i) => accountIdentifier[i]);
    //   let crc32 = crc.ofArray(accIdPart);
    //   Array.equal(beBytes(crc32), checksumPart, Nat8.equal);
}

// utils
function to32Bits(number: number): number[] {
    let b = new ArrayBuffer(4);
    new DataView(b).setUint32(0, number);
    return Array.from(new Uint8Array(b));
}

function toHexString(byteArray: Uint8Array): string {
    return Array.from(byteArray, (byte) => {
        return ('0' + (byte & 0xff).toString(16)).slice(-2);
    }).join('');
}

function decodePrincipalFromText(text: string): Uint8Array {
    const canisterIdNoDash = text.toLowerCase().replace(/-/g, '');

    let arr = decode(canisterIdNoDash);
    arr = arr.slice(4, arr.length);

    return arr;
}
