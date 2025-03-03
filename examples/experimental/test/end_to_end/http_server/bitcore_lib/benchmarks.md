# Benchmarks for bitcore_lib

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 9_392_411_742  | 7_357_554_696  | $0.0097831198 | $9_783.11         | <font color="red">+52_287</font>      |
| 1   | http_request_update | 1_101_618_257  | 841_237_302    | $0.0011185680 | $1_118.56         | <font color="red">+219_898</font>     |
| 2   | http_request_update | 11_469_489_983 | 8_988_385_993  | $0.0119515872 | $11_951.58        | <font color="red">+23_112_720</font>  |
| 3   | http_request_update | 13_953_938_770 | 10_782_165_508 | $0.0143367220 | $14_336.72        | <font color="red">+151_489_650</font> |
| 4   | http_request_update | 12_501_375_674 | 9_801_140_269  | $0.0130322822 | $13_032.28        | <font color="red">+40_757_043</font>  |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- |
| 0   | init                | 9_392_359_455  | 7_357_533_782  | $0.0097830919 | $9_783.09         |
| 1   | http_request_update | 1_101_398_359  | 841_149_343    | $0.0011184510 | $1_118.45         |
| 2   | http_request_update | 11_446_377_263 | 8_979_140_905  | $0.0119392943 | $11_939.29        |
| 3   | http_request_update | 13_802_449_120 | 10_721_569_648 | $0.0142561495 | $14_256.14        |
| 4   | http_request_update | 12_460_618_631 | 9_784_837_452  | $0.0130106048 | $13_010.60        |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
