# Benchmarks for bitcore_lib

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                    |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | ----------------------------------------- |
| 0   | init                | 8_726_121_408  | 6_691_038_563  | $0.0088968732 | $8_896.87         | <font color="green">-671_047_129</font>   |
| 1   | http_request_update | 1_106_227_164  | 843_080_865    | $0.0011210193 | $1_121.01         | <font color="red">+5_480_586</font>       |
| 2   | http_request_update | 6_623_980_202  | 5_050_182_080  | $0.0067150756 | $6_715.07         | <font color="green">-4_809_119_429</font> |
| 3   | http_request_update | 18_923_717_117 | 14_770_076_846 | $0.0196393281 | $19_639.32        | <font color="red">+7_300_173_480</font>   |
| 4   | http_request_update | 17_425_957_891 | 13_770_973_156 | $0.0183108499 | $18_310.84        | <font color="red">+238_877_226</font>     |

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
