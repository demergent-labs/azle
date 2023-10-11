import { Test } from '../../../test'; // We don't want to install Azle
import { execSync } from 'child_process';

export function getTests(): Test[] {
    return [
        {
            name: 'getMessage',
            test: async () => {
                execSync(
                    `cd hello_world && npm run canister_call_set_message`,
                    {
                        stdio: 'inherit'
                    }
                );

                const result = execSync(
                    `cd hello_world && npm run canister_call_get_message`
                )
                    .toString()
                    .trim();

                return {
                    Ok: result.includes('Hello world!')
                };
            }
        }
    ];
}
