import { experimentalMessage } from '../../experimental';

if (globalThis._azleExperimental !== true) {
    throw new Error(experimentalMessage('azle/experimental'));
}

export type ArgsType<T> = T extends (...args: infer U) => any ? U : any;
