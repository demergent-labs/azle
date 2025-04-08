# Benchmarks for bitcore_lib

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                  |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | --------------------------------------- |
| 0   | init                | 9_469_251_275  | 7_388_290_510  | $0.0098239882 | $9_823.98         | <font color="red">+77_098_023</font>    |
| 1   | http_request_update | 1_106_041_367  | 843_006_546    | $0.0011209205 | $1_120.92         | <font color="red">+4_675_850</font>     |
| 2   | http_request_update | 11_538_400_437 | 9_015_950_174  | $0.0119882385 | $11_988.23        | <font color="red">+4_870_919_443</font> |
| 3   | http_request_update | 14_059_348_710 | 11_224_329_484 | $0.0149246542 | $14_924.65        | <font color="red">+272_026_397</font>   |
| 4   | http_request_update | 12_546_315_832 | 9_819_116_332  | $0.0130561844 | $13_056.18        | <font color="red">+122_727_714</font>   |

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
