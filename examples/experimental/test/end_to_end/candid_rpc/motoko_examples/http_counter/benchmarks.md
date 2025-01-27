# Benchmarks for http_counter

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 5_507_551_537 | 4_203_610_614 | $0.0055894149 | $5_589.41         | <font color="red">+116_538_450</font> |
| 1   | http_request_update | 36_730_165    | 15_282_066    | $0.0000203201 | $20.32            | <font color="red">+89_740</font>      |
| 2   | http_request_update | 36_702_651    | 15_271_060    | $0.0000203055 | $20.30            | <font color="red">+106_224</font>     |
| 3   | http_request_update | 36_932_658    | 15_363_063    | $0.0000204278 | $20.42            | <font color="red">+81_884</font>      |

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
