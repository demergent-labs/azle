# Benchmarks for backend

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                               |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | init                | 7_577_165_005 | 5_831_456_002 | $0.0077539121 | $7_753.91         | <font color="red">+54_432_231</font> |
| 1   | http_request_update | 57_142_774    | 23_447_109    | $0.0000311769 | $31.17            | <font color="red">+39_751</font>     |
| 2   | http_request_update | 50_749_158    | 20_889_663    | $0.0000277764 | $27.77            | <font color="red">+66_247</font>     |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_522_732_774 | 5_809_683_109 | $0.0077249613 | $7_724.96         |
| 1   | http_request_update | 57_103_023    | 23_431_209    | $0.0000311558 | $31.15            |
| 2   | http_request_update | 50_682_911    | 20_863_164    | $0.0000277411 | $27.74            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
