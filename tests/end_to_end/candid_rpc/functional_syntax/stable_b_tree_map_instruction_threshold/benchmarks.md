# Benchmarks for stable_b_tree_map_instruction_threshold

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name        | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                 |
| --- | ------------------ | -------------- | -------------- | ------------- | ----------------- | -------------------------------------- |
| 0   | insertSmallRecord  | 17_849_638_812 | 13_940_445_524 | $0.0185361922 | $18_536.19        | <font color="green">-45_295_805</font> |
| 1   | insertMediumRecord | 16_064_491_905 | 12_826_386_762 | $0.0170548617 | $17_054.86        | <font color="green">-7_876_295</font>  |
| 2   | insertLargeRecord  | 18_426_067_752 | 14_571_017_100 | $0.0193746443 | $19_374.64        | <font color="red">+3_553_067</font>    |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name        | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------ | -------------- | -------------- | ------------- | ----------------- |
| 0   | insertSmallRecord  | 17_894_934_617 | 13_958_563_846 | $0.0185602836 | $18_560.28        |
| 1   | insertMediumRecord | 16_072_368_200 | 12_829_537_280 | $0.0170590508 | $17_059.05        |
| 2   | insertLargeRecord  | 18_422_514_685 | 14_569_595_874 | $0.0193727545 | $19_372.75        |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
