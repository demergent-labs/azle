⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for api

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init                | 11_846_978_519 | 9_139_381_407 | $0.0121523613 | $12_152.36        | <font color="red">+6_326_018</font> |
| 1   | http_request_update | 44_550_227     | 18_410_090    | $0.0000244793 | $24.47            | <font color="red">+40_842</font>    |
| 2   | http_request_update | 44_374_096     | 18_339_638    | $0.0000243857 | $24.38            | <font color="green">-11_413</font>  |
| 3   | http_request_update | 43_488_946     | 17_985_578    | $0.0000239149 | $23.91            | <font color="red">+3_983</font>     |
| 4   | http_request_update | 53_182_458     | 21_862_983    | $0.0000290706 | $29.07            | <font color="red">+2_409</font>     |
| 5   | http_request_update | 45_069_482     | 18_617_792    | $0.0000247555 | $24.75            | <font color="green">-4_705</font>   |
| 6   | http_request_update | 44_993_184     | 18_587_273    | $0.0000247149 | $24.71            | <font color="green">-869</font>     |
| 7   | http_request_update | 44_142_357     | 18_246_942    | $0.0000242624 | $24.26            | <font color="green">-19_896</font>  |
| 8   | http_request_update | 47_382_616     | 19_543_046    | $0.0000259858 | $25.98            | <font color="green">-70_766</font>  |
| 9   | http_request_update | 44_872_331     | 18_538_932    | $0.0000246507 | $24.65            | <font color="green">-2_996</font>   |
| 10  | http_request_update | 44_769_269     | 18_497_707    | $0.0000245958 | $24.59            | <font color="red">+10_876</font>    |
| 11  | http_request_update | 43_918_946     | 18_157_578    | $0.0000241436 | $24.14            | <font color="green">-5_642</font>   |
| 12  | http_request_update | 47_150_762     | 19_450_304    | $0.0000258625 | $25.86            | <font color="green">-22_545</font>  |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 11_840_652_501 | 9_136_851_000 | $0.0121489967 | $12_148.99        |
| 1   | http_request_update | 44_509_385     | 18_393_754    | $0.0000244576 | $24.45            |
| 2   | http_request_update | 44_385_509     | 18_344_203    | $0.0000243917 | $24.39            |
| 3   | http_request_update | 43_484_963     | 17_983_985    | $0.0000239128 | $23.91            |
| 4   | http_request_update | 53_180_049     | 21_862_019    | $0.0000290693 | $29.06            |
| 5   | http_request_update | 45_074_187     | 18_619_674    | $0.0000247580 | $24.75            |
| 6   | http_request_update | 44_994_053     | 18_587_621    | $0.0000247154 | $24.71            |
| 7   | http_request_update | 44_162_253     | 18_254_901    | $0.0000242730 | $24.27            |
| 8   | http_request_update | 47_453_382     | 19_571_352    | $0.0000260234 | $26.02            |
| 9   | http_request_update | 44_875_327     | 18_540_130    | $0.0000246523 | $24.65            |
| 10  | http_request_update | 44_758_393     | 18_493_357    | $0.0000245901 | $24.59            |
| 11  | http_request_update | 43_924_588     | 18_159_835    | $0.0000241466 | $24.14            |
| 12  | http_request_update | 47_173_307     | 19_459_322    | $0.0000258745 | $25.87            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
