# Benchmarks for calc

## Current benchmarks Azle version: 0.24.2-rc.60

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | add         | 1_278_780    | 1_101_512 | $0.0000014646 | $1.46             |
| 1   | sub         | 1_257_484    | 1_092_993 | $0.0000014533 | $1.45             |
| 2   | mul         | 1_261_191    | 1_094_476 | $0.0000014553 | $1.45             |
| 3   | div         | 1_624_159    | 1_239_663 | $0.0000016483 | $1.64             |
| 4   | clearall    | 853_785      | 931_514   | $0.0000012386 | $1.23             |
| 5   | add         | 1_254_778    | 1_091_911 | $0.0000014519 | $1.45             |

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
