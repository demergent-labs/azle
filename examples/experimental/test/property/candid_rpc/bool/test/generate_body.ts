import { Named } from 'azle/test/property';
import { CandidValueAndMeta } from 'azle/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { areParamsCorrectlyOrdered } from 'azle/test/property/are_params_correctly_ordered';

export function generateBody(
    namedParamBools: Named<CandidValueAndMeta<boolean>>[],
    returnBool: CandidValueAndMeta<boolean>
): string {
    // TODO do we want to encapsulate 'boolean' in the CandidArb? Like an agentType instead of a candidType, like azleValue and agentValue?
    // TODO or will this not matter anymore once we start using a deep equal library
    const paramsAreBooleans = namedParamBools
        .map((param) => {
            return `if (typeof ${param.name} !== 'boolean') throw new Error('${param.name} must be a boolean');`;
        })
        .join('\n');

    const paramsCorrectlyOrdered = areParamsCorrectlyOrdered(namedParamBools);

    const returnStatement = namedParamBools.reduce((acc, { name }) => {
        return `${acc} && ${name}`;
    }, returnBool.src.valueLiteral);

    return `
        ${paramsAreBooleans}

        ${paramsCorrectlyOrdered}

        return ${returnStatement};
    `;
}
