import { experimentalMessage } from '../../experimental';

if (globalThis._azleExperimental !== true) {
    throw new Error(experimentalMessage('azle/experimental'));
}

export * from './args_type';
export * from './return_type_of';
