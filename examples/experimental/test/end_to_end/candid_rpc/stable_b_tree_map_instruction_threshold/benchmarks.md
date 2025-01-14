# Benchmarks for stable_b_tree_map_instruction_threshold

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name        | Instructions   | Cycles         | USD           | USD/Million Calls | Change                               |
| --- | ------------------ | -------------- | -------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | insertSmallRecord  | 17_944_483_247 | 13_978_383_298 | $0.0185866369 | $18_586.63        | <font color="red">+94_844_435</font> |
| 1   | insertMediumRecord | 16_115_890_168 | 12_846_946_067 | $0.0170821988 | $17_082.19        | <font color="red">+51_398_263</font> |
| 2   | insertLargeRecord  | 18_489_430_011 | 14_596_362_004 | $0.0194083447 | $19_408.34        | <font color="red">+63_362_259</font> |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name        | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------ | -------------- | -------------- | ------------- | ----------------- |
| 0   | insertSmallRecord  | 17_849_638_812 | 13_940_445_524 | $0.0185361922 | $18_536.19        |
| 1   | insertMediumRecord | 16_064_491_905 | 12_826_386_762 | $0.0170548617 | $17_054.86        |
| 2   | insertLargeRecord  | 18_426_067_752 | 14_571_017_100 | $0.0193746443 | $19_374.64        |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
