import { Principal } from 'azle';

export function returnStringAsInvalidPrincipal(): Principal {
    // @ts-expect-error
    return 'invalid type';
}

export function returnEmptyObjectAsInvalidPrincipal(): Principal {
    // @ts-expect-error
    return {};
}

export function returnInvalidToTextPropertyAsInvalidPrincipal(): Principal {
    return {
        // @ts-expect-error
        toText: 'invalid type'
    };
}

export function throwInPrincipalToTextMethodAsInvalidPrincipal(): Principal {
    // @ts-expect-error
    return {
        toText: () => {
            throw new Error('Custom error from toText method');
        }
    };
}

export function returnInvalidToTextReturnValueAsInvalidPrincipal(): Principal {
    return {
        // @ts-expect-error
        toText: () => false
    };
}

export function throwWhenCallingPrincipalFromText(): Principal {
    const principal = Principal.fromText('aa');
    // Note: `fromText` will throw if the text representation is invalid
    return principal;
}

export function returnInvalidPrincipalFromTooShortOfText(): Principal {
    // @ts-expect-error
    return {
        toText: () => 'aa'
    };
}
