import { Principal } from '@dfinity/principal';

export function principalToSrcLiteral(value: Principal): string {
    return `Principal.fromText('${value.toText()}')`;
}
