# Benchmarks for server

## Current benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                             |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ---------------------------------- |
| 0   | init                | 7_522_012_908 | 5_809_395_163 | $0.0077245785 | $7_724.57         | <font color="red">+317_665</font>  |
| 1   | http_request_update | 173_439_275   | 69_965_710    | $0.0000930313 | $93.03            | <font color="red">+99_076</font>   |
| 2   | http_request_update | 174_147_682   | 70_249_072    | $0.0000934081 | $93.40            | <font color="red">+155_546</font>  |
| 3   | http_request_update | 213_172_994   | 85_859_197    | $0.0001141644 | $114.16           | <font color="green">-10_413</font> |
| 4   | http_request_update | 213_109_454   | 85_833_781    | $0.0001141306 | $114.13           | <font color="red">+215_299</font>  |
| 5   | http_request_update | 2_344_039_853 | 1_738_205_941 | $0.0023112403 | $2_311.24         | <font color="red">+314_102</font>  |
| 6   | http_request_update | 213_253_245   | 85_891_298    | $0.0001142071 | $114.20           | <font color="green">-30_096</font> |
| 7   | http_request_update | 193_833_640   | 78_123_456    | $0.0001038784 | $103.87           | <font color="red">+34_104</font>   |
| 8   | http_request_update | 212_775_099   | 85_700_039    | $0.0001139528 | $113.95           | <font color="green">-8_583</font>  |
| 9   | http_request_update | 212_970_362   | 85_778_144    | $0.0001140566 | $114.05           | <font color="green">-28_298</font> |

## Baseline benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_521_695_243 | 5_809_268_097 | $0.0077244095 | $7_724.40         |
| 1   | http_request_update | 173_340_199   | 69_926_079    | $0.0000929786 | $92.97            |
| 2   | http_request_update | 173_992_136   | 70_186_854    | $0.0000933254 | $93.32            |
| 3   | http_request_update | 213_183_407   | 85_863_362    | $0.0001141699 | $114.16           |
| 4   | http_request_update | 212_894_155   | 85_747_662    | $0.0001140161 | $114.01           |
| 5   | http_request_update | 2_343_725_751 | 1_738_080_300 | $0.0023110732 | $2_311.07         |
| 6   | http_request_update | 213_283_341   | 85_903_336    | $0.0001142231 | $114.22           |
| 7   | http_request_update | 193_799_536   | 78_109_814    | $0.0001038603 | $103.86           |
| 8   | http_request_update | 212_783_682   | 85_703_472    | $0.0001139573 | $113.95           |
| 9   | http_request_update | 212_998_660   | 85_789_464    | $0.0001140717 | $114.07           |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
