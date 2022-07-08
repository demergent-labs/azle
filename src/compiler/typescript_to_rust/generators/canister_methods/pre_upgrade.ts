import { Rust, StableStorageVariableInfo } from '../../../../types';
import * as tsc from 'typescript';
import { getTypeAliasDeclarationsFromSourceFiles } from '../../../typescript_to_candid/ast_utilities/type_aliases';
import { getRustTypeNameFromTypeNode } from '../../ast_utilities/miscellaneous';
import { getCanisterMethodFunctionDeclarationsFromSourceFiles } from '../../../typescript_to_candid/ast_utilities/canister_methods';
import { getFunctionName } from '../../../typescript_to_candid/ast_utilities/miscellaneous';

export function generateCanisterMethodPreUpgrade(
    sourceFiles: readonly tsc.SourceFile[]
): Rust {
    const stableStorageVariableInfos =
        getStableStorageVariableInfos(sourceFiles);

    const preUpgradeFunctionDeclarations =
        getCanisterMethodFunctionDeclarationsFromSourceFiles(sourceFiles, [
            'PreUpgrade'
        ]);

    if (preUpgradeFunctionDeclarations.length > 1) {
        throw new Error(`Only one PreUpgrade function can be defined`);
    }

    const preUpgradeFunctionDeclaration: tsc.FunctionDeclaration | undefined =
        preUpgradeFunctionDeclarations[0];

    const developerDefinedPreUpgradeFunctionName =
        getDeveloperDefinedPreUpgradeFunctionName(
            preUpgradeFunctionDeclaration
        );

    return /* rust */ `
        #[ic_cdk_macros::pre_upgrade]
        fn pre_upgrade() {
            unsafe {
                let mut boa_context = BOA_CONTEXT_OPTION.as_mut().unwrap();

                ${
                    preUpgradeFunctionDeclaration === undefined
                        ? ''
                        : /* rust */ `
                    let exports_js_value = boa_context.eval("exports").unwrap();
                    let exports_js_object = exports_js_value.as_object().unwrap();

                    let ${developerDefinedPreUpgradeFunctionName}_js_value = exports_js_object.get("${developerDefinedPreUpgradeFunctionName}", boa_context).unwrap();
                    let ${developerDefinedPreUpgradeFunctionName}_js_object = ${developerDefinedPreUpgradeFunctionName}_js_value.as_object().unwrap();

                    let return_value = ${developerDefinedPreUpgradeFunctionName}_js_object.call(
                        &boa_engine::JsValue::Null,
                        &[],
                        boa_context
                    ).unwrap();
                `
                }

                // TODO there must be a better way than this eval
                let ic_js_value = boa_context.eval("globalThis.ic").unwrap();
                let ic_js_object = ic_js_value.as_object().unwrap();

                let _azle_stable_storage_js_value = ic_js_object.get("_azle_stable_storage", &mut boa_context).unwrap();
                let _azle_stable_storage_js_object = _azle_stable_storage_js_value.as_object().unwrap();

                ${stableStorageVariableInfos
                    .map((stableStorageVariableInfo) => {
                        return /* rust */ `
                        let ${stableStorageVariableInfo.name}_js_value = _azle_stable_storage_js_object.get("${stableStorageVariableInfo.name}", &mut boa_context).unwrap();
                        let ${stableStorageVariableInfo.name}: ${stableStorageVariableInfo.rustType} = ${stableStorageVariableInfo.name}_js_value.azle_try_from_js_value(&mut boa_context).unwrap();
                    `;
                    })
                    .join('')}

                // TODO should we panic ever in the pre_upgrade?? If so we should unwrap the stable_save
                ${
                    stableStorageVariableInfos.length === 0
                        ? ''
                        : /* rust */ `
                    ic_cdk::storage::stable_save((${stableStorageVariableInfos
                        .map(
                            (stableStorageVariableInfo) =>
                                `${stableStorageVariableInfo.name}`
                        )
                        .join(',')}${
                              stableStorageVariableInfos.length === 1 ? ',' : ''
                          }));
                `
                }
            }
        }
    `;
}

