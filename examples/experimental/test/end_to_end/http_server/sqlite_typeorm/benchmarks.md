# Benchmarks for sqlite_typeorm

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                               |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | postUpgrade         | 13_470_642_140 | 10_588_846_856 | $0.0140796720 | $14_079.67        | <font color="red">+94_097_657</font> |
| 1   | http_request_update | 101_668_462    | 41_257_384     | $0.0000548587 | $54.85            | <font color="green">-176_603</font>  |
| 2   | http_request_update | 141_117_027    | 57_036_810     | $0.0000758401 | $75.84            | <font color="green">-32_700</font>   |
| 3   | http_request_update | 142_130_242    | 57_442_096     | $0.0000763790 | $76.37            | <font color="green">-133_162</font>  |
| 4   | http_request_update | 66_132_438     | 27_042_975     | $0.0000359582 | $35.95            | <font color="green">-148_469</font>  |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 13_376_544_483 | 10_551_207_793 | $0.0140296245 | $14_029.62        |
| 1   | http_request_update | 101_845_065    | 41_328_026     | $0.0000549526 | $54.95            |
| 2   | http_request_update | 141_149_727    | 57_049_890     | $0.0000758575 | $75.85            |
| 3   | http_request_update | 142_263_404    | 57_495_361     | $0.0000764499 | $76.44            |
| 4   | http_request_update | 66_280_907     | 27_102_362     | $0.0000360372 | $36.03            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
