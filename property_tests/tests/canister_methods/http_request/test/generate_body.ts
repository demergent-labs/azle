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
    const bodyCheck = generateBodyCheck(request.body, requestParamName);

    return `
        // Body check has to happen before method check or else type checks might fail
        ${bodyCheck}
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
        if (decodeURIComponent(${requestParamName}.url) !== decodeURIComponent('${escape(
            url
        )}')) {
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
        .map(([name, value]) => {
            if (value === '') {
                return generateEmptyHeaderCheck(name);
            }
            return generateNonEmptyHeaderCheck(name, value);
        })
        .join('\n');
}

function generateEmptyHeaderCheck(name: string) {
    return `if (headers['${escape(
        name
    ).toLowerCase()}'] !== undefined && headers['${escape(
        name
    ).toLowerCase()}'] !== '') {
                throw new Error(
                    \`Unexpected value for header '${escape(
                        name
                    )}'. Expected undefined but received '\${headers['${escape(
                        name
                    ).toLowerCase()}']}'\`
                );
            }
        `;
}

function generateNonEmptyHeaderCheck(name: string, value: string): string {
    return `if (headers['${escape(name).toLowerCase()}'] !== '${escape(
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
        `;
}

function generateBodyCheck(body: Uint8Array, requestParamName: string): string {
    return `if (${requestParamName}.method !== 'GET' && ${requestParamName}.body !== undefined) {
        const requestBody = Buffer.from(${requestParamName}.body).toString('utf-8');
        const expectedBody = "${escape(Buffer.from(body).toString('utf-8'))}"
        if (requestBody !== expectedBody) {
                throw new Error(\`Unexpected value for body. Expected \${expectedBody}, but received \${requestBody}\`)
        }
    }`;
}

function escape(input: string) {
    return input
        .replace(/\\/g, '\\\\') // Escape backslashes
        .replace(/\$\{/g, '\\${') // Escape interpolation starts
        .replace(/`/g, '\\`') // Escape backticks
        .replace(/'/g, "\\'") // Escape single quotes
        .replace(/"/g, '\\"'); // Escape double quotes
}
