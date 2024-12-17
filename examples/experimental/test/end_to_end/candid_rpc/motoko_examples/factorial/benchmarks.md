# Benchmarks for factorial

## Current benchmarks Azle version: 0.25.0-dontmerge

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | fac         | 1_242_404    | 1_086_961 | $0.0000014453 | $1.44             | <font color="green">-8_714</font>  |
| 1   | fac         | 1_248_544    | 1_089_417 | $0.0000014486 | $1.44             | <font color="green">-449</font>    |
| 2   | fac         | 1_708_435    | 1_273_374 | $0.0000016932 | $1.69             | <font color="green">-8_128</font>  |
| 3   | fac         | 2_952_279    | 1_770_911 | $0.0000023547 | $2.35             | <font color="green">-10_049</font> |
| 4   | fac         | 5_533_646    | 2_803_458 | $0.0000037277 | $3.72             | <font color="red">+30_030</font>   |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | fac         | 1_251_118    | 1_090_447 | $0.0000014499 | $1.44             |
| 1   | fac         | 1_248_993    | 1_089_597 | $0.0000014488 | $1.44             |
| 2   | fac         | 1_716_563    | 1_276_625 | $0.0000016975 | $1.69             |
| 3   | fac         | 2_962_328    | 1_774_931 | $0.0000023601 | $2.36             |
| 4   | fac         | 5_503_616    | 2_791_446 | $0.0000037117 | $3.71             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
