import { copySync } from 'fs-extra';
import { SymbolTable, SymbolTables } from '../utils/types';
import * as ts from 'typescript';

export function generateImportSymbolTable(files: string[]): SymbolTables {
    return files.reduce((accumulator: SymbolTables, filename: string) => {
        if (
            filename ===
            '/home/bdemann/code/demergent_labs/azle/examples/robust_imports/src/index.ts'
        ) {
            createSymbolTableFromFileName(filename);
            console.log(``);
        }
        // accumulator[filename] = createDefaultSymbolTable();
        // TODO this is the real one
        accumulator[filename] = createSymbolTableFromFileName(filename);
        return accumulator;
    }, {});
}

function createSymbolTableFromFileName(filename: string): SymbolTable {
    const sourceFilePath = filename;
    const program = ts.createProgram([sourceFilePath], {});
    const sourceFile = program.getSourceFile(sourceFilePath);

    if (!sourceFile) {
        return createEmptySymbolTable();
    }

    let tsSymbolTable = getSymbolTable(filename, program);
    if (tsSymbolTable) {
        let symbolTable = createSymbolTable(tsSymbolTable, program);
        // console.log('Final Result');
        // console.log(symbolTable);
        return symbolTable;
    }

    return createEmptySymbolTable();
}

function createSymbolTable(
    tsSymbolTable: ts.SymbolTable,
    program: ts.Program
): SymbolTable {
    const keys = tsSymbolTable.keys();
    let symbolTable = createEmptySymbolTable();
    tsSymbolTable.forEach((symbol, name) => {
        const subSymbolTable = processSymbol(name, symbol, program);
        if (subSymbolTable) {
            symbolTable = mergeSymbolTables(symbolTable, subSymbolTable);
        }
    });

    return symbolTable;
}

function getSymbolTableFromSourceFile(
    sourceFile: ts.SourceFile,
    program: ts.Program
): ts.SymbolTable | undefined {
    const typeChecker = program.getTypeChecker();
    const sourceFileSymbol = typeChecker.getSymbolAtLocation(sourceFile);

    if (!sourceFileSymbol) {
        // TODO could not make source file symbol from source file
        return;
    }

    const valueDeclaration = sourceFileSymbol.valueDeclaration;

    if (!valueDeclaration) {
        //  TODO there was no value declaration on the source file symbol. I
        //  don't understand what the value declaration is or under what
        //  circumstances we wouldn't have it
        return;
    }

    if (!('locals' in valueDeclaration)) {
        // TODO there was no symbol table in the source file symbol
        return;
    }

    return valueDeclaration.locals as ts.SymbolTable; // TODO I am not 100% sure that this is a valid cast
}

function getSymbolTable(
    filename: string,
    program: ts.Program
): ts.SymbolTable | undefined {
    const sourceFile = program.getSourceFile(filename);
    if (!sourceFile) {
        // TODO could not get source file from filename
        return;
    }
    return getSymbolTableFromSourceFile(sourceFile, program);
}

function getAzleEquivalent(
    originalName: ts.__String,
    name: ts.__String, // TODO should this be a ts.__String?
    moduleSpecifier: ts.StringLiteral,
    program: ts.Program
): SymbolTable | undefined {
    if (moduleSpecifier.text === 'azle') {
        let symbolTable = createEmptySymbolTable();
        try {
            let key = stringToSymbolTableKey(name);
            symbolTable[key].push(originalName as string);
            return symbolTable;
        } catch {
            // TODO the key isn't part of the azle symbol table
            return;
        }
    }
    let tsType = getTsTypeForImportDecl(moduleSpecifier, program);
    if (tsType) {
        const exports = tsType.symbol.exports;
        if (!exports) {
            return; // If the source doesn't export anything then what it can't export anything from azle
        }
        let symbol = exports.get(name as ts.__String);
        if (symbol) {
            return processSymbol(originalName, symbol, program);
        }
    }
    return;
}

function processImportExportSpecifier(
    original_name: ts.__String,
    specifier: ts.ExportSpecifier | ts.ImportSpecifier,
    declaration: ts.ExportDeclaration | ts.ImportDeclaration,
    program: ts.Program
): SymbolTable | undefined {
    let name: string;
    if (!specifier.propertyName) {
        name = specifier.name.text;
    } else {
        name = specifier.propertyName.text;
    }
    if (declaration.moduleSpecifier !== undefined) {
        return getAzleEquivalent(
            original_name,
            name as ts.__String,
            declaration.moduleSpecifier as ts.StringLiteral,
            program
        );
    }
}

