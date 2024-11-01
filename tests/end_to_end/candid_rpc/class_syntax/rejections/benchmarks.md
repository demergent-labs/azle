# Benchmarks for rejections

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name                        | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ---------------------------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | getRejectionCodeNoError            | 1_692_976    | 1_267_190 | $0.0000016849 | $1.68             | <font color="green">-30_936</font> |
| 1   | getRejectionCodeDestinationInvalid | 1_637_238    | 1_244_895 | $0.0000016553 | $1.65             | <font color="green">-7_160</font>  |
| 2   | getRejectionCodeCanisterReject     | 2_058_171    | 1_413_268 | $0.0000018792 | $1.87             | <font color="green">-3_636</font>  |
| 3   | getRejectionCodeCanisterError      | 1_642_368    | 1_246_947 | $0.0000016580 | $1.65             | <font color="green">-6_387</font>  |
| 4   | getRejectionMessage                | 2_854_376    | 1_731_750 | $0.0000023027 | $2.30             | <font color="red">+61_654</font>   |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name                        | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | getRejectionCodeNoError            | 1_723_912    | 1_279_564 | $0.0000017014 | $1.70             |
| 1   | getRejectionCodeDestinationInvalid | 1_644_398    | 1_247_759 | $0.0000016591 | $1.65             |
| 2   | getRejectionCodeCanisterReject     | 2_061_807    | 1_414_722 | $0.0000018811 | $1.88             |
| 3   | getRejectionCodeCanisterError      | 1_648_755    | 1_249_502 | $0.0000016614 | $1.66             |
| 4   | getRejectionMessage                | 2_792_722    | 1_707_088 | $0.0000022699 | $2.26             |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
