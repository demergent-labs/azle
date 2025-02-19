# Benchmarks for bitcore_lib

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                    |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | ----------------------------------------- |
| 0   | init                | 9_400_106_819  | 7_360_632_727  | $0.0097872125 | $9_787.21         | <font color="green">-809_305_752</font>   |
| 1   | http_request_update | 1_107_646_254  | 843_648_501    | $0.0011217741 | $1_121.77         | <font color="green">-10_994_818</font>    |
| 2   | http_request_update | 6_662_334_676  | 5_065_523_870  | $0.0067354751 | $6_735.47         | <font color="green">-4_958_902_617</font> |
| 3   | http_request_update | 18_568_670_413 | 14_628_058_165 | $0.0194504901 | $19_450.49        | <font color="red">+4_331_097_403</font>   |
| 4   | http_request_update | 17_520_419_142 | 13_808_757_656 | $0.0183610908 | $18_361.09        | <font color="red">+4_866_159_897</font>   |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- |
| 0   | init                | 10_209_412_571 | 8_084_355_028  | $0.0107495244 | $10_749.52        |
| 1   | http_request_update | 1_118_641_072  | 848_046_428    | $0.0011276219 | $1_127.62         |
| 2   | http_request_update | 11_621_237_293 | 9_049_084_917  | $0.0120322967 | $12_032.29        |
| 3   | http_request_update | 14_237_573_010 | 11_295_619_204 | $0.0150194460 | $15_019.44        |
| 4   | http_request_update | 12_654_259_245 | 9_862_293_698  | $0.0131135961 | $13_113.59        |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
