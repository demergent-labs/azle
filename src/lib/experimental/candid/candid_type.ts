import { experimentalMessage } from '../experimental';

if (globalThis._azleExperimental !== true) {
    throw new Error(experimentalMessage('azle/experimental'));
}

import { IDL } from '@dfinity/candid';

import { Parent } from './to_idl_type';

export interface CandidType {
    getIdlType(parents: Parent[]): IDL.Type<any>;
}
