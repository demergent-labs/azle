import fc from 'fast-check';
import { Principal } from '@dfinity/principal';

import { PrincipalArb } from './principal_arb';
import { VoidArb } from '../primitive/void';
import { Candid } from '../candid_arb';
import { CandidType, CandidTypeArb } from '../candid_type_arb';
import { UniqueIdentifierArb } from '../../unique_identifier_arb';

export type Func = [Principal, string];
type Mode = 'query' | 'update' | 'oneway';

export const FuncArb = (
    fc.constantFrom('query', 'update', 'oneway') as fc.Arbitrary<Mode>
)
    .chain((mode) => {
        const returnType = mode === 'oneway' ? VoidArb : CandidTypeArb;

        return fc.tuple(
            UniqueIdentifierArb('typeDeclaration'),
            fc.array(CandidTypeArb),
            returnType,
            fc.constant(mode),
            PrincipalArb
        );
    })
    .map(([name, params, returnFunc, mode, principal]): Candid<Func> => {
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
