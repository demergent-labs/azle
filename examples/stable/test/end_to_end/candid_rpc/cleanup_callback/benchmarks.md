# Benchmarks for cleanup_callback

## Current benchmarks Azle version: 0.33.0

| Id  | Method Name                               | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ----------------------------------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | getRandomness                             | 911_804      | 5_911_804 | $0.0000080992 | $8.09             | <font color="green">-57_303</font> |
| 1   | getRandomnessWithTrapUncaught             | 843_106      | 5_843_106 | $0.0000080051 | $8.00             | <font color="green">-51_758</font> |
| 2   | getRandomnessWithTrapCaught               | 848_038      | 5_848_038 | $0.0000080118 | $8.01             | <font color="green">-49_759</font> |
| 3   | getRandomnessWithTrapCaughtRejectCallback | 847_029      | 5_847_029 | $0.0000080104 | $8.01             | <font color="green">-50_747</font> |
| 4   | getRandomnessWithTrapCaughtPromise        | 865_209      | 5_865_209 | $0.0000080353 | $8.03             | <font color="green">-54_008</font> |
| 5   | getRandomnessWithTrapCaughtAndTrapAgain   | 841_422      | 5_841_422 | $0.0000080027 | $8.00             | <font color="green">-51_393</font> |
| 6   | deleteAzleGlobalSettleCallbacks           | 966_503      | 5_966_503 | $0.0000081741 | $8.17             | <font color="green">-26_538</font> |
| 7   | getRandomnessMsgRejectInReplyCallback     | 510_812      | 5_510_812 | $0.0000075498 | $7.54             | <font color="green">-74_606</font> |
| 8   | getRandomnessMsgRejectInRejectCallback    | 508_039      | 5_508_039 | $0.0000075460 | $7.54             | <font color="green">-74_698</font> |
| 9   | setTimerWithTrap                          | 1_138_209    | 6_138_209 | $0.0000084093 | $8.40             |                                    |
| 10  | setTimerWithTrapAndInterCanisterCall      | 1_134_880    | 6_134_880 | $0.0000084048 | $8.40             |                                    |
| 11  | setTimerWithTrapAndInterCanisterCalls     | 1_135_985    | 6_135_985 | $0.0000084063 | $8.40             |                                    |

## Baseline benchmarks Azle version: 0.32.0

| Id  | Method Name                               | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------------------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | getRandomness                             | 969_107      | 5_969_107 | $0.0000081777 | $8.17             |
| 1   | getRandomnessWithTrapUncaught             | 894_864      | 5_894_864 | $0.0000080760 | $8.07             |
| 2   | getRandomnessWithTrapCaught               | 897_797      | 5_897_797 | $0.0000080800 | $8.07             |
| 3   | getRandomnessWithTrapCaughtRejectCallback | 897_776      | 5_897_776 | $0.0000080800 | $8.07             |
| 4   | getRandomnessWithTrapCaughtPromise        | 919_217      | 5_919_217 | $0.0000081093 | $8.10             |
| 5   | getRandomnessWithTrapCaughtAndTrapAgain   | 892_815      | 5_892_815 | $0.0000080732 | $8.07             |
| 6   | deleteAzleGlobalSettleCallbacks           | 993_041      | 5_993_041 | $0.0000082105 | $8.21             |
| 7   | getRandomnessMsgRejectInReplyCallback     | 585_418      | 5_585_418 | $0.0000076520 | $7.65             |
| 8   | getRandomnessMsgRejectInRejectCallback    | 582_737      | 5_582_737 | $0.0000076483 | $7.64             |

---

**Note on calculations:**

- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).
