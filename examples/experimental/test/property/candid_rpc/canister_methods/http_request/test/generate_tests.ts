import { HttpRequest, HttpResponse } from 'azle/experimental';
import { Named } from 'azle/experimental/_internal/test/property';
import { CandidValueAndMeta } from 'azle/experimental/_internal/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { HttpResponseAgentResponseValue } from 'azle/experimental/_internal/test/property/arbitraries/http/response_arb';
import {
    AzleResult,
    candidTestEquality,
    Test
} from 'azle/experimental/_internal/test/property/test';

import { fletch } from './fletch';

export function generateTests(
    functionName: string,
    params: Named<CandidValueAndMeta<HttpRequest>>[],
    returnType: CandidValueAndMeta<
        HttpResponse<any>,
        HttpResponseAgentResponseValue
    >
): Test[][] {
    const request = params[0].value.value.agentArgumentValue;
    const expectedResponse = returnType.value.agentResponseValue;

    return [
        [
            {
                name: functionName,
                test: async (): Promise<AzleResult> => {
                    const response = await fletch('canister', request);
                    const filteredHeaders = response.headers
                        .filter(
                            ([name]) =>
                                name !== 'x-ic-streaming-response' &&
                                name !== 'content-length' &&
                                name !== 'date' &&
                                name !== 'access-control-allow-origin' &&
                                name !== 'access-control-expose-headers' &&
                                name !== 'vary'
                        )
                        .sort();
                    const processedResponse = {
                        status: response.status,
                        headers: filteredHeaders,
                        body: response.body
                    };
                    const sortedExpectedHeaders =
                        expectedResponse.headers.sort();
                    const processedExpectedResponse = {
                        ...expectedResponse,
                        headers: sortedExpectedHeaders
                    };

                    return candidTestEquality(
                        processedResponse,
                        processedExpectedResponse
                    );
                }
            }
        ]
    ];
}
