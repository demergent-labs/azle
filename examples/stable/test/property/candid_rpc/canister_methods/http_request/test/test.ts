import 'azle/experimental/_internal/test/set_experimental';

import { HttpRequest } from 'azle/canisters/http_gateway/idl';
import { runPropTests } from 'azle/experimental/_internal/test/property';
import { RecordArb } from 'azle/experimental/_internal/test/property/arbitraries/candid/constructed/record_arb';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/experimental/_internal/test/property/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/experimental/_internal/test/property/arbitraries/canister_methods/query_method_arb';
import { HttpRequestArb } from 'azle/experimental/_internal/test/property/arbitraries/http/request_arb';
import { HttpResponseArb } from 'azle/experimental/_internal/test/property/arbitraries/http/response_arb';
import fc from 'fast-check';

import { generateBody } from './generate_body';
import { generateTests } from './generate_tests';

const context = { constraints: {} };

const CanisterConfigArb = RecordArb(context)
    .chain((record) => {
        const HttpRequestMethodArb = QueryMethodArb(
            {
                constraints: {
                    name: 'http_request'
                }
            },
            {
                generateBody,
                generateTests
            },
            fc.tuple(HttpRequestArb()),
            HttpResponseArb(record)
        );

        return HttpRequestMethodArb;
    })
    .map((httpRequestMethod): CanisterConfig<HttpRequest> => {
        return {
            queryMethods: [httpRequestMethod]
        };
    });

runPropTests(CanisterArb(context, CanisterConfigArb));
