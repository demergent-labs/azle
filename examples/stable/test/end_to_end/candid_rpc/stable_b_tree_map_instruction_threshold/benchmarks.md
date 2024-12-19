# Benchmarks for stable_b_tree_map_instruction_threshold

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name        | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                |
| --- | ------------------ | -------------- | -------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | insertSmallRecord  | 18_016_474_418 | 14_407_179_767 | $0.0191567947 | $19_156.79        | <font color="red">+662_448_785</font> |
| 1   | insertMediumRecord | 16_469_513_162 | 12_988_395_264 | $0.0172702795 | $17_270.27        | <font color="red">+649_533_125</font> |
| 2   | insertLargeRecord  | 19_037_581_805 | 15_215_622_722 | $0.0202317571 | $20_231.75        | <font color="red">+811_373_872</font> |

## Baseline benchmarks Azle version: 0.25.0-alpha

| Id  | Method Name        | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------ | -------------- | -------------- | ------------- | ----------------- |
| 0   | insertSmallRecord  | 17_354_025_633 | 13_742_200_253 | $0.0182725914 | $18_272.59        |
| 1   | insertMediumRecord | 15_819_980_037 | 12_328_582_014 | $0.0163929456 | $16_392.94        |
| 2   | insertLargeRecord  | 18_226_207_933 | 14_491_073_173 | $0.0192683453 | $19_268.34        |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
