import fc from 'fast-check';
import { Principal } from '@dfinity/principal';

import { PrincipalArb } from './principal_arb';
import { VoidArb } from '../primitive/void';
import { Candid, CandidType, CandidTypeArb } from '../candid_type_arb';
import { UniqueIdentifierArb } from '../../unique_identifier_arb';

export type Func = [Principal, string];
type Mode = 'query' | 'update' | 'oneway';

export const FuncArb = fc
    .tuple(
        UniqueIdentifierArb('typeDeclaration'),
        fc.array(CandidTypeArb),
        fc.tuple(CandidTypeArb, VoidArb),
        fc.constantFrom('query', 'update', 'oneway') as fc.Arbitrary<Mode>,
        PrincipalArb
    )
    .map(([name, params, returnTypeAndVoid, mode, principal]): Candid<Func> => {
        const returnFunc =
            mode === 'oneway' ? returnTypeAndVoid[1] : returnTypeAndVoid[0];

        const typeDeclaration = generateTypeDeclaration(
            name,
            params,
            returnFunc.src.candidType,
            mode
        );

        const imports = new Set([
            ...params.flatMap((param) => [...param.src.imports]),
            ...returnFunc.src.imports,
            'Func'
        ]);

        const value: Func = [principal.value, name];

        const valueLiteral = `[${principal.src.valueLiteral}, '${name}']`;

        return {
            src: {
                candidType: name,
                typeDeclaration,
                imports,
                valueLiteral
            },
            value,
            equals: funcsAreEqual
        };
    });

function generateTypeDeclaration(
    name: string,
    paramCandids: Candid<CandidType>[],
    returnType: string,
    mode: Mode
): string {
    const params = paramCandids.map((param) => param.src.candidType).join(', ');

    return `const ${name} = Func([${params}], ${returnType}, '${mode}')`;
}

function funcsAreEqual(result: Func, expectedResult: Func): boolean {
    if (result[0].toText() !== expectedResult[0].toText()) {
        return false;
    }

    if (result[1] !== expectedResult[1]) {
        return false;
    }

    return true;
}
