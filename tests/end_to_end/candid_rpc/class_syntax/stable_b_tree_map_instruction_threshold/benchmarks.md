# Benchmarks for stable_b_tree_map_instruction_threshold

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name        | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                |
| --- | ------------------ | -------------- | -------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | insertSmallRecord  | 18_020_437_279 | 14_408_764_911 | $0.0191589024 | $19_158.90        | <font color="red">+666_411_646</font> |
| 1   | insertMediumRecord | 16_486_255_062 | 12_995_092_024 | $0.0172791840 | $17_279.18        | <font color="red">+666_275_025</font> |
| 2   | insertLargeRecord  | 19_062_272_346 | 15_225_498_938 | $0.0202448892 | $20_244.88        | <font color="red">+836_064_413</font> |

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
