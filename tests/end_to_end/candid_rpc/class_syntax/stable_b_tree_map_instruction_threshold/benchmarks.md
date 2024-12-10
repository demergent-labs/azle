# Benchmarks for stable_b_tree_map_instruction_threshold

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name        | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                |
| --- | ------------------ | -------------- | -------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | insertSmallRecord  | 17_999_486_811 | 14_000_384_724 | $0.0186158916 | $18_615.89        | <font color="red">+645_461_178</font> |
| 1   | insertMediumRecord | 16_465_835_084 | 12_986_924_033 | $0.0172683233 | $17_268.32        | <font color="red">+645_855_047</font> |
| 2   | insertLargeRecord  | 19_041_624_426 | 15_217_239_770 | $0.0202339072 | $20_233.90        | <font color="red">+815_416_493</font> |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name        | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------ | -------------- | -------------- | ------------- | ----------------- |
| 0   | insertSmallRecord  | 17_354_025_633 | 13_742_200_253 | $0.0182725914 | $18_272.59        |
| 1   | insertMediumRecord | 15_819_980_037 | 12_328_582_014 | $0.0163929456 | $16_392.94        |
| 2   | insertLargeRecord  | 18_226_207_933 | 14_491_073_173 | $0.0192683453 | $19_268.34        |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
