import { ic, IDL, Principal } from './index';
import { CandidClass, toReturnCandidClass } from './utils';

type Constructor<T = {}> = new (...args: any[]) => T;

export class Service {
    canisterId: Principal;
    [key: string]: any;

    constructor(canisterId: Principal) {
        this.canisterId = canisterId;
    }

    static create<T extends Constructor>(
        this: T,
        props: { canisterId: Principal }
    ): InstanceType<T> {
        return new this(props) as InstanceType<T>;
    }
}

export function serviceDecorator(
    target: any,
    key: string,
    paramsIdls: any[],
    returnIdl: CandidClass
) {
    target[key] = async function (...args: any[]) {
        const encodedArgs = new Uint8Array(IDL.encode(paramsIdls, args));

        const encodedResult = await ic.callRaw(
            this.canisterId,
            key,
            encodedArgs,
            0n
        );

        const returnIdls = toReturnCandidClass(returnIdl);
        const decodedResult = IDL.decode(returnIdls, encodedResult)[0];

        return decodedResult;
    };
}
