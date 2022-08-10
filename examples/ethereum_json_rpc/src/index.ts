import {
    CanisterResult,
    ic,
    Init,
    nat32,
    ok,
    Query,
    Stable,
    Update
} from 'azle';
import { HttpResponse, ManagementCanister } from 'azle/canisters/management';
import decodeUtf8 from 'decode-utf8';
import encodeUtf8 from 'encode-utf8';

type JSON = string;

type StableStorage = Stable<{
    ethereum_url: string;
}>;

let stable_storage: StableStorage = ic.stable_storage();

export function init(ethereum_url: string): Init {
    stable_storage.ethereum_url = ethereum_url;
}

export function* eth_get_balance(ethereum_address: string): Update<JSON> {
    const max_response_bytes = 200n;

    // TODO this is just a hueristic for cost, might change when the feature is officially released: https://forum.dfinity.org/t/enable-canisters-to-make-http-s-requests/9670/130
    const cycle_cost_base = 400_000_000n;
    const cycle_cost_per_byte = 300_000n; // TODO not sure on this exact cost
    const cycle_cost_total =
        cycle_cost_base + cycle_cost_per_byte * max_response_bytes;

    const http_result: CanisterResult<HttpResponse> =
        yield ManagementCanister.http_request({
            url: stable_storage.ethereum_url,
            max_response_bytes,
            http_method: {
                POST: null
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
            transform_method_name: 'eth_block_number_transform'
        }).with_cycles(cycle_cost_total);

    if (!ok(http_result)) {
        ic.trap(http_result.err ?? 'http_result had an error');
    }

    return decodeUtf8(Uint8Array.from(http_result.ok.body));
}

export function* eth_get_block_by_number(number: nat32): Update<JSON> {
    const max_response_bytes = 2_000n;

    // TODO this is just a hueristic for cost, might change when the feature is officially released: https://forum.dfinity.org/t/enable-canisters-to-make-http-s-requests/9670/130
    const cycle_cost_base = 400_000_000n;
    const cycle_cost_per_byte = 300_000n; // TODO not sure on this exact cost
    const cycle_cost_total =
        cycle_cost_base + cycle_cost_per_byte * max_response_bytes;

    const http_result: CanisterResult<HttpResponse> =
        yield ManagementCanister.http_request({
            url: stable_storage.ethereum_url,
            max_response_bytes,
            http_method: {
                POST: null
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
            transform_method_name: 'eth_block_number_transform'
        }).with_cycles(cycle_cost_total);

    if (!ok(http_result)) {
        ic.trap(http_result.err ?? 'http_result had an error');
    }

    return decodeUtf8(Uint8Array.from(http_result.ok.body));
}

export function eth_block_number_transform(
    http_response: HttpResponse
): Query<HttpResponse> {
    return {
        ...http_response,
        headers: []
    };
}
