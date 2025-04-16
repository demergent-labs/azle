# Benchmarks for bitcore_lib

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                  |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | --------------------------------------- |
| 0   | init                | 9_471_533_256  | 7_389_203_302  | $0.0098252020 | $9_825.20         | <font color="red">+74_364_719</font>    |
| 1   | http_request_update | 1_108_372_790  | 843_939_116    | $0.0011221605 | $1_122.16         | <font color="red">+7_626_212</font>     |
| 2   | http_request_update | 11_693_299_525 | 9_077_909_810  | $0.0120706243 | $12_070.62        | <font color="red">+260_199_894</font>   |
| 3   | http_request_update | 18_755_637_179 | 14_702_844_871 | $0.0195499317 | $19_549.93        | <font color="red">+7_132_093_542</font> |
| 4   | http_request_update | 17_336_036_910 | 13_735_004_764 | $0.0182630238 | $18_263.02        | <font color="red">+148_956_245</font>   |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- |
| 0   | init                | 9_397_168_537  | 7_359_457_414  | $0.0097856497 | $9_785.64         |
| 1   | http_request_update | 1_100_746_578  | 840_888_631    | $0.0011181044 | $1_118.10         |
| 2   | http_request_update | 11_433_099_631 | 8_973_829_852  | $0.0119322323 | $11_932.23        |
| 3   | http_request_update | 11_623_543_637 | 9_050_007_454  | $0.0120335234 | $12_033.52        |
| 4   | http_request_update | 17_187_080_665 | 13_675_422_266 | $0.0181837987 | $18_183.79        |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
