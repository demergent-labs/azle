import { experimentalMessage } from '../../experimental';

if (globalThis._azleExperimental !== true) {
    throw new Error(experimentalMessage('azle/experimental'));
}

export * from './heartbeat';
export * from './init';
export * from './inspect_message';
export * from './post_upgrade';
export * from './pre_upgrade';
export * from './query';
export * from './update';
