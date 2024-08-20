import { HttpRequest } from 'azle/experimental';
import { runPropTests } from 'azle/property_tests';
import { RecordArb } from 'azle/property_tests/arbitraries/candid/constructed/record_arb';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/property_tests/arbitraries/canister_arb';
import { QueryMethod } from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';
import { UpdateMethodArb } from 'azle/property_tests/arbitraries/canister_methods/update_method_arb';
import { HttpRequestArb } from 'azle/property_tests/arbitraries/http/request_arb';
import { HttpResponseArb } from 'azle/property_tests/arbitraries/http/response_arb';
import fc from 'fast-check';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const api = 'class';

const HttpRequestUpdateMethodArb = RecordArb(api).chain((record) => {
    const HttpRequestMethodArb = UpdateMethodArb(
        fc.tuple(HttpRequestArb(api)),
        HttpResponseArb(record, api),
        {
            name: 'http_request_update',
            generateBody,
            generateTests,
            api
        }
    );

    return HttpRequestMethodArb;
});

const CanisterConfigArb = HttpRequestUpdateMethodArb.map(
    (httpRequestUpdateMethod): CanisterConfig<HttpRequest> => {
        const httpRequestMethod = generateHttpRequestMethod();
        const getStateMethod = generateGetStateMethod();

        return {
            queryMethods: [httpRequestMethod, getStateMethod],
            updateMethods: [httpRequestUpdateMethod]
        };
    }
);

runPropTests(CanisterArb(CanisterConfigArb, api));

function generateHttpRequestMethod(): QueryMethod {
    return {
        imports: new Set(['query']),
        globalDeclarations: [],
        sourceCode: /*TS*/ `
            @query([HttpRequest], HttpResponse)
            http_request() {
                return {
                    status_code: 204,
                    headers: [],
                    body: new Uint8Array(),
                    streaming_strategy: [],
                    upgrade: [true]
                };
            }`,
        tests: []
    };
}

function generateGetStateMethod(): QueryMethod {
    return {
        imports: new Set(['query', 'IDL']),
        globalDeclarations: ['let state: number = 0;'],
        sourceCode: /*TS*/ `
            @query([], IDL.Nat8)
            get_state(){
                return state;
            }`,
        tests: []
    };
}
