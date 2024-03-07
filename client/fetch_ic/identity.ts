import { Identity } from '@dfinity/agent';

export function getIdentity(
    headers: RequestInit['headers']
): Identity | undefined {
    const authorizationHeaderValue = getAuthorizationHeaderValue(headers);

    if (
        typeof authorizationHeaderValue === 'string' ||
        authorizationHeaderValue === undefined
    ) {
        return undefined;
    }

    if (
        authorizationHeaderValue.getPrincipal === undefined ||
        authorizationHeaderValue.transformRequest === undefined
    ) {
        throw new Error(
            'fetchIc: Authorization header value is not an instance of Identity'
        );
    }

    return authorizationHeaderValue;
}

function getAuthorizationHeaderValue(
    headers: RequestInit['headers']
): string | undefined | Identity {
    if (Array.isArray(headers)) {
        return headers.reduce(
            (acc: string | undefined | Identity, [key, value]) => {
                if (key === 'Authorization') {
                    return value;
                }

                return acc;
            },
            undefined
        );
    }

    if (headers instanceof Headers) {
        return headers.get('Authorization') ?? undefined;
    }

    if (typeof headers === 'object') {
        return headers['Authorization'];
    }

    return undefined;
}
