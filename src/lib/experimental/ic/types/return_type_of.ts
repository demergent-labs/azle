import { experimentalMessage } from '../../experimental';

if (globalThis._azleExperimental !== true) {
    throw new Error(experimentalMessage('azle/experimental'));
}

export type ReturnTypeOf<T> = T extends (...args: any[]) => infer R ? R : any;
