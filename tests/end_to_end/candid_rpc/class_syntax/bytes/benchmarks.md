# Benchmarks for bytes_canister

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls | Change                                |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- | ------------------------------------- |
| 0   | getBytes    | 1_923_704    | 1_359_481  | $0.0000018077 | $1.80             | <font color="green">-3_806</font>     |
| 1   | getBytes    | 2_569_610    | 1_617_844  | $0.0000021512 | $2.15             | <font color="red">+18_553</font>      |
| 2   | getBytes    | 9_382_480    | 4_342_992  | $0.0000057747 | $5.77             | <font color="green">-73_924</font>    |
| 3   | getBytes    | 76_881_186   | 31_342_474 | $0.0000416751 | $41.67            | <font color="green">-974_351</font>   |
| 4   | getBytes    | 151_876_476  | 61_340_590 | $0.0000815627 | $81.56            | <font color="green">-1_974_008</font> |

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
