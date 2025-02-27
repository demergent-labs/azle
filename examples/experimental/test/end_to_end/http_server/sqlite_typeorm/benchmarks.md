# Benchmarks for sqlite_typeorm

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | postUpgrade         | 13_374_965_500 | 10_550_576_200 | $0.0140287847 | $14_028.78        | <font color="green">-9_935_569</font> |
| 1   | http_request_update | 101_609_708    | 41_233_883     | $0.0000548275 | $54.82            | <font color="green">-357_411</font>   |
| 2   | http_request_update | 141_111_320    | 57_034_528     | $0.0000758371 | $75.83            | <font color="green">-301_464</font>   |
| 3   | http_request_update | 142_165_852    | 57_456_340     | $0.0000763980 | $76.39            | <font color="green">-253_255</font>   |
| 4   | http_request_update | 66_186_567     | 27_064_626     | $0.0000359870 | $35.98            | <font color="green">-195_987</font>   |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 13_384_901_069 | 10_554_550_427 | $0.0140340691 | $14_034.06        |
| 1   | http_request_update | 101_967_119    | 41_376_847     | $0.0000550176 | $55.01            |
| 2   | http_request_update | 141_412_784    | 57_155_113     | $0.0000759974 | $75.99            |
| 3   | http_request_update | 142_419_107    | 57_557_642     | $0.0000765327 | $76.53            |
| 4   | http_request_update | 66_382_554     | 27_143_021     | $0.0000360913 | $36.09            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
