# Benchmarks for rejections

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name                        | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ---------------------------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | getRejectionCodeNoError            | 1_870_652    | 1_338_260 | $0.0000017794 | $1.77             | <font color="red">+177_676</font> |
| 1   | getRejectionCodeDestinationInvalid | 1_796_162    | 1_308_464 | $0.0000017398 | $1.73             | <font color="red">+158_848</font> |
| 2   | getRejectionCodeCanisterReject     | 2_250_114    | 1_490_045 | $0.0000019813 | $1.98             | <font color="red">+191_966</font> |
| 3   | getRejectionCodeCanisterError      | 1_804_271    | 1_311_708 | $0.0000017441 | $1.74             | <font color="red">+161_972</font> |
| 4   | getRejectionMessage                | 3_077_402    | 1_820_960 | $0.0000024213 | $2.42             | <font color="red">+222_934</font> |

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
