# Benchmarks for rejections

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name                     | Instructions | Cycles    | USD           | USD/Million Calls | Change                           |
| --- | ------------------------------- | ------------ | --------- | ------------- | ----------------- | -------------------------------- |
| 0   | getRejectCodeNoError            | 10_244_754   | 4_687_901 | $0.0000062334 | $6.23             | <font color="red">+5_723</font>  |
| 1   | getRejectCodeDestinationInvalid | 9_404_384    | 4_351_753 | $0.0000057864 | $5.78             | <font color="red">+7_152</font>  |
| 2   | getRejectCodeCanisterReject     | 10_587_726   | 4_825_090 | $0.0000064158 | $6.41             | <font color="red">+25_401</font> |
| 3   | getRejectCodeCanisterError      | 10_080_778   | 4_622_311 | $0.0000061461 | $6.14             | <font color="red">+15_487</font> |
| 4   | getRejectMessage                | 11_287_647   | 5_105_058 | $0.0000067880 | $6.78             | <font color="red">+19_241</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name                     | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | getRejectCodeNoError            | 10_239_031   | 4_685_612 | $0.0000062303 | $6.23             |
| 1   | getRejectCodeDestinationInvalid | 9_397_232    | 4_348_892 | $0.0000057826 | $5.78             |
| 2   | getRejectCodeCanisterReject     | 10_562_325   | 4_814_930 | $0.0000064023 | $6.40             |
| 3   | getRejectCodeCanisterError      | 10_065_291   | 4_616_116 | $0.0000061379 | $6.13             |
| 4   | getRejectMessage                | 11_268_406   | 5_097_362 | $0.0000067778 | $6.77             |

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
