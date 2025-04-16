# Benchmarks for rejections

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name                     | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ------------------------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | getRejectCodeNoError            | 1_400_973    | 1_150_389 | $0.0000015296 | $1.52             | <font color="green">-9_445</font> |
| 1   | getRejectCodeDestinationInvalid | 1_328_543    | 1_121_417 | $0.0000014911 | $1.49             | <font color="green">-1_231</font> |
| 2   | getRejectCodeCanisterReject     | 2_268_078    | 1_497_231 | $0.0000019908 | $1.99             | <font color="green">-5_016</font> |
| 3   | getRejectCodeCanisterError      | 1_330_646    | 1_122_258 | $0.0000014922 | $1.49             | <font color="green">-7_875</font> |
| 4   | getRejectMessage                | 3_010_082    | 1_794_032 | $0.0000023855 | $2.38             | <font color="red">+1_109</font>   |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name                     | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | getRejectCodeNoError            | 1_410_418    | 1_154_167 | $0.0000015347 | $1.53             |
| 1   | getRejectCodeDestinationInvalid | 1_329_774    | 1_121_909 | $0.0000014918 | $1.49             |
| 2   | getRejectCodeCanisterReject     | 2_273_094    | 1_499_237 | $0.0000019935 | $1.99             |
| 3   | getRejectCodeCanisterError      | 1_338_521    | 1_125_408 | $0.0000014964 | $1.49             |
| 4   | getRejectMessage                | 3_008_973    | 1_793_589 | $0.0000023849 | $2.38             |

# Benchmarks for some_canister

## Current benchmarks Azle version: 0.31.0

No benchmarks reported

## Baseline benchmarks Azle version: 0.30.0

No benchmarks reported

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
