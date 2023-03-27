import {
    Alias,
    ic,
    $init,
    match,
    nat32,
    $query,
    StableBTreeMap,
    $update
} from 'azle';
import {
    HttpResponse,
    HttpTransformArgs,
    managementCanister
} from 'azle/canisters/management';
import decodeUtf8 from 'decode-utf8';
import encodeUtf8 from 'encode-utf8';

type JSON = Alias<string>;

let stableStorage = new StableBTreeMap<string, string>(0, 25, 1_000);

$init;
export function init(ethereumUrl: string): void {
    stableStorage.insert('ethereumUrl', ethereumUrl);
}

$update;
export async function ethGetBalance(ethereumAddress: string): Promise<JSON> {
    const maxResponseBytes = 200n;

    // TODO this is just a hueristic for cost, might change when the feature is officially released: https://forum.dfinity.org/t/enable-canisters-to-make-http-s-requests/9670/130
    const cycleCostBase = 400_000_000n;
    const cycleCostPerByte = 300_000n; // TODO not sure on this exact cost
    const cycleCostTotal = cycleCostBase + cycleCostPerByte * maxResponseBytes;

    const httpResult = await managementCanister
        .http_request({
            url: stableStorage.get('ethereumUrl') ?? '',
            max_response_bytes: maxResponseBytes,
            method: {
                post: null
            },
            headers: [],
            body: new Uint8Array(
                encodeUtf8(
                    JSON.stringify({
                        jsonrpc: '2.0',
                        method: 'eth_getBalance',
                        params: [ethereumAddress, 'earliest'],
                        id: 1
                    })
                )
            ),
            transform: {
                function: [ic.id(), 'ethTransform'],
                context: Uint8Array.from([])
            }
        })
        .cycles(cycleCostTotal)
        .call();

    return match(httpResult, {
        Ok: (httpResponse) => decodeUtf8(Uint8Array.from(httpResponse.body)),
        Err: (err) => ic.trap(err ?? 'httpResult had an error')
    });
}

$update;
export async function ethGetBlockByNumber(number: nat32): Promise<JSON> {
    const maxResponseBytes = 2_000n;

    // TODO this is just a hueristic for cost, might change when the feature is officially released: https://forum.dfinity.org/t/enable-canisters-to-make-http-s-requests/9670/130
    const cycleCostBase = 400_000_000n;
    const cycleCostPerByte = 300_000n; // TODO not sure on this exact cost
    const cycleCostTotal = cycleCostBase + cycleCostPerByte * maxResponseBytes;

    const httpResult = await managementCanister
        .http_request({
            url: stableStorage.get('ethereumUrl') ?? '',
            max_response_bytes: maxResponseBytes,
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
                function: [ic.id(), 'ethTransform'],
                context: Uint8Array.from([])
            }
        })
        .cycles(cycleCostTotal)
        .call();

    return match(httpResult, {
        Ok: (httpResponse) => decodeUtf8(Uint8Array.from(httpResponse.body)),
        Err: (err) => ic.trap(err ?? 'httpResult had an error')
    });
}

$query;
export function ethTransform(args: HttpTransformArgs): HttpResponse {
    return {
        ...args.response,
        headers: []
    };
}
