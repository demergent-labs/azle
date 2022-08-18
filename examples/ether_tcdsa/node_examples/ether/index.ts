import { ethers, Wallet } from 'ethers';
import { UnsignedTransaction } from 'ethers/lib/utils';
import { SignatureLike } from '@ethersproject/bytes';
import { SigningKey } from '@ethersproject/signing-key';
import { TransactionRequest } from '@ethersproject/providers';
import { keccak256 } from '@ethersproject/keccak256';
import { serialize } from '@ethersproject/transactions';
// import * as encodeUtf8 from "encode-utf8";

const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');

// Address '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'
function create_test_wallet() {
    const mnemonic =
        'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol';
    return Wallet.fromMnemonic(mnemonic);
}

function create_test_signing_key() {
    const wallet = create_test_wallet();
    return new SigningKey(wallet.privateKey);
}

const META_WALLET_ADDRESS = '0xC7d1556d0493bFE48CD1FF307E45a75528c7d3D8';

async function make_transfer(): Promise<string> {
    const tx: TransactionRequest = {
        chainId: 12345,
        to: META_WALLET_ADDRESS,
        value: 0xffffffff,
        gasLimit: 7021000
    };

    // Signing a transaction
    const mySignedTransaction = signTransaction(tx);

    const walletMnemonic = create_test_wallet();

    const ethersSignedTransaction = await walletMnemonic.signTransaction(tx);
    if (ethersSignedTransaction !== mySignedTransaction) {
        console.log('WARNING: Signatures do not match');
    }
    return ethersSignedTransaction;
}

function signTransaction(tx: TransactionRequest): string {
    // Check that the tx.from is the same as this address if the tx.from is specified.
    // I am not doing a full transaction so I don't think I'll ever have to do this.
    const serialized_transaction = serialize(<UnsignedTransaction>tx);
    console.log(`This is the serial to match\n${serialized_transaction}`);
    const transaction_hash = keccak256(serialized_transaction);
    console.log(`This is the hash to match\n${transaction_hash}`);
    const signature = signDigest(transaction_hash);
    // It looks like serialize is formatting the transaction and then RLP
    // encoding it. So the pattern is
    // 1. RLP encode the transaction
    // 2. Keccak hash the RLP encoded transaction
    // 3. Sign that hash
    // 4. RLP encode the signature and the transaction together

    return serialize(<UnsignedTransaction>tx, signature);
}

function signDigest(digest: string): SignatureLike {
    const signing_key = create_test_signing_key();
    return signing_key.signDigest(digest);
}

type SendRawResponse = {
    jsonrpc: string;
    id: number;
    result: string;
};

async function post<T>(body: {}): Promise<T | string> {
    const url = 'http://localhost:8545';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    if (response.ok) {
        return response.json();
    } else {
        console.log(`Response Status: ${response.status}`);
        return 'There was an error';
    }
}

async function send_raw_transaction(tx: string) {
    const send_raw_body = {
        jsonrpc: 2.0,
        method: 'eth_sendRawTransaction',
        params: [tx],
        id: 1
    };
    await post<SendRawResponse>(send_raw_body);
}

const TEST_WALLET_MNEMONIC =
    'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol';
const TEST_WALLET_ADDRESS = '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1';

async function getBalances() {
    const test_wallet_balance = await provider.send('eth_getBalance', [
        TEST_WALLET_ADDRESS,
        'latest'
    ]);
    const meta_wallet_balance = await provider.send('eth_getBalance', [
        META_WALLET_ADDRESS,
        'latest'
    ]);
    console.log(
        `Test Balance: ${ethers.utils.formatEther(test_wallet_balance)}`
    );
    console.log(
        `Meta Balance: ${ethers.utils.formatEther(meta_wallet_balance)}`
    );
}

async function run() {
    getBalances();
    ethers_demo();
    const transfer_hash = await make_transfer();
    send_raw_transaction(transfer_hash);
}

function hexStringToBytes(hex: string): Uint8Array {
    return Uint8Array.from(
        hex.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []
    );
}

function ethers_demo() {
    // Create a wallet instance from a mnemonic...
    const walletMnemonic = Wallet.fromMnemonic(TEST_WALLET_MNEMONIC);

    // A Wallet address is available synchronously
    walletMnemonic.address;
    // '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

    // The internal cryptographic components
    walletMnemonic.privateKey;
    // '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
    walletMnemonic.publicKey;
    // '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'
    const generatedAddress = create_address(walletMnemonic.publicKey);
    if (generatedAddress !== walletMnemonic.address.toLowerCase()) {
        console.log(
            `The generated address is not the same as the wallet address
            Generated Address: ${generatedAddress}
            Wallet Address: ${walletMnemonic.address}`
        );
    }
}

function create_address(public_key: string): string {
    // The public key should be 64 bytes so the hex string should be 128
    // characters long (2 nibbles per byte) and then the key should have either
    // a 0x or 0x04 prefix for a total of 132 or 130 bytes
    if (public_key.length !== 132 && public_key.length !== 130) {
        console.log(
            "The public key provided doesn't have enough the right amount of bytes"
        );
        return '';
    }

    // See if it's compressed by seeing if it has the 0x04 prefix
    // If so remove the 0x04 prefix
    // Otherwise just remove the 0x prefix
    const public_key_hex = public_key.startsWith('0x04')
        ? public_key.slice(4)
        : public_key.slice(2);

    const public_key_bytes = hexStringToBytes(public_key_hex);
    const public_key_hash = keccak256(public_key_bytes);

    // Append 0x to the last 20 bytes of the keccak hashed public key
    const address = `0x${public_key_hash.slice(
        public_key_hash.length - 20 * 2
    )}`;
    return address;
}

run();
