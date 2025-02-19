⚠️ **WARNING: Benchmark process failed for version 0.26.0**

# Benchmarks for backend

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                  |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | --------------------------------------- |
| 0   | init                | 7_528_990_612 | 5_812_186_244 | $0.0077282897 | $7_728.28         | <font color="green">-754_312_344</font> |
| 1   | http_request_update | 55_418_371    | 22_757_348    | $0.0000302598 | $30.25            | <font color="green">-746_711</font>     |
| 2   | http_request_update | 48_866_599    | 20_136_639    | $0.0000267751 | $26.77            | <font color="green">-772_286</font>     |
| 3   | http_request_update | 49_205_965    | 20_272_386    | $0.0000269556 | $26.95            | <font color="green">-762_805</font>     |
| 4   | http_request_update | 48_876_027    | 20_140_410    | $0.0000267801 | $26.78            | <font color="green">-828_780</font>     |
| 5   | http_request_update | 49_059_341    | 20_213_736    | $0.0000268776 | $26.87            | <font color="green">-837_321</font>     |
| 6   | http_request_update | 46_839_802    | 19_325_920    | $0.0000256971 | $25.69            | <font color="green">-824_987</font>     |
| 7   | http_request_update | 37_414_501    | 15_555_800    | $0.0000206841 | $20.68            | <font color="green">-644_180</font>     |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 8_283_302_956 | 6_513_911_182 | $0.0086613523 | $8_661.35         |
| 1   | http_request_update | 56_165_082    | 23_056_032    | $0.0000306569 | $30.65            |
| 2   | http_request_update | 49_638_885    | 20_445_554    | $0.0000271858 | $27.18            |
| 3   | http_request_update | 49_968_770    | 20_577_508    | $0.0000273613 | $27.36            |
| 4   | http_request_update | 49_704_807    | 20_471_922    | $0.0000272209 | $27.22            |
| 5   | http_request_update | 49_896_662    | 20_548_664    | $0.0000273229 | $27.32            |
| 6   | http_request_update | 47_664_789    | 19_655_915    | $0.0000261359 | $26.13            |
| 7   | http_request_update | 38_058_681    | 15_813_472    | $0.0000210267 | $21.02            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
