import {
    Alias,
    ic,
    $init,
    match,
    nat32,
    $query,
    StableBTreeMap,
    $update,
    Opt
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
    const httpResult = await managementCanister
        .http_request({
            url: match(stableStorage.get('ethereumUrl'), {
                Some: (url) => url,
                None: () => ''
            }),
            max_response_bytes: Opt.Some(2_000n),
            method: {
                post: null
            },
            headers: [],
            body: Opt.Some(
                new Uint8Array(
                    encodeUtf8(
                        JSON.stringify({
                            jsonrpc: '2.0',
                            method: 'eth_getBalance',
                            params: [ethereumAddress, 'earliest'],
                            id: 1
                        })
                    )
                )
            ),
            transform: Opt.Some({
                function: [ic.id(), 'ethTransform'],
                context: Uint8Array.from([])
            })
        })
        .cycles(50_000_000n)
        .call();

    return match(httpResult, {
        Ok: (httpResponse) => decodeUtf8(Uint8Array.from(httpResponse.body)),
        Err: (err) => ic.trap(err)
    });
}

$update;
export async function ethGetBlockByNumber(number: nat32): Promise<JSON> {
    const httpResult = await managementCanister
        .http_request({
            url: match(stableStorage.get('ethereumUrl'), {
                Some: (url) => url,
                None: () => ''
            }),
            max_response_bytes: Opt.Some(2_000n),
            method: {
                post: null
            },
            headers: [],
            body: Opt.Some(
                new Uint8Array(
                    encodeUtf8(
                        JSON.stringify({
                            jsonrpc: '2.0',
                            method: 'eth_getBlockByNumber',
                            params: [`0x${number.toString(16)}`, false],
                            id: 1
                        })
                    )
                )
            ),
            transform: Opt.Some({
                function: [ic.id(), 'ethTransform'],
                context: Uint8Array.from([])
            })
        })
        .cycles(50_000_000n)
        .call();

    return match(httpResult, {
        Ok: (httpResponse) => decodeUtf8(Uint8Array.from(httpResponse.body)),
        Err: (err) => ic.trap(err)
    });
}

$query;
export function ethTransform(args: HttpTransformArgs): HttpResponse {
    return {
        ...args.response,
        headers: []
    };
}
