# Benchmarks for canister

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | cryptoGetRandomValues | 1_719_586 | 6_719_586 | $0.0000092058 | $9.20 | <font color="green">-52_080</font> |
| 1 | cryptoGetRandomValues | 1_647_675 | 6_647_675 | $0.0000091073 | $9.10 | <font color="green">-56_076</font> |
| 2 | cryptoGetRandomValues | 1_664_392 | 6_664_392 | $0.0000091302 | $9.13 | <font color="green">-50_434</font> |
| 3 | cryptoGetRandomValues | 1_651_256 | 6_651_256 | $0.0000091122 | $9.11 | <font color="green">-49_767</font> |
| 4 | cryptoGetRandomValues | 1_650_545 | 6_650_545 | $0.0000091112 | $9.11 | <font color="red">+407_026</font> |
| 5 | cryptoGetRandomValues | 1_660_564 | 6_660_564 | $0.0000091250 | $9.12 | <font color="green">-52_979</font> |
| 6 | cryptoGetRandomValues | 1_649_032 | 6_649_032 | $0.0000091092 | $9.10 | <font color="green">-54_199</font> |
| 7 | seed | 1_222_219 | 6_222_219 | $0.0000085244 | $8.52 | <font color="green">-18_616</font> |
| 8 | cryptoGetRandomValues | 1_662_585 | 6_662_585 | $0.0000091277 | $9.12 | <font color="green">-52_817</font> |
| 9 | cryptoGetRandomValues | 1_650_994 | 6_650_994 | $0.0000091119 | $9.11 | <font color="green">-53_921</font> |
| 10 | seed | 1_217_489 | 6_217_489 | $0.0000085180 | $8.51 | <font color="green">-23_468</font> |
| 11 | cryptoGetRandomValues | 1_660_206 | 6_660_206 | $0.0000091245 | $9.12 | <font color="green">-52_909</font> |
| 12 | cryptoGetRandomValues | 1_649_583 | 6_649_583 | $0.0000091099 | $9.10 | <font color="green">-51_156</font> |
| 13 | seed | 1_217_802 | 6_217_802 | $0.0000085184 | $8.51 | <font color="green">-481_079</font> |
| 14 | cryptoGetRandomValues | 1_661_322 | 6_661_322 | $0.0000091260 | $9.12 | <font color="green">-36_929</font> |
| 15 | cryptoGetRandomValues | 1_651_713 | 6_651_713 | $0.0000091128 | $9.11 | <font color="green">-62_111</font> |
| 16 | cryptoGetRandomValues | 1_657_886 | 6_657_886 | $0.0000091213 | $9.12 | <font color="green">-43_067</font> |
| 17 | seed | 1_221_441 | 6_221_441 | $0.0000085234 | $8.52 | <font color="green">-478_502</font> |
| 18 | cryptoGetRandomValues | 1_662_440 | 6_662_440 | $0.0000091275 | $9.12 | <font color="red">+417_580</font> |
| 19 | cryptoGetRandomValues | 1_649_702 | 6_649_702 | $0.0000091101 | $9.11 | <font color="green">-64_778</font> |
| 20 | cryptoGetRandomValues | 1_662_947 | 6_662_947 | $0.0000091282 | $9.12 | <font color="green">-38_983</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | cryptoGetRandomValues | 1_771_666 | 6_771_666 | $0.0000092772 | $9.27 |
| 1 | cryptoGetRandomValues | 1_703_751 | 6_703_751 | $0.0000091841 | $9.18 |
| 2 | cryptoGetRandomValues | 1_714_826 | 6_714_826 | $0.0000091993 | $9.19 |
| 3 | cryptoGetRandomValues | 1_701_023 | 6_701_023 | $0.0000091804 | $9.18 |
| 4 | seed | 1_243_519 | 6_243_519 | $0.0000085536 | $8.55 |
| 5 | cryptoGetRandomValues | 1_713_543 | 6_713_543 | $0.0000091976 | $9.19 |
| 6 | cryptoGetRandomValues | 1_703_231 | 6_703_231 | $0.0000091834 | $9.18 |
| 7 | seed | 1_240_835 | 6_240_835 | $0.0000085499 | $8.54 |
| 8 | cryptoGetRandomValues | 1_715_402 | 6_715_402 | $0.0000092001 | $9.20 |
| 9 | cryptoGetRandomValues | 1_704_915 | 6_704_915 | $0.0000091857 | $9.18 |
| 10 | seed | 1_240_957 | 6_240_957 | $0.0000085501 | $8.55 |
| 11 | cryptoGetRandomValues | 1_713_115 | 6_713_115 | $0.0000091970 | $9.19 |
| 12 | cryptoGetRandomValues | 1_700_739 | 6_700_739 | $0.0000091800 | $9.18 |
| 13 | cryptoGetRandomValues | 1_698_881 | 6_698_881 | $0.0000091775 | $9.17 |
| 14 | cryptoGetRandomValues | 1_698_251 | 6_698_251 | $0.0000091766 | $9.17 |
| 15 | cryptoGetRandomValues | 1_713_824 | 6_713_824 | $0.0000091979 | $9.19 |
| 16 | cryptoGetRandomValues | 1_700_953 | 6_700_953 | $0.0000091803 | $9.18 |
| 17 | cryptoGetRandomValues | 1_699_943 | 6_699_943 | $0.0000091789 | $9.17 |
| 18 | seed | 1_244_860 | 6_244_860 | $0.0000085555 | $8.55 |
| 19 | cryptoGetRandomValues | 1_714_480 | 6_714_480 | $0.0000091988 | $9.19 |
| 20 | cryptoGetRandomValues | 1_701_930 | 6_701_930 | $0.0000091816 | $9.18 |
| 21 | cryptoGetRandomValues | 1_698_782 | 6_698_782 | $0.0000091773 | $9.17 |
| 22 | cryptoGetRandomValues | 1_701_535 | 6_701_535 | $0.0000091811 | $9.18 |
| 23 | cryptoGetRandomValues | 1_713_006 | 6_713_006 | $0.0000091968 | $9.19 |
| 24 | cryptoGetRandomValues | 1_701_913 | 6_701_913 | $0.0000091816 | $9.18 |
| 25 | cryptoGetRandomValues | 1_700_172 | 6_700_172 | $0.0000091792 | $9.17 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).