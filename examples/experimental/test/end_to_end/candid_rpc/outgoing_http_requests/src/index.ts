import { call, candidEncode, canisterSelf, msgReply } from 'azle';
import {
    http_request_args,
    http_request_result
} from 'azle/canisters/management';
import {
    Canister,
    ic,
    Manual,
    Principal,
    query,
    text,
    update
} from 'azle/experimental';
import {
    HttpResponse,
    HttpTransformArgs
} from 'azle/experimental/canisters/management';

export default Canister({
    xkcd: update([], text, async () => {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            ic.setOutgoingHttpOptions({
                maxResponseBytes: 2_000n,
                cycles: 50_000_000n,
                transformMethodName: 'xkcdTransform'
            });

            const response = await fetch(`https://xkcd.com/642/info.0.json`);
            const responseText = await response.text();

            return responseText;
        } else {
            const httpResponse = await call<
                [http_request_args],
                http_request_result
            >(Principal.fromText('aaaaa-aa'), 'http_request', {
                paramIdlTypes: [http_request_args],
                returnIdlType: http_request_result,
                args: [
                    {
                        url: `https://xkcd.com/642/info.0.json`,
                        max_response_bytes: [2_000n],
                        method: {
                            get: null
                        },
                        headers: [],
                        body: [],
                        transform: [
                            {
                                function: [canisterSelf(), 'xkcdTransform'] as [
                                    Principal,
                                    string
                                ],
                                context: Uint8Array.from([])
                            }
                        ]
                    }
                ],
                cycles: 50_000_000n
            });

            return Buffer.from(httpResponse.body).toString();
        }
    }),
    xkcdRaw: update(
        [],
        Manual(HttpResponse),
        async () => {
            const httpResponse = await call<Uint8Array, Uint8Array>(
                Principal.fromText('aaaaa-aa'),
                'http_request',
                {
                    args: candidEncode(`
                (
                    record {
                        url = "https://xkcd.com/642/info.0.json";
                        max_response_bytes = 2_000 : nat64;
                        method = variant { get };
                        headers = vec {};
                        body = null;
                        transform = record { function = func "${canisterSelf().toString()}".xkcdTransform; context = vec {} };
                    }
                )
            `),
                    cycles: 50_000_000n,
                    raw: true
                }
            );

            msgReply(httpResponse);
        },
        { manual: true }
    ),
    xkcdTransform: query([HttpTransformArgs], HttpResponse, (args) => {
        return {
            ...args.response,
            headers: []
        };
    })
});