function processExportSpecifier(
    originalName: ts.__String,
    declaration: ts.ExportSpecifier,
    program: ts.Program
): SymbolTable | undefined {
    const exportSpecifier = declaration as ts.ExportSpecifier;
    const exportDecl = exportSpecifier.parent.parent;
    return processImportExportSpecifier(
        originalName,
        declaration,
        exportDecl,
        program
    );
}

function processExportAssignment(
    originalName: ts.__String,
    declaration: ts.ExportAssignment,
    program: ts.Program
): SymbolTable | undefined {
    const exportAssignment = declaration as ts.ExportAssignment;
    const exportName = exportAssignment.expression as ts.Identifier;
    // We need to look that up in the locals
    let sourceFile = exportAssignment.parent;
    if (!('locals' in sourceFile)) {
        // TODO what if there is no locals
        return;
    }
    let symbolTable = sourceFile.locals as ts.SymbolTable;
    let symbol = symbolTable.get(exportName.text as ts.__String);
    if (!symbol) {
        return; // TODO can't find symbol
    }
    return processSymbol(originalName, symbol, program);
}

function processImportSpecifier(
    originalName: ts.__String,
    declaration: ts.ImportSpecifier,
    program: ts.Program
): SymbolTable | undefined {
    const importDeclaration = declaration.parent.parent.parent;
    return processImportExportSpecifier(
        originalName,
        declaration,
        importDeclaration,
        program
    );
}

function processImportClause(
    originalName: ts.__String,
    declaration: ts.ImportClause,
    program: ts.Program
): SymbolTable | undefined {
    const importDeclaration = declaration.parent;
    const thing = getAzleEquivalent(
        originalName,
        'default' as ts.__String,
        importDeclaration.moduleSpecifier as ts.StringLiteral,
        program
    );
    return thing;
}

function getSourceFile(node: ts.Node): ts.SourceFile | undefined {
    if (!node.parent) {
        return;
    }
    if (ts.isSourceFile(node.parent)) {
        return node.parent;
    }
    return getSourceFile(node.parent);
}

function processTypeAliasDeclaration(
    originalName: ts.__String,
    declaration: ts.TypeAliasDeclaration,
    program: ts.Program
): SymbolTable | undefined {
    let sourceFile = getSourceFile(declaration);
    if (!sourceFile) {
        // TODO couldn't find the sourceFile
        return;
    }
    let symbolTable = getSymbolTableFromSourceFile(sourceFile, program);
    if (!symbolTable) {
        // TODO couldn't get a symbol table
        return;
    }
    let typeReference = declaration.type;
    if (ts.isTypeReferenceNode(typeReference)) {
        const typeName = typeReference.typeName;
        if (ts.isQualifiedName(typeName)) {
            const left = typeName.left;
            if (ts.isIdentifier(left)) {
                const leftSymbol = symbolTable.get(left.text as ts.__String);
                if (!leftSymbol) {
                    return;
                }
                if (leftSymbol.declarations?.length != 1) {
                    return;
                }
                let namespace = leftSymbol.declarations[0];
                if (!ts.isNamespaceImport(namespace)) {
                    return;
                }
                let namespaceSymbolTable = getSymbolTableForNamespaceImport(
                    namespace,
                    program
                );
                if (!namespaceSymbolTable) {
                    // TODO there is no namespace symbol table
                    return;
                }
                let symbol = namespaceSymbolTable?.get(
                    typeName.right.text as ts.__String
                );
                if (!symbol) {
                    // TODO there is no symbol
                    return;
                }
                return processSymbol(originalName, symbol, program);
            }
            // TODO what to do if the left isn't an identifier
            return;
        }
        if (ts.isIdentifier(typeName)) {
            const symbol = symbolTable.get(typeName.text as ts.__String);
            if (!symbol) {
                // TODO Couldn't find symbol
                return;
            }
            return processSymbol(originalName, symbol, program);
        }
    }
    // TODO what else could this be??
}

function getSymbolTableForNamespaceImport(
    namespaceImport: ts.NamespaceImport,
    program: ts.Program
): ts.SymbolTable | undefined {
    let importDeclaration = namespaceImport.parent.parent;
    let moduleSpecifier = importDeclaration.moduleSpecifier as ts.StringLiteral;
    const typeChecker = program.getTypeChecker();
    const namespacedSymbol = typeChecker.getSymbolAtLocation(moduleSpecifier);
    if (!namespacedSymbol) {
        return;
    }
    return namespacedSymbol.exports;
}

