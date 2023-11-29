import fc from 'fast-check';
import { PrimitiveCandidShape } from '../candid_meta_arb';
import {
    CandidType,
    primitiveCandidClassToImports,
    primitiveCandidTypeToString
} from '../candid_type';
import { UniqueIdentifierArb } from '../../unique_identifier_arb';

export function SimpleCandidShapeArb(
    candidClass: CandidType
): fc.Arbitrary<PrimitiveCandidShape> {
    return fc
        .tuple(UniqueIdentifierArb('typeDeclaration'), fc.boolean())
        .map(([name, useTypeDeclaration]) => {
            const candidType = useTypeDeclaration
                ? name
                : primitiveCandidTypeToString(candidClass);
            const imports = primitiveCandidClassToImports(candidClass);
            const typeDeclaration = generateTypeDeclaration(
                name,
                primitiveCandidTypeToString(candidClass),
                useTypeDeclaration
            );
            return {
                candidMeta: {
                    candidClass,
                    candidType,
                    imports,
                    typeDeclaration
                }
            };
        });
}

function generateTypeDeclaration(
    name: string,
    candidType: string,
    useTypeDeclaration: boolean
): string {
    if (useTypeDeclaration) {
        return `const ${name} = ${candidType};`;
    }
    return '';
}
