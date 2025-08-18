# Benchmarks for canister

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | updatePerformanceCounter0 | 1_766_239 | 6_766_239 | $0.0000092697 | $9.26 | <font color="green">-29_817</font> |
| 1 | updatePerformanceCounter0 | 1_656_737_359 | 1_661_737_359 | $0.0022765802 | $2_276.58 | <font color="red">+1_560_348_215</font> |
| 2 | updatePerformanceCounter0 | 1_656_738_054 | 1_661_738_054 | $0.0022765811 | $2_276.58 | <font color="red">+1_560_350_609</font> |
| 3 | updatePerformanceCounter0 | 1_658_917_764 | 1_663_917_764 | $0.0022795673 | $2_279.56 | <font color="red">+1_560_679_220</font> |
| 4 | updatePerformanceCounter0 | 1_658_920_779 | 1_663_920_779 | $0.0022795715 | $2_279.57 | <font color="red">+1_560_683_004</font> |
| 5 | updatePerformanceCounter1 | 1_711_680 | 6_711_680 | $0.0000091950 | $9.19 | <font color="green">-39_397</font> |
| 6 | updatePerformanceCounter1 | 845_336 | 5_845_336 | $0.0000080081 | $8.00 | <font color="red">+22_849</font> |
| 7 | updatePerformanceCounter1 | 822_451 | 5_822_451 | $0.0000079768 | $7.97 | <font color="red">+22_834</font> |
| 8 | updatePerformanceCounter1 | 823_009 | 5_823_009 | $0.0000079775 | $7.97 | <font color="red">+21_459</font> |
| 9 | updatePerformanceCounter1 | 821_759 | 5_821_759 | $0.0000079758 | $7.97 | <font color="red">+17_730</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | updatePerformanceCounter0 | 1_796_056 | 6_796_056 | $0.0000093106 | $9.31 |
| 1 | updatePerformanceCounter0 | 96_389_144 | 101_389_144 | $0.0001389031 | $138.90 |
| 2 | updatePerformanceCounter0 | 96_387_445 | 101_387_445 | $0.0001389008 | $138.90 |
| 3 | updatePerformanceCounter0 | 98_238_544 | 103_238_544 | $0.0001414368 | $141.43 |
| 4 | updatePerformanceCounter0 | 98_237_775 | 103_237_775 | $0.0001414358 | $141.43 |
| 5 | updatePerformanceCounter1 | 1_751_077 | 6_751_077 | $0.0000092490 | $9.24 |
| 6 | updatePerformanceCounter1 | 822_487 | 5_822_487 | $0.0000079768 | $7.97 |
| 7 | updatePerformanceCounter1 | 799_617 | 5_799_617 | $0.0000079455 | $7.94 |
| 8 | updatePerformanceCounter1 | 801_550 | 5_801_550 | $0.0000079481 | $7.94 |
| 9 | updatePerformanceCounter1 | 804_029 | 5_804_029 | $0.0000079515 | $7.95 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).