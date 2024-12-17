# Benchmarks for http_counter

## Current benchmarks Azle version: 0.25.0-dontmerge

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 5_504_647_793 | 4_202_449_117 | $0.0055878705 | $5_587.87         | <font color="red">+113_634_706</font> |
| 1   | http_request_update | 36_673_774    | 15_259_509    | $0.0000202901 | $20.29            | <font color="red">+33_349</font>      |
| 2   | http_request_update | 36_636_367    | 15_244_546    | $0.0000202702 | $20.27            | <font color="red">+39_940</font>      |
| 3   | http_request_update | 36_874_746    | 15_339_898    | $0.0000203970 | $20.39            | <font color="red">+23_972</font>      |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 5_391_013_087 | 4_156_995_234 | $0.0055274319 | $5_527.43         |
| 1   | http_request_update | 36_640_425    | 15_246_170    | $0.0000202724 | $20.27            |
| 2   | http_request_update | 36_596_427    | 15_228_570    | $0.0000202490 | $20.24            |
| 3   | http_request_update | 36_850_774    | 15_330_309    | $0.0000203843 | $20.38            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
