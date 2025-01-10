# Benchmarks for bytes_canister

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls | Change                                    |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- | ----------------------------------------- |
| 0   | getBytes    | 2_053_137    | 1_411_254  | $0.0000018765 | $1.87             | <font color="green">-1_312_956</font>     |
| 1   | getBytes    | 2_680_607    | 1_662_242  | $0.0000022102 | $2.21             | <font color="green">-14_005_460</font>    |
| 2   | getBytes    | 9_523_962    | 4_399_584  | $0.0000058500 | $5.84             | <font color="green">-143_272_995</font>   |
| 3   | getBytes    | 77_000_084   | 31_390_033 | $0.0000417384 | $41.73            | <font color="green">-1_424_555_858</font> |
| 4   | getBytes    | 151_994_358  | 61_387_743 | $0.0000816254 | $81.62            | <font color="green">-2_848_288_448</font> |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ----------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | getBytes    | 3_366_093     | 1_936_437     | $0.0000025748 | $2.57             |
| 1   | getBytes    | 16_686_067    | 7_264_426     | $0.0000096593 | $9.65             |
| 2   | getBytes    | 152_796_957   | 61_708_782    | $0.0000820523 | $82.05            |
| 3   | getBytes    | 1_501_555_942 | 1_001_212_376 | $0.0013312821 | $1_331.28         |
| 4   | getBytes    | 3_000_282_806 | 2_400_703_122 | $0.0031921429 | $3_192.14         |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
