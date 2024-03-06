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

    // TODO let's do an explicit check to make sure we have an identity and not some other object

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
