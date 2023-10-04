import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/proxy/proxy.did';
import { Principal } from '@dfinity/principal';

export function getTests(proxyCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'icrc1_metadata',
            test: async () => {
                const result = await proxyCanister.icrc1_metadata();

                const [firstDatumName, firstDatumValue] = result[0];
                const [secondDatumName, secondDatumValue] = result[1];
                const [thirdDatumName, thirdDatumValue] = result[2];
                const [fourthDatumName, fourthDatumValue] = result[3];

                return {
                    Ok:
                        firstDatumName === 'icrc1:name' &&
                        'Text' in firstDatumValue &&
                        firstDatumValue.Text === 'Azle' &&
                        secondDatumName === 'icrc1:symbol' &&
                        'Text' in secondDatumValue &&
                        secondDatumValue.Text === 'AZLE' &&
                        thirdDatumName === 'icrc1:decimals' &&
                        'Nat' in thirdDatumValue &&
                        thirdDatumValue.Nat === 8n &&
                        fourthDatumName === 'icrc1:fee' &&
                        'Nat' in fourthDatumValue &&
                        fourthDatumValue.Nat === 0n
                };
            }
        },
        {
            name: 'icrc1_name',
            test: async () => {
                const result = await proxyCanister.icrc1_name();

                return {
                    Ok: result === 'Azle'
                };
            }
        },
        {
            name: 'icrc1_decimals',
            test: async () => {
                const result = await proxyCanister.icrc1_decimals();

                return {
                    Ok: result === 8
                };
            }
        },
        {
            name: 'icrc1_symbol',
            test: async () => {
                const result = await proxyCanister.icrc1_symbol();

                return {
                    Ok: result === 'AZLE'
                };
            }
        },
        {
            name: 'icrc1_fee',
            test: async () => {
                const result = await proxyCanister.icrc1_fee();

                return {
                    Ok: result === 0n
                };
            }
        },
        {
            name: 'icrc1_total_supply',
            test: async () => {
                const result = await proxyCanister.icrc1_total_supply();

                return {
                    Ok: result === 1_000_000n
                };
            }
        },
        {
            name: 'icrc1_minting_account',
            test: async () => {
                const result = await proxyCanister.icrc1_minting_account();

                return {
                    Ok: result[0]?.owner.toText() === '2vxsx-fae'
                };
            }
        },
        {
            name: 'icrc1_balance_of',
            test: async () => {
                const result = await proxyCanister.icrc1_balance_of({
                    owner: Principal.fromText('r7inp-6aaaa-aaaaa-aaabq-cai'),
                    subaccount: []
                });

                return {
                    Ok: result === 1_000_000n
                };
            }
        },
        {
            name: 'icrc1_transfer',
            test: async () => {
                const result = await proxyCanister.icrc1_transfer({
                    from_subaccount: [],
                    to: {
                        owner: Principal.fromText(
                            'rrkah-fqaaa-aaaaa-aaaaq-cai'
                        ),
                        subaccount: []
                    },
                    amount: 1n,
                    fee: [],
                    memo: [],
                    created_at_time: []
                });

                return {
                    Ok: 'Ok' in result && result.Ok === 1n
                };
            }
        },
        {
            name: 'icrc1_supported_standards',
            test: async () => {
                const result = await proxyCanister.icrc1_supported_standards();

                return {
                    Ok:
                        result[0].url ===
                            'https://github.com/dfinity/ICRC-1/tree/main/standards/ICRC-1' &&
                        result[0].name === 'ICRC-1' &&
                        result[1].url ===
                            'https://github.com/dfinity/ICRC-1/tree/main/standards/ICRC-2' &&
                        result[1].name === 'ICRC-2'
                };
            }
        },
        {
            name: 'icrc2_approve',
            test: async () => {
                const result = await proxyCanister.icrc2_approve({
                    from_subaccount: [],
                    spender: {
                        owner: Principal.fromText(
                            'rrkah-fqaaa-aaaaa-aaaaq-cai'
                        ),
                        subaccount: []
                    },
                    amount: 1n,
                    expected_allowance: [],
                    expires_at: [],
                    fee: [],
                    memo: [],
                    created_at_time: []
                });

                return {
                    Ok: 'Ok' in result && result.Ok === 2n
                };
            }
        },
        {
            name: 'icrc2_transfer_from',
            test: async () => {
                const result = await proxyCanister.icrc2_transfer_from({
                    from: {
                        owner: Principal.fromText(
                            'r7inp-6aaaa-aaaaa-aaabq-cai'
                        ),
                        subaccount: []
                    },
                    to: {
                        owner: Principal.fromText(
                            'rrkah-fqaaa-aaaaa-aaaaq-cai'
                        ),
                        subaccount: []
                    },
                    amount: 1n,
                    fee: [],
                    memo: [],
                    created_at_time: []
                });

                return {
                    Ok: 'Ok' in result && result.Ok === 3n
                };
            }
        },
        {
            name: 'icrc2_allowance',
            test: async () => {
                const result = await proxyCanister.icrc2_allowance({
                    account: {
                        owner: Principal.fromText(
                            'r7inp-6aaaa-aaaaa-aaabq-cai'
                        ),
                        subaccount: []
                    },
                    spender: {
                        owner: Principal.fromText(
                            'rrkah-fqaaa-aaaaa-aaaaq-cai'
                        ),
                        subaccount: []
                    }
                });

                return {
                    Ok: result.allowance === 1n
                };
            }
        }
    ];
}
