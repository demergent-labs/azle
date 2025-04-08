# Benchmarks for stable_b_tree_map_instruction_threshold

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name        | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                  |
| --- | ------------------ | -------------- | -------------- | ------------- | ----------------- | --------------------------------------- |
| 0   | insertSmallRecord  | 17_376_830_383 | 13_751_322_153 | $0.0182847205 | $18_284.72        | <font color="green">-436_103_694</font> |
| 1   | insertMediumRecord | 15_801_864_246 | 12_321_335_698 | $0.0163833104 | $16_383.31        | <font color="green">-229_748_575</font> |
| 2   | insertLargeRecord  | 18_358_331_887 | 14_543_922_754 | $0.0193386178 | $19_338.61        | <font color="green">-102_059_902</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name        | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------ | -------------- | -------------- | ------------- | ----------------- |
| 0   | insertSmallRecord  | 17_812_934_077 | 13_925_763_630 | $0.0185166701 | $18_516.67        |
| 1   | insertMediumRecord | 16_031_612_821 | 12_813_235_128 | $0.0170373744 | $17_037.37        |
| 2   | insertLargeRecord  | 18_460_391_789 | 14_584_746_715 | $0.0193929002 | $19_392.90        |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
