import { blob, Principal } from '../../../src/lib';
import { getCrc32 } from '@dfinity/principal/lib/esm/utils/getCrc';
import { sha224 } from 'js-sha256';
import { Address } from '../index';

// TODO we need to review these heavily
export function hexAddressFromPrincipal(
    principal: Principal,
    subaccount: number
): Address {
    return addressFromPrincipal(principal, subaccount);
}

export function binaryAddressFromPrincipal(
    principal: Principal,
    subaccount: number
): blob {
    const address = addressFromPrincipal(principal, subaccount);
    return Uint8Array.from(
        address.match(/.{1,2}/g)?.map((x) => parseInt(x, 16)) ?? []
    );
}

export function binaryAddressFromAddress(address: Address): blob {
    return Uint8Array.from(
        address.match(/.{1,2}/g)?.map((x) => parseInt(x, 16)) ?? []
    );
}

// https://github.com/Toniq-Labs/extendable-token/blob/86eabb7336ea259876be9be830fb69b03046ea14/motoko/util/AccountIdentifier.mo
// https://github.com/Toniq-Labs/entrepot-app/blob/5004eb5cb3c98805b665d3fa24d95483ce2a8cda/src/ic/utils.js
// Some functions below licensed as follows
// MIT License

// Copyright (c) 2022 Toniq Labs

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
function addressFromPrincipal(
    principal: Principal,
    subaccount: number
): Address {
    const prefixBytes = new Uint8Array([
        10, 97, 99, 99, 111, 117, 110, 116, 45, 105, 100
    ]); // \0xAaccount-id
    const principalBytes = principal.toUint8Array();
    const subaccountBytes = getSubAccountArray(subaccount);

    const hash = new Uint8Array(
        sha224
            .update([...prefixBytes, ...principalBytes, ...subaccountBytes])
            .digest()
    );
    const checksum = to32Bits(getCrc32(hash));

    return toHexString(new Uint8Array([...checksum, ...hash]));
}

function getSubAccountArray(subaccount: number): number[] {
    return Array(28)
        .fill(0)
        .concat(to32Bits(subaccount ? subaccount : 0));
}

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
