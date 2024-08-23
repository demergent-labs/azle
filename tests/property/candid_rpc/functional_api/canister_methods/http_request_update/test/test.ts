import { HttpRequest } from 'azle/experimental';
import { runPropTests } from 'azle/test/property';
import { RecordArb } from 'azle/test/property/arbitraries/candid/constructed/record_arb';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/test/property/arbitraries/canister_arb';
import { QueryMethod } from 'azle/test/property/arbitraries/canister_methods/query_method_arb';
import { UpdateMethodArb } from 'azle/test/property/arbitraries/canister_methods/update_method_arb';
import { HttpRequestArb } from 'azle/test/property/arbitraries/http/request_arb';
import { HttpResponseArb } from 'azle/test/property/arbitraries/http/response_arb';
import { Api } from 'azle/test/property/arbitraries/types';
import fc from 'fast-check';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const api: Api = 'functional';
const context = { api, constraints: {} };

const HttpRequestUpdateMethodArb = RecordArb(context).chain((record) => {
    const HttpRequestMethodArb = UpdateMethodArb(
        {
            api,
            constraints: {
                name: 'http_request_update'
            }
        },
        {
            generateBody,
            generateTests
        },
        fc.tuple(HttpRequestArb(context)),
        HttpResponseArb(context, record)
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

runPropTests(CanisterArb(context, CanisterConfigArb));

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
