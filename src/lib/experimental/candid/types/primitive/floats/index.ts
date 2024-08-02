import { experimentalMessage } from '../../../../experimental';

if (globalThis._azleExperimental !== true) {
    throw new Error(experimentalMessage('azle/experimental'));
}

export * from './float32';
export * from './float64';
