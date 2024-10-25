# Benchmarks for calc

## Current benchmarks Azle version: 0.24.2-rc.70

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | add         | 1_273_301    | 1_099_320 | $0.0000014617 | $1.46             |
| 1   | sub         | 1_225_794    | 1_080_317 | $0.0000014365 | $1.43             |
| 2   | mul         | 1_225_324    | 1_080_129 | $0.0000014362 | $1.43             |
| 3   | div         | 1_557_928    | 1_213_171 | $0.0000016131 | $1.61             |
| 4   | clearall    | 875_182      | 940_072   | $0.0000012500 | $1.24             |
| 5   | add         | 1_224_359    | 1_079_743 | $0.0000014357 | $1.43             |

## Baseline benchmarks Azle version: 0.24.2-rc.70

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
