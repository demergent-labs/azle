import { HttpRequest, HttpResponse } from 'azle';
import { deepEqual, Named, getActor } from 'azle/property_tests';
import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { HttpResponseAgentResponseValue } from 'azle/property_tests/arbitraries/http/response_arb';
import { Test } from 'azle/test';

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
                name: 'get state before calling http_request',
                test: async () => {
                    const actor = getActor(__dirname);

                    const result = await actor['get_state']();

                    return {
                        Ok: deepEqual(result, 0)
                    };
                }
            },
            {
                name: functionName,
                test: async () => {
                    const response = await fletch('canister', request);
                    const filteredHeaders = response.headers
                        .filter(
                            ([name]) =>
                                name !== 'x-ic-streaming-response' &&
                                name !== 'content-length' &&
                                name !== 'date'
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
                    const valuesAreEqual = deepEqual(
                        processedResponse,
                        processedExpectedResponse
                    );

                    return { Ok: valuesAreEqual };
                }
            },
            {
                name: 'get state after calling http_request',
                test: async () => {
                    const actor = getActor(__dirname);

                    const result = await actor['get_state']();

                    return {
                        Ok: deepEqual(result, 1)
                    };
                }
            }
        ]
    ];
}
