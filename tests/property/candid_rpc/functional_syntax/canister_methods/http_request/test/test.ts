import { HttpRequest } from 'azle/experimental';
import { runPropTests } from 'azle/test/property';
import { RecordArb } from 'azle/test/property/arbitraries/candid/constructed/record_arb';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/test/property/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/test/property/arbitraries/canister_methods/query_method_arb';
import { HttpRequestArb } from 'azle/test/property/arbitraries/http/request_arb';
import { HttpResponseArb } from 'azle/test/property/arbitraries/http/response_arb';
import { Api } from 'azle/test/property/arbitraries/types';
import fc from 'fast-check';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const api: Api = 'functional';
const context = { api, constraints: {} };

const CanisterConfigArb = RecordArb(context)
    .chain((record) => {
        const HttpRequestMethodArb = QueryMethodArb(
            {
                api,
                constraints: {
                    name: 'http_request'
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
    })
    .map((httpRequestMethod): CanisterConfig<HttpRequest> => {
        return {
            queryMethods: [httpRequestMethod]
        };
    });

runPropTests(CanisterArb(context, CanisterConfigArb));
