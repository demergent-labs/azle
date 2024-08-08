import { experimentalMessage } from '../../../../experimental';

if (globalThis._azleExperimental !== true) {
    throw new Error(experimentalMessage('azle/experimental'));
}

export * from './int';
export * from './int8';
export * from './int16';
export * from './int32';
export * from './int64';
