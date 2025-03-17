⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for server

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init                | 7_526_488_968 | 5_811_185_587 | $0.0077269591 | $7_726.95         | <font color="red">+4_476_060</font> |
| 1   | http_request_update | 173_304_741   | 69_911_896    | $0.0000929598 | $92.95            | <font color="green">-134_534</font> |
| 2   | http_request_update | 174_059_936   | 70_213_974    | $0.0000933614 | $93.36            | <font color="green">-87_746</font>  |
| 3   | http_request_update | 213_109_779   | 85_833_911    | $0.0001141308 | $114.13           | <font color="green">-63_215</font>  |
| 4   | http_request_update | 213_093_580   | 85_827_432    | $0.0001141222 | $114.12           | <font color="green">-15_874</font>  |
| 5   | http_request_update | 2_343_445_078 | 1_737_968_031 | $0.0023109240 | $2_310.92         | <font color="green">-594_775</font> |
| 6   | http_request_update | 213_335_646   | 85_924_258    | $0.0001142509 | $114.25           | <font color="red">+82_401</font>    |
| 7   | http_request_update | 193_750_869   | 78_090_347    | $0.0001038344 | $103.83           | <font color="green">-82_771</font>  |
| 8   | http_request_update | 212_790_168   | 85_706_067    | $0.0001139608 | $113.96           | <font color="red">+15_069</font>    |
| 9   | http_request_update | 212_852_756   | 85_731_102    | $0.0001139941 | $113.99           | <font color="green">-117_606</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_522_012_908 | 5_809_395_163 | $0.0077245785 | $7_724.57         |
| 1   | http_request_update | 173_439_275   | 69_965_710    | $0.0000930313 | $93.03            |
| 2   | http_request_update | 174_147_682   | 70_249_072    | $0.0000934081 | $93.40            |
| 3   | http_request_update | 213_172_994   | 85_859_197    | $0.0001141644 | $114.16           |
| 4   | http_request_update | 213_109_454   | 85_833_781    | $0.0001141306 | $114.13           |
| 5   | http_request_update | 2_344_039_853 | 1_738_205_941 | $0.0023112403 | $2_311.24         |
| 6   | http_request_update | 213_253_245   | 85_891_298    | $0.0001142071 | $114.20           |
| 7   | http_request_update | 193_833_640   | 78_123_456    | $0.0001038784 | $103.87           |
| 8   | http_request_update | 212_775_099   | 85_700_039    | $0.0001139528 | $113.95           |
| 9   | http_request_update | 212_970_362   | 85_778_144    | $0.0001140566 | $114.05           |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
