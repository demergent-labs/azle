# Benchmarks for express

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | 1 | 46_502_525 | 51_502_525 | $0.0000705585 | $70.55 | <font color="green">-7_706_558_484</font> |
| 1 | 1 | 40_048_231 | 45_048_231 | $0.0000617161 | $61.71 | <font color="green">-13_624_559</font> |
| 2 | 1 | 37_153_569 | 42_153_569 | $0.0000577504 | $57.75 | <font color="green">-10_071_115</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | init | 7_753_061_009 | 7_758_061_009 | $0.0106285436 | $10_628.54 |
| 1 | http_request_update | 53_672_790 | 58_672_790 | $0.0000803817 | $80.38 |
| 2 | http_request_update | 47_224_684 | 52_224_684 | $0.0000715478 | $71.54 |
| 3 | http_request_update | 44_336_265 | 49_336_265 | $0.0000675907 | $67.59 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).