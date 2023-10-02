import { IDL } from '../..';

export class AzleBool {
    _kind: 'AzleBool' = 'AzleBool';
    _azleCandidType?: '_azleCandidType';

    static getIDL() {
        return IDL.Bool;
    }
}

export const bool: AzleBool = AzleBool as any;
export type bool = boolean;
