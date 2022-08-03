import {
    blob,
    CanisterResult,
    ic,
    ok,
    Principal,
    Query,
    Update,
    UpdateManual
} from 'azle';
import { HttpResponse, ManagementCanister } from 'azle/canisters/management';

export function* xkcd(): Update<HttpResponse> {
    const http_result: CanisterResult<HttpResponse> =
        yield ManagementCanister.http_request({
            url: `https://xkcd.com/642/info.0.json`,
            max_response_bytes: null, // TODO set this appropriately
            http_method: {
                GET: null
            },
            headers: [],
            body: null,
            transform_method_name: 'xkcd_transform'
        }).with_cycles(300_000_000_000n); // TODO change this based on max_response_bytes

    if (!ok(http_result)) {
        return http_result.err;
    }

    return http_result.ok;
}

export function* xkcd_raw(): UpdateManual<HttpResponse> {
    const http_result: CanisterResult<blob> = yield ic.call_raw(
        Principal.fromText('aaaaa-aa'),
        'http_request',
        ic.candid_encode(`
            (
                record {
                    url = "https://xkcd.com/642/info.0.json";
                    max_response_bytes = null;
                    headers = vec {};
                    body = null;
                    http_method = variant { GET };
                    transform_method_name = "xkcd_transform";
                }
            )
        `),
        300_000_000_000n
    );

    if (!ok(http_result)) {
        return http_result.err;
    }

    return ic.reply_raw(http_result.ok);
}

export function xkcd_transform(
    http_response: HttpResponse
): Query<HttpResponse> {
    return {
        ...http_response,
        headers: []
    };
}
