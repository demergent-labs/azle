import { HttpRequest } from 'azle';
import { Named } from 'azle/property_tests';
import { CandidReturnType } from 'azle/property_tests/arbitraries/candid/candid_return_type_arb';
import { CandidValueAndMeta } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';

export function generateBody(
    namedParams: Named<CandidValueAndMeta<HttpRequest>>[],
    returnType: CandidValueAndMeta<CandidReturnType>
): string {
    const { name: requestParamName, value: requestValueObject } =
        namedParams[0];
    const request = requestValueObject.value.agentArgumentValue;

    const httpMethodCheck = generateHttpMethodCheck(
        request.method,
        requestParamName
    );
    const urlCheck = generateUrlCheck(request.url, requestParamName);
    const headersMap = generateHeadersMap(request.headers, requestParamName);
    const headerChecks = generateHeaderChecks(request.headers);

    return `
        state++;

        ${httpMethodCheck}
        ${urlCheck}
        ${headersMap}
        ${headerChecks}

        return ${returnType.src.valueLiteral};
    `;
}

function generateHttpMethodCheck(method: string, requestParamName: string) {
    return `
        if (${requestParamName}.method !== '${method}') {
            throw new Error(
                \`Unexpected req.method. Expected ${method} but received \${${requestParamName}.method}\`
            );
        }
    `;
}

function generateUrlCheck(url: string, requestParamName: string) {
    return `
        if (${requestParamName}.url !== '${escape(url)}') {
            throw new Error(
                \`Unexpected req.url. Expected '${escape(
                    url
                )}' but received \${${requestParamName}.url}\`
            );
        }
    `;
}

function generateHeadersMap(
    headers: [string, string][],
    requestParamName: string
) {
    return headers.length === 0
        ? ''
        : `
            const headers = (${requestParamName}.headers as [string, string][]).reduce<{
                [key: string]: string}
            >((prev, [name, value]) => ({[name]: value, ...prev}), {});
        `;
}

function generateHeaderChecks(headers: [string, string][]) {
    return headers
        .filter(([_, value]) => value !== '') // An empty header value is the same as a none existent header
        .map(
            ([name, value]) => `
            if (headers['${escape(name).toLowerCase()}'] !== '${escape(
                value
            )}') {
                throw new Error(
                    \`Unexpected value for header '${escape(
                        name
                    )}'. Expected '${escape(
                        value
                    )}' but received '\${headers['${escape(
                        name
                    ).toLowerCase()}']}'\`
                );
            }
        `
        )
        .join('\n');
}

function escape(input: string) {
    return input
        .replace(/\\/g, '\\\\') // Escape backslashes
        .replace(/\$\{/g, '\\${') // Escape interpolation starts
        .replace(/`/g, '\\`') // Escape backticks
        .replace(/'/g, "\\'") // Escape single quotes
        .replace(/"/g, '\\"'); // Escape double quotes
}
