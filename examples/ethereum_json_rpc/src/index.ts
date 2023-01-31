import { ic, $init, nat32, ok, $query, StableBTreeMap, $update } from 'azle';
import {
    HttpResponse,
    HttpTransformArgs,
    management_canister
} from 'azle/canisters/management';
import decodeUtf8 from 'decode-utf8';
import encodeUtf8 from 'encode-utf8';

type JSON = string;

let stable_storage = new StableBTreeMap<string, string>(0, 25, 1_000);

$init;
export function init(ethereum_url: string) {
    stable_storage.insert('ethereum_url', ethereum_url);
}

$update;
export async function eth_get_balance(ethereum_address: string): Promise<JSON> {
    const max_response_bytes = 200n;

    // TODO this is just a hueristic for cost, might change when the feature is officially released: https://forum.dfinity.org/t/enable-canisters-to-make-http-s-requests/9670/130
    const cycle_cost_base = 400_000_000n;
    const cycle_cost_per_byte = 300_000n; // TODO not sure on this exact cost
    const cycle_cost_total =
        cycle_cost_base + cycle_cost_per_byte * max_response_bytes;

    const http_result = await management_canister
        .http_request({
            url: stable_storage.get('ethereum_url') ?? '',
            max_response_bytes,
            method: {
                post: null
            },
            headers: [],
            body: new Uint8Array(
                encodeUtf8(
                    JSON.stringify({
                        jsonrpc: '2.0',
                        method: 'eth_getBalance',
                        params: [ethereum_address, 'earliest'],
                        id: 1
                    })
                )
            ),
            transform: {
                function: [ic.id(), 'eth_transform'],
                context: Uint8Array.from([])
            }
        })
        .cycles(cycle_cost_total)
        .call();

    if (!ok(http_result)) {
        ic.trap(http_result.err ?? 'http_result had an error');
    }

    return decodeUtf8(Uint8Array.from(http_result.ok.body));
}

$update;
export async function eth_get_block_by_number(number: nat32): Promise<JSON> {
    const max_response_bytes = 2_000n;

    // TODO this is just a hueristic for cost, might change when the feature is officially released: https://forum.dfinity.org/t/enable-canisters-to-make-http-s-requests/9670/130
    const cycle_cost_base = 400_000_000n;
    const cycle_cost_per_byte = 300_000n; // TODO not sure on this exact cost
    const cycle_cost_total =
        cycle_cost_base + cycle_cost_per_byte * max_response_bytes;

    const http_result = await management_canister
        .http_request({
            url: stable_storage.get('ethereum_url') ?? '',
            max_response_bytes,
            method: {
                post: null
            },
            headers: [],
            body: new Uint8Array(
                encodeUtf8(
                    JSON.stringify({
                        jsonrpc: '2.0',
                        method: 'eth_getBlockByNumber',
                        params: [`0x${number.toString(16)}`, false],
                        id: 1
                    })
                )
            ),
            transform: {
                function: [ic.id(), 'eth_transform'],
                context: Uint8Array.from([])
            }
        })
        .cycles(cycle_cost_total)
        .call();

    if (!ok(http_result)) {
        ic.trap(http_result.err ?? 'http_result had an error');
    }

    return decodeUtf8(Uint8Array.from(http_result.ok.body));
}

$query;
export function eth_transform(args: HttpTransformArgs): HttpResponse {
    return {
        ...args.response,
        headers: []
    };
}
