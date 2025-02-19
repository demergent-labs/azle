# Benchmarks for backend

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                  |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | --------------------------------------- |
| 0   | init                | 7_521_752_204 | 5_809_290_881 | $0.0077244398 | $7_724.43         | <font color="green">-755_278_341</font> |
| 1   | http_request_update | 57_234_465    | 23_483_786    | $0.0000312257 | $31.22            | <font color="green">-728_558</font>     |
| 2   | http_request_update | 50_880_841    | 20_942_336    | $0.0000278464 | $27.84            | <font color="green">-678_926</font>     |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 8_277_030_545 | 6_511_402_218 | $0.0086580162 | $8_658.01         |
| 1   | http_request_update | 57_963_023    | 23_775_209    | $0.0000316132 | $31.61            |
| 2   | http_request_update | 51_559_767    | 21_213_906    | $0.0000282075 | $28.20            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
