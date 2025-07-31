# Benchmarks for bitcore_lib

## Current benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | 1 | 1_100_005_021 | 1_105_005_021 | $0.0015138569 | $1_513.85 | <font color="green">-8_297_163_516</font> |
| 1 | 1 | 6_652_221_358 | 6_657_221_358 | $0.0091203933 | $9_120.39 | <font color="red">+5_551_474_780</font> |
| 2 | 1 | 18_710_888_860 | 18_715_888_860 | $0.0256407677 | $25_640.76 | <font color="red">+7_277_789_229</font> |
| 3 | 1 | 17_475_035_027 | 17_480_035_027 | $0.0239476480 | $23_947.64 | <font color="red">+5_851_491_390</font> |

## Baseline benchmarks Azle version: 0.30.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | init | 9_397_168_537 | 9_402_168_537 | $0.0128809709 | $12_880.97 |
| 1 | http_request_update | 1_100_746_578 | 1_105_746_578 | $0.0015148728 | $1_514.87 |
| 2 | http_request_update | 11_433_099_631 | 11_438_099_631 | $0.0156701965 | $15_670.19 |
| 3 | http_request_update | 11_623_543_637 | 11_628_543_637 | $0.0159311048 | $15_931.10 |
| 4 | http_request_update | 17_187_080_665 | 17_192_080_665 | $0.0235531505 | $23_553.15 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).