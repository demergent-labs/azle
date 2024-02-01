import { ic, Principal } from './';
import { IDL } from '@dfinity/candid';
import { URL } from 'url';

export async function azleFetch(input: any, init?: any): Promise<any> {
    if (process.env.AZLE_TEST_FETCH === 'true') {
        console.log('azleFetch has been called');
    }

    const url = new URL(input);

    if (typeof init === 'object') {
        const { method, headers, body } = init;

        if (url.protocol === 'icp:') {
            const canisterId = url.hostname;
            const canisterMethod = url.pathname.replace('/', '');

            const { candidPath, args, cycles, cycles128 } = body;

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

            const [funcName, funcIdl] = serviceIdl._fields.find(
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
                json: async () => {
                    return decodedResult[0];
                }
            };
        } else {
            // TODO http request to the management canister
        }
    }

    throw new Error('Not supported in Azle fetch');
}

export function serialize(param: {
    candidPath: string;
    args?: any[];
    cycles?: number | bigint;
    cycles128?: number | bigint;
}): ArrayBuffer {
    return param as any;
}
