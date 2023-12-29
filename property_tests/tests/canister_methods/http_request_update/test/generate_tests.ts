import { HttpRequest, HttpResponse } from 'azle';
import { deepEqual, Named } from 'azle/property_tests';
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
                name: 'get state before http_request',
                test: async () => {
                    const TODO = true;
                    // TODO: check that the state was 0
                    return { Ok: TODO };
                }
            },
            {
                name: functionName,
                test: async () => {
                    const response = fletch('canister', request);
                    const filteredHeaders = response.headers.filter(
                        ([name]) =>
                            name !== 'x-ic-streaming-response' &&
                            name !== 'content-length' &&
                            name !== 'date'
                    );
                    const processedResponse = {
                        status: response.status,
                        headers: filteredHeaders,
                        body: response.body
                    };
                    const valuesAreEqual = deepEqual(
                        processedResponse,
                        expectedResponse
                    );

                    return { Ok: valuesAreEqual };
                }
            },
            {
                name: 'get state after calling http_request',
                test: async () => {
                    const TODO = true;
                    // TODO: check that the state is one more than it was before.
                    return { Ok: TODO };
                }
            }
        ]
    ];
}
