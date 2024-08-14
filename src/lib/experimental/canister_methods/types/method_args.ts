import { experimentalMessage } from '../../experimental';

if (globalThis._azleExperimental !== true) {
    throw new Error(experimentalMessage('azle/experimental'));
}

export type MethodArgs = { manual?: boolean };