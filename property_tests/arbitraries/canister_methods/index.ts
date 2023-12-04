import { CandidMeta } from '../candid/candid_arb';
import { CandidReturnType } from '../candid/candid_return_type_arb';
import { CandidType } from '../candid/candid_type_arb';
import { Named } from '../..';
import { Test } from '../../../test';

export type BodyGenerator<
    ParamAgentArgumentValue extends CandidType,
    ParamAgentResponseValue,
    ReturnTypeAgentArgumentValue extends CandidType,
    ReturnTypeAgentResponseValue
> = (
    namedParams: Named<
        CandidMeta<ParamAgentArgumentValue, ParamAgentResponseValue>
    >[],
    returnType: CandidMeta<
        ReturnTypeAgentArgumentValue,
        ReturnTypeAgentResponseValue
    >
) => string;

export type TestsGenerator<
    ParamAgentArgumentValue extends CandidType,
    ParamAgentResponseValue,
    ReturnTypeAgentArgumentValue extends CandidType,
    ReturnTypeAgentResponseValue
> = (
    methodName: string,
    namedParams: Named<
        CandidMeta<ParamAgentArgumentValue, ParamAgentResponseValue>
    >[],
    returnType: CandidMeta<
        ReturnTypeAgentArgumentValue,
        ReturnTypeAgentResponseValue
    >
) => Test[];

export type CallbackLocation = 'INLINE' | 'STANDALONE';

export function isDefined<T>(value: T | undefined): value is T {
    return value !== undefined;
}

export function generateCallback<
    ParamType extends CandidType,
    ParamAgentType,
    ReturnType extends CandidReturnType,
    ReturnAgentType
>(
    namedParams: Named<CandidMeta<ParamType, ParamAgentType>>[],
    returnType: CandidMeta<ReturnType, ReturnAgentType>,
    generateBody: BodyGenerator<
        ParamType,
        ParamAgentType,
        ReturnType,
        ReturnAgentType
    >,
    callbackLocation: CallbackLocation,
    callbackName: string
): string {
    const paramNames = namedParams
        .map((namedParam) => namedParam.name)
        .join(', ');

    const body = generateBody(namedParams, returnType);

    if (callbackLocation === 'INLINE') {
        return `(${paramNames}) => {${body}}`;
    }

    const paramNamesAndTypes = namedParams
        .map((namedParam) => `${namedParam.name}: any`) // TODO: Use actual candid type, not any
        .join(', ');

    return `function ${callbackName}(${paramNamesAndTypes}): any {${body}}`; // TODO: Use actual candid type, not any
}
