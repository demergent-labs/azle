# Benchmarks for bitcore_lib

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                    |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | ----------------------------------------- |
| 0   | init                | 10_209_412_571 | 8_084_355_028  | $0.0107495244 | $10_749.52        | <font color="green">-619_062_220</font>   |
| 1   | http_request_update | 1_118_641_072  | 848_046_428    | $0.0011276219 | $1_127.62         | <font color="red">+10_843_301</font>      |
| 2   | http_request_update | 11_621_237_293 | 9_049_084_917  | $0.0120322967 | $12_032.29        | <font color="red">+22_906_407</font>      |
| 3   | http_request_update | 14_237_573_010 | 11_295_619_204 | $0.0150194460 | $15_019.44        | <font color="red">+344_821_701</font>     |
| 4   | http_request_update | 12_654_259_245 | 9_862_293_698  | $0.0131135961 | $13_113.59        | <font color="green">-4_922_068_563</font> |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- |
| 0   | init                | 10_828_474_791 | 8_331_979_916  | $0.0110787837 | $11_078.78        |
| 1   | http_request_update | 1_107_797_771  | 843_709_108    | $0.0011218547 | $1_121.85         |
| 2   | http_request_update | 11_598_330_886 | 9_039_922_354  | $0.0120201136 | $12_020.11        |
| 3   | http_request_update | 13_892_751_309 | 10_757_690_523 | $0.0143041784 | $14_304.17        |
| 4   | http_request_update | 17_576_327_808 | 13_831_121_123 | $0.0183908268 | $18_390.82        |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
