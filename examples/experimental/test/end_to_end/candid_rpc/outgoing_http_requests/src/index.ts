import { call, candidEncode, id, reply } from 'azle';
import {
    Canister,
    ic,
    Manual,
    None,
    Principal,
    query,
    Some,
    text,
    update
} from 'azle/experimental';
import {
    HttpResponse,
    HttpTransformArgs
} from 'azle/experimental/canisters/management';

export default Canister({
    xkcd: update([], text, async () => {
        if (process.env.AZLE_TEST_FETCH) {
            ic.setOutgoingHttpOptions({
                maxResponseBytes: 2_000n,
                cycles: 50_000_000n,
                transformMethodName: 'xkcdTransform'
            });

            const response = await fetch(`https://xkcd.com/642/info.0.json`);
            const responseText = await response.text();

            return responseText;
        } else {
            const httpResponse = await call(
                Principal.fromText('aaaaa-aa'),
                'http_request',
                {
                    args: [
                        {
                            url: `https://xkcd.com/642/info.0.json`,
                            max_response_bytes: Some(2_000n),
                            method: {
                                get: null
                            },
                            headers: [],
                            body: None,
                            transform: Some({
                                function: [id(), 'xkcdTransform'] as [
                                    Principal,
                                    string
                                ],
                                context: Uint8Array.from([])
                            })
                        }
                    ],
                    cycles: 50_000_000n
                }
            );

            return Buffer.from(httpResponse.body).toString();
        }
    }),
    xkcdRaw: update(
        [],
        Manual(HttpResponse),
        async () => {
            const httpResponse = await call(
                Principal.fromText('aaaaa-aa'),
                'http_request',
                {
                    raw: candidEncode(`
                (
                    record {
                        url = "https://xkcd.com/642/info.0.json";
                        max_response_bytes = 2_000 : nat64;
                        method = variant { get };
                        headers = vec {};
                        body = null;
                        transform = record { function = func "${id().toString()}".xkcdTransform; context = vec {} };
                    }
                )
            `),
                    cycles: 50_000_000n
                }
            );

            reply({ raw: httpResponse });
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
