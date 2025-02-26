# Benchmarks for bitcore_lib

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                    |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | ----------------------------------------- |
| 0   | init                | 9_392_359_455  | 7_357_533_782  | $0.0097830919 | $9_783.09         | <font color="green">-7_747_364</font>     |
| 1   | http_request_update | 1_101_398_359  | 841_149_343    | $0.0011184510 | $1_118.45         | <font color="green">-6_247_895</font>     |
| 2   | http_request_update | 11_446_377_263 | 8_979_140_905  | $0.0119392943 | $11_939.29        | <font color="red">+4_784_042_587</font>   |
| 3   | http_request_update | 13_802_449_120 | 10_721_569_648 | $0.0142561495 | $14_256.14        | <font color="green">-4_766_221_293</font> |
| 4   | http_request_update | 12_460_618_631 | 9_784_837_452  | $0.0130106048 | $13_010.60        | <font color="green">-5_059_800_511</font> |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- |
| 0   | init                | 9_400_106_819  | 7_360_632_727  | $0.0097872125 | $9_787.21         |
| 1   | http_request_update | 1_107_646_254  | 843_648_501    | $0.0011217741 | $1_121.77         |
| 2   | http_request_update | 6_662_334_676  | 5_065_523_870  | $0.0067354751 | $6_735.47         |
| 3   | http_request_update | 18_568_670_413 | 14_628_058_165 | $0.0194504901 | $19_450.49        |
| 4   | http_request_update | 17_520_419_142 | 13_808_757_656 | $0.0183610908 | $18_361.09        |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
