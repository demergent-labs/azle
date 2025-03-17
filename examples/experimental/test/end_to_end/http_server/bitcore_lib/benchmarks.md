⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for bitcore_lib

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                    |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | ----------------------------------------- |
| 0   | init                | 9_397_168_537  | 7_359_457_414  | $0.0097856497 | $9_785.64         | <font color="red">+5_015_285</font>       |
| 1   | http_request_update | 1_100_746_578  | 840_888_631    | $0.0011181044 | $1_118.10         | <font color="green">-618_939</font>       |
| 2   | http_request_update | 11_433_099_631 | 8_973_829_852  | $0.0119322323 | $11_932.23        | <font color="red">+4_765_618_637</font>   |
| 3   | http_request_update | 11_623_543_637 | 9_050_007_454  | $0.0120335234 | $12_033.52        | <font color="green">-2_163_778_676</font> |
| 4   | http_request_update | 17_187_080_665 | 13_675_422_266 | $0.0181837987 | $18_183.79        | <font color="red">+4_763_492_547</font>   |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- |
| 0   | init                | 9_392_153_252  | 7_357_451_300  | $0.0097829823 | $9_782.98         |
| 1   | http_request_update | 1_101_365_517  | 841_136_206    | $0.0011184336 | $1_118.43         |
| 2   | http_request_update | 6_667_480_994  | 5_067_582_397  | $0.0067382123 | $6_738.21         |
| 3   | http_request_update | 13_787_322_313 | 10_715_518_925 | $0.0142481040 | $14_248.10        |
| 4   | http_request_update | 12_423_588_118 | 9_770_025_247  | $0.0129909095 | $12_990.90        |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
