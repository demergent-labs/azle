import '#experimental/build/assert_experimental';

import { Principal } from '@icp-sdk/core/principal';

export function principalToSrcLiteral(value: Principal): string {
    return `Principal.fromText('${value.toText()}')`;
}
