import fc from 'fast-check';
import { UniqueIdentifierArb } from '../../../unique_identifier_arb';
import { BlobCandidDefinition } from '../../candid_definition_arb/types';
import { SimpleCandidDefinitionArb } from '../../simple_type_arbs/definition_arb';

export function BlobDefinitionArb(): fc.Arbitrary<BlobCandidDefinition> {
    return fc.oneof(SimpleCandidDefinitionArb('blob'), _VecNat8DefinitionArb());
}

export function _VecNat8DefinitionArb(): fc.Arbitrary<BlobCandidDefinition> {
    return fc
        .tuple(UniqueIdentifierArb('typeDeclaration'), fc.boolean())
        .map(([name, useTypeDeclaration]): BlobCandidDefinition => {
            const typeAnnotation = 'Vec(nat8)';
            const typeAliasDeclarations = useTypeDeclaration
                ? [`const ${name} = ${typeAnnotation}`]
                : [];
            const imports = new Set(['Vec', 'nat8']);
            return {
                candidMeta: {
                    typeAnnotation,
                    typeAliasDeclarations,
                    imports,
                    candidType: 'blob'
                }
            };
        });
}
