import { experimentalMessage } from '../../../experimental';

if (globalThis._azleExperimental !== true) {
    throw new Error(experimentalMessage('azle/experimental'));
}

export * from './func';
export * from './principal';
export * from './service';
