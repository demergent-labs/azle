import {
    call,
    callRaw,
    candidEncode,
    id,
    IDL,
    Principal,
    query,
    replyRaw,
    update
} from 'azle';
import { HttpResponse, HttpTransformArgs } from 'azle/canisters/management';

export default class {
    @update([], IDL.Text)
    async xkcd() {
        const httpResponse = await call('aaaaa-aa', 'http_request', {
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
                            function: [id(), 'xkcdTransform'] as [
                                Principal,
                                string
                            ],
                            context: Uint8Array.from([])
                        }
                    ]
                }
            ],
            payment: 50_000_000n
        });

        return Buffer.from(httpResponse.body).toString();
    }

    @update([], HttpResponse, { manual: true })
    async xkcdRaw() {
        const httpResponse = await callRaw(
            Principal.fromText('aaaaa-aa'),
            'http_request',
            candidEncode(`
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
            50_000_000n
        );

        replyRaw(httpResponse);
    }
    @query([HttpTransformArgs], HttpResponse)
    xkcdTransform(args: HttpTransformArgs) {
        return {
            ...args.response,
            headers: []
        };
    }
}
