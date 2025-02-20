import { Principal } from '@dfinity/principal';
import fc from 'fast-check';

import { JsPropertyNameArb } from '../../../js_function_name_arb';
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
        .map(([principal, name]) => generateCandidFuncValue(principal, name));
}

/**
 * Generates a Candid function value from a name and principal
 *
 * @param name - The function name
 * @param principal - The principal value
 * @returns A CandidValues<Func> object
 */
function generateCandidFuncValue(
    principal: CandidValues<Principal>,
    name: string
): CandidValues<Func> {
    const value: Func = [
        principal.agentArgumentValue,
        extractFunctionName(name)
    ];

    return {
        valueLiteral: generateValueLiteral(name, principal),
        agentArgumentValue: value,
        agentResponseValue: value
    };
}

/**
 * Extracts the function name from a potentially quoted string
 *
 * @param name - The raw function name which may be quoted
 * @returns The cleaned function name
 *
 * @remarks
 * If the name has any special characters, or is otherwise not a valid identifier, it will be quoted to make it valid.
 */
function extractFunctionName(name: string): string {
    return name.startsWith('"') ? name.slice(1, -1) : name;
}

function generateValueLiteral(
    name: string,
    principal: CandidValues<any>
): string {
    const functionName = name.startsWith('"')
        ? `"${escapeStringLiteral(name.slice(1, -1))}"`
        : `"${name}"`;

    return `[${principal.valueLiteral}, ${functionName}]`;
}

function escapeStringLiteral(input: string): string {
    return input
        .replace(/\\/g, '\\\\') // Escape backslashes
        .replace(/'/g, "'\\''") // Escape single quotes
        .replace(/"/g, '\\"'); // Escape double quotes
}
