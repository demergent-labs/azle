# Benchmarks for sqlite_typeorm

## Current benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                             |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | ---------------------------------- |
| 0   | postUpgrade         | 13_376_544_483 | 10_551_207_793 | $0.0140296245 | $14_029.62        | <font color="red">+460_764</font>  |
| 1   | http_request_update | 101_845_065    | 41_328_026     | $0.0000549526 | $54.95            | <font color="red">+81_228</font>   |
| 2   | http_request_update | 141_149_727    | 57_049_890     | $0.0000758575 | $75.85            | <font color="green">-76_969</font> |
| 3   | http_request_update | 142_263_404    | 57_495_361     | $0.0000764499 | $76.44            | <font color="red">+97_330</font>   |
| 4   | http_request_update | 66_280_907     | 27_102_362     | $0.0000360372 | $36.03            | <font color="red">+11_619</font>   |

## Baseline benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 13_376_083_719 | 10_551_023_487 | $0.0140293794 | $14_029.37        |
| 1   | http_request_update | 101_763_837    | 41_295_534     | $0.0000549094 | $54.90            |
| 2   | http_request_update | 141_226_696    | 57_080_678     | $0.0000758985 | $75.89            |
| 3   | http_request_update | 142_166_074    | 57_456_429     | $0.0000763981 | $76.39            |
| 4   | http_request_update | 66_269_288     | 27_097_715     | $0.0000360310 | $36.03            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
