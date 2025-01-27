# Benchmarks for stable_b_tree_map_instruction_threshold

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name        | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                  |
| --- | ------------------ | -------------- | -------------- | ------------- | ----------------- | --------------------------------------- |
| 0   | insertSmallRecord  | 19_991_010_755 | 15_596_994_302 | $0.0207388554 | $20_738.85        | <font color="red">+1_975_979_799</font> |
| 1   | insertMediumRecord | 18_329_202_474 | 14_532_270_989 | $0.0193231248 | $19_323.12        | <font color="red">+1_847_056_310</font> |
| 2   | insertLargeRecord  | 21_151_782_431 | 16_861_302_972 | $0.0224199687 | $22_419.96        | <font color="red">+2_091_049_551</font> |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name        | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------ | -------------- | -------------- | ------------- | ----------------- |
| 0   | insertSmallRecord  | 18_015_030_956 | 14_406_602_382 | $0.0191560270 | $19_156.02        |
| 1   | insertMediumRecord | 16_482_146_164 | 12_993_448_465 | $0.0172769986 | $17_276.99        |
| 2   | insertLargeRecord  | 19_060_732_880 | 15_224_883_152 | $0.0202440704 | $20_244.07        |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
