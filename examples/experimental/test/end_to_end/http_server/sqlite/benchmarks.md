# Benchmarks for sqlite

## Current benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | 4 | 12_320_671_830 | 12_325_671_830 | $0.0168861704 | $16_886.17 | <font color="red">+402_125_884</font> |
| 1 | 1 | 144_165_778 | 149_165_778 | $0.0002043571 | $204.35 | <font color="green">-3_436_973</font> |
| 2 | 1 | 67_947_898 | 72_947_898 | $0.0000999386 | $99.93 | <font color="green">-6_781_597</font> |
| 3 | 1 | 136_954_201 | 141_954_201 | $0.0001944773 | $194.47 | <font color="green">-6_747_581</font> |
| 4 | 1 | 76_130_792 | 81_130_792 | $0.0001111492 | $111.14 | <font color="green">-6_895_585</font> |

## Baseline benchmarks Azle version: 0.30.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | postUpgrade | 11_918_545_946 | 11_923_545_946 | $0.0163352579 | $16_335.25 |
| 1 | http_request_update | 147_602_751 | 152_602_751 | $0.0002090658 | $209.06 |
| 2 | http_request_update | 74_729_495 | 79_729_495 | $0.0001092294 | $109.22 |
| 3 | http_request_update | 143_701_782 | 148_701_782 | $0.0002037214 | $203.72 |
| 4 | http_request_update | 83_026_377 | 88_026_377 | $0.0001205961 | $120.59 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).