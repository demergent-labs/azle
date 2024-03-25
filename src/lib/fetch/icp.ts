import { IDL } from '@dfinity/candid';
import { existsSync } from 'fs';

import { ic, Principal } from '../';
import { getUrl } from './url';

export async function fetchIcp(
    input: RequestInfo | URL,
    init?: RequestInit | undefined
): Promise<Response> {
    const url = getUrl(input);

    const canisterId = url.hostname;
    const canisterMethod = url.pathname.replace('/', '');

    const { body } = init ?? {};
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

    const argsRaw = new Uint8Array(IDL.encode(funcIdl.argTypes, args ?? []));

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

    const filePath = `/candid/${canisterId}.did`;

    if (existsSync(filePath)) {
        return filePath;
    }

    throw new Error(
        "azleFetch: Candid path doesn't exist, please specify a valid candid path"
    );
}
