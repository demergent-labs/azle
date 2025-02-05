import {
    call,
    candidEncode,
    canisterSelf,
    IDL,
    msgReply,
    Principal,
    query,
    update
} from 'azle';
import {
    http_request_args,
    http_request_result,
    http_transform_args
} from 'azle/canisters/management';

export default class {
    @update([], IDL.Text)
    async xkcd(): Promise<string> {
        const httpResponse = await call<
            [http_request_args],
            http_request_result
        >('aaaaa-aa', 'http_request', {
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

        return new TextDecoder().decode(Uint8Array.from(httpResponse.body));
    }

    @update([], http_request_result, { manual: true })
    async xkcdRaw(): Promise<void> {
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
                cycles: 50_000_000n
            }
        );

        msgReply(httpResponse);
    }

    @query([http_transform_args], http_request_result)
    xkcdTransform(args: http_transform_args): http_request_result {
        return {
            ...args.response,
            headers: []
        };
    }
}
