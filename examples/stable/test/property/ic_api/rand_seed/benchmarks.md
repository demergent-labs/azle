# Benchmarks for canister

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | cryptoGetRandomValues | 1_718_876 | 6_718_876 | $0.0000092049 | $9.20 | <font color="green">-52_790</font> |
| 1 | cryptoGetRandomValues | 1_644_054 | 6_644_054 | $0.0000091024 | $9.10 | <font color="green">-59_697</font> |
| 2 | cryptoGetRandomValues | 1_641_345 | 6_641_345 | $0.0000090986 | $9.09 | <font color="green">-73_481</font> |
| 3 | cryptoGetRandomValues | 1_643_157 | 6_643_157 | $0.0000091011 | $9.10 | <font color="green">-57_866</font> |
| 4 | cryptoGetRandomValues | 1_643_133 | 6_643_133 | $0.0000091011 | $9.10 | <font color="red">+399_614</font> |
| 5 | cryptoGetRandomValues | 1_641_124 | 6_641_124 | $0.0000090983 | $9.09 | <font color="green">-72_419</font> |
| 6 | cryptoGetRandomValues | 1_645_945 | 6_645_945 | $0.0000091049 | $9.10 | <font color="green">-57_286</font> |
| 7 | cryptoGetRandomValues | 1_644_414 | 6_644_414 | $0.0000091028 | $9.10 | <font color="red">+403_579</font> |
| 8 | cryptoGetRandomValues | 1_657_616 | 6_657_616 | $0.0000091209 | $9.12 | <font color="green">-57_786</font> |
| 9 | seed | 1_221_952 | 6_221_952 | $0.0000085241 | $8.52 | <font color="green">-482_963</font> |
| 10 | cryptoGetRandomValues | 1_657_386 | 6_657_386 | $0.0000091206 | $9.12 | <font color="red">+416_429</font> |
| 11 | cryptoGetRandomValues | 1_643_538 | 6_643_538 | $0.0000091016 | $9.10 | <font color="green">-69_577</font> |
| 12 | seed | 1_217_882 | 6_217_882 | $0.0000085185 | $8.51 | <font color="green">-482_857</font> |
| 13 | cryptoGetRandomValues | 1_659_462 | 6_659_462 | $0.0000091235 | $9.12 | <font color="green">-39_419</font> |
| 14 | cryptoGetRandomValues | 1_645_868 | 6_645_868 | $0.0000091048 | $9.10 | <font color="green">-52_383</font> |
| 15 | seed | 1_220_461 | 6_220_461 | $0.0000085220 | $8.52 | <font color="green">-493_363</font> |
| 16 | cryptoGetRandomValues | 1_662_394 | 6_662_394 | $0.0000091275 | $9.12 | <font color="green">-38_559</font> |
| 17 | cryptoGetRandomValues | 1_646_009 | 6_646_009 | $0.0000091050 | $9.10 | <font color="green">-53_934</font> |
| 18 | cryptoGetRandomValues | 1_653_130 | 6_653_130 | $0.0000091148 | $9.11 | <font color="red">+408_270</font> |
| 19 | cryptoGetRandomValues | 1_658_273 | 6_658_273 | $0.0000091218 | $9.12 | <font color="green">-56_207</font> |
| 20 | cryptoGetRandomValues | 1_649_537 | 6_649_537 | $0.0000091099 | $9.10 | <font color="green">-52_393</font> |
| 21 | seed | 1_220_332 | 6_220_332 | $0.0000085219 | $8.52 | <font color="green">-478_450</font> |
| 22 | cryptoGetRandomValues | 1_665_710 | 6_665_710 | $0.0000091320 | $9.13 | <font color="green">-35_825</font> |
| 23 | cryptoGetRandomValues | 1_648_734 | 6_648_734 | $0.0000091088 | $9.10 | <font color="green">-64_272</font> |
| 24 | cryptoGetRandomValues | 1_649_024 | 6_649_024 | $0.0000091092 | $9.10 | <font color="green">-52_889</font> |
| 25 | cryptoGetRandomValues | 1_662_253 | 6_662_253 | $0.0000091273 | $9.12 | <font color="green">-37_919</font> |
| 26 | cryptoGetRandomValues | 1_649_129 | 6_649_129 | $0.0000091093 | $9.10 |  |

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