# Benchmarks for fs

## Current benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | 1 | 47_201_685 | 52_201_685 | $0.0000715163 | $71.51 | <font color="green">-7_479_404_296</font> |
| 1 | 1 | 41_127_038 | 46_127_038 | $0.0000631940 | $63.19 | <font color="green">-13_262_554</font> |
| 2 | 1 | 40_407_828 | 45_407_828 | $0.0000622087 | $62.20 | <font color="green">-7_926_962</font> |
| 3 | 1 | 39_146_619 | 44_146_619 | $0.0000604809 | $60.48 | <font color="green">-8_052_291</font> |
| 4 | 1 | 39_672_299 | 44_672_299 | $0.0000612010 | $61.20 | <font color="green">-6_608_486</font> |
| 5 | 1 | 39_173_818 | 44_173_818 | $0.0000605181 | $60.51 | <font color="green">-7_608_283</font> |
| 6 | 1 | 39_302_810 | 44_302_810 | $0.0000606948 | $60.69 | <font color="green">-7_025_442</font> |
| 7 | 1 | 38_607_489 | 43_607_489 | $0.0000597423 | $59.74 | <font color="green">-7_730_308</font> |

## Baseline benchmarks Azle version: 0.30.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | init | 7_526_605_981 | 7_531_605_981 | $0.0103183002 | $10_318.30 |
| 1 | http_request_update | 54_389_592 | 59_389_592 | $0.0000813637 | $81.36 |
| 2 | http_request_update | 48_334_790 | 53_334_790 | $0.0000730687 | $73.06 |
| 3 | http_request_update | 47_198_910 | 52_198_910 | $0.0000715125 | $71.51 |
| 4 | http_request_update | 46_280_785 | 51_280_785 | $0.0000702547 | $70.25 |
| 5 | http_request_update | 46_782_101 | 51_782_101 | $0.0000709415 | $70.94 |
| 6 | http_request_update | 46_328_252 | 51_328_252 | $0.0000703197 | $70.31 |
| 7 | http_request_update | 46_337_797 | 51_337_797 | $0.0000703328 | $70.33 |
| 8 | http_request_update | 45_735_584 | 50_735_584 | $0.0000695078 | $69.50 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).