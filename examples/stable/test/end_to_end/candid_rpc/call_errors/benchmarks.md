# Benchmarks for call_errors

## Current benchmarks Azle version: 0.33.0

| Id  | Method Name | Instructions | Cycles      | USD           | USD/Million Calls | Change                                 |
| --- | ----------- | ------------ | ----------- | ------------- | ----------------- | -------------------------------------- |
| 0   | test0       | 493_629_971  | 498_629_971 | $0.0006831231 | $683.12           | <font color="green">-77_080_167</font> |
| 1   | test1       | 829_795      | 5_829_795   | $0.0000079868 | $7.98             | <font color="green">-53_416</font>     |
| 2   | test2       | 1_189_292    | 6_189_292   | $0.0000084793 | $8.47             | <font color="green">-65_369</font>     |
| 3   | test3       | 8_293_473    | 13_293_473  | $0.0000182121 | $18.21            | <font color="green">-389_505</font>    |
| 4   | test4       | 394_336_745  | 399_336_745 | $0.0005470913 | $547.09           | <font color="green">-17_150_590</font> |
| 5   | test5       | 8_188_138    | 13_188_138  | $0.0000180677 | $18.06            | <font color="green">-345_512</font>    |

## Baseline benchmarks Azle version: 0.32.0

| Id  | Method Name | Instructions | Cycles      | USD           | USD/Million Calls |
| --- | ----------- | ------------ | ----------- | ------------- | ----------------- |
| 0   | test0       | 570_710_138  | 575_710_138 | $0.0007887229 | $788.72           |
| 1   | test1       | 883_211      | 5_883_211   | $0.0000080600 | $8.05             |
| 2   | test2       | 1_254_661    | 6_254_661   | $0.0000085689 | $8.56             |
| 3   | test3       | 8_682_978    | 13_682_978  | $0.0000187457 | $18.74            |
| 4   | test4       | 411_487_335  | 416_487_335 | $0.0005705876 | $570.58           |
| 5   | test5       | 8_533_650    | 13_533_650  | $0.0000185411 | $18.54            |

---

**Note on calculations:**

- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).
