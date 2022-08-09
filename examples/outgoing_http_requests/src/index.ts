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
    const max_response_bytes = 1_000n;

    // TODO this is just a hueristic for cost, might change when the feature is officially released: https://forum.dfinity.org/t/enable-canisters-to-make-http-s-requests/9670/130
    const cycle_cost_base = 400_000_000n;
    const cycle_cost_per_byte = 300_000n; // TODO not sure on this exact cost
    const cycle_cost_total =
        cycle_cost_base + cycle_cost_per_byte * max_response_bytes;

    const http_result: CanisterResult<HttpResponse> =
        yield ManagementCanister.http_request({
            url: `https://xkcd.com/642/info.0.json`,
            max_response_bytes,
            http_method: {
                GET: null
            },
            headers: [],
            body: null,
            transform_method_name: 'xkcd_transform'
        }).with_cycles(cycle_cost_total);

    if (!ok(http_result)) {
        ic.trap(http_result.err ?? 'http_result had an error');
    }

    return http_result.ok;
}

export function* xkcd_raw(): UpdateManual<HttpResponse> {
    const max_response_bytes = 1_000n;

    // TODO this is just a hueristic for cost, might change when the feature is officially released: https://forum.dfinity.org/t/enable-canisters-to-make-http-s-requests/9670/130
    const cycle_cost_base = 400_000_000n;
    const cycle_cost_per_byte = 300_000n; // TODO not sure on this exact cost
    const cycle_cost_total =
        cycle_cost_base + cycle_cost_per_byte * max_response_bytes;

    const http_result: CanisterResult<blob> = yield ic.call_raw(
        Principal.fromText('aaaaa-aa'),
        'http_request',
        ic.candid_encode(`
            (
                record {
                    url = "https://xkcd.com/642/info.0.json";
                    max_response_bytes = ${max_response_bytes} : nat64;
                    http_method = variant { GET };
                    headers = vec {};
                    body = null;
                    transform_method_name = "xkcd_transform";
                }
            )
        `),
        cycle_cost_total
    );

    if (!ok(http_result)) {
        ic.trap(http_result.err ?? 'http_result had an error');
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
