import { HttpRequest } from 'azle/experimental';
import { runPropTests } from 'azle/property_tests';
import { RecordArb } from 'azle/property_tests/arbitraries/candid/constructed/record_arb';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/property_tests/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';
import { HttpRequestArb } from 'azle/property_tests/arbitraries/http/request_arb';
import { HttpResponseArb } from 'azle/property_tests/arbitraries/http/response_arb';
import { Api } from 'azle/property_tests/arbitraries/types';
import fc from 'fast-check';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const api: Api = 'class';
const context = { api, constraints: {} };

const CanisterConfigArb = RecordArb(context)
    .chain((record) => {
        const HttpRequestMethodArb = QueryMethodArb(
            {
                api,
                constraints: {
                    name: 'http_request',
                    generateBody,
                    generateTests
                }
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
