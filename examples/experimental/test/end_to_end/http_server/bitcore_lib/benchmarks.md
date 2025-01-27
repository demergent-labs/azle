# Benchmarks for bitcore_lib

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                  |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | --------------------------------------- |
| 0   | init                | 10_214_923_753 | 8_086_559_501  | $0.0107524556 | $10_752.45        | <font color="green">-613_551_038</font> |
| 1   | http_request_update | 1_101_741_686  | 841_286_674    | $0.0011186337 | $1_118.63         | <font color="green">-6_056_085</font>   |
| 2   | http_request_update | 11_433_697_052 | 8_974_068_820  | $0.0119325501 | $11_932.55        | <font color="green">-164_633_834</font> |
| 3   | http_request_update | 13_710_170_022 | 10_684_658_008 | $0.0142070692 | $14_207.06        | <font color="green">-182_581_287</font> |
| 4   | http_request_update | 17_452_333_326 | 13_781_523_330 | $0.0183248781 | $18_324.87        | <font color="green">-123_994_482</font> |

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
