import fc from 'fast-check';

import { PrincipalArb } from '../principal_arb';
import { VoidArb } from '../../primitive/void';
import { CandidValueAndMeta } from '../../candid_arb';
import { CandidType } from '../../candid_type_arb';
import { UniqueIdentifierArb } from '../../../unique_identifier_arb';
import { Func } from './index';

type Mode = 'query' | 'update' | 'oneway';

export function FuncArb(
    candidTypeArb: fc.Arbitrary<CandidValueAndMeta<CandidType>>
) {
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
            ([
                name,
                params,
                returnFunc,
                mode,
                principal
            ]): CandidValueAndMeta<Func> => {
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

                const value: Func = [principal.agentArgumentValue, name];

                const valueLiteral = `[${principal.src.valueLiteral}, '${name}']`;

                return {
                    src: {
                        candidType: name,
                        typeDeclaration,
                        imports,
                        valueLiteral
                    },
                    agentArgumentValue: value,
                    agentResponseValue: value
                };
            }
        );
}

function generateTypeDeclaration(
    name: string,
    paramCandids: CandidValueAndMeta<CandidType>[],
    returnCandid: CandidValueAndMeta<CandidType>,
    mode: Mode
): string {
    const paramTypeDeclarations = paramCandids
        .map((param) => param.src.typeDeclaration ?? '')
        .join('\n');
    const returnTypeDeclaration = returnCandid.src.typeDeclaration ?? '';
    const params = paramCandids.map((param) => param.src.candidType).join(', ');

    return `${paramTypeDeclarations}\n${returnTypeDeclaration}\nconst ${name} = Func([${params}], ${returnCandid.src.candidType}, '${mode}')`;
}
