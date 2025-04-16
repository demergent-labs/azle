# Benchmarks for server

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                               |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | init                | 7_580_020_462 | 5_832_598_184 | $0.0077554308 | $7_755.43         | <font color="red">+53_531_494</font> |
| 1   | http_request_update | 173_359_774   | 69_933_909    | $0.0000929890 | $92.98            | <font color="red">+55_033</font>     |
| 2   | http_request_update | 174_014_967   | 70_195_986    | $0.0000933375 | $93.33            | <font color="green">-44_969</font>   |
| 3   | http_request_update | 214_003_014   | 86_191_205    | $0.0001146059 | $114.60           | <font color="red">+893_235</font>    |
| 4   | http_request_update | 213_877_712   | 86_141_084    | $0.0001145392 | $114.53           | <font color="red">+784_132</font>    |
| 5   | http_request_update | 2_344_786_578 | 1_738_504_631 | $0.0023116375 | $2_311.63         | <font color="red">+1_341_500</font>  |
| 6   | http_request_update | 214_124_859   | 86_239_943    | $0.0001146707 | $114.67           | <font color="red">+789_213</font>    |
| 7   | http_request_update | 193_775_070   | 78_100_028    | $0.0001038473 | $103.84           | <font color="red">+24_201</font>     |
| 8   | http_request_update | 213_526_810   | 86_000_724    | $0.0001143526 | $114.35           | <font color="red">+736_642</font>    |
| 9   | http_request_update | 213_695_457   | 86_068_182    | $0.0001144423 | $114.44           | <font color="red">+842_701</font>    |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_526_488_968 | 5_811_185_587 | $0.0077269591 | $7_726.95         |
| 1   | http_request_update | 173_304_741   | 69_911_896    | $0.0000929598 | $92.95            |
| 2   | http_request_update | 174_059_936   | 70_213_974    | $0.0000933614 | $93.36            |
| 3   | http_request_update | 213_109_779   | 85_833_911    | $0.0001141308 | $114.13           |
| 4   | http_request_update | 213_093_580   | 85_827_432    | $0.0001141222 | $114.12           |
| 5   | http_request_update | 2_343_445_078 | 1_737_968_031 | $0.0023109240 | $2_310.92         |
| 6   | http_request_update | 213_335_646   | 85_924_258    | $0.0001142509 | $114.25           |
| 7   | http_request_update | 193_750_869   | 78_090_347    | $0.0001038344 | $103.83           |
| 8   | http_request_update | 212_790_168   | 85_706_067    | $0.0001139608 | $113.96           |
| 9   | http_request_update | 212_852_756   | 85_731_102    | $0.0001139941 | $113.99           |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
