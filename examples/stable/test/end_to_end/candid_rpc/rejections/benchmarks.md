# Benchmarks for rejections

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name                     | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ------------------------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | getRejectCodeNoError            | 1_358_178    | 1_133_271 | $0.0000015069 | $1.50             | <font color="green">-3_207</font> |
| 1   | getRejectCodeDestinationInvalid | 1_282_121    | 1_102_848 | $0.0000014664 | $1.46             | <font color="red">+3_192</font>   |
| 2   | getRejectCodeCanisterReject     | 2_216_258    | 1_476_503 | $0.0000019633 | $1.96             | <font color="green">-2_004</font> |
| 3   | getRejectCodeCanisterError      | 1_283_146    | 1_103_258 | $0.0000014670 | $1.46             | <font color="red">+1_530</font>   |
| 4   | getRejectMessage                | 2_962_270    | 1_774_908 | $0.0000023600 | $2.36             | <font color="red">+5_128</font>   |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name                     | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | getRejectCodeNoError            | 1_361_385    | 1_134_554 | $0.0000015086 | $1.50             |
| 1   | getRejectCodeDestinationInvalid | 1_278_929    | 1_101_571 | $0.0000014647 | $1.46             |
| 2   | getRejectCodeCanisterReject     | 2_218_262    | 1_477_304 | $0.0000019643 | $1.96             |
| 3   | getRejectCodeCanisterError      | 1_281_616    | 1_102_646 | $0.0000014662 | $1.46             |
| 4   | getRejectMessage                | 2_957_142    | 1_772_856 | $0.0000023573 | $2.35             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
