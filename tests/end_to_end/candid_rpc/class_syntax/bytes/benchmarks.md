# Benchmarks for bytes_canister

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                  |
| --- | ----------- | ------------- | ------------- | ------------- | ----------------- | --------------------------------------- |
| 0   | getBytes    | 3_366_093     | 1_936_437     | $0.0000025748 | $2.57             | <font color="red">+1_438_583</font>     |
| 1   | getBytes    | 16_686_067    | 7_264_426     | $0.0000096593 | $9.65             | <font color="red">+14_135_010</font>    |
| 2   | getBytes    | 152_796_957   | 61_708_782    | $0.0000820523 | $82.05            | <font color="red">+143_340_553</font>   |
| 3   | getBytes    | 1_501_555_942 | 1_001_212_376 | $0.0013312821 | $1_331.28         | <font color="red">+1_423_700_405</font> |
| 4   | getBytes    | 3_000_282_806 | 2_400_703_122 | $0.0031921429 | $3_192.14         | <font color="red">+2_846_432_322</font> |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | getBytes    | 1_927_510    | 1_361_004  | $0.0000018097 | $1.80             |
| 1   | getBytes    | 2_551_057    | 1_610_422  | $0.0000021413 | $2.14             |
| 2   | getBytes    | 9_456_404    | 4_372_561  | $0.0000058141 | $5.81             |
| 3   | getBytes    | 77_855_537   | 31_732_214 | $0.0000421934 | $42.19            |
| 4   | getBytes    | 153_850_484  | 62_130_193 | $0.0000826127 | $82.61            |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
