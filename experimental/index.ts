import { experimentalMessage } from '../src/lib/experimental/experimental';

if (globalThis._azleExperimental !== true) {
    throw new Error(experimentalMessage('azle/experimental'));
}

export * from '../src/lib/experimental';
