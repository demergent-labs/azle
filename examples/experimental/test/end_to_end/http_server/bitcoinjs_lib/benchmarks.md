# Benchmarks for bitcoinjs_lib

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 48_826_366_536 | 38_731_136_614 | $0.0514996304 | $51_499.63        | <font color="green">-1_613_266</font> |
| 1   | http_request_update | 54_905_137     | 22_552_054     | $0.0000299868 | $29.98            | <font color="red">+5_433</font>       |
| 2   | http_request_update | 939_503_547    | 376_391_418    | $0.0005004764 | $500.47           | <font color="green">-56_523</font>    |
| 3   | http_request_update | 6_822_422_298  | 5_129_558_919  | $0.0068206206 | $6_820.62         | <font color="green">-201_345</font>   |
| 4   | http_request_update | 6_668_838_980  | 5_068_125_592  | $0.0067389346 | $6_738.93         | <font color="red">+426_932</font>     |
| 5   | http_request_update | 12_390_905_646 | 9_756_952_258  | $0.0129735267 | $12_973.52        | <font color="red">+405_031</font>     |
| 6   | http_request_update | 939_359_345    | 376_333_738    | $0.0005003997 | $500.39           | <font color="green">-331_706</font>   |
| 7   | http_request_update | 3_341_420_344  | 2_537_158_137  | $0.0033735831 | $3_373.58         | <font color="red">+321_467</font>     |
| 8   | http_request_update | 11_328_031_881 | 8_931_802_752  | $0.0118763502 | $11_876.35        | <font color="red">+357_182</font>     |
| 9   | http_request_update | 11_334_703_037 | 8_934_471_214  | $0.0118798983 | $11_879.89        | <font color="red">+515_359</font>     |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- |
| 0   | init                | 48_827_979_802 | 38_731_781_920 | $0.0515004885 | $51_500.48        |
| 1   | http_request_update | 54_899_704     | 22_549_881     | $0.0000299839 | $29.98            |
| 2   | http_request_update | 939_560_070    | 376_414_028    | $0.0005005064 | $500.50           |
| 3   | http_request_update | 6_822_623_643  | 5_129_639_457  | $0.0068207277 | $6_820.72         |
| 4   | http_request_update | 6_668_412_048  | 5_067_954_819  | $0.0067387075 | $6_738.70         |
| 5   | http_request_update | 12_390_500_615 | 9_756_790_246  | $0.0129733113 | $12_973.31        |
| 6   | http_request_update | 939_691_051    | 376_466_420    | $0.0005005761 | $500.57           |
| 7   | http_request_update | 3_341_098_877  | 2_537_029_550  | $0.0033734121 | $3_373.41         |
| 8   | http_request_update | 11_327_674_699 | 8_931_659_879  | $0.0118761602 | $11_876.16        |
| 9   | http_request_update | 11_334_187_678 | 8_934_265_071  | $0.0118796242 | $11_879.62        |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
