# Benchmarks for bitcore_lib

## Current benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                    |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | ----------------------------------------- |
| 0   | init                | 9_392_153_252  | 7_357_451_300  | $0.0097829823 | $9_782.98         | <font color="green">-258_490</font>       |
| 1   | http_request_update | 1_101_365_517  | 841_136_206    | $0.0011184336 | $1_118.43         | <font color="green">-252_740</font>       |
| 2   | http_request_update | 6_667_480_994  | 5_067_582_397  | $0.0067382123 | $6_738.21         | <font color="green">-4_802_008_989</font> |
| 3   | http_request_update | 13_787_322_313 | 10_715_518_925 | $0.0142481040 | $14_248.10        | <font color="green">-166_616_457</font>   |
| 4   | http_request_update | 12_423_588_118 | 9_770_025_247  | $0.0129909095 | $12_990.90        | <font color="green">-77_787_556</font>    |

## Baseline benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- |
| 0   | init                | 9_392_411_742  | 7_357_554_696  | $0.0097831198 | $9_783.11         |
| 1   | http_request_update | 1_101_618_257  | 841_237_302    | $0.0011185680 | $1_118.56         |
| 2   | http_request_update | 11_469_489_983 | 8_988_385_993  | $0.0119515872 | $11_951.58        |
| 3   | http_request_update | 13_953_938_770 | 10_782_165_508 | $0.0143367220 | $14_336.72        |
| 4   | http_request_update | 12_501_375_674 | 9_801_140_269  | $0.0130322822 | $13_032.28        |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
