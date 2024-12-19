# Benchmarks for bitcore_lib

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                  |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | --------------------------------------- |
| 0   | init                | 10_966_728_723 | 8_387_281_489  | $0.0111523166 | $11_152.31        | <font color="red">+144_565_424</font>   |
| 1   | http_request_update | 1_102_144_006  | 841_447_602    | $0.0011188476 | $1_118.84         | <font color="green">-5_581_377</font>   |
| 2   | http_request_update | 11_267_410_242 | 8_907_554_096  | $0.0118441075 | $11_844.10        | <font color="green">-304_133_806</font> |
| 3   | http_request_update | 13_688_797_479 | 10_676_108_991 | $0.0141957018 | $14_195.70        | <font color="green">-140_174_306</font> |
| 4   | http_request_update | 12_481_274_378 | 9_793_099_751  | $0.0130215909 | $13_021.59        | <font color="green">-2_981_512</font>   |

## Baseline benchmarks Azle version: 0.25.0-alpha

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- |
| 0   | init                | 10_822_163_299 | 8_329_455_319  | $0.0110754269 | $11_075.42        |
| 1   | http_request_update | 1_107_725_383  | 843_680_153    | $0.0011218162 | $1_121.81         |
| 2   | http_request_update | 11_571_544_048 | 9_029_207_619  | $0.0120058665 | $12_005.86        |
| 3   | http_request_update | 13_828_971_785 | 10_732_178_714 | $0.0142702561 | $14_270.25        |
| 4   | http_request_update | 12_484_255_890 | 9_794_292_356  | $0.0130231767 | $13_023.17        |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
