import { Principal } from '@dfinity/principal';

export function principalToSrcLiteral(value: Principal): string {
    return `DfinityPrincipal.fromText('${value.toText()}')`;
}
