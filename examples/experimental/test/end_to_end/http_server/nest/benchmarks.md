# Benchmarks for api

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls | Change                               |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | init                | 11_924_072_065 | 9_170_218_826 | $0.0121933649 | $12_193.36        | <font color="red">+83_419_564</font> |
| 1   | http_request_update | 44_548_543     | 18_409_417    | $0.0000244784 | $24.47            | <font color="red">+39_158</font>     |
| 2   | http_request_update | 44_398_754     | 18_349_501    | $0.0000243988 | $24.39            | <font color="red">+13_245</font>     |
| 3   | http_request_update | 43_490_385     | 17_986_154    | $0.0000239156 | $23.91            | <font color="red">+5_422</font>      |
| 4   | http_request_update | 53_161_996     | 21_854_798    | $0.0000290597 | $29.05            | <font color="green">-18_053</font>   |
| 5   | http_request_update | 45_099_306     | 18_629_722    | $0.0000247714 | $24.77            | <font color="red">+25_119</font>     |
| 6   | http_request_update | 44_995_638     | 18_588_255    | $0.0000247162 | $24.71            | <font color="red">+1_585</font>      |
| 7   | http_request_update | 44_196_618     | 18_268_647    | $0.0000242913 | $24.29            | <font color="red">+34_365</font>     |
| 8   | http_request_update | 47_463_062     | 19_575_224    | $0.0000260286 | $26.02            | <font color="red">+9_680</font>      |
| 9   | http_request_update | 44_931_070     | 18_562_428    | $0.0000246819 | $24.68            | <font color="red">+55_743</font>     |
| 10  | http_request_update | 44_781_524     | 18_502_609    | $0.0000246024 | $24.60            | <font color="red">+23_131</font>     |
| 11  | http_request_update | 43_974_248     | 18_179_699    | $0.0000241730 | $24.17            | <font color="red">+49_660</font>     |
| 12  | http_request_update | 47_199_511     | 19_469_804    | $0.0000258884 | $25.88            | <font color="red">+26_204</font>     |

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
