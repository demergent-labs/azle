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

        // TODO let's think of the exact URL that we want here
        // TODO would it be nice to put the canister id and method in the url?
        // TODO it seems to be part of routing and locating
        // TODO icp://canister/principal/method
        if (url.protocol === 'icp:') {
            const canisterId = url.hostname;
            const canisterMethod = url.pathname.replace('/', '');

            // TODO the body could just be bytes as well
            const { candidPath, args, cycles, cycles128 } = body;

            const idlString = ic.candidCompiler(candidPath);

            // TODO very bad replacement of course
            const normalizedIdlString = idlString.replace(/export/g, '');

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
