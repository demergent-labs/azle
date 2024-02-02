import {
    Canister,
    ic,
    Manual,
    None,
    Principal,
    query,
    serialize,
    Some,
    update
} from 'azle';
import {
    HttpResponse,
    HttpTransformArgs,
    managementCanister
} from 'azle/canisters/management';

export default Canister({
    xkcd: update([], HttpResponse, async () => {
        if (process.env.AZLE_TEST_FETCH) {
            const response = await fetch(`icp://aaaaa-aa/http_request`, {
                body: serialize({
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
                                    function: [ic.id(), 'xkcdTransform'],
                                    context: Uint8Array.from([])
                                }
                            ]
                        }
                    ],
                    cycles: 50_000_000n
                })
            });
            return await response.json();
        } else {
            return await ic.call(managementCanister.http_request, {
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
                            function: [ic.id(), 'xkcdTransform'] as [
                                Principal,
                                string
                            ],
                            context: Uint8Array.from([])
                        })
                    }
                ],
                cycles: 50_000_000n
            });
        }
    }),
    xkcdRaw: update(
        [],
        Manual(HttpResponse),
        async () => {
            const httpResponse = await ic.callRaw(
                Principal.fromText('aaaaa-aa'),
                'http_request',
                ic.candidEncode(`
                (
                    record {
                        url = "https://xkcd.com/642/info.0.json";
                        max_response_bytes = 2_000 : nat64;
                        method = variant { get };
                        headers = vec {};
                        body = null;
                        transform = record { function = func "${ic
                            .id()
                            .toString()}".xkcdTransform; context = vec {} };
                    }
                )
            `),
                50_000_000n
            );

            ic.replyRaw(httpResponse);
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
