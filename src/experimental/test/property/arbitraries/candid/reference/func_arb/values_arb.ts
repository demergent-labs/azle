import '#experimental/build/assert_experimental';

import { Principal } from '@dfinity/principal';
import fc from 'fast-check';

import { JsPropertyNameArb } from '../../../js_name_arb';
import { CandidValues } from '../../candid_values_arb';
import { PrincipalValueArb } from '../principal_arb';
import { Func } from '.';

/**
 * Generates arbitrary Candid function values for property-based testing.
 * Creates a tuple of principal and function name, then maps it to the required format.
 *
 * @returns An arbitrary that generates CandidValues<Func>
 */
export function FuncValueArb(): fc.Arbitrary<CandidValues<Func>> {
    return fc
        .tuple(PrincipalValueArb(), JsPropertyNameArb)
        .map(([principal, propertyName]) =>
            generateCandidFuncValue(principal, propertyName)
        );
}

function generateCandidFuncValue(
    principal: CandidValues<Principal>,
    propertyName: string
): CandidValues<Func> {
    const functionName = extractFunctionName(propertyName);

    const value: Func = [principal.agentArgumentValue, functionName];

    return {
        valueLiteral: generateValueLiteral(principal, functionName),
        agentArgumentValue: value,
        agentResponseValue: value
    };
}

/**
 * Extracts the function name from a potentially quoted property name
 *
 * @param propertyName - The raw property name which may be quoted
 * @returns The cleaned function name
 *
 * @remarks
 * If the given property name has any special characters, or is otherwise not a
 * valid identifier, it will be quoted to make it valid. And therefore must be
 * unquoted when used as a function name.
 */
function extractFunctionName(propertyName: string): string {
    return propertyName.startsWith('"')
        ? propertyName.slice(1, -1)
        : propertyName;
}

function generateValueLiteral(
    principal: CandidValues<Principal>,
    functionName: string
): string {
    const functionNameLiteral = `"${escapeStringLiteral(functionName)}"`;

    return `[${principal.valueLiteral}, ${functionNameLiteral}]`;
}

function escapeStringLiteral(input: string): string {
    return input
        .replace(/\\/g, '\\\\') // Escape backslashes
        .replace(/"/g, '\\"'); // Escape double quotes
}
