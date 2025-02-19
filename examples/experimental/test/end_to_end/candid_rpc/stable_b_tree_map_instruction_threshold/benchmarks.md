# Benchmarks for stable_b_tree_map_instruction_threshold

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name        | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                |
| --- | ------------------ | -------------- | -------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | insertSmallRecord  | 18_052_998_946 | 14_421_789_578 | $0.0191762209 | $19_176.22        | <font color="red">+108_515_699</font> |
| 1   | insertMediumRecord | 16_174_321_160 | 12_870_318_464 | $0.0171132764 | $17_113.27        | <font color="red">+58_430_992</font>  |
| 2   | insertLargeRecord  | 18_559_702_707 | 14_624_471_082 | $0.0194457205 | $19_445.72        | <font color="red">+70_272_696</font>  |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name        | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------ | -------------- | -------------- | ------------- | ----------------- |
| 0   | insertSmallRecord  | 17_944_483_247 | 13_978_383_298 | $0.0185866369 | $18_586.63        |
| 1   | insertMediumRecord | 16_115_890_168 | 12_846_946_067 | $0.0170821988 | $17_082.19        |
| 2   | insertLargeRecord  | 18_489_430_011 | 14_596_362_004 | $0.0194083447 | $19_408.34        |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
