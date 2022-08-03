// TODO Setting max_response_bytes doesn't seem to have any effect on the maximum number of bytes returned in the response, but it does reduce the with_cycles required amount

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
import utf8 from 'utf8-encoder';

type JSON = string;

type StableStorage = Stable<{
    ethereum_url: string;
}>;

let stable_storage: StableStorage = ic.stable_storage();

export function init(ethereum_url: string): Init {
    stable_storage.ethereum_url = ethereum_url;
}

export function* eth_get_balance(ethereum_address: string): Update<JSON> {
    const http_result: CanisterResult<HttpResponse> =
        yield ManagementCanister.http_request({
            url: stable_storage.ethereum_url,
            max_response_bytes: null, // TODO set this appropriately
            http_method: {
                POST: null
            },
            headers: [],
            body: utf8.fromString(
                JSON.stringify({
                    jsonrpc: '2.0',
                    method: 'eth_getBalance',
                    params: [ethereum_address, 0],
                    id: 1
                })
            ),
            transform_method_name: 'eth_block_number_transform'
        }).with_cycles(300_000_000_000n); // TODO change this based on max_response_bytes

    if (!ok(http_result)) {
        return http_result.err;
    }

    return utf8.toString(http_result.ok.body);
}

export function* eth_get_block_by_number(number: nat32): Update<JSON> {
    const http_result: CanisterResult<HttpResponse> =
        yield ManagementCanister.http_request({
            url: stable_storage.ethereum_url,
            max_response_bytes: null, // TODO set this appropriately
            http_method: {
                POST: null
            },
            headers: [],
            body: utf8.fromString(
                JSON.stringify({
                    jsonrpc: '2.0',
                    method: 'eth_getBlockByNumber',
                    params: [`0x${number.toString(16)}`, false],
                    id: 1
                })
            ),
            transform_method_name: 'eth_block_number_transform'
        }).with_cycles(300_000_000_000n); // TODO change this based on max_response_bytes

    if (!ok(http_result)) {
        return http_result.err;
    }

    return utf8.toString(http_result.ok.body);
}

export function eth_block_number_transform(
    http_response: HttpResponse
): Query<HttpResponse> {
    return {
        ...http_response,
        headers: []
    };
}
