# Benchmarks for http_counter

## Current benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                             |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ---------------------------------- |
| 0   | init                | 4_851_819_909 | 3_541_317_963 | $0.0047087843 | $4_708.78         | <font color="red">+209_151</font>  |
| 1   | http_request_update | 36_599_260    | 15_229_704    | $0.0000202505 | $20.25            | <font color="red">+787</font>      |
| 2   | http_request_update | 36_580_638    | 15_222_255    | $0.0000202406 | $20.24            | <font color="green">-32_046</font> |
| 3   | http_request_update | 36_788_743    | 15_305_497    | $0.0000203513 | $20.35            | <font color="green">-27_631</font> |

## Baseline benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 4_851_610_758 | 3_541_234_303 | $0.0047086730 | $4_708.67         |
| 1   | http_request_update | 36_598_473    | 15_229_389    | $0.0000202501 | $20.25            |
| 2   | http_request_update | 36_612_684    | 15_235_073    | $0.0000202576 | $20.25            |
| 3   | http_request_update | 36_816_374    | 15_316_549    | $0.0000203660 | $20.36            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
