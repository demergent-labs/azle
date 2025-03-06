import '#experimental/lib/assert_experimental';

import { IDL } from '@dfinity/candid';

import { idlToString } from '#lib/did_file/idl_to_string';

import { Parent, toIdlTypeArray } from '../../../../index';
import { _AzleRecursiveFunction } from '../../../../recursive';
import { CanisterOptions, ServiceFunctionInfo } from '.';

export function createGetInitAndPostUpgradeParamIdlTypes(
    canisterOptions: CanisterOptions
) {
    return (parents: Parent[]): IDL.Type[] => {
        const serviceFunctionInfo = canisterOptions as ServiceFunctionInfo;

        const initMethod = Object.entries(serviceFunctionInfo).find(
            ([_, info]) => info.mode === 'init'
        );
        const postUpgradeMethod = Object.entries(serviceFunctionInfo).find(
            ([_, info]) => info.mode === 'postUpgrade'
        );

        if (initMethod !== undefined && postUpgradeMethod !== undefined) {
            const initParams = toIdlTypeArray(
                initMethod[1].paramCandidTypes,
                parents
            );
            const postUpgradeParams = toIdlTypeArray(
                postUpgradeMethod[1].paramCandidTypes,
                parents
            );

            const initSignature = idlToString(IDL.Func(initParams, []));
            const postUpgradeSignature = idlToString(
                IDL.Func(postUpgradeParams, [])
            );

            if (initSignature !== postUpgradeSignature) {
                throw new Error(
                    `'@init' and '@postUpgrade' methods must have the same parameters.\nFound:\n${initSignature}\n${postUpgradeSignature}`
                );
            }

            return initParams;
        }

        if (initMethod !== undefined) {
            return toIdlTypeArray(initMethod[1].paramCandidTypes, parents);
        }

        if (postUpgradeMethod !== undefined) {
            return toIdlTypeArray(
                postUpgradeMethod[1].paramCandidTypes,
                parents
            );
        }

        return [];
    };
}
