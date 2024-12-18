# Benchmarks for rejections

## Current benchmarks Azle version: 0.25.1

| Id  | Method Name                        | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ---------------------------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | getRejectionCodeNoError            | 1_681_590    | 1_262_636 | $0.0000016789 | $1.67             | <font color="green">-11_386</font> |
| 1   | getRejectionCodeDestinationInvalid | 1_627_953    | 1_241_181 | $0.0000016504 | $1.65             | <font color="green">-9_361</font>  |
| 2   | getRejectionCodeCanisterReject     | 2_049_069    | 1_409_627 | $0.0000018743 | $1.87             | <font color="green">-9_079</font>  |
| 3   | getRejectionCodeCanisterError      | 1_632_583    | 1_243_033 | $0.0000016528 | $1.65             | <font color="green">-9_716</font>  |
| 4   | getRejectionMessage                | 2_807_701    | 1_713_080 | $0.0000022778 | $2.27             | <font color="green">-46_767</font> |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name                        | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | getRejectionCodeNoError            | 1_692_976    | 1_267_190 | $0.0000016849 | $1.68             |
| 1   | getRejectionCodeDestinationInvalid | 1_637_314    | 1_244_925 | $0.0000016553 | $1.65             |
| 2   | getRejectionCodeCanisterReject     | 2_058_148    | 1_413_259 | $0.0000018792 | $1.87             |
| 3   | getRejectionCodeCanisterError      | 1_642_299    | 1_246_919 | $0.0000016580 | $1.65             |
| 4   | getRejectionMessage                | 2_854_468    | 1_731_787 | $0.0000023027 | $2.30             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
