# Benchmarks for stable_b_tree_map_instruction_threshold

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name        | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                 |
| --- | ------------------ | -------------- | -------------- | ------------- | ----------------- | -------------------------------------- |
| 0   | insertSmallRecord  | 20_315_664_922 | 16_126_855_968 | $0.0214433966 | $21_443.39        | <font color="red">+6_368_527</font>    |
| 1   | insertMediumRecord | 18_369_406_356 | 14_548_352_542 | $0.0193445079 | $19_344.50        | <font color="green">-14_456_452</font> |
| 2   | insertLargeRecord  | 21_003_608_874 | 16_802_033_549 | $0.0223411599 | $22_341.15        | <font color="red">+5_022_197</font>    |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name        | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------ | -------------- | -------------- | ------------- | ----------------- |
| 0   | insertSmallRecord  | 20_309_296_395 | 16_124_308_558 | $0.0214400094 | $21_440.00        |
| 1   | insertMediumRecord | 18_383_862_808 | 14_554_135_123 | $0.0193521968 | $19_352.19        |
| 2   | insertLargeRecord  | 20_998_586_677 | 16_400_024_670 | $0.0218066208 | $21_806.62        |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
