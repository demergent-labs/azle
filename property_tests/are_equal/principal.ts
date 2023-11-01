import { Principal } from '@dfinity/principal';

export function arePrincipalsEqual(paramName: string, paramLiteral: string) {
    return `(${paramName}.toText() === "${paramLiteral}.toText()")`;
}
