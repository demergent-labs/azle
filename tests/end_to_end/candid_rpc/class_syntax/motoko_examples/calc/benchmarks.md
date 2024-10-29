# Benchmarks for calc

## Current benchmarks Azle version: 0.24.2-rc.92

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | add         | 1_272_844    | 1_099_137 | $0.0000014615 | $1.46             |
| 1   | sub         | 1_225_501    | 1_080_200 | $0.0000014363 | $1.43             |
| 2   | mul         | 1_225_031    | 1_080_012 | $0.0000014361 | $1.43             |
| 3   | div         | 1_557_591    | 1_213_036 | $0.0000016129 | $1.61             |
| 4   | clearall    | 874_911      | 939_964   | $0.0000012498 | $1.24             |
| 5   | add         | 1_224_066    | 1_079_626 | $0.0000014355 | $1.43             |

## Baseline benchmarks Azle version: 0.24.2-rc.92

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
