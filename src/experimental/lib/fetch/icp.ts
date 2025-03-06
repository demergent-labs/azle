import '#experimental/lib/assert_experimental';

import { IDL } from '@dfinity/candid';
import { Principal } from '@dfinity/principal';

import { call } from '#lib/ic_apis/index';

import { ic } from '../ic';
import { getUrl } from './url';

export async function fetchIcp(
    input: RequestInfo | URL,
    init?: RequestInit | undefined
): Promise<Response> {
    const url = getUrl(input);

    const canisterId = url.hostname;
    const canisterMethod = url.pathname.replace('/', '');

    const { body } = init ?? {};
    const { args, cycles } = (body ?? {}) as any;
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
            console.info('eval error');
            console.info(error);
        }
    `);

    const serviceIdl = idlFactory({ IDL });

    const [_funcName, funcIdl] = serviceIdl._fields.find(
        ([funcName]: [string, IDL.Type]) => funcName === canisterMethod
    );

    const argsRaw = new Uint8Array(IDL.encode(funcIdl.argTypes, args ?? []));

    const canisterPrincipal = Principal.fromText(canisterId);

    const result = await call<Uint8Array, Uint8Array>(
        canisterPrincipal,
        canisterMethod,
        {
            args: argsRaw,
            cycles: BigInt(cycles ?? 0),
            raw: true
        }
    );

    const decodedResult = IDL.decode(
        funcIdl.retTypes,
        new Uint8Array(result).buffer
    );

    // Using Response from wasmedge-quickjs doesn't seem ideal for the time being
    // It seems very tied to the low-level implementation at first glance
    // We will build up our own response for the time being
    // TODO we are not using AzleFetchResponse here because the json method
    // TODO need to return the Candid decoded object
    return {
        ok: true,
        arrayBuffer: async () => {
            return result.buffer;
        },
        json: async () => {
            return decodedResult[0];
        },
        text: async () => {
            return Buffer.from(result.buffer).toString();
        }
    } as any;
}

function determineCandidPath(canisterId: string, candidPath?: string): string {
    if (candidPath !== undefined) {
        return candidPath;
    }

    if (canisterId === 'aaaaa-aa') {
        return `/candid/icp/management.did`;
    }

    throw new Error(
        "azleFetch: Candid path doesn't exist, please specify a valid candid path"
    );
}
