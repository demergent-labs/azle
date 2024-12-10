# Benchmarks for minimal_dapp

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                           |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | -------------------------------- |
| 0   | count       | 1_147_675    | 1_049_070 | $0.0000013949 | $1.39             | <font color="red">+4_403</font>  |
| 1   | count       | 1_120_255    | 1_038_102 | $0.0000013803 | $1.38             | <font color="red">+29_380</font> |
| 2   | reset       | 1_118_104    | 1_037_241 | $0.0000013792 | $1.37             | <font color="red">+27_996</font> |
| 3   | count       | 1_125_066    | 1_040_026 | $0.0000013829 | $1.38             | <font color="red">+28_476</font> |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | count       | 1_143_272    | 1_047_308 | $0.0000013926 | $1.39             |
| 1   | count       | 1_090_875    | 1_026_350 | $0.0000013647 | $1.36             |
| 2   | reset       | 1_090_108    | 1_026_043 | $0.0000013643 | $1.36             |
| 3   | count       | 1_096_590    | 1_028_636 | $0.0000013677 | $1.36             |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
