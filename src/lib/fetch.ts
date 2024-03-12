import { ic, Principal } from './';
import { IDL } from '@dfinity/candid';
import { URL } from 'url';
import * as fs from 'fs';
import { readFile } from 'fs/promises';

export async function azleFetch(
    input: RequestInfo | URL,
    init?: RequestInit | undefined
): Promise<Response> {
    if (process.env.AZLE_TEST_FETCH === 'true') {
        console.log('azleFetch has been called');
    }

    if (typeof input !== 'string') {
        throw new Error(`azleFetch input can only be of type string`);
    }

    const url = new URL(input);

    if (url.protocol === 'icp:') {
        const canisterId = url.hostname;
        const canisterMethod = url.pathname.replace('/', '');

        const { method, headers, body } = init ?? {};
        const { args, cycles, cycles128 } = (body ?? {}) as any;
        const candidPath = determineCandidPath(
            canisterId,
            (body as any)?.candidPath
        );

        const idlString = ic.candidCompiler(candidPath);

        const normalizedIdlString = idlString
            .replace(/export const idlFactory/g, 'const idlFactory')
            .replace(/export const init/g, 'const init');

        const idlFactory = eval(`
            try {
                ${normalizedIdlString}

                idlFactory;
            }
            catch(error) {
                console.log('eval error');
                console.log(error);
            }
        `);

        const serviceIdl = idlFactory({ IDL });

        const [_funcName, funcIdl] = serviceIdl._fields.find(
            ([funcName]: [string, IDL.Type]) => funcName === canisterMethod
        );

        const argsRaw = new Uint8Array(
            IDL.encode(funcIdl.argTypes, args ?? [])
        );

        const canisterPrincipal = Principal.fromText(canisterId);

        const result =
            cycles128 === undefined
                ? await ic.callRaw(
                      canisterPrincipal,
                      canisterMethod,
                      argsRaw,
                      BigInt(cycles ?? 0)
                  )
                : await ic.callRaw128(
                      canisterPrincipal,
                      canisterMethod,
                      argsRaw,
                      BigInt(cycles128 ?? 0)
                  );

        const decodedResult = IDL.decode(funcIdl.retTypes, result);

        return {
            ok: true,
            arrayBuffer: async () => {
                return result.buffer;
            },
            json: async () => {
                return decodedResult[0];
            }
        } as any;
    }

    if (url.protocol === 'file:') {
        const path = `${url.hostname}${url.pathname}`;
        const contents = await readFile(path);

        return {
            ok: true,
            arrayBuffer: async () => {
                return contents.buffer;
            },
            json: async () => {
                return JSON.parse(contents.toString());
            },
            text: async () => {
                return contents.toString();
            }
        } as any;
    }

    if (url.protocol === 'https:' || url.protocol === 'http:') {
        const body = await prepareRequestBody(init);
        // TODO also do headers and method and everything like on the client?

        const response = await azleFetch(`icp://aaaaa-aa/http_request`, {
            body: serialize({
                args: [
                    {
                        url: input,
                        max_response_bytes: getHttpMaxResponseBytes(),
                        method: getHttpMethod(init),
                        headers: init?.headers ?? [],
                        body,
                        transform: getHttpTransform()
                    }
                ],
                cycles:
                    globalThis._azleOutgoingHttpOptionsCycles ?? 3_000_000_000n // TODO this seems to be a conservative max size
            })
        });
        const responseJson = await response.json();

        return {
            arrayBuffer: async () => {
                return responseJson.body.buffer;
            },
            json: async () => {
                return JSON.parse(Buffer.from(responseJson.body).toString());
            },
            text: async () => {
                return Buffer.from(responseJson.body).toString();
            }
        } as any;
    }

    throw new Error('Not supported in Azle fetch');
}

export function serialize(param: {
    candidPath?: string;
    args?: any[];
    cycles?: number | bigint;
    cycles128?: number | bigint;
}): ArrayBuffer {
    return param as any;
}

function determineCandidPath(canisterId: string, candidPath?: string): string {
    if (candidPath !== undefined) {
        return candidPath;
    }

    const filePath = `/candid/${canisterId}.did`;

    if (fs.existsSync(filePath)) {
        return filePath;
    }

    throw new Error(
        "Candid path doesn't exist, please specify a valid candid path"
    );
}

function getHttpMaxResponseBytes() {
    return globalThis._azleOutgoingHttpOptionsMaxResponseBytes === undefined
        ? []
        : [globalThis._azleOutgoingHttpOptionsMaxResponseBytes];
}

// TODO throw errors on unsupported methods?
function getHttpMethod(init?: RequestInit | undefined) {
    if (init === undefined || init.method === undefined) {
        return {
            get: null
        };
    }

    return {
        [init.method?.toLowerCase()]: null
    };
}

function getHttpTransform() {
    if (globalThis._azleOutgoingHttpOptionsTransformMethodName === undefined) {
        return [];
    }

    return [
        {
            function: [
                ic.id(),
                globalThis._azleOutgoingHttpOptionsTransformMethodName
            ],
            context:
                globalThis._azleOutgoingHttpOptionsTransformContext ??
                Uint8Array.from([])
        }
    ];
}

// TODO some of these instanceof checks might break
// TODO some of those objects might not exist in QuickJS/wasmedge-quickjs
async function prepareRequestBody(
    init: RequestInit | undefined
): Promise<[Uint8Array] | []> {
    if (init === undefined) {
        return [];
    }

    if (init.body === null) {
        return [];
    }

    if (init.body === undefined) {
        return [];
    }

    if (typeof init.body === 'string') {
        const textEncoder = new TextEncoder();
        return [textEncoder.encode(init.body)];
    }

    if (
        init.body instanceof ArrayBuffer ||
        init.body instanceof Uint8Array ||
        init.body instanceof Uint8ClampedArray ||
        init.body instanceof Uint16Array ||
        init.body instanceof Uint32Array ||
        init.body instanceof BigUint64Array ||
        init.body instanceof Int8Array ||
        init.body instanceof Int16Array ||
        init.body instanceof Int32Array ||
        init.body instanceof BigInt64Array ||
        init.body instanceof Float32Array ||
        init.body instanceof Float64Array
    ) {
        return [new Uint8Array(init.body)];
    }

    if (init.body instanceof DataView) {
        return [new Uint8Array(init.body.buffer)];
    }

    if (init.body instanceof Blob) {
        return [new Uint8Array(await init.body.arrayBuffer())];
    }

    if (init.body instanceof File) {
        const blob = new Blob([init.body], { type: init.body.type });
        const buffer = await blob.arrayBuffer();
        return [new Uint8Array(buffer)];
    }

    if (init.body instanceof URLSearchParams) {
        const encoder = new TextEncoder();
        return [encoder.encode(init.body.toString())];
    }

    if (init.body instanceof FormData) {
        throw new Error(
            `azleFetch: FormData is not a supported fetchIc body type`
        );
    }

    throw new Error(`azleFetch: Not a supported fetchIc body type`);
}
