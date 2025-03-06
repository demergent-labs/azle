# Benchmarks for bitcore_lib

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                  |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | --------------------------------------- |
| 0   | init                | 9_392_250_430  | 7_357_490_172  | $0.0097830340 | $9_783.03         | <font color="green">-109_025</font>     |
| 1   | http_request_update | 1_101_330_555  | 841_122_222    | $0.0011184150 | $1_118.41         | <font color="green">-67_804</font>      |
| 2   | http_request_update | 11_619_135_428 | 9_048_244_171  | $0.0120311788 | $12_031.17        | <font color="red">+172_758_165</font>   |
| 3   | http_request_update | 13_875_343_553 | 10_750_727_421 | $0.0142949197 | $14_294.91        | <font color="red">+72_894_433</font>    |
| 4   | http_request_update | 17_293_806_237 | 13_718_112_494 | $0.0182405626 | $18_240.56        | <font color="red">+4_833_187_606</font> |

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
