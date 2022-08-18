import {
    blob,
    ok,
    Query,
    Update,
    ic,
    Variant,
    CanisterResult,
    Async
} from 'azle';
import {
    ManagementCanister,
    EcdsaPublicKeyResult,
    SignWithEcdsaResult
} from 'azle/canisters/management';
import encodeUtf8 from 'encode-utf8';
import { sha256 } from 'hash.js';
import { TransactionRequest } from '@ethersproject/providers';
import { UnsignedTransaction } from 'ethers/lib/utils';
import { keccak256 } from '@ethersproject/keccak256';
import { serialize } from '@ethersproject/transactions';

//#region Performance
// type PerfResult = {
//     wasm_body_only: nat64;
//     wasm_including_prelude: nat64;
// };

// let perf_result: Opt<PerfResult> = null;

// export function get_perf_result(): Query<Opt<PerfResult>> {
//     return perf_result;
// }

// function record_performance(start: nat64, end: nat64): void {
//     perf_result = {
//         wasm_body_only: end - start,
//         wasm_including_prelude: ic.performance_counter(0)
//     };
// }
//#endregion

export function getBlobs(): Query<blob[]> {
    let myblobs = [];
    myblobs[0] = string_to_blob('h');
    myblobs[1] = string_to_blob('w');
    return [string_to_blob('hello world')];
    return myblobs;
}

export function getBlob(): Query<blob> {
    return string_to_blob('h');
}

const message: string = `
{
  from: "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
  to: "0xac03bb73b6a9e108530aff4df5077c2b3d481e5a",
  gasLimit: "21000",
  maxFeePerGas: "300",
  maxPriorityFeePerGas: "10",
  nonce: "0",
  value: "10000000000"
}
`;

function hash_message(message: string): blob {
    const message_hash_hex_string = sha256().update(message).digest('hex');

    const message_hash_hex_array: string[] = message_hash_hex_string.match(
        /.{1,2}/g
    ) as string[];

    return Uint8Array.from(
        message_hash_hex_array.map((byte) => parseInt(byte, 16))
    );
}

// export function* get_address(): Update<string> {
//     const public_key_result: CanisterResult<PublicKey> = yield get_public_key();
//     if (!ok(public_key_result)) {
//         // TODO do something if it's not okay
//         return '';
//     }
//     const public_key_hex_string: string = blob_to_hex_string(
//         public_key_result.ok?.public_key
//     );
//     console.log('This is the public key hex string');
//     console.log(public_key_hex_string);

//     //hash the public key with Keccak-256
//     const keccak_key = public_key_hex_string;
//     ethers.utils.computeAddress(
//         '0xb976778317b23a1385ec2d483eda6904d9319135b89f1d8eee9f6d2593e2665d'
//     );

//     console.log('This is the keccak key hex string');
//     console.log(keccak_key);

//     const NIBBLES_PER_ADDRESS = 40; // ie 20 bytes (see https://ethereum.org/en/developers/docs/accounts/#account-creation)
//     return `0x${keccak_key.slice(-NIBBLES_PER_ADDRESS)}`;
// }

export type EcdsaResult = Variant<{
    ok: blob;
    err: string;
}>;

function* get_public_key(): Async<CanisterResult<EcdsaPublicKeyResult>> {
    const caller = ic.caller().toUint8Array();
    const public_key: CanisterResult<EcdsaPublicKeyResult> =
        yield ManagementCanister.ecdsa_public_key({
            canister_id: null,
            derivation_path: [caller],
            key_id: { curve: { secp256k1: null }, name: 'dfx_test_key' }
        });

    return public_key;
}

export function* public_key(): Update<EcdsaResult> {
    const public_key: CanisterResult<EcdsaPublicKeyResult> =
        yield get_public_key();

    if (!ok(public_key)) {
        return public_key;
    }

    return { ok: public_key.ok.public_key };
}

export function* sign(message_hash: blob): Update<EcdsaResult> {
    const caller = ic.caller().toUint8Array();

    const signature_result: CanisterResult<SignWithEcdsaResult> =
        yield ManagementCanister.sign_with_ecdsa({
            message_hash: message_hash,
            derivation_path: [caller],
            key_id: { curve: { secp256k1: null }, name: 'dfx_test_key' }
        }).with_cycles(10_000_000_000n);

    if (!ok(signature_result)) {
        return signature_result;
    }

    return { ok: signature_result.ok.signature };
}

const META_WALLET_ADDRESS = '0xC7d1556d0493bFE48CD1FF307E45a75528c7d3D8';

export function make_transfer(): Update<string> {
    const tx: TransactionRequest = {
        chainId: 12345,
        to: META_WALLET_ADDRESS,
        value: 0xffffffff,
        gasLimit: 7021000
    };

    const signedTransaction = signTransaction(tx);
    console.log(
        `This is the final signed transaction\n${JSON.stringify(
            signedTransaction
        )}`
    );
    return signedTransaction;
}

function signTransaction(tx: TransactionRequest): string {
    const serialized_transaction = serialize(<UnsignedTransaction>tx);
    console.log(`This is the serial to match\n${serialized_transaction}`);
    const transaction_hash = keccak256(serialized_transaction);
    console.log(`This is the hash to match\n${transaction_hash}`);
    const signedTransaction = transaction_hash;
    // TODO sign and serialize again
    return signedTransaction;
}

export function keccak(data: string): Query<string> {
    return keccak256(data);
}

function string_to_blob(string: string): blob {
    return new Uint8Array(encodeUtf8(string));
}

function blob_to_hex_string(blob: blob): string {
    return [...blob].map((byte) => byte.toString().padStart(2, '0')).join('');
}
