import { $query, Principal } from 'azle';

$query;
export function returnStringAsInvalidPrincipal(): Principal {
    // @ts-expect-error
    return 'invalid type';
}

$query;
export function returnEmptyObjectAsInvalidPrincipal(): Principal {
    // @ts-expect-error
    return {};
}

$query;
export function returnInvalidToTextPropertyAsInvalidPrincipal(): Principal {
    return {
        // @ts-expect-error
        toText: 'invalid type'
    };
}

$query;
export function throwInPrincipalToTextMethodAsInvalidPrincipal(): Principal {
    // @ts-expect-error
    return {
        toText: () => {
            throw new Error('Custom error from toText method');
        }
    };
}

$query;
export function returnInvalidToTextReturnValueAsInvalidPrincipal(): Principal {
    return {
        // @ts-expect-error
        toText: () => false
    };
}

$query;
export function throwWhenCallingPrincipalFromText(): Principal {
    const principal = Principal.fromText('aa');
    // Note: `fromText` will throw if the text representation is invalid
    return principal;
}

$query;
export function returnInvalidPrincipalFromTooShortOfText(): Principal {
    // @ts-expect-error
    return {
        toText: () => 'aa'
    };
}
