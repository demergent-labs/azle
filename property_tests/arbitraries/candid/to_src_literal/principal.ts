import { Principal } from '@dfinity/principal';

export function principalToSrcLiteral(value: Principal): string {
    // TODO solve the underlying principal problem https://github.com/demergent-labs/azle/issues/1443
    return `DfinityPrincipal.fromText('${value.toText()}')`;
}
