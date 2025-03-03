# Benchmarks for rejections

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name                     | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ------------------------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | getRejectCodeNoError            | 10_241_259   | 4_686_503 | $0.0000062315 | $6.23             | <font color="red">+8_911</font>   |
| 1   | getRejectCodeDestinationInvalid | 9_399_698    | 4_349_879 | $0.0000057839 | $5.78             | <font color="red">+9_258</font>   |
| 2   | getRejectCodeCanisterReject     | 10_565_498   | 4_816_199 | $0.0000064040 | $6.40             | <font color="green">-2_380</font> |
| 3   | getRejectCodeCanisterError      | 10_051_131   | 4_610_452 | $0.0000061304 | $6.13             | <font color="green">-1_882</font> |
| 4   | getRejectMessage                | 11_247_276   | 5_088_910 | $0.0000067666 | $6.76             | <font color="green">-3_200</font> |

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
