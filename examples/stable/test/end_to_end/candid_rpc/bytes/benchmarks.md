# Benchmarks for bytes_canister

## Current benchmarks Azle version: 0.25.1

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls | Change                                    |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- | ----------------------------------------- |
| 0   | getBytes    | 1_919_956    | 1_357_982  | $0.0000018057 | $1.80             | <font color="green">-1_446_137</font>     |
| 1   | getBytes    | 2_566_220    | 1_616_488  | $0.0000021494 | $2.14             | <font color="green">-14_119_847</font>    |
| 2   | getBytes    | 9_378_140    | 4_341_256  | $0.0000057724 | $5.77             | <font color="green">-143_418_817</font>   |
| 3   | getBytes    | 76_877_060   | 31_340_824 | $0.0000416730 | $41.67            | <font color="green">-1_424_678_882</font> |
| 4   | getBytes    | 151_872_628  | 61_339_051 | $0.0000815607 | $81.56            | <font color="green">-2_848_410_178</font> |

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
