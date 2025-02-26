# Benchmarks for rejections

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name                     | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ------------------------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | getRejectCodeNoError            | 1_361_385    | 1_134_554 | $0.0000015086 | $1.50             | <font color="green">-3_688</font>  |
| 1   | getRejectCodeDestinationInvalid | 1_278_929    | 1_101_571 | $0.0000014647 | $1.46             | <font color="green">-8_498</font>  |
| 2   | getRejectCodeCanisterReject     | 2_218_262    | 1_477_304 | $0.0000019643 | $1.96             | <font color="green">-14_038</font> |
| 3   | getRejectCodeCanisterError      | 1_281_616    | 1_102_646 | $0.0000014662 | $1.46             | <font color="green">-11_930</font> |
| 4   | getRejectMessage                | 2_957_142    | 1_772_856 | $0.0000023573 | $2.35             | <font color="green">-14_578</font> |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name                     | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | getRejectCodeNoError            | 1_365_073    | 1_136_029 | $0.0000015105 | $1.51             |
| 1   | getRejectCodeDestinationInvalid | 1_287_427    | 1_104_970 | $0.0000014692 | $1.46             |
| 2   | getRejectCodeCanisterReject     | 2_232_300    | 1_482_920 | $0.0000019718 | $1.97             |
| 3   | getRejectCodeCanisterError      | 1_293_546    | 1_107_418 | $0.0000014725 | $1.47             |
| 4   | getRejectMessage                | 2_971_720    | 1_778_688 | $0.0000023651 | $2.36             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