export function getStableStorageVariableInfos(
    sourceFiles: readonly tsc.SourceFile[]
): StableStorageVariableInfo[] {
    const stableTypeAliasDeclaration =
        getStableTypeAliasDeclaration(sourceFiles);

    if (stableTypeAliasDeclaration === null) {
        return [];
    }

    if (stableTypeAliasDeclaration.type.kind !== tsc.SyntaxKind.TypeReference) {
        throw new Error('This cannot happen');
    }

    const typeRefenceNode =
        stableTypeAliasDeclaration.type as tsc.TypeReferenceNode;

    if (typeRefenceNode.typeArguments === undefined) {
        throw new Error('This cannot happen');
    }

    const firstTypeArgument = typeRefenceNode.typeArguments[0];

    if (firstTypeArgument.kind !== tsc.SyntaxKind.TypeLiteral) {
        throw new Error('This cannot happen');
    }

    const typeLiteralNode = firstTypeArgument as tsc.TypeLiteralNode;

    return typeLiteralNode.members.map((member) => {
        if (member.kind !== tsc.SyntaxKind.PropertySignature) {
            throw new Error('this cannot happen');
        }

        const propertySignature = member as tsc.PropertySignature;

        if (propertySignature.type === undefined) {
            throw new Error('This cannot happen');
        }

        if (propertySignature.name.kind !== tsc.SyntaxKind.Identifier) {
            throw new Error('This cannot happen');
        }

        if (propertySignature.type.kind === tsc.SyntaxKind.TypeReference) {
            const typeRefenceNode =
                propertySignature.type as tsc.TypeReferenceNode;

            if (typeRefenceNode.typeName.kind === tsc.SyntaxKind.Identifier) {
                if (
                    typeRefenceNode.typeName.escapedText.toString() ===
                    'Migrate'
                ) {
                    if (typeRefenceNode.typeArguments === undefined) {
                        throw new Error('This cannot happen');
                    }

                    const firstTypeArgument = typeRefenceNode.typeArguments[0];

                    return {
                        name: propertySignature.name.escapedText.toString(),
                        rustType: getRustTypeNameFromTypeNode(
                            sourceFiles,
                            firstTypeArgument
                        ),
                        migrate: true
                    };
                }
            }
        }

        return {
            name: propertySignature.name.escapedText.toString(),
            rustType: getRustTypeNameFromTypeNode(
                sourceFiles,
                propertySignature.type
            ),
            migrate: false
        };
    });
}

// TODO put this somewhere, like an AST utilities file. Also generalize it...there is another function very similar to this elsewhere
function getStableTypeAliasDeclaration(
    sourceFiles: readonly tsc.SourceFile[]
): tsc.TypeAliasDeclaration | null {
    const typeAliasDeclarations =
        getTypeAliasDeclarationsFromSourceFiles(sourceFiles);

    const typeAliasDeclaration = typeAliasDeclarations.find(
        (typeAliasDeclaration) => {
            if (
                typeAliasDeclaration.type.kind === tsc.SyntaxKind.TypeReference
            ) {
                const typeReferenceNode =
                    typeAliasDeclaration.type as tsc.TypeReferenceNode;

                if (
                    typeReferenceNode.typeName.kind ===
                    tsc.SyntaxKind.Identifier
                ) {
                    return (
                        typeReferenceNode.typeName.escapedText.toString() ===
                        'Stable'
                    );
                }

                return false;
            }

            return false;
        }
    );

    return typeAliasDeclaration ?? null;
}

function getDeveloperDefinedPreUpgradeFunctionName(
    initFunctionDeclaration: tsc.FunctionDeclaration | undefined
): string {
    if (initFunctionDeclaration === undefined) {
        return '';
    }

    return getFunctionName(initFunctionDeclaration);
}
