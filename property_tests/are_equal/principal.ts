import { Principal } from '@dfinity/principal';

export function arePrincipalsEqual(paramName: string, paramValue: Principal) {
    return `(${paramName}.toText() === "${paramValue.toText()}")`;
}
