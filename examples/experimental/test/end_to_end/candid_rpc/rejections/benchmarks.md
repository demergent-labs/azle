# Benchmarks for rejections

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name                     | Instructions | Cycles    | USD           | USD/Million Calls | Change                              |
| --- | ------------------------------- | ------------ | --------- | ------------- | ----------------- | ----------------------------------- |
| 0   | getRejectCodeNoError            | 10_232_348   | 4_682_939 | $0.0000062268 | $6.22             | <font color="green">-122_144</font> |
| 1   | getRejectCodeDestinationInvalid | 9_390_440    | 4_346_176 | $0.0000057790 | $5.77             | <font color="green">-80_465</font>  |
| 2   | getRejectCodeCanisterReject     | 10_567_878   | 4_817_151 | $0.0000064052 | $6.40             | <font color="green">-113_079</font> |
| 3   | getRejectCodeCanisterError      | 10_053_013   | 4_611_205 | $0.0000061314 | $6.13             | <font color="green">-104_808</font> |
| 4   | getRejectMessage                | 11_250_476   | 5_090_190 | $0.0000067683 | $6.76             | <font color="green">-120_851</font> |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name                     | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | getRejectCodeNoError            | 10_354_492   | 4_731_796 | $0.0000062917 | $6.29             |
| 1   | getRejectCodeDestinationInvalid | 9_470_905    | 4_378_362 | $0.0000058218 | $5.82             |
| 2   | getRejectCodeCanisterReject     | 10_680_957   | 4_862_382 | $0.0000064654 | $6.46             |
| 3   | getRejectCodeCanisterError      | 10_157_821   | 4_653_128 | $0.0000061871 | $6.18             |
| 4   | getRejectMessage                | 11_371_327   | 5_138_530 | $0.0000068325 | $6.83             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
