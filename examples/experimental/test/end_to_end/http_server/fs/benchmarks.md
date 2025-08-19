# Benchmarks for fs

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | 1 | 47_193_286 | 52_193_286 | $0.0000715048 | $71.50 | <font color="green">-7_694_702_548</font> |
| 1 | 1 | 41_118_725 | 46_118_725 | $0.0000631827 | $63.18 | <font color="green">-13_302_726</font> |
| 2 | 1 | 40_387_059 | 45_387_059 | $0.0000621803 | $62.18 | <font color="green">-7_958_552</font> |
| 3 | 1 | 39_137_017 | 44_137_017 | $0.0000604677 | $60.46 | <font color="green">-8_515_729</font> |
| 4 | 1 | 39_663_368 | 44_663_368 | $0.0000611888 | $61.18 | <font color="green">-6_628_460</font> |
| 5 | 1 | 39_166_558 | 44_166_558 | $0.0000605082 | $60.50 | <font color="green">-7_701_683</font> |
| 6 | 1 | 39_291_768 | 44_291_768 | $0.0000606797 | $60.67 | <font color="green">-7_044_214</font> |
| 7 | 1 | 38_622_450 | 43_622_450 | $0.0000597628 | $59.76 | <font color="green">-7_830_275</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | init | 7_741_895_834 | 7_746_895_834 | $0.0106132473 | $10_613.24 |
| 1 | http_request_update | 54_421_451 | 59_421_451 | $0.0000814074 | $81.40 |
| 2 | http_request_update | 48_345_611 | 53_345_611 | $0.0000730835 | $73.08 |
| 3 | http_request_update | 47_652_746 | 52_652_746 | $0.0000721343 | $72.13 |
| 4 | http_request_update | 46_291_828 | 51_291_828 | $0.0000702698 | $70.26 |
| 5 | http_request_update | 46_868_241 | 51_868_241 | $0.0000710595 | $71.05 |
| 6 | http_request_update | 46_335_982 | 51_335_982 | $0.0000703303 | $70.33 |
| 7 | http_request_update | 46_452_725 | 51_452_725 | $0.0000704902 | $70.49 |
| 8 | http_request_update | 45_768_309 | 50_768_309 | $0.0000695526 | $69.55 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).