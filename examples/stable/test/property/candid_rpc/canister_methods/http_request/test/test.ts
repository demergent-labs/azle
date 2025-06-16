import 'azle/experimental/_internal/test/set_experimental';

import { HttpRequest } from 'azle/experimental';
import { runPropTests } from 'azle/experimental/_internal/test/property';
import { RecordArb } from 'azle/experimental/_internal/test/property/arbitraries/candid/constructed/record_arb';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/experimental/_internal/test/property/arbitraries/canister_arb';
import { QueryMethodArb } from 'azle/experimental/_internal/test/property/arbitraries/canister_methods/query_method_arb';
import { HttpRequestArb } from 'azle/experimental/_internal/test/property/arbitraries/http/request_arb';
import { HttpResponseArb } from 'azle/experimental/_internal/test/property/arbitraries/http/response_arb';
import { Api } from 'azle/experimental/_internal/test/property/arbitraries/types';
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

if (process.env.AZLE_RUNNING_IN_WSL === 'true') {
    console.info('skipping all tests on wsl');
} else {
    runPropTests(CanisterArb(context, CanisterConfigArb));
}
