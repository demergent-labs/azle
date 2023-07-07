// IMPORTANT: Nothing from here is used right now. (https://github.com/demergent-labs/azle/issues/1092)
import * as ts from 'typescript';
import { AliasTable } from '../../../utils/types';
import {
    getSymbolTable,
    getSymbolTableForDeclaration
} from '../get_symbol_table';
import { getSourceFile, getDeclarationFromNamespace } from '../utils';
import { generateAliasTableForSymbol } from '../process_symbol';
import { generateSingleEntryAliasTable } from '../alias_table';

const TYPE_ALIASES_ARE_STILL_UNIMPLEMENTED = true;

function isAzleTypeAliasDecl(
    typeAliasDeclaration: ts.TypeAliasDeclaration
): boolean {
    let sourceFile = getSourceFile(typeAliasDeclaration);
    if (!sourceFile) {
        return false;
    }
    return sourceFile.fileName.includes('azle/src/lib');
}

export function generateAliasTableForTypeAliasDeclaration(
    typeAliasDeclaration: ts.TypeAliasDeclaration,
    alias: string,
    program: ts.Program
): AliasTable | undefined {
    if (isAzleTypeAliasDecl(typeAliasDeclaration)) {
        // TODO I'm not sure that this is right
        // TODO test that we can make aliases to all sorts of azle types
        console.log(`${alias} is a ${typeAliasDeclaration.name.text}`);
        return generateSingleEntryAliasTable(
            typeAliasDeclaration.name.text,
            alias
        );
    }
    // if (TYPE_ALIASES_ARE_STILL_UNIMPLEMENTED) {
    //     return undefined; // TODO Add support for type alias declarations
    //     // The below code doesn't work, but it's hopefully a good starting point
    // }
    // if (typeAliasDeclaration.typeParameters?.length ?? 0 > 0) {
    //     return undefined; // This looks like a candid definition not a possible azle alias
    // }
    // TODO if there are typeParameters then can we find the corresponding type arguments and not count them against the being a candidate
    // TODO what if we got the length of the typeParamters and if it was the same as the length of the typearguments then we are good, otherwise return?
    let aliasedType = typeAliasDeclaration.type;
    if (ts.isTypeReferenceNode(aliasedType)) {
        let typeArguments = aliasedType.typeArguments;
        if (typeArguments) {
            if (typeArguments.length > 0) {
                return undefined;
            }
        }
    }
    const sourceFile = getSourceFile(typeAliasDeclaration);
    if (sourceFile === undefined) {
        // TODO couldn't find the sourceFile
        return undefined;
    }

    console.log(`============= ${alias} ================`);
    console.log(typeAliasDeclaration.name.text);
    console.log(typeAliasDeclaration.getText(sourceFile));
    if (typeAliasDeclaration.typeParameters) {
        console.log(typeAliasDeclaration.typeParameters.length);
    }
    if (alias === 'RejectionCode') {
        console.log(typeAliasDeclaration);
    }
    const symbolTable = getSymbolTable(sourceFile, program);
    if (symbolTable === undefined) {
        // TODO couldn't get a symbol table
        return undefined;
    }
    const typeReference = typeAliasDeclaration.type;
    if (ts.isTypeReferenceNode(typeReference)) {
        const typeName = typeReference.typeName;
        if (ts.isQualifiedName(typeName)) {
            const left = typeName.left;
            if (ts.isIdentifier(left)) {
                const leftSymbol = symbolTable.get(left.text as ts.__String);
                if (leftSymbol === undefined) {
                    return undefined;
                }
                if (leftSymbol.declarations?.length != 1) {
                    return undefined;
                }
                const namespace = leftSymbol.declarations[0];
                if (!ts.isNamespaceImport(namespace)) {
                    return undefined;
                }
                const declaration = getDeclarationFromNamespace(namespace);
                const declSymbolTable = getSymbolTableForDeclaration(
                    declaration,
                    program
                );
                if (declSymbolTable === undefined) {
                    // TODO there is no namespace symbol table
                    return undefined;
                }
                const symbol = declSymbolTable?.get(
                    typeName.right.text as ts.__String
                );
                if (symbol === undefined) {
                    // TODO there is no symbol
                    return undefined;
                }
                return generateAliasTableForSymbol(symbol, alias, program);
            }
            // TODO what to do if the left isn't an identifier
            return undefined;
        }
        if (ts.isIdentifier(typeName)) {
            const symbol = symbolTable.get(typeName.text as ts.__String);
            if (symbol === undefined) {
                // TODO Couldn't find symbol
                return undefined;
            }
            return generateAliasTableForSymbol(symbol, alias, program);
        }
    }
    // TODO make tests for all of these possibilities test all of these
    if (typeReference.kind === ts.SyntaxKind.BooleanKeyword) {
        return generateSingleEntryAliasTable('bool', alias);
    }
    if (typeReference.kind === ts.SyntaxKind.LiteralType) {
        if ('literal' in typeReference) {
            let literal = typeReference.literal;
            if (
                typeof literal === 'object' &&
                literal !== null &&
                'kind' in literal
            ) {
                if (literal.kind === ts.SyntaxKind.NullKeyword) {
                    return generateSingleEntryAliasTable('null', alias);
                }
            }
        }
    }
    if (typeReference.kind === ts.SyntaxKind.StringKeyword) {
        return generateSingleEntryAliasTable('text', alias);
    }
    if (typeReference.kind === ts.SyntaxKind.BigIntKeyword) {
        return generateSingleEntryAliasTable('int', alias);
    }
    if (typeReference.kind === ts.SyntaxKind.NumberKeyword) {
        return generateSingleEntryAliasTable('int', alias);
    }
    if (typeReference.kind === ts.SyntaxKind.VoidKeyword) {
        return generateSingleEntryAliasTable('void', alias);
    }
    if (
        typeReference.kind === ts.SyntaxKind.FunctionType ||
        typeReference.kind === ts.SyntaxKind.UnionType
    ) {
        // TODO we do not yet have azle types that map to these types
        return undefined;
    }
    console.log('>>>>>>>>>>>>>>>>>>>>IMPORTANT<<<<<<<<<<<<<<<<<<<<');
    console.log(ts.SyntaxKind[typeReference.kind]);
    console.log('===============================================');
    console.log('===============================================');
    console.log('===============================================');
    console.log('===============================================');
    // TODO what else could this be??
}
