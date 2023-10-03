export class AzleVoid {
    _kind: 'AzleVoid' = 'AzleVoid';
    _azleCandidType?: '_azleCandidType';

    static getIDL() {
        return [];
    }
}

export const Void: AzleVoid = AzleVoid as any;
export type Void = void;
