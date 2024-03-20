import { execSync } from 'child_process';
import { HttpRequest } from 'azle';
import { getCanisterId } from 'azle/dfx';
import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

type HttpResponse = {
    status: number;
    headers: string[][];
    body: string;
};

/**
 * An asynchronous "fetch" for canisters.
 */
export async function fletch(
    canisterName: string,
    request: HttpRequest
): Promise<HttpResponse> {
    if (request.method === 'TRACE' || request.method == 'PATCH') {
        return fletchSync(canisterName, request);
    }
    const canisterId = getCanisterId(canisterName);

    const { method, body, headers, url: path } = request;

    const url = `http://${canisterId}.localhost:8000${path}`;

    const fetchOptions = {
        method,
        headers,
        body: method === 'GET' ? undefined : body
    };

    return await toResponse(await fetch(url, fetchOptions));
}

async function toResponse(response: Response): Promise<HttpResponse> {
    const headers: [string, string][] = Array.from(response.headers.entries());
    const status = response.status;
    const body = await response.text();

    return { status, headers, body };
}

/**
 * A synchronous "fetch" for canisters.
 */
export function fletchSync(canisterName: string, options: HttpRequest) {
    const canisterId = getCanisterId(canisterName);

    const requestHeaders = toCurlHeadersString(options.headers);

    const curlCommand = `curl\
        --silent\
        --include\
        -X ${options.method}\
        ${requestHeaders}\
        --data "${escapeForExecSync(
            Buffer.from(options.body).toString('utf-8')
        )}"\
        "${canisterId}.localhost:8000${options.url}" \
        --resolve "${canisterId}.localhost:8000:127.0.0.1"`;

    const responseBuffer = execSync(curlCommand);

    return toResponseSync(responseBuffer);
}

function escapeForExecSync(input: string) {
    return input
        .replace(/\\/g, '\\\\') // Escape backslashes
        .replace(/"/g, '\\"') // Escape double quotes
        .replace(/`/g, '\\`') // Escape backtick
        .replace(/\$/g, '\\$'); // Escape dollar signs
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

function toResponseSync(buffer: Buffer) {
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
