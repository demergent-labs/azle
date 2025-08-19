# Benchmarks for cleanup_callback

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | getRandomness | 979_561 | 5_979_561 | $0.0000081920 | $8.19 | <font color="red">+10_454</font> |
| 1 | getRandomnessWithTrapUncaught | 902_987 | 5_902_987 | $0.0000080871 | $8.08 | <font color="red">+8_123</font> |
| 2 | getRandomnessWithTrapCaught | 902_962 | 5_902_962 | $0.0000080871 | $8.08 | <font color="red">+5_165</font> |
| 3 | getRandomnessWithTrapCaughtRejectCallback | 905_692 | 5_905_692 | $0.0000080908 | $8.09 | <font color="red">+7_916</font> |
| 4 | getRandomnessWithTrapCaughtPromise | 923_973 | 5_923_973 | $0.0000081158 | $8.11 | <font color="red">+4_756</font> |
| 5 | getRandomnessWithTrapCaughtAndTrapAgain | 903_936 | 5_903_936 | $0.0000080884 | $8.08 | <font color="red">+11_121</font> |
| 6 | deleteAzleGlobalSettleCallbacks | 964_980 | 5_964_980 | $0.0000081720 | $8.17 | <font color="green">-28_061</font> |
| 7 | getRandomnessMsgRejectInReplyCallback | 566_096 | 5_566_096 | $0.0000076256 | $7.62 | <font color="green">-19_322</font> |
| 8 | getRandomnessMsgRejectInRejectCallback | 567_384 | 5_567_384 | $0.0000076273 | $7.62 | <font color="green">-15_353</font> |
| 9 | setTimerWithTrap | 1_138_260 | 6_138_260 | $0.0000084094 | $8.40 |  |
| 10 | setTimerWithTrapAndInterCanisterCall | 1_133_319 | 6_133_319 | $0.0000084026 | $8.40 |  |
| 11 | setTimerWithTrapAndInterCanisterCalls | 1_134_239 | 6_134_239 | $0.0000084039 | $8.40 |  |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | getRandomness | 969_107 | 5_969_107 | $0.0000081777 | $8.17 |
| 1 | getRandomnessWithTrapUncaught | 894_864 | 5_894_864 | $0.0000080760 | $8.07 |
| 2 | getRandomnessWithTrapCaught | 897_797 | 5_897_797 | $0.0000080800 | $8.07 |
| 3 | getRandomnessWithTrapCaughtRejectCallback | 897_776 | 5_897_776 | $0.0000080800 | $8.07 |
| 4 | getRandomnessWithTrapCaughtPromise | 919_217 | 5_919_217 | $0.0000081093 | $8.10 |
| 5 | getRandomnessWithTrapCaughtAndTrapAgain | 892_815 | 5_892_815 | $0.0000080732 | $8.07 |
| 6 | deleteAzleGlobalSettleCallbacks | 993_041 | 5_993_041 | $0.0000082105 | $8.21 |
| 7 | getRandomnessMsgRejectInReplyCallback | 585_418 | 5_585_418 | $0.0000076520 | $7.65 |
| 8 | getRandomnessMsgRejectInRejectCallback | 582_737 | 5_582_737 | $0.0000076483 | $7.64 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).