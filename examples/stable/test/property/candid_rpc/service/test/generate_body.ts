import { Principal } from '@dfinity/principal';
import { Named } from 'azle/test/property';
import { CandidValueAndMeta } from 'azle/test/property/arbitraries/candid/candid_value_and_meta_arb';

export function generateBody(
    namedParamServices: Named<CandidValueAndMeta<Principal>>[],
    returnService: CandidValueAndMeta<Principal>
): string {
    const paramsAreServices = namedParamServices
        .map((param) => {
            const paramIsAService = `(${
                param.name
            } as any).toText() === "${param.value.value.agentArgumentValue.toText()}"`;

            const throwError = `throw new Error('${param.name} must be a Service');`;

            return `if (!(${paramIsAService})) ${throwError}`;
        })
        .join('\n');

    const returnStatement = returnService.src.valueLiteral;

    return `
        ${paramsAreServices}

        return ${returnStatement};
    `;
}
