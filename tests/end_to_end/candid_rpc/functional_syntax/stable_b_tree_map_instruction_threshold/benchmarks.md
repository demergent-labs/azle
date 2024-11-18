# Benchmarks for stable_b_tree_map_instruction_threshold

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name        | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                 |
| --- | ------------------ | -------------- | -------------- | ------------- | ----------------- | -------------------------------------- |
| 0   | insertSmallRecord  | 17_859_164_913 | 13_944_255_965 | $0.0185412588 | $18_541.25        | <font color="green">-35_769_704</font> |
| 1   | insertMediumRecord | 16_061_093_006 | 12_825_027_202 | $0.0170530539 | $17_053.05        | <font color="green">-11_275_194</font> |
| 2   | insertLargeRecord  | 18_414_239_823 | 14_566_285_929 | $0.0193683534 | $19_368.35        | <font color="green">-8_274_862</font>  |

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
