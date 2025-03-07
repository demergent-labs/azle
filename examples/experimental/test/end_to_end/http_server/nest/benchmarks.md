# Benchmarks for api

## Current benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 11_840_652_501 | 9_136_851_000 | $0.0121489967 | $12_148.99        | <font color="green">-2_135_745</font> |
| 1   | http_request_update | 44_509_385     | 18_393_754    | $0.0000244576 | $24.45            | <font color="green">-20_403</font>    |
| 2   | http_request_update | 44_385_509     | 18_344_203    | $0.0000243917 | $24.39            | <font color="red">+43_343</font>      |
| 3   | http_request_update | 43_484_963     | 17_983_985    | $0.0000239128 | $23.91            | <font color="red">+24_860</font>      |
| 4   | http_request_update | 53_180_049     | 21_862_019    | $0.0000290693 | $29.06            | <font color="red">+36_507</font>      |
| 5   | http_request_update | 45_074_187     | 18_619_674    | $0.0000247580 | $24.75            | <font color="red">+16_889</font>      |
| 6   | http_request_update | 44_994_053     | 18_587_621    | $0.0000247154 | $24.71            | <font color="red">+52_978</font>      |
| 7   | http_request_update | 44_162_253     | 18_254_901    | $0.0000242730 | $24.27            | <font color="red">+19_061</font>      |
| 8   | http_request_update | 47_453_382     | 19_571_352    | $0.0000260234 | $26.02            | <font color="red">+45_755</font>      |
| 9   | http_request_update | 44_875_327     | 18_540_130    | $0.0000246523 | $24.65            | <font color="red">+55_175</font>      |
| 10  | http_request_update | 44_758_393     | 18_493_357    | $0.0000245901 | $24.59            | <font color="green">-25_810</font>    |
| 11  | http_request_update | 43_924_588     | 18_159_835    | $0.0000241466 | $24.14            | <font color="green">-9_768</font>     |
| 12  | http_request_update | 47_173_307     | 19_459_322    | $0.0000258745 | $25.87            | <font color="green">-29_612</font>    |

## Baseline benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 11_842_788_246 | 9_137_705_298 | $0.0121501326 | $12_150.13        |
| 1   | http_request_update | 44_529_788     | 18_401_915    | $0.0000244685 | $24.46            |
| 2   | http_request_update | 44_342_166     | 18_326_866    | $0.0000243687 | $24.36            |
| 3   | http_request_update | 43_460_103     | 17_974_041    | $0.0000238995 | $23.89            |
| 4   | http_request_update | 53_143_542     | 21_847_416    | $0.0000290499 | $29.04            |
| 5   | http_request_update | 45_057_298     | 18_612_919    | $0.0000247490 | $24.74            |
| 6   | http_request_update | 44_941_075     | 18_566_430    | $0.0000246872 | $24.68            |
| 7   | http_request_update | 44_143_192     | 18_247_276    | $0.0000242629 | $24.26            |
| 8   | http_request_update | 47_407_627     | 19_553_050    | $0.0000259991 | $25.99            |
| 9   | http_request_update | 44_820_152     | 18_518_060    | $0.0000246229 | $24.62            |
| 10  | http_request_update | 44_784_203     | 18_503_681    | $0.0000246038 | $24.60            |
| 11  | http_request_update | 43_934_356     | 18_163_742    | $0.0000241518 | $24.15            |
| 12  | http_request_update | 47_202_919     | 19_471_167    | $0.0000258902 | $25.89            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
