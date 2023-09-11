import {
    ic,
    Principal,
    query,
    update,
    Service,
    Some,
    None,
    Manual
} from 'azle';
import {
    HttpResponse,
    HttpTransformArgs,
    managementCanister
} from 'azle/canisters/management';

export default class extends Service {
    @update([], HttpResponse)
    async xkcd(): Promise<HttpResponse> {
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
                        function: [ic.id(), 'xkcdTransform'],
                        context: Uint8Array.from([])
                    })
                }
            ],
            cycles: 50_000_000n
        });
    }

    // TODO the replica logs give some concerning output: https://forum.dfinity.org/t/fix-me-in-http-outcalls-call-raw/19435
    @update([], HttpResponse, { manual: true })
    async xkcdRaw(): Promise<Manual<HttpResponse>> {
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
    }

    @query([HttpTransformArgs], HttpResponse)
    xkcdTransform(args: HttpTransformArgs): HttpResponse {
        return {
            ...args.response,
            headers: []
        };
    }
}
