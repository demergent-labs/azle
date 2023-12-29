import { execSync } from 'child_process';
import { HttpRequest } from 'azle';
import { getCanisterId } from 'azle/test';

/**
 * A synchronous "fetch" for canisters.
 */
export function fletch(canisterName: string, options: HttpRequest) {
    const canisterId = getCanisterId(canisterName);

    const requestHeaders = toCurlHeadersString(options.headers);

    const curlCommand = `curl\
        --silent\
        --include\
        -X ${options.method}\
        ${requestHeaders}\
        --data "${options.body.join(',')}"\
        "${canisterId}.localhost:8000${options.url}" \
        --resolve "${canisterId}.localhost:8000:127.0.0.1"`;

    const responseBuffer = execSync(curlCommand);

    return toResponse(responseBuffer);
}

function toCurlHeadersString(headers: [string, string][]) {
    return headers
        .map(([name, value]) => `-H ${singleQuotedString(`${name}: ${value}`)}`)
        .join(' ');
}

function singleQuotedString(input: string) {
    const singleQuoteEscapedString = input.replace(/'/g, "'\\''");

    return `'${singleQuoteEscapedString}'`;
}

function toResponse(buffer: Buffer) {
    const responseString = new TextDecoder().decode(buffer);

    const [statusCodeAndHeaders, body] = responseString.split('\r\n\r\n');

    const [statusCodeString, ...responseHeaderStrings] =
        statusCodeAndHeaders.split('\r\n');

    const status = Number(statusCodeString.split(' ')[1]);

    const headers = responseHeaderStrings.map((header) => header.split(': '));

    return {
        status,
        headers,
        body
    };
}
