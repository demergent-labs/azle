# Benchmarks for http_counter

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init                | 5_390_993_933 | 4_156_987_573 | $0.0055274217 | $5_527.42         | <font color="red">+2_361_941</font> |
| 1   | http_request_update | 36_612_174    | 15_234_869    | $0.0000202573 | $20.25            | <font color="green">-2_511</font>   |
| 2   | http_request_update | 36_648_492    | 15_249_396    | $0.0000202767 | $20.27            | <font color="red">+73_918</font>    |
| 3   | http_request_update | 36_856_347    | 15_332_538    | $0.0000203872 | $20.38            | <font color="red">+77_724</font>    |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 5_388_631_992 | 4_156_042_796 | $0.0055261654 | $5_526.16         |
| 1   | http_request_update | 36_614_685    | 15_235_874    | $0.0000202587 | $20.25            |
| 2   | http_request_update | 36_574_574    | 15_219_829    | $0.0000202374 | $20.23            |
| 3   | http_request_update | 36_778_623    | 15_301_449    | $0.0000203459 | $20.34            |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
