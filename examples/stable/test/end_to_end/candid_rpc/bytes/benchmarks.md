# Benchmarks for bytes_canister

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls | Change                                |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- | ------------------------------------- |
| 0   | getBytes    | 2_030_124    | 1_402_049  | $0.0000018643 | $1.86             | <font color="green">-23_013</font>    |
| 1   | getBytes    | 2_626_728    | 1_640_691  | $0.0000021816 | $2.18             | <font color="green">-53_879</font>    |
| 2   | getBytes    | 9_267_466    | 4_296_986  | $0.0000057136 | $5.71             | <font color="green">-256_496</font>   |
| 3   | getBytes    | 74_961_695   | 30_574_678 | $0.0000406542 | $40.65            | <font color="green">-2_038_389</font> |
| 4   | getBytes    | 147_958_416  | 59_773_366 | $0.0000794789 | $79.47            | <font color="green">-4_035_942</font> |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | getBytes    | 2_053_137    | 1_411_254  | $0.0000018765 | $1.87             |
| 1   | getBytes    | 2_680_607    | 1_662_242  | $0.0000022102 | $2.21             |
| 2   | getBytes    | 9_523_962    | 4_399_584  | $0.0000058500 | $5.84             |
| 3   | getBytes    | 77_000_084   | 31_390_033 | $0.0000417384 | $41.73            |
| 4   | getBytes    | 151_994_358  | 61_387_743 | $0.0000816254 | $81.62            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
