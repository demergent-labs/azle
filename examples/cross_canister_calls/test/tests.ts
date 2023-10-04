import { Test } from 'azle/test';
import { _SERVICE as CANISTER1_SERVICE } from './dfx_generated/canister1/canister1.did';
import { _SERVICE as CANISTER2_SERVICE } from './dfx_generated/canister2/canister2.did';
import { ActorSubclass } from '@dfinity/agent';

export function get_tests(
    canister1: ActorSubclass<CANISTER1_SERVICE>,
    canister2: ActorSubclass<CANISTER2_SERVICE>
): Test[] {
    return [
        {
            name: 'canister1 balance 0',
            test: async () => {
                const result = await canister1.balance('0');

                return {
                    Ok: result === 100n
                };
            }
        },
        {
            name: 'canister1 account 0',
            test: async () => {
                const result = await canister1.account({
                    id: '0'
                });

                return {
                    Ok:
                        result.length === 1 &&
                        result[0].id === '0' &&
                        result[0].balance === 100n
                };
            }
        },
        {
            name: 'canister1 balance 1',
            test: async () => {
                const result = await canister1.balance('1');

                return {
                    Ok: result === 0n
                };
            }
        },
        {
            name: 'canister1 account 1',
            test: async () => {
                const result = await canister1.account({
                    id: '1'
                });

                return {
                    Ok: result.length === 0
                };
            }
        },
        {
            name: 'canister1 accounts',
            test: async () => {
                const result = await canister1.accounts();

                return {
                    Ok:
                        result.length === 1 &&
                        result[0].id === '0' &&
                        result[0].balance === 100n
                };
            }
        },
        {
            name: 'canister1 transfer',
            test: async () => {
                const result = await canister1.transfer('0', '1', 34n);

                return {
                    Ok: result === 34n
                };
            }
        },
        {
            name: 'canister1 balance 0',
            test: async () => {
                const result = await canister1.balance('0');

                return {
                    Ok: result === 66n
                };
            }
        },
        {
            name: 'canister1 account 0',
            test: async () => {
                const result = await canister1.account({
                    id: '0'
                });

                return {
                    Ok:
                        result.length === 1 &&
                        result[0].id === '0' &&
                        result[0].balance === 66n
                };
            }
        },
        {
            name: 'canister1 balance 1',
            test: async () => {
                const result = await canister1.balance('1');

                return {
                    Ok: result === 34n
                };
            }
        },
        {
            name: 'canister1 account 1',
            test: async () => {
                const result = await canister1.account({
                    id: '1'
                });

                return {
                    Ok:
                        result.length === 1 &&
                        result[0].id === '1' &&
                        result[0].balance === 34n
                };
            }
        },
        {
            name: 'canister1 accounts',
            test: async () => {
                const result = await canister1.accounts();

                return {
                    Ok:
                        result[0].id === '0' &&
                        result[0].balance === 66n &&
                        result[1].id === '1' &&
                        result[1].balance === 34n
                };
            }
        },
        {
            name: 'canister1 trap',
            test: async () => {
                try {
                    await canister1.trap();

                    return {
                        Ok: false
                    };
                } catch (error) {
                    return {
                        Ok: (error as { message: string }).message.includes(
                            'hahahaha'
                        )
                    };
                }
            }
        },
        {
            name: 'canister2 get_notification empty',
            test: async () => {
                const result = await canister2.getNotification();

                return {
                    Ok: result === ''
                };
            }
        },
        {
            name: 'canister1 send_notification',
            test: async () => {
                const result = await canister1.sendNotification();

                return {
                    Ok: result === undefined
                };
            }
        },
        {
            name: 'canister2 get_notification',
            test: async () => {
                const result = await canister2.getNotification();

                return {
                    Ok: result === 'This is the notification'
                };
            }
        }
    ];
}
