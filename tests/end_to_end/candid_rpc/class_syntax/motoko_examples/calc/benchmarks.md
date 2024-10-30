# Benchmarks for calc

## Current benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | add         | 1_277_852    | 1_101_140 | $0.0000014642 | $1.46             |
| 1   | sub         | 1_233_924    | 1_083_569 | $0.0000014408 | $1.44             |
| 2   | mul         | 1_233_454    | 1_083_381 | $0.0000014405 | $1.44             |
| 3   | div         | 1_566_663    | 1_216_665 | $0.0000016178 | $1.61             |
| 4   | clearall    | 878_625      | 941_450   | $0.0000012518 | $1.25             |
| 5   | add         | 1_230_326    | 1_082_130 | $0.0000014389 | $1.43             |

## Baseline benchmarks Azle version: No previous benchmarks

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
