export class AzleVoid {
    _azleKind: 'AzleVoid' = 'AzleVoid';
    _azleCandidType?: '_azleCandidType';

    static getIdl() {
        return [];
    }
}

export const Void: AzleVoid = AzleVoid as any;
export type Void = void;
