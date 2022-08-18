import { Async, Query, Update } from 'azle';
import { keccak256 } from '@ethersproject/keccak256';
import { keccak256 as js_sha3_keccak } from 'js-sha3';
import keccak_miguelmota from 'keccak256';
import createKeccakHash from 'keccak';
import { Keccak } from 'sha3';
import { keccak256 as keccack_eth_crypt } from 'ethereum-cryptography/keccak';
import { InitializeKeccak, keccak256 as keccak_wasm } from 'keccak-wasm';

const DATA =
    '0xe68080836b21c894c7d1556d0493bfe48cd1ff307e45a75528c7d3d884ffffffff808230398080';
const EXPECTED_RESULT =
    '0x018bf82cafb149d6bfc4d70bb011d2bc090fec4db93a7cefeb7c9f12e88f1535';

export function* keccak(): Update<string> {
    let result: string = '';
    // result = ethersproject_keccak();
    result = keccak256_npm();
    // result = cryptocoinjs_keccak();
    // result = yield keccak_wasm();
    return `Are they equal? ${
        result === EXPECTED_RESULT
    }! The result ${result}`;
}

function keccack_eth_crypt_hash(): string {
    // string_to_blob(DATA);
    // blob_to_string(keccack_eth_crypt(blob));
    return '';
}

// function sha3_keccak_hash(): string {
//     const hash = new Keccak(256);
//     hash.update(DATA);
//     return hash.digest('hex');
// }

// function* keccak_wasm(): Async<string> {
//     yield InitializeKeccak();
//     return keccak256(DATA);
// }

function ethersproject_keccak(): string {
    return keccak256(DATA);
}

// One of the dependent libraries has a syntax error
// function cryptocoinjs_keccak(): string {
//     return createKeccakHash('keccak256').update(DATA).digest().toString('hex');
// }

// // depends on keccak which doesn't work
// function keccak256_npm(): string {
//     return keccak_miguelmota(DATA).toString('hex');
// }
