⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for rejections

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name                     | Instructions | Cycles    | USD           | USD/Million Calls | Change                           |
| --- | ------------------------------- | ------------ | --------- | ------------- | ----------------- | -------------------------------- |
| 0   | getRejectCodeNoError            | 1_410_418    | 1_154_167 | $0.0000015347 | $1.53             | <font color="red">+48_907</font> |
| 1   | getRejectCodeDestinationInvalid | 1_329_774    | 1_121_909 | $0.0000014918 | $1.49             | <font color="red">+50_915</font> |
| 2   | getRejectCodeCanisterReject     | 2_273_094    | 1_499_237 | $0.0000019935 | $1.99             | <font color="red">+54_713</font> |
| 3   | getRejectCodeCanisterError      | 1_338_521    | 1_125_408 | $0.0000014964 | $1.49             | <font color="red">+57_017</font> |
| 4   | getRejectMessage                | 3_008_973    | 1_793_589 | $0.0000023849 | $2.38             | <font color="red">+51_873</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name                     | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | getRejectCodeNoError            | 1_361_511    | 1_134_604 | $0.0000015086 | $1.50             |
| 1   | getRejectCodeDestinationInvalid | 1_278_859    | 1_101_543 | $0.0000014647 | $1.46             |
| 2   | getRejectCodeCanisterReject     | 2_218_381    | 1_477_352 | $0.0000019644 | $1.96             |
| 3   | getRejectCodeCanisterError      | 1_281_504    | 1_102_601 | $0.0000014661 | $1.46             |
| 4   | getRejectMessage                | 2_957_100    | 1_772_840 | $0.0000023573 | $2.35             |

# Benchmarks for some_canister

## Current benchmarks Azle version: 0.30.0

No benchmarks reported

## Baseline benchmarks Azle version: No previous benchmarks

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