function processNamespaceImport(
    declaration: ts.NamespaceImport,
    program: ts.Program
): SymbolTable | undefined {
    let importDeclaration = declaration.parent.parent;
    let moduleSpecifier = importDeclaration.moduleSpecifier as ts.StringLiteral;
    if (moduleSpecifier.text == 'azle') {
        let subSymbolTable = createDefaultSymbolTable();
        // TODO process this symbol table the same, then modify it such that every entry has name.whatever
        return appendStringToSymbolTableEntries(subSymbolTable, 'azle.');
    }
    let namespacedSymbolTable = getSymbolTableForNamespaceImport(
        declaration,
        program
    );
    if (!namespacedSymbolTable) {
        return;
    }
    let subSymbolTable = createSymbolTable(namespacedSymbolTable, program);
    // process this symbol table the same, then modify it such that every entry has name.whatever
    return appendStringToSymbolTableEntries(
        subSymbolTable,
        `${declaration.name.text}.`
    );
}

function appendStringToSymbolTableEntries(
    symbolTable: SymbolTable,
    prependString: string
): SymbolTable {
    for (const propertyName in symbolTable) {
        const propertyValue = symbolTable[propertyName as keyof SymbolTable];
        if (Array.isArray(propertyValue)) {
            for (let i = 0; i < propertyValue.length; i++) {
                propertyValue[i] = prependString + propertyValue[i];
            }
        }
    }
    return symbolTable;
}

function mergeSymbolTables(
    symbolTable1: SymbolTable,
    symbolTable2: SymbolTable
): SymbolTable {
    const mergedSymbolTable: SymbolTable = { ...symbolTable1 };

    for (const propertyName in symbolTable2) {
        const propertyValue2 = symbolTable2[propertyName as keyof SymbolTable];
        const existingPropertyValue =
            mergedSymbolTable[propertyName as keyof SymbolTable];

        if (
            Array.isArray(existingPropertyValue) &&
            Array.isArray(propertyValue2)
        ) {
            mergedSymbolTable[propertyName as keyof SymbolTable] =
                existingPropertyValue.concat(propertyValue2);
        } else {
            mergedSymbolTable[propertyName as keyof SymbolTable] =
                propertyValue2;
        }
    }

    return mergedSymbolTable;
}

function processSymbol(
    originalName: ts.__String,
    symbol: ts.Symbol,
    program: ts.Program
): SymbolTable | undefined {
    const declarations = symbol.declarations;
    if (!declarations) {
        return; // We need one declaration. If there isn't one then it can't be an export from azle right?
    }
    if (declarations.length !== 1) {
        return; // TODO I don't know what to do if there are multiple declarations
    }
    const declaration = declarations[0];
    if (ts.isExportSpecifier(declaration)) {
        return processExportSpecifier(originalName, declaration, program);
    }
    if (ts.isExportAssignment(declaration)) {
        return processExportAssignment(originalName, declaration, program);
    }
    if (ts.isImportClause(declaration)) {
        return processImportClause(originalName, declaration, program);
    }
    if (ts.isImportSpecifier(declaration)) {
        return processImportSpecifier(originalName, declaration, program);
    }
    if (ts.isTypeAliasDeclaration(declaration)) {
        return processTypeAliasDeclaration(originalName, declaration, program);
    }
    if (ts.isNamespaceImport(declaration)) {
        return processNamespaceImport(declaration, program);
    }
    console.log(`TODO: ${ts.SyntaxKind[declaration.kind]}`);
}

function getTsTypeForImportDecl(
    moduleSpecifier: ts.StringLiteral,
    program: ts.Program
): ts.Type | undefined {
    const importSymbol = program
        .getTypeChecker()
        .getSymbolAtLocation(moduleSpecifier);
    if (importSymbol) {
        const importType = program
            .getTypeChecker()
            .getTypeOfSymbolAtLocation(
                importSymbol,
                importSymbol.valueDeclaration as ts.Node
            );
        return importType.getNonNullableType(); // TODO why are we doing this instead of just returning importType?
    }
    return;
}

