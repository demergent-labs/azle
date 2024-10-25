# Benchmarks for rejections

## Current benchmarks Azle version: 0.24.2-rc.60

| Id  | Method Name                        | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | getRejectionCodeNoError            | 1_720_830    | 1_278_332 | $0.0000016998 | $1.69             |
| 1   | getRejectionCodeDestinationInvalid | 1_642_468    | 1_246_987 | $0.0000016581 | $1.65             |
| 2   | getRejectionCodeCanisterReject     | 2_061_094    | 1_414_437 | $0.0000018807 | $1.88             |
| 3   | getRejectionCodeCanisterError      | 1_647_733    | 1_249_093 | $0.0000016609 | $1.66             |
| 4   | getRejectionMessage                | 2_792_215    | 1_706_886 | $0.0000022696 | $2.26             |

## Baseline benchmarks Azle version: 0.24.2-rc.60

No benchmarks reported

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
