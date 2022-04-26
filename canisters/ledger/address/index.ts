// TODO I think this should be part of the ICP canister
// TODO add proper licensing and create proper npm package so we do not have to reimplement this all of the time
// TODO also once Azle is on the version of boa with class support, we should be able to use @dfinity/principal I would hope
// TODO maybe just make an azle-principal package

import { Principal } from '../../../index';
import { getCrc32 } from './crc32';
import { decode } from './decode';
import { sha224 } from 'hash.js';
import { Address } from '../index';

// TODO we need to review these heavily
export function hex_address_from_principal(principal: Principal, subaccount: number): Address {
    return address_from_principal(principal, subaccount);
}

export function binary_address_from_principal(principal: Principal, subaccount: number): number[] {
  const address = address_from_principal(principal, subaccount);
  return address.match(/.{1,2}/g)?.map((x) => parseInt(x, 16)) ?? [];
}

export function binary_address_from_address(address: Address): number[] {
    return address.match(/.{1,2}/g)?.map((x) => parseInt(x, 16)) ?? [];
}

// https://github.com/Toniq-Labs/extendable-token/blob/86eabb7336ea259876be9be830fb69b03046ea14/motoko/util/AccountIdentifier.mo
// https://github.com/Toniq-Labs/entrepot-app/blob/5004eb5cb3c98805b665d3fa24d95483ce2a8cda/src/ic/utils.js
// Some functions below licensed as follows
// MIT License

// Copyright (c) 2022 Toniq Labs

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
function address_from_principal(principal: Principal, subaccount: number): Address {
    const prefixBytes = new Uint8Array([10, 97, 99, 99, 111, 117, 110, 116, 45, 105, 100]); // \0xAaccount-id
    const principalBytes = decodePrincipalFromText(principal);    
    const subaccountBytes = getSubAccountArray(subaccount);

    const hash = new Uint8Array(
        sha224().update([
            ...prefixBytes,
            ...principalBytes,
            ...subaccountBytes
        ]).digest()
    );
    const checksum = to32Bits(getCrc32(hash));

    return toHexString(new Uint8Array([
        ...checksum,
        ...hash
    ]));
}

function decodePrincipalFromText(text: string): Uint8Array {
    const canisterIdNoDash = text.toLowerCase().replace(/-/g, '');

    let arr = decode(canisterIdNoDash);
    arr = arr.slice(4, arr.length);

    return arr;
}

function getSubAccountArray(subaccount: number): number[] {
    return Array(28).fill(0).concat(to32Bits(subaccount ? subaccount : 0));
}

function to32Bits(number: number): number[] {
    let b = new ArrayBuffer(4);
    new DataView(b).setUint32(0, number);
    return Array.from(new Uint8Array(b));
}

function toHexString(byteArray: Uint8Array): string {
    return Array.from(byteArray, (byte) => {
        return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('');
}