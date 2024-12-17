# Benchmarks for bitcore_lib

## Current benchmarks Azle version: 0.25.0-dontmerge

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                    |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | ----------------------------------------- |
| 0   | init                | 10_966_728_723 | 8_387_281_489  | $0.0111523166 | $11_152.31        | <font color="red">+138_253_932</font>     |
| 1   | http_request_update | 1_102_144_006  | 841_447_602    | $0.0011188476 | $1_118.84         | <font color="green">-5_653_765</font>     |
| 2   | http_request_update | 6_737_180_685  | 5_095_462_274  | $0.0067752833 | $6_775.28         | <font color="green">-4_861_150_201</font> |
| 3   | http_request_update | 13_818_133_518 | 10_727_843_407 | $0.0142644915 | $14_264.49        | <font color="green">-74_617_791</font>    |
| 4   | http_request_update | 17_234_213_976 | 13_694_275_590 | $0.0182088674 | $18_208.86        | <font color="green">-342_113_832</font>   |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- |
| 0   | init                | 10_828_474_791 | 8_331_979_916  | $0.0110787837 | $11_078.78        |
| 1   | http_request_update | 1_107_797_771  | 843_709_108    | $0.0011218547 | $1_121.85         |
| 2   | http_request_update | 11_598_330_886 | 9_039_922_354  | $0.0120201136 | $12_020.11        |
| 3   | http_request_update | 13_892_751_309 | 10_757_690_523 | $0.0143041784 | $14_304.17        |
| 4   | http_request_update | 17_576_327_808 | 13_831_121_123 | $0.0183908268 | $18_390.82        |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
