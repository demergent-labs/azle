import { run_tests, Test } from 'azle/test';
import { execSync } from 'child_process';
import { alice, get_tests } from './tests';

const tests: Test[] = [
    {
        name: 'clear canister memory',
        prep: async () => {
            execSync(`dfx canister uninstall-code basic_dao || true`, {
                stdio: 'inherit'
            });
        }
    },
    {
        // TODO hopefully we can get rid of this: https://forum.dfinity.org/t/generated-declarations-in-node-js-environment-break/12686/16?u=lastmjs
        name: 'waiting for createActor fetchRootKey',
        wait: 5000
    },
    {
        name: 'deploy',
        prep: async () => {
            execSync(
                `dfx deploy basic_dao --argument '(
          vec {
              record {
                  owner = principal \"${alice.getPrincipal().toString()}\";
                  tokens = record { amount_e8s = 1_000_000_000_000 };
              };
          },
          vec {},
          record {
              transfer_fee = record { amount_e8s = 10_000 };
              proposal_vote_threshold = record { amount_e8s = 1_000_000_000 };
              proposal_submission_deposit = record { amount_e8s = 10_000 };
          }
        )'`,
                {
                    stdio: 'inherit'
                }
            );
        }
    },
    ...get_tests()
];

run_tests(tests);
