import * as swc from '@swc/core';
import * as tsc from 'typescript';
import { buildSync } from 'esbuild';
import { JavaScript } from '../../types';
import { getCanisterTypeAliasDeclarations } from '../typescript_to_rust/generators/call_functions';
import { generateCallFunctionName } from '../typescript_to_rust/generators/call_functions/call_function_name';

// TODO it would be nice if the bundle and transform steps could be combined into one
export async function compileTypeScriptToJavaScript(tsPath: string): Promise<JavaScript> {
    const bundledJS = bundle(tsPath);
    const transpiledJS = transpile(bundledJS);
    // TODO enabling strict mode is causing lots of issues
    // TODO it would be nice if I could remove strict mode code in esbuild or swc
    // TODO look into the implications of this, but since we are trying to transpile to es3 to cope with missing features in boa, I do not think we need strict mode
    const strictModeRemovedJS = transpiledJS.replace(/"use strict";/g, '');

    const icCanisters = generateICCanisters(tsPath);

    // TODO we should centralize/standardize where we add global variables to the JS, we are doing this in multiple places
    return `
        globalThis.console = {
            ...globalThis.console,
            log: (...args) => {
                ic.print(...args);
            }
        };

        ${icCanisters}\n${strictModeRemovedJS}
    `;
}

// TODO there is a lot of minification/transpiling etc we could do with esbuild or with swc
// TODO we need to decide which to use for what
function bundle(tsPath: string): JavaScript {
    const buildResult = buildSync({
        entryPoints: [tsPath],
        format: 'esm',
        bundle: true,
        treeShaking: true,
        write: false
    });

    const bundleArray = buildResult.outputFiles[0].contents;
    const bundleString = Buffer.from(bundleArray).toString('utf-8');

    return bundleString;
}

// TODO there is a lot of minification/transpiling etc we could do with esbuild or with swc
// TODO we need to decide which to use for what
function transpile(js: JavaScript): JavaScript {
    return swc.transformSync(js, {
        module: {
            type: 'commonjs'
        },
        jsc: {
            parser: {
                syntax: 'ecmascript'
            },
            target: 'es2015', // TODO had to change this to get generator objects natively...not sure what else will break now
            experimental: {
                cacheRoot: '/dev/null'
            },
            loose: true
        },
        minify: false // TODO keeping this off for now, enable once the project is more stable
    }).code;
}

// TODO we might want to put this in a better place, and only call program and sourceFiles once
function generateICCanisters(tsPath: string): JavaScript {
    const program = tsc.createProgram(
        [tsPath],
        {}
    );
    
    const sourceFiles = program.getSourceFiles();

    const canisterTypeAliasDeclarations = getCanisterTypeAliasDeclarations(sourceFiles);

    const icCanisters = generateICCanistersFromTypeAliasDeclarations(canisterTypeAliasDeclarations);

    return `
        ic.canisters = {
            ${icCanisters.join(',\n')}
        };
    `;
}

function generateICCanistersFromTypeAliasDeclarations(typeAliasDeclarations: tsc.TypeAliasDeclaration[]): JavaScript[] {
    return typeAliasDeclarations.map((typeAliasDeclaration) => {
        return generateICCanisterFromTypeAliasDeclaration(typeAliasDeclaration);
    });
}

function generateICCanisterFromTypeAliasDeclaration(typeAliasDeclaration: tsc.TypeAliasDeclaration): JavaScript {
    if (typeAliasDeclaration.type.kind !== tsc.SyntaxKind.TypeReference) {
        throw new Error('This cannot happen');
    }

    const typeRefenceNode = typeAliasDeclaration.type as tsc.TypeReferenceNode;

    if (typeRefenceNode.typeArguments === undefined) {
        throw new Error('This cannot happen');
    }

    const firstTypeArgument = typeRefenceNode.typeArguments[0];

    if (firstTypeArgument.kind !== tsc.SyntaxKind.TypeLiteral) {
        throw new Error('This cannot happen');
    }

    const typeLiteralNode = firstTypeArgument as tsc.TypeLiteralNode;

    return generateICCanisterFromTypeLiteralNode(
        typeLiteralNode,
        typeAliasDeclaration.name.escapedText.toString()
    );
}

function generateICCanisterFromTypeLiteralNode(
    typeLiteralNode: tsc.TypeLiteralNode,
    typeAliasName: string
): JavaScript {
    const canisterMethods = typeLiteralNode.members.map((member) => {
        return generateCanisterMethodFromTypeElement(
            member,
            typeAliasName
        );
    });

    return `
        '${typeAliasName}': (canisterId) => {
            return {
                ${canisterMethods.join(',\n')}
            };
        }
    `;
}

function generateCanisterMethodFromTypeElement(
    typeElement: tsc.TypeElement,
    typeAliasName: string
): JavaScript {
    if (typeElement.kind !== tsc.SyntaxKind.MethodSignature) {
        throw new Error('Must use method signature syntax');
    }

    const methodSignature = typeElement as tsc.MethodSignature;

    const {
        methodName,
        callFunctionName
    } = generateCallFunctionName(
        methodSignature,
        typeAliasName
    );

    return `
        ${methodName}: (...args) => {
            return {
                name: 'call',
                args: [
                    '${callFunctionName}',
                    canisterId,
                    ...args
                ]
            };
        }
    `;
}