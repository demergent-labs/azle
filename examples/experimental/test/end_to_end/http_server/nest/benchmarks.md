# Benchmarks for api

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init                | 11_842_788_246 | 9_137_705_298 | $0.0121501326 | $12_150.13        | <font color="red">+3_064_759</font> |
| 1   | http_request_update | 44_529_788     | 18_401_915    | $0.0000244685 | $24.46            | <font color="red">+45_081</font>    |
| 2   | http_request_update | 44_342_166     | 18_326_866    | $0.0000243687 | $24.36            | <font color="green">-25_859</font>  |
| 3   | http_request_update | 43_460_103     | 17_974_041    | $0.0000238995 | $23.89            | <font color="red">+30_500</font>    |
| 4   | http_request_update | 53_143_542     | 21_847_416    | $0.0000290499 | $29.04            | <font color="green">-2_005</font>   |
| 5   | http_request_update | 45_057_298     | 18_612_919    | $0.0000247490 | $24.74            | <font color="green">-31_170</font>  |
| 6   | http_request_update | 44_941_075     | 18_566_430    | $0.0000246872 | $24.68            | <font color="green">-48_096</font>  |
| 7   | http_request_update | 44_143_192     | 18_247_276    | $0.0000242629 | $24.26            | <font color="green">-214</font>     |
| 8   | http_request_update | 47_407_627     | 19_553_050    | $0.0000259991 | $25.99            | <font color="green">-4_469</font>   |
| 9   | http_request_update | 44_820_152     | 18_518_060    | $0.0000246229 | $24.62            | <font color="green">-5_331</font>   |
| 10  | http_request_update | 44_784_203     | 18_503_681    | $0.0000246038 | $24.60            | <font color="red">+57_316</font>    |
| 11  | http_request_update | 43_934_356     | 18_163_742    | $0.0000241518 | $24.15            | <font color="red">+26_567</font>    |
| 12  | http_request_update | 47_202_919     | 19_471_167    | $0.0000258902 | $25.89            | <font color="green">-3_701</font>   |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 11_839_723_487 | 9_136_479_394 | $0.0121485026 | $12_148.50        |
| 1   | http_request_update | 44_484_707     | 18_383_882    | $0.0000244445 | $24.44            |
| 2   | http_request_update | 44_368_025     | 18_337_210    | $0.0000243824 | $24.38            |
| 3   | http_request_update | 43_429_603     | 17_961_841    | $0.0000238833 | $23.88            |
| 4   | http_request_update | 53_145_547     | 21_848_218    | $0.0000290509 | $29.05            |
| 5   | http_request_update | 45_088_468     | 18_625_387    | $0.0000247656 | $24.76            |
| 6   | http_request_update | 44_989_171     | 18_585_668    | $0.0000247128 | $24.71            |
| 7   | http_request_update | 44_143_406     | 18_247_362    | $0.0000242630 | $24.26            |
| 8   | http_request_update | 47_412_096     | 19_554_838    | $0.0000260015 | $26.00            |
| 9   | http_request_update | 44_825_483     | 18_520_193    | $0.0000246257 | $24.62            |
| 10  | http_request_update | 44_726_887     | 18_480_754    | $0.0000245733 | $24.57            |
| 11  | http_request_update | 43_907_789     | 18_153_115    | $0.0000241377 | $24.13            |
| 12  | http_request_update | 47_206_620     | 19_472_648    | $0.0000258922 | $25.89            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
