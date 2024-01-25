import fc from 'fast-check';

import { CandidValueAndMeta } from '../candid/candid_value_and_meta_arb';
import { CandidReturnType } from '../candid/candid_return_type_arb';
import { CorrespondingJSType } from '../candid/corresponding_js_type';
import { Named } from '../..';
import { Test } from '../../../test';

export type BodyGenerator<
    ParamAgentArgumentValue extends CorrespondingJSType = undefined,
    ParamAgentResponseValue = undefined,
    ReturnTypeAgentArgumentValue extends CorrespondingJSType = undefined,
    ReturnTypeAgentResponseValue = undefined
> = (
    namedParams: Named<
        CandidValueAndMeta<ParamAgentArgumentValue, ParamAgentResponseValue>
    >[],
    returnType: CandidValueAndMeta<
        ReturnTypeAgentArgumentValue,
        ReturnTypeAgentResponseValue
    >
) => string;

export type TestsGenerator<
    ParamAgentArgumentValue extends CorrespondingJSType = undefined,
    ParamAgentResponseValue = undefined,
    ReturnTypeAgentArgumentValue extends CorrespondingJSType = undefined,
    ReturnTypeAgentResponseValue = undefined
> = (
    methodName: string,
    namedParams: Named<
        CandidValueAndMeta<ParamAgentArgumentValue, ParamAgentResponseValue>
    >[],
    returnType: CandidValueAndMeta<
        ReturnTypeAgentArgumentValue,
        ReturnTypeAgentResponseValue
    >
) => Test[][];

export type CallbackLocation = 'INLINE' | 'STANDALONE';

export const CallbackLocationArb = fc.constantFrom<CallbackLocation>(
    'INLINE',
    'STANDALONE'
);

export function isDefined<T>(value: T | undefined): value is T {
    return value !== undefined;
}

export function generateCallback<
    ParamType extends CorrespondingJSType,
    ParamAgentType,
    ReturnType extends CandidReturnType,
    ReturnAgentType
>(
    namedParams: Named<CandidValueAndMeta<ParamType, ParamAgentType>>[],
    returnType: CandidValueAndMeta<ReturnType, ReturnAgentType>,
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