function createEmptySymbolTable(): SymbolTable {
    return {
        alias: [],
        call_result: [],
        blob: [],
        bool: [],
        empty: [],
        float32: [],
        float64: [],
        func: [],
        guard_result: [],
        heartbeat_decorator: [],
        init_decorator: [],
        inspect_message_decorator: [],
        int: [],
        int8: [],
        int16: [],
        int32: [],
        int64: [],
        manual: [],
        nat: [],
        nat8: [],
        nat16: [],
        nat32: [],
        nat64: [],
        null: [],
        oneway_mode: [],
        opt: [],
        post_upgrade_decorator: [],
        pre_upgrade_decorator: [],
        principal: [],
        query_decorator: [],
        query_mode: [],
        record: [],
        reserved: [],
        service: [],
        service_query_decorator: [],
        service_update_decorator: [],
        stable_b_tree_map: [],
        text: [],
        tuple: [],
        update_decorator: [],
        update_mode: [],
        variant: [],
        vec: [],
        void: []
    };
}

function createDefaultSymbolTable(): SymbolTable {
    return {
        alias: ['Alias'],
        blob: ['blob'],
        bool: [],
        call_result: ['CallResult'],
        empty: ['empty'],
        float32: ['float32'],
        float64: ['float64'],
        func: ['Func'],
        guard_result: ['GuardResult'],
        heartbeat_decorator: ['$heartbeat'],
        init_decorator: ['$init'],
        inspect_message_decorator: ['$inspectMessage'],
        int: ['int'],
        int8: ['int8'],
        int16: ['int16'],
        int32: ['int32'],
        int64: ['int64'],
        manual: ['Manual'],
        nat: ['nat'],
        nat8: ['nat8'],
        nat16: ['nat16'],
        nat32: ['nat32'],
        nat64: ['nat64'],
        null: [],
        oneway_mode: ['Oneway'],
        opt: ['Opt'],
        post_upgrade_decorator: ['$postUpgrade'],
        pre_upgrade_decorator: ['$preUpgrade'],
        principal: ['Principal'],
        query_decorator: ['$query'],
        query_mode: ['Query'],
        record: ['Record'],
        reserved: ['reserved'],
        service: ['Service'],
        service_query_decorator: ['serviceQuery'],
        service_update_decorator: ['serviceUpdate'],
        stable_b_tree_map: ['StableBTreeMap'],
        text: ['text'],
        tuple: ['Tuple'],
        update_decorator: ['$update'],
        update_mode: ['Update'],
        variant: ['Variant'],
        vec: ['Vec'],
        void: []
    };
}

function stringToSymbolTableKey(name: ts.__String): keyof SymbolTable {
    switch (name) {
        case 'Alias':
            return 'alias';
        case 'CallResult':
            return 'call_result';
        case 'blob':
            return 'blob';
        case 'bool':
            return 'bool';
        case 'empty':
            return 'empty';
        case 'float32':
            return 'float32';
        case 'float64':
            return 'float64';
        case 'func':
            return 'func';
        case 'GuardResult':
            return 'guard_result';
        case '$heartbeat':
            return 'heartbeat_decorator';
        case '$init':
            return 'init_decorator';
        case '$inspectMessage':
            return 'inspect_message_decorator';
        case 'int':
            return 'int';
        case 'int8':
            return 'int8';
        case 'int16':
            return 'int16';
        case 'int32':
            return 'int32';
        case 'int64':
            return 'int64';
        case 'Manual':
            return 'manual';
        case 'nat':
            return 'nat';
        case 'nat8':
            return 'nat8';
        case 'nat16':
            return 'nat16';
        case 'nat32':
            return 'nat32';
        case 'nat64':
            return 'nat64';
        case 'null':
            return 'null';
        case 'Oneway':
            return 'oneway_mode';
        case 'Opt':
            return 'opt';
        case '$postUpgrade':
            return 'post_upgrade_decorator';
        case '$preUpgrade':
            return 'pre_upgrade_decorator';
        case 'Principal':
            return 'principal';
        case '$query':
            return 'query_decorator';
        case 'Query':
            return 'query_mode';
        case 'Record':
            return 'record';
        case 'reserved':
            return 'reserved';
        case 'Service':
            return 'service';
        case '$serviceQuery':
            return 'service_query_decorator';
        case 'serviceUpdate':
            return 'service_update_decorator';
        case 'StableBTreeMap':
            return 'stable_b_tree_map';
        case 'text':
            return 'text';
        case 'Tuple':
            return 'tuple';
        case '$update':
            return 'update_decorator';
        case 'Update':
            return 'update_mode';
        case 'Variant':
            return 'variant';
        case 'Vec':
            return 'vec';
        case 'void':
            return 'void';
        default:
            throw `IMPORTANT: We couldn't find ${name}`;
    }
}
