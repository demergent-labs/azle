# Benchmarks for rejections

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name                        | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ---------------------------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | getRejectionCodeNoError            | 1_687_830    | 1_265_132 | $0.0000016822 | $1.68             | <font color="green">-36_082</font> |
| 1   | getRejectionCodeDestinationInvalid | 1_632_916    | 1_243_166 | $0.0000016530 | $1.65             | <font color="green">-11_482</font> |
| 2   | getRejectionCodeCanisterReject     | 2_053_057    | 1_411_222 | $0.0000018765 | $1.87             | <font color="green">-8_750</font>  |
| 3   | getRejectionCodeCanisterError      | 1_637_753    | 1_245_101 | $0.0000016556 | $1.65             | <font color="green">-11_002</font> |
| 4   | getRejectionMessage                | 2_849_067    | 1_729_626 | $0.0000022998 | $2.29             | <font color="red">+56_345</font>   |

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
