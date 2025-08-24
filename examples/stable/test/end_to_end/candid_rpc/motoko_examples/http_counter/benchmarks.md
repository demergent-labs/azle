# Benchmarks for http_counter

## Current benchmarks Azle version: 0.33.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                               |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | init                | 1_028_118_053 | 1_033_118_053 | $0.0014153717 | $1_415.37         | <font color="red">+12_547_339</font> |
| 1   | http_request_update | 29_380_888    | 34_380_888    | $0.0000471018 | $47.10            | <font color="green">-702_341</font>  |
| 2   | http_request_update | 29_305_473    | 34_305_473    | $0.0000469985 | $46.99            | <font color="green">-732_969</font>  |
| 3   | http_request_update | 29_341_081    | 34_341_081    | $0.0000470473 | $47.04            | <font color="green">-773_460</font>  |

## Baseline benchmarks Azle version: 0.32.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 1_015_570_714 | 1_020_570_714 | $0.0013981819 | $1_398.18         |
| 1   | http_request_update | 30_083_229    | 35_083_229    | $0.0000480640 | $48.06            |
| 2   | http_request_update | 30_038_442    | 35_038_442    | $0.0000480027 | $48.00            |
| 3   | http_request_update | 30_114_541    | 35_114_541    | $0.0000481069 | $48.10            |

---

**Note on calculations:**

- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).
