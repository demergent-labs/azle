# Benchmarks for sqlite

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | postUpgrade         | 12_668_447_639 | 9_867_969_055 | $0.0131211424 | $13_121.14        | <font color="red">+109_793_291</font> |
| 1   | http_request_update | 175_883_603    | 70_943_441    | $0.0000943314 | $94.33            | <font color="red">+27_409_715</font>  |
| 2   | http_request_update | 75_686_166     | 30_864_466    | $0.0000410396 | $41.03            | <font color="red">+2_548</font>       |
| 3   | http_request_update | 144_605_249    | 58_432_099    | $0.0000776954 | $77.69            | <font color="red">+12_967</font>      |
| 4   | http_request_update | 83_818_138     | 34_117_255    | $0.0000453647 | $45.36            | <font color="red">+70_513</font>      |

## Baseline benchmarks Azle version: 0.25.0-alpha

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 12_558_654_348 | 9_824_051_739 | $0.0130627469 | $13_062.74        |
| 1   | http_request_update | 148_473_888    | 59_979_555    | $0.0000797530 | $79.75            |
| 2   | http_request_update | 75_683_618     | 30_863_447    | $0.0000410382 | $41.03            |
| 3   | http_request_update | 144_592_282    | 58_426_912    | $0.0000776885 | $77.68            |
| 4   | http_request_update | 83_747_625     | 34_089_050    | $0.0000453272 | $45.32            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
