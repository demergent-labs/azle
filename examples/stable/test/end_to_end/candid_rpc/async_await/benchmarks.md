# Benchmarks for async_await

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | getRandomnessDirectly | 978_141 | 5_978_141 | $0.0000081901 | $8.19 | <font color="red">+9_592</font> |
| 1 | getRandomnessIndirectly | 914_649 | 5_914_649 | $0.0000081031 | $8.10 | <font color="red">+6_703</font> |
| 2 | getRandomnessSuperIndirectly | 949_868 | 5_949_868 | $0.0000081513 | $8.15 | <font color="red">+5_290</font> |
| 3 | getRandomnessSuperIndirectlyAndConcurrently | 2_073_970 | 7_073_970 | $0.0000096913 | $9.69 | <font color="green">-25_638</font> |
| 4 | returnPromiseVoid | 905_555 | 5_905_555 | $0.0000080906 | $8.09 | <font color="red">+9_388</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | getRandomnessDirectly | 968_549 | 5_968_549 | $0.0000081769 | $8.17 |
| 1 | getRandomnessIndirectly | 907_946 | 5_907_946 | $0.0000080939 | $8.09 |
| 2 | getRandomnessSuperIndirectly | 944_578 | 5_944_578 | $0.0000081441 | $8.14 |
| 3 | getRandomnessSuperIndirectlyAndConcurrently | 2_099_608 | 7_099_608 | $0.0000097265 | $9.72 |
| 4 | returnPromiseVoid | 896_167 | 5_896_167 | $0.0000080777 | $8.07 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).