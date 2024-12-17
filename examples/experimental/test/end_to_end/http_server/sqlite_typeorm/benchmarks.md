# Benchmarks for sqlite_typeorm

## Current benchmarks Azle version: 0.25.0-dontmerge

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                 |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | -------------------------------------- |
| 0   | postUpgrade         | 14_200_519_051 | 11_280_797_620 | $0.0149997382 | $14_999.73        | <font color="red">+115_787_289</font>  |
| 1   | http_request_update | 102_411_133    | 41_554_453     | $0.0000552537 | $55.25            | <font color="red">+88_910</font>       |
| 2   | http_request_update | 141_885_437    | 57_344_174     | $0.0000762488 | $76.24            | <font color="red">+28_508</font>       |
| 3   | http_request_update | 142_844_582    | 57_727_832     | $0.0000767590 | $76.75            | <font color="green">-27_603_323</font> |
| 4   | http_request_update | 66_905_215     | 27_352_086     | $0.0000363692 | $36.36            | <font color="red">+6_746</font>        |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 14_084_731_762 | 11_234_482_704 | $0.0149381546 | $14_938.15        |
| 1   | http_request_update | 102_322_223    | 41_518_889     | $0.0000552064 | $55.20            |
| 2   | http_request_update | 141_856_929    | 57_332_771     | $0.0000762337 | $76.23            |
| 3   | http_request_update | 170_447_905    | 68_769_162     | $0.0000914403 | $91.44            |
| 4   | http_request_update | 66_898_469     | 27_349_387     | $0.0000363657 | $36.36            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
