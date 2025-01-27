# Benchmarks for server

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 8_287_549_486 | 6_515_609_794 | $0.0086636109 | $8_663.61         |
| 1   | http_request_update | 174_367_700   | 70_337_080    | $0.0000935251 | $93.52            |
| 2   | http_request_update | 175_164_382   | 70_655_752    | $0.0000939488 | $93.94            |
| 3   | http_request_update | 215_029_826   | 86_601_930    | $0.0001151520 | $115.15           |
| 4   | http_request_update | 215_090_286   | 86_626_114    | $0.0001151841 | $115.18           |
| 5   | http_request_update | 2_348_579_099 | 1_740_021_639 | $0.0023136546 | $2_313.65         |
| 6   | http_request_update | 215_565_771   | 86_816_308    | $0.0001154370 | $115.43           |
| 7   | http_request_update | 195_440_359   | 78_766_143    | $0.0001047330 | $104.73           |
| 8   | http_request_update | 215_067_202   | 86_616_880    | $0.0001151719 | $115.17           |
| 9   | http_request_update | 215_209_859   | 86_673_943    | $0.0001152477 | $115.24           |

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
