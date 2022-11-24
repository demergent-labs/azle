export { createMissingTypeArgumentErrorMessage } from './missing_type_annotation';
export { createMultipleTypeArgumentsErrorMessage } from './multiple_type_arguments';
export { createNonTypeLiteralErrorMessage } from './non_type_literal';
export { createNonMethodSignatureMemberErrorMessage } from './non_method_signature_member';

export function createExampleCanisterDeclaration(): string {
    const methods = [
        'method1() => CanisterResult<void>',
        'method2(param1: string) => CanisterResult<string>',
        'method3(param1: boolean, param2: MyCustomType) => CanisterResult<MyCustomType[]>'
    ];
    return `Canister<{\n  ${methods.join('\n  ')}\n}>`;
}
