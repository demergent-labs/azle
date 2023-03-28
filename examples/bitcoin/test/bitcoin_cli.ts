import { execSync } from 'child_process';

export type Utxo = {
    txid: string;
    vout: number;
    address: string;
    label: string;
    scriptPubKey: string;
    amount: number;
    confirmations: number;
    spendable: boolean;
    solvable: boolean;
    desc: string;
    safe: boolean;
};

export type TxInput = {
    /** The transaction id */
    txid: string;
    /** The output number */
    vout: number;
};

export type TxOutputs = {
    [key: string]: number;
};

export type SignedTransaction = {
    /** The hex-encoded raw transaction with signature(s) */
    hex: string;
    /** If the transaction has a complete set of signatures */
    complete: boolean;
};

/**
 * A simple API for interacting with the bitcoin-cli
 */
export const bitcoinCli = {
    createRawTransaction,
    createWallet,
    generateToAddress,
    getReceivedByAddress,
    importPrivateKey,
    listUnspent,
    signRawTransactionWithWallet
};

/**
 * Create a transaction spending the given inputs and creating new outputs.
 * Outputs can be addresses or data.
 * @param input
 * @param outputs
 * @returns hex-encoded raw transaction
 */
function createRawTransaction(input: TxInput, outputs: TxOutputs): string {
    return cli(
        `createrawtransaction '[${JSON.stringify(input)}]' '${JSON.stringify(
            outputs
        )}'`
    );
}

/**
 * Creates a new bitcoin wallet and unlocks it for future operations
 * @param name The name for the wallet
 * @param passPhrase The phrase used to encrypt the wallet
 */
function createWallet(
    name: string = 'default',
    passPhrase: string = 'my pass phrase'
): void {
    cli(`createwallet "${name}" false false "${passPhrase}" false false true`);
    cli(`walletpassphrase "${passPhrase}" 1800`);
}

/**
 * Mine blocks immediately to a specified address (before the RPC call returns)
 * @param nblocks The number of blocks to generate immediately
 * @param address The address to send the newly generated bitcoin to
 */
async function generateToAddress(
    nblocks: number,
    address: string
): Promise<void> {
    const iterations = nblocks > 50 ? Math.floor(nblocks / 50) : 0;
    const remainder = nblocks % 50;
    const counts = [...Array(iterations).fill(50), remainder];
    for (const n of counts) {
        cli(`generatetoaddress ${n} ${address}`);
        // If we don't wait a little the Bitcoin CLI hangs
        await new Promise((resolve) => setTimeout(resolve, 500));
    }
}

/**
 * Returns the total amount received by the given address in transactions with
 * at least `minconf` confirmations.
 * @param address The bitcoin address for transactions
 * @param minconf Only include transactions confirmed at least this many times
 * @returns
 */
function getReceivedByAddress(address: string, minconf: number = 1): number {
    const amountString = cli(`getreceivedbyaddress ${address} ${minconf}`);
    return parseFloat(amountString);
}

/**
 * Adds a new private key to the CLI's wallet
 * @param wif A private key in wallet import format
 * @param label An optional label for identifying the private key
 */
function importPrivateKey(wif: string, label?: string): void {
    cli(`importprivkey ${wif} ${label}`);
}

/**
 * Returns array of unspent transaction outputs
 * @returns The utxos
 */
function listUnspent(): Utxo[] {
    const utxosString = cli(`listunspent`);
    const utxos: Utxo[] = JSON.parse(utxosString);
    return utxos;
}

/**
 * Sign inputs for raw transaction (serialized, hex-encoded).
 * @param hexString The transaction hex string
 * @returns The signed transaction
 */
function signRawTransactionWithWallet(hexString: string): SignedTransaction {
    const signedTxString = cli(`signrawtransactionwithwallet ${hexString}`);
    const signedTx: SignedTransaction = JSON.parse(signedTxString);
    return signedTx;
}

export function cli(command: string): string {
    return execSync(
        `.bitcoin/bin/bitcoin-cli -conf=$(pwd)/.bitcoin.conf -datadir=$(pwd)/.bitcoin -rpcport=18443 ${command}`
    ).toString();
}
