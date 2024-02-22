import fc from 'fast-check';

import { HttpRequest } from 'azle';
import { runPropTests } from 'azle/property_tests';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/property_tests/arbitraries/canister_arb';
import { HttpRequestArb } from 'azle/property_tests/arbitraries/http/request_arb';
import { HttpResponseArb } from 'azle/property_tests/arbitraries/http/response_arb';
import { QueryMethod } from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';
import { RecordArb } from 'azle/property_tests/arbitraries/candid/constructed/record_arb';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';
import { UpdateMethodArb } from 'azle/property_tests/arbitraries/canister_methods/update_method_arb';

const HttpRequestUpdateMethodArb = RecordArb().chain((record) => {
    const HttpRequestMethodArb = UpdateMethodArb(
        fc.tuple(HttpRequestArb()),
        HttpResponseArb(record),
        {
            name: 'http_request_update',
            generateBody,
            generateTests
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

runPropTests(CanisterArb(CanisterConfigArb));

function generateHttpRequestMethod(): QueryMethod {
    return {
        imports: new Set([
            'query',
            'HttpRequest',
            'HttpResponse',
            'Null',
            'Some'
        ]),
        globalDeclarations: [],
        sourceCode: /*TS*/ `http_request: query([HttpRequest], HttpResponse(Null), () => {
            return {
                status_code: 204,
                headers: [],
                body: new Uint8Array(),
                streaming_strategy: None,
                upgrade: Some(true)
            };
        })`,
        tests: []
    };
}

function generateGetStateMethod(): QueryMethod {
    return {
        imports: new Set(['query', 'nat8']),
        globalDeclarations: ['let state: number = 0;'],
        sourceCode: /*TS*/ `get_state: query([], nat8, () => {
            return state;
        })`,
        tests: []
    };
}
