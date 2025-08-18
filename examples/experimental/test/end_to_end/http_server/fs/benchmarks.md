# Benchmarks for fs

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | 1 | 47_181_081 | 52_181_081 | $0.0000714881 | $71.48 | <font color="green">-7_694_714_753</font> |
| 1 | 1 | 41_152_169 | 46_152_169 | $0.0000632285 | $63.22 | <font color="green">-13_269_282</font> |
| 2 | 1 | 40_419_382 | 45_419_382 | $0.0000622246 | $62.22 | <font color="green">-7_926_229</font> |
| 3 | 1 | 39_176_829 | 44_176_829 | $0.0000605223 | $60.52 | <font color="green">-8_475_917</font> |
| 4 | 1 | 39_658_247 | 44_658_247 | $0.0000611818 | $61.18 | <font color="green">-6_633_581</font> |
| 5 | 1 | 39_158_148 | 44_158_148 | $0.0000604967 | $60.49 | <font color="green">-7_710_093</font> |
| 6 | 1 | 39_266_650 | 44_266_650 | $0.0000606453 | $60.64 | <font color="green">-7_069_332</font> |
| 7 | 1 | 38_638_385 | 43_638_385 | $0.0000597846 | $59.78 | <font color="green">-7_814_340</font> |

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