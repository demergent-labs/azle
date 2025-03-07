# Benchmarks for rejections

## Current benchmarks Azle version: 0.29.0

| Id  | Method Name                     | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ------------------------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | getRejectCodeNoError            | 10_239_031   | 4_685_612 | $0.0000062303 | $6.23             | <font color="green">-2_228</font> |
| 1   | getRejectCodeDestinationInvalid | 9_397_232    | 4_348_892 | $0.0000057826 | $5.78             | <font color="green">-2_466</font> |
| 2   | getRejectCodeCanisterReject     | 10_562_325   | 4_814_930 | $0.0000064023 | $6.40             | <font color="green">-3_173</font> |
| 3   | getRejectCodeCanisterError      | 10_065_291   | 4_616_116 | $0.0000061379 | $6.13             | <font color="red">+14_160</font>  |
| 4   | getRejectMessage                | 11_268_406   | 5_097_362 | $0.0000067778 | $6.77             | <font color="red">+21_130</font>  |

## Baseline benchmarks Azle version: 0.28.0

| Id  | Method Name                     | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | getRejectCodeNoError            | 10_241_259   | 4_686_503 | $0.0000062315 | $6.23             |
| 1   | getRejectCodeDestinationInvalid | 9_399_698    | 4_349_879 | $0.0000057839 | $5.78             |
| 2   | getRejectCodeCanisterReject     | 10_565_498   | 4_816_199 | $0.0000064040 | $6.40             |
| 3   | getRejectCodeCanisterError      | 10_051_131   | 4_610_452 | $0.0000061304 | $6.13             |
| 4   | getRejectMessage                | 11_247_276   | 5_088_910 | $0.0000067666 | $6.76             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
