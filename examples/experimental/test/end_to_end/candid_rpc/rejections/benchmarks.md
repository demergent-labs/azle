# Benchmarks for rejections

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name                     | Instructions | Cycles    | USD           | USD/Million Calls | Change                           |
| --- | ------------------------------- | ------------ | --------- | ------------- | ----------------- | -------------------------------- |
| 0   | getRejectCodeNoError            | 10_239_148   | 4_685_659 | $0.0000062304 | $6.23             | <font color="red">+6_800</font>  |
| 1   | getRejectCodeDestinationInvalid | 9_397_857    | 4_349_142 | $0.0000057829 | $5.78             | <font color="red">+7_417</font>  |
| 2   | getRejectCodeCanisterReject     | 10_567_037   | 4_816_814 | $0.0000064048 | $6.40             | <font color="green">-841</font>  |
| 3   | getRejectCodeCanisterError      | 10_055_444   | 4_612_177 | $0.0000061327 | $6.13             | <font color="red">+2_431</font>  |
| 4   | getRejectMessage                | 11_263_411   | 5_095_364 | $0.0000067752 | $6.77             | <font color="red">+12_935</font> |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name                     | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | getRejectCodeNoError            | 10_232_348   | 4_682_939 | $0.0000062268 | $6.22             |
| 1   | getRejectCodeDestinationInvalid | 9_390_440    | 4_346_176 | $0.0000057790 | $5.77             |
| 2   | getRejectCodeCanisterReject     | 10_567_878   | 4_817_151 | $0.0000064052 | $6.40             |
| 3   | getRejectCodeCanisterError      | 10_053_013   | 4_611_205 | $0.0000061314 | $6.13             |
| 4   | getRejectMessage                | 11_250_476   | 5_090_190 | $0.0000067683 | $6.76             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
