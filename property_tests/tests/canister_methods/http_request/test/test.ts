import fc from 'fast-check';

import { HttpRequest } from 'azle';
import { runPropTests } from 'azle/property_tests';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/property_tests/arbitraries/canister_arb';
import { HttpRequestArb } from 'azle/property_tests/arbitraries/http/request_arb';
import { HttpResponseArb } from 'azle/property_tests/arbitraries/http/response_arb';
import { QueryMethodArb } from 'azle/property_tests/arbitraries/canister_methods/query_method_arb';
import { RecordArb } from 'azle/property_tests/arbitraries/candid/constructed/record_arb';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const CanisterConfigArb = RecordArb()
    .chain((record) => {
        const HttpRequestMethodArb = QueryMethodArb(
            fc.tuple(HttpRequestArb()),
            HttpResponseArb(record),
            {
                name: 'http_request',
                generateBody,
                generateTests
            }
        );

        return HttpRequestMethodArb;
    })
    .map((httpRequestMethod): CanisterConfig<HttpRequest> => {
        return {
            queryMethods: [httpRequestMethod]
        };
    });

runPropTests(CanisterArb(CanisterConfigArb));
