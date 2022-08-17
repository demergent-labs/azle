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
export const bitcoin_cli = {
    create_raw_transaction,
    create_wallet,
    generate_to_address,
    get_received_by_address,
    import_private_key,
    list_unspent,
    sign_raw_transaction_with_wallet
};

/**
 * Create a transaction spending the given inputs and creating new outputs.
 * Outputs can be addresses or data.
 * @param input
 * @param outputs
 * @returns hex-encoded raw transaction
 */
function create_raw_transaction(input: TxInput, outputs: TxOutputs): string {
    return cli(
        `createrawtransaction '[${JSON.stringify(input)}]' '${JSON.stringify(
            outputs
        )}'`
    );
}

/**
 * Creates a new bitcoin wallet and unlocks it for future operations
 * @param name The name for the wallet
 * @param pass_phrase The phrase used to encrypt the wallet
 */
function create_wallet(
    name: string = 'default',
    pass_phrase: string = 'my pass phrase'
): void {
    cli(`createwallet "${name}" false false "${pass_phrase}" false false true`);
    cli(`walletpassphrase "${pass_phrase}" 1800`);
}

/**
 * Mine blocks immediately to a specified address (before the RPC call returns)
 * @param nblocks The number of blocks to generate immediately
 * @param address The address to send the newly generated bitcoin to
 */
async function generate_to_address(
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
function get_received_by_address(address: string, minconf: number = 1): number {
    const amount_string = cli(`getreceivedbyaddress ${address} ${minconf}`);
    return parseFloat(amount_string);
}

/**
 * Adds a new private key to the CLI's wallet
 * @param wif A private key in wallet import format
 * @param label An optional label for identifying the private key
 */
function import_private_key(wif: string, label?: string): void {
    cli(`importprivkey ${wif} ${label}`);
}

/**
 * Returns array of unspent transaction outputs
 * @returns The utxos
 */
function list_unspent(): Utxo[] {
    const utxos_string = cli(`listunspent`);
    const utxos: Utxo[] = JSON.parse(utxos_string);
    return utxos;
}

/**
 * Sign inputs for raw transaction (serialized, hex-encoded).
 * @param hex_string The transaction hex string
 * @returns The signed transaction
 */
function sign_raw_transaction_with_wallet(
    hex_string: string
): SignedTransaction {
    const signed_tx_string = cli(`signrawtransactionwithwallet ${hex_string}`);
    const signed_tx: SignedTransaction = JSON.parse(signed_tx_string);
    return signed_tx;
}

export function cli(command: string): string {
    return execSync(
        `.bitcoin/bin/bitcoin-cli -conf=$(pwd)/.bitcoin.conf -datadir=$(pwd)/.bitcoin -rpcport=18443 ${command}`
    ).toString();
}
