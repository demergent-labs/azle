# Benchmarks for stable_b_tree_map_instruction_threshold

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name        | Instructions   | Cycles         | USD           | USD/Million Calls | Change                               |
| --- | ------------------ | -------------- | -------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | insertSmallRecord  | 17_372_666_562 | 13_749_656_624 | $0.0182825059 | $18_282.50        | <font color="red">+1_592_588</font>  |
| 1   | insertMediumRecord | 15_771_149_538 | 12_309_049_815 | $0.0163669743 | $16_366.97        | <font color="red">+10_105_841</font> |
| 2   | insertLargeRecord  | 18_340_613_437 | 14_536_835_374 | $0.0193291939 | $19_329.19        | <font color="red">+7_222_692</font>  |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name        | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------ | -------------- | -------------- | ------------- | ----------------- |
| 0   | insertSmallRecord  | 17_371_073_974 | 13_749_019_589 | $0.0182816589 | $18_281.65        |
| 1   | insertMediumRecord | 15_761_043_697 | 12_305_007_478 | $0.0163615993 | $16_361.59        |
| 2   | insertLargeRecord  | 18_333_390_745 | 14_533_946_298 | $0.0193253524 | $19_325.35        |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
