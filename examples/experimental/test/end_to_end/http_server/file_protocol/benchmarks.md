⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for backend

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init                | 7_522_732_774 | 5_809_683_109 | $0.0077249613 | $7_724.96         | <font color="red">+4_638_029</font> |
| 1   | http_request_update | 57_103_023    | 23_431_209    | $0.0000311558 | $31.15            | <font color="green">-37_328</font>  |
| 2   | http_request_update | 50_682_911    | 20_863_164    | $0.0000277411 | $27.74            | <font color="green">-88_803</font>  |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_518_094_745 | 5_807_827_898 | $0.0077224945 | $7_722.49         |
| 1   | http_request_update | 57_140_351    | 23_446_140    | $0.0000311756 | $31.17            |
| 2   | http_request_update | 50_771_714    | 20_898_685    | $0.0000277884 | $27.78            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
