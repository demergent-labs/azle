import fc from 'fast-check';
import { SimpleCandidValueAndMetaArb } from '../simple_type_arbs/value_and_meta_arb';
import { blobToSrcLiteral } from '../to_src_literal/blob';
import { CandidType } from '../candid_type';
import { BlobCandidDefinition } from '../definition_arb/types';
import { SimpleCandidDefinitionArb } from '../simple_type_arbs/definition_arb';
import { CandidValues } from '../values';
import { SimpleCandidValuesArb } from '../simple_type_arbs/values_arb';
import { UniqueIdentifierArb } from '../../unique_identifier_arb';
import { CandidValueAndMeta } from '../value_and_meta_arb';

export const BlobArb = fc.oneof(
    VecNat8CandidValueAndMetaArb(),
    SimpleCandidValueAndMetaArb(
        fc.uint8Array(),
        CandidType.Blob,
        blobToSrcLiteral
    )
);

export const BlobDefinitionArb: fc.Arbitrary<BlobCandidDefinition> = fc.oneof(
    SimpleCandidDefinitionArb(CandidType.Blob),
    VecNat8DefinitionArb()
);

export const BlobValueArb: fc.Arbitrary<CandidValues<Uint8Array>> =
    SimpleCandidValuesArb(fc.uint8Array(), blobToSrcLiteral);

function VecNat8DefinitionArb(): fc.Arbitrary<BlobCandidDefinition> {
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
                    candidType: CandidType.Blob
                }
            };
        });
}

function VecNat8CandidValueAndMetaArb(): fc.Arbitrary<
    CandidValueAndMeta<Uint8Array>
> {
    return fc.tuple(VecNat8DefinitionArb(), BlobValueArb).map(
        ([
            {
                candidMeta: { typeAnnotation, typeAliasDeclarations, imports }
            },
            { agentArgumentValue, agentResponseValue, valueLiteral }
        ]): CandidValueAndMeta<Uint8Array> => ({
            src: {
                typeAnnotation,
                imports,
                typeAliasDeclarations,
                valueLiteral
            },
            agentArgumentValue,
            agentResponseValue
        })
    );
}
