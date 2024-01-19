import fc from 'fast-check';
import { UniqueIdentifierArb } from '../../../unique_identifier_arb';
import {
    BlobCandidDefinition,
    WithShapes,
    WithShapesArb
} from '../../candid_definition_arb/types';
import { SimpleCandidDefinitionArb } from '../../simple_type_arbs/definition_arb';
import { blob } from '../../../../../src/lib';

export function BlobDefinitionArb(): WithShapesArb<BlobCandidDefinition> {
    return fc.oneof(SimpleCandidDefinitionArb('blob'), _VecNat8DefinitionArb());
}

export function _VecNat8DefinitionArb(): WithShapesArb<BlobCandidDefinition> {
    return fc
        .tuple(UniqueIdentifierArb('typeDeclaration'), fc.boolean())
        .map(([name, useTypeDeclaration]): WithShapes<BlobCandidDefinition> => {
            const candidTypeAnnotation = 'Vec<nat8>';
            const candidTypeObject = 'Vec(nat8)';
            const variableAliasDeclarations = useTypeDeclaration
                ? [`const ${name} = ${candidTypeObject}`]
                : [];
            const imports = new Set(['Vec', 'nat8']);
            return {
                definition: {
                    candidMeta: {
                        runtimeCandidTypeObject: blob,
                        candidTypeAnnotation,
                        candidTypeObject,
                        variableAliasDeclarations,
                        imports,
                        candidType: 'blob'
                    }
                },
                recursiveShapes: {}
            };
        });
}
