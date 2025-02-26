# Benchmarks for stable_b_tree_map_instruction_threshold

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name        | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                |
| --- | ------------------ | -------------- | -------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | insertSmallRecord  | 20_309_296_395 | 16_124_308_558 | $0.0214400094 | $21_440.00        | <font color="red">+538_444_368</font> |
| 1   | insertMediumRecord | 18_383_862_808 | 14_554_135_123 | $0.0193521968 | $19_352.19        | <font color="red">+268_409_276</font> |
| 2   | insertLargeRecord  | 20_998_586_677 | 16_400_024_670 | $0.0218066208 | $21_806.62        | <font color="red">+102_309_915</font> |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name        | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------ | -------------- | -------------- | ------------- | ----------------- |
| 0   | insertSmallRecord  | 19_770_852_027 | 15_508_930_810 | $0.0206217600 | $20_621.76        |
| 1   | insertMediumRecord | 18_115_453_532 | 14_446_771_412 | $0.0192094385 | $19_209.43        |
| 2   | insertLargeRecord  | 20_896_276_762 | 16_359_100_704 | $0.0217522054 | $21_752.20        |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
