import fc from 'fast-check';

import { PrincipalArb } from '../principal_arb';
import { VoidArb } from '../../primitive/void';
import { CandidMeta } from '../../candid_arb';
import { CandidType } from '../../candid_type_arb';
import { UniqueIdentifierArb } from '../../../unique_identifier_arb';
import { Func } from './index';

type Mode = 'query' | 'update' | 'oneway';

export function FuncArb(candidTypeArb: fc.Arbitrary<CandidMeta<CandidType>>) {
    return (fc.constantFrom('query', 'update', 'oneway') as fc.Arbitrary<Mode>)
        .chain((mode) => {
            const returnType = mode === 'oneway' ? VoidArb : candidTypeArb;

            return fc.tuple(
                UniqueIdentifierArb('typeDeclaration'),
                fc.array(candidTypeArb),
                returnType,
                fc.constant(mode),
                PrincipalArb
            );
        })
        .map(
            ([name, params, returnFunc, mode, principal]): CandidMeta<Func> => {
                const typeDeclaration = generateTypeDeclaration(
                    name,
                    params,
                    returnFunc,
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
                    expectedValue: value
                };
            }
        );
}

function generateTypeDeclaration(
    name: string,
    paramCandids: CandidMeta<CandidType>[],
    returnCandid: CandidMeta<CandidType>,
    mode: Mode
): string {
    const paramTypeDeclarations = paramCandids
        .map((param) => param.src.typeDeclaration ?? '')
        .join('\n');
    const returnTypeDeclaration = returnCandid.src.typeDeclaration ?? '';
    const params = paramCandids.map((param) => param.src.candidType).join(', ');

    return `${paramTypeDeclarations}\n${returnTypeDeclaration}\nconst ${name} = Func([${params}], ${returnCandid.src.candidType}, '${mode}')`;
}
